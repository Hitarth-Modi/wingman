import type { DemoFeature, DemoFeatureInput, IndustryKey, PlaybookContent, ProblemQuestion } from "@/types/playbook";

export function getProblemsForIndustry(industry: IndustryKey | "", playbooks: PlaybookContent) {
  return industry ? playbooks[industry].problems : [];
}

export function getSelectedProblems(industry: IndustryKey | "", ids: string[], playbooks: PlaybookContent) {
  const selected = new Set(ids);
  return getProblemsForIndustry(industry, playbooks).filter((problem) => selected.has(problem.id));
}

function normalizeFeature(feature: DemoFeatureInput): DemoFeature {
  return typeof feature === "string"
    ? { label: feature, bucket: "mention" }
    : { label: feature.label, bucket: feature.bucket ?? "mention" };
}

export function getUniqueFeatures(problems: ProblemQuestion[]) {
  const features = new Map<string, DemoFeature>();
  for (const feature of problems.flatMap((problem) => problem.features)) {
    const normalized = normalizeFeature(feature);
    const key = `${normalized.bucket}:${normalized.label}`;
    if (!features.has(key)) features.set(key, normalized);
  }
  return [...features.values()];
}
