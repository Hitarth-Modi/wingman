import assert from "node:assert/strict";
import test from "node:test";
import { groupBenefitProblems } from "../lib/benefit-groups.mjs";

const problem = (id, overrides = {}) => ({
  id, industry: "ecommerce", question: `Question ${id}?`, solution: "Shared solution.",
  benefits: ["First benefit.", "Second benefit."], features: [], tag: "SEO", ...overrides,
});

test("matching answers and benefits are grouped while questions, tags and order are retained", () => {
  const input = [problem("one"), problem("different", { solution: "Different answer." }), problem("two", { tag: "Performance" })];
  const original = structuredClone(input);
  const groups = groupBenefitProblems(input);
  assert.equal(groups.length, 2);
  assert.deepEqual(groups[0].problems.map((p) => p.id), ["one", "two"]);
  assert.deepEqual(groups[0].problems.map((p) => p.tag), ["SEO", "Performance"]);
  assert.equal(groups[0].solution, input[0].solution);
  assert.deepEqual(groups[0].benefits, input[0].benefits);
  assert.deepEqual(input, original, "Grouping must not mutate content or selections");
});

test("identical content never combines across the three industries", () => {
  const input = ["ecommerce", "edtech", "b2c"].flatMap((industry) => [problem(`${industry}-1`, { industry }), problem(`${industry}-2`, { industry })]);
  const groups = groupBenefitProblems(input);
  assert.equal(groups.length, 3);
  for (const group of groups) {
    assert.equal(group.problems.length, 2);
    assert.equal(new Set(group.problems.map((p) => p.industry)).size, 1);
  }
});

test("same tags, partial matches, different benefit sequences, and different claims stay separate", () => {
  const input = [
    problem("one"),
    problem("new-answer", { solution: "Another solution." }),
    problem("extra-benefit", { benefits: ["First benefit.", "Second benefit.", "Extra benefit."] }),
    problem("reordered", { benefits: ["Second benefit.", "First benefit."] }),
    problem("different-claim", { solution: "Shared solution: 30% savings." }),
    problem("other-claim", { solution: "Shared solution: 40% savings." }),
  ];
  assert.equal(groupBenefitProblems(input).length, input.length);
});

test("formatting whitespace and repeated benefits do not create duplicate blocks or bullets", () => {
  const input = [
    problem("one", { benefits: ["First benefit.", "First benefit.", "Second benefit.", ""] }),
    problem("two", { solution: " Shared  solution.\n", benefits: [" First  benefit. ", "Second benefit."] }),
  ];
  const groups = groupBenefitProblems(input);
  assert.equal(groups.length, 1);
  assert.deepEqual(groups[0].benefits, ["First benefit.", "Second benefit."]);
});

test("empty and single selections retain the existing behavior", () => {
  assert.deepEqual(groupBenefitProblems([]), []);
  const single = problem("one", { benefits: [] });
  assert.deepEqual(groupBenefitProblems([single]), [{ problems: [single], solution: single.solution, benefits: [] }]);
});
