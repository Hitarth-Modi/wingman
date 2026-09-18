import { industryLabels as fallbackIndustryLabels } from "@/data/problemPlaybooks";
import { getProblemTag } from "@/lib/problem-tags.mjs";
import type {
  DemoFeatureBucket,
  IndustryKey,
  PlaybookContent,
  ProblemQuestion,
} from "@/types/playbook";

export type CallPilotContent = {
  industryLabels: Record<IndustryKey, string>;
  playbooks: PlaybookContent;
};

type SheetRow = Record<string, unknown>;

const industryKeys = ["ecommerce", "edtech", "b2c"] as const;
const featureBuckets: DemoFeatureBucket[] = ["dashboard", "report", "mention"];

export function parseCallPilotSheetPayload(payload: unknown): CallPilotContent {
  const industries = toObjects(readTab(payload, "INDUSTRIES"));
  const challenges = toObjects(readTab(payload, "INDUSTRY_CHALLENGES"));
  const problems = toObjects(readTab(payload, "PROBLEM_QUESTIONS"));
  const benefits = toObjects(readTab(payload, "BENEFITS"));
  const demoFeatures = toObjects(readTab(payload, "DEMO_FEATURES"));

  if (industries.length === 0 || problems.length === 0) {
    throw new Error("Sheet payload is missing required content tabs.");
  }

  const industryLabels = { ...fallbackIndustryLabels };
  const playbooks = {} as PlaybookContent;

  for (const industryKey of industryKeys) {
    const industryRow = sortedRows(industries).find(
      (row) => asIndustryKey(value(row, "industry_id")) === industryKey,
    );

    if (!industryRow || !isActive(industryRow)) {
      continue;
    }

    const industryChallenges = sortedRows(challenges)
      .filter(
        (row) =>
          isActive(row) && asIndustryKey(value(row, "industry_id")) === industryKey,
      )
      .map((row) => asText(value(row, "challenge_text")))
      .filter(Boolean);

    const industryProblems: ProblemQuestion[] = sortedRows(problems)
      .filter(
        (row) =>
          isActive(row) && asIndustryKey(value(row, "industry_id")) === industryKey,
      )
      .map((row): ProblemQuestion | null => {
        const id = asText(value(row, "problem_id"));
        const question = asText(value(row, "question_text", "question"));
        const solution = asText(value(row, "solution_text", "solution"));

        if (!id || !question || !solution) {
          return null;
        }

        return {
          id,
          industry: industryKey,
          question,
          tag: getProblemTag(id, value(row, "tag", "question_tag")),
          solution,
          benefits: benefitsForProblem(row, benefits, id),
          features: sortedRows(demoFeatures)
            .filter(
              (featureRow) =>
                isActive(featureRow) &&
                asText(value(featureRow, "problem_id")) === id,
            )
            .map((featureRow) => ({
              label: asText(value(featureRow, "feature_text")),
              bucket: asFeatureBucket(value(featureRow, "bucket")),
            }))
            .filter((feature) => feature.label),
          note: asText(value(row, "note")) || undefined,
        };
      })
      .filter((problem): problem is ProblemQuestion => Boolean(problem));

    if (industryProblems.length === 0) {
      continue;
    }

    industryLabels[industryKey] =
      asText(value(industryRow, "industry_name")) || industryLabels[industryKey];

    playbooks[industryKey] = {
      situation: asText(value(industryRow, "situation")),
      challenges: industryChallenges,
      problems: industryProblems,
    };
  }

  if (industryKeys.some((key) => !playbooks[key])) {
    throw new Error("Sheet payload does not include all active wingman industries.");
  }

  return { industryLabels, playbooks };
}

function readTab(payload: unknown, tabName: string): unknown[] {
  const matchingSheet = [
    readObject(payload).sheets,
    readObject(payload).data,
    readObject(readObject(payload).data).sheets,
  ]
    .filter(Array.isArray)
    .flat()
    .map((sheet) => readObject(sheet))
    .find(
      (sheet) =>
        asText(sheet.name).toLowerCase() === tabName.toLowerCase() &&
        Array.isArray(sheet.data),
    );

  if (matchingSheet) {
    return matchingSheet.data as unknown[];
  }

  const containers = [
    payload,
    readObject(payload).data,
    readObject(payload).tabs,
    readObject(payload).sheets,
    readObject(readObject(payload).data).tabs,
    readObject(readObject(payload).data).sheets,
  ];

  for (const container of containers) {
    const object = readObject(container);
    const exact = object[tabName];
    if (Array.isArray(exact)) return exact;

    const matchingKey = Object.keys(object).find(
      (key) => key.toLowerCase() === tabName.toLowerCase(),
    );
    if (matchingKey && Array.isArray(object[matchingKey])) {
      return object[matchingKey] as unknown[];
    }
  }

  return [];
}

function toObjects(rows: unknown[]): SheetRow[] {
  if (rows.length === 0) return [];

  if (rows.every((row) => row && !Array.isArray(row) && typeof row === "object")) {
    return rows.map((row) => normalizeKeys(readObject(row)));
  }

  if (!Array.isArray(rows[0])) return [];

  const headers = (rows[0] as unknown[]).map((header) =>
    asText(header).trim().toLowerCase(),
  );

  return rows.slice(1).map((row) => {
    const values = Array.isArray(row) ? row : [];
    return headers.reduce<SheetRow>((record, header, index) => {
      if (header) record[header] = values[index] ?? "";
      return record;
    }, {});
  });
}

function normalizeKeys(row: SheetRow): SheetRow {
  return Object.entries(row).reduce<SheetRow>((record, [key, rowValue]) => {
    record[key.trim().toLowerCase()] = rowValue;
    return record;
  }, {});
}

function sortedRows(rows: SheetRow[]) {
  return [...rows].sort((a, b) => sortOrder(a) - sortOrder(b));
}

function benefitsForProblem(
  problemRow: SheetRow,
  benefitRows: SheetRow[],
  problemId: string,
) {
  const embeddedBenefits = [
    value(problemRow, "benefit_1", "benefit1"),
    value(problemRow, "benefit_2", "benefit2"),
    value(problemRow, "benefit_3", "benefit3"),
    value(problemRow, "benefit_4", "benefit4"),
    value(problemRow, "benefit_5", "benefit5"),
  ]
    .map(asText)
    .filter(Boolean);

  if (embeddedBenefits.length > 0) {
    return embeddedBenefits;
  }

  const combinedBenefits = asText(value(problemRow, "benefits"));
  if (combinedBenefits) {
    return combinedBenefits
      .split(/\n+|\s\|\s/)
      .map((benefit) => benefit.trim())
      .filter(Boolean);
  }

  return sortedRows(benefitRows)
    .filter(
      (benefitRow) =>
        isActive(benefitRow) && asText(value(benefitRow, "problem_id")) === problemId,
    )
    .map((benefitRow) => asText(value(benefitRow, "benefit_text")))
    .filter(Boolean);
}

function sortOrder(row: SheetRow) {
  const order = Number(value(row, "sort_order"));
  return Number.isFinite(order) ? order : Number.MAX_SAFE_INTEGER;
}

function isActive(row: SheetRow) {
  const raw = value(row, "active");
  if (raw === undefined || raw === null || raw === "") return true;
  if (typeof raw === "boolean") return raw;
  return !["false", "no", "0", "inactive"].includes(asText(raw).toLowerCase());
}

function value(row: SheetRow, ...keys: string[]) {
  for (const key of keys) {
    const match = row[key.toLowerCase()];
    if (match !== undefined && match !== null) return match;
  }
  return "";
}

function asText(input: unknown) {
  return typeof input === "string" ? input.trim() : String(input ?? "").trim();
}

function asIndustryKey(input: unknown): IndustryKey | null {
  const value = asText(input).toLowerCase();
  return industryKeys.includes(value as IndustryKey) ? (value as IndustryKey) : null;
}

function asFeatureBucket(input: unknown): DemoFeatureBucket {
  const value = asText(input).toLowerCase();
  return featureBuckets.includes(value as DemoFeatureBucket)
    ? (value as DemoFeatureBucket)
    : "mention";
}

function readObject(input: unknown): Record<string, unknown> {
  return input && !Array.isArray(input) && typeof input === "object"
    ? (input as Record<string, unknown>)
    : {};
}
