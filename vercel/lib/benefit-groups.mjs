/** @typedef {{ problems: import("../types/playbook").ProblemQuestion[], solution: string, benefits: string[] }} BenefitGroup */

const normalizeText = (text) => text.trim().replace(/\s+/g, " ");

/**
 * @param {import("../types/playbook").ProblemQuestion[]} problems
 * @returns {BenefitGroup[]}
 */
export function groupBenefitProblems(problems) {
  /** @type {Map<string, BenefitGroup>} */
  const groups = new Map();
  for (const problem of problems) {
    const seenBenefits = new Set();
    const benefits = problem.benefits.filter((benefit) => {
      const text = normalizeText(benefit);
      if (!text || seenBenefits.has(text)) return false;
      seenBenefits.add(text);
      return true;
    });
    // Industry is part of the identity; tags alone must never determine a group.
    const key = JSON.stringify([
      problem.industry,
      normalizeText(problem.solution),
      benefits.map(normalizeText),
    ]);
    const existing = groups.get(key);
    if (existing) {
      existing.problems.push(problem);
    } else {
      groups.set(key, { problems: [problem], solution: problem.solution, benefits });
    }
  }
  return [...groups.values()];
}
