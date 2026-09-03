"use client";

import type { ProblemQuestion } from "@/types/playbook";

type ProblemQuestionListProps = {
  problems: ProblemQuestion[];
  selectedProblemIds: string[];
  onToggleProblem: (problemId: string) => void;
  onNext: () => void;
};

export function ProblemQuestionList({
  problems,
  selectedProblemIds,
  onToggleProblem,
  onNext,
}: ProblemQuestionListProps) {
  const selected = new Set(selectedProblemIds);

  return (
    <section className="grid gap-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8a4fff]">
          Problem questions
        </p>
        <h2 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
          Tick what the prospect responds to.
        </h2>
      </div>

      <div className="grid gap-4">
        {problems.map((problem) => {
          const isSelected = selected.has(problem.id);

          return (
            <article key={problem.id} className="overflow-hidden rounded-lg">
              <button
                aria-expanded={isSelected}
                aria-pressed={isSelected}
                className={`flex min-h-20 w-full items-center gap-4 rounded-lg px-5 py-4 text-left text-2xl font-semibold leading-tight transition focus:outline-none focus:ring-4 focus:ring-[#8a4fff]/20 ${
                  isSelected ? "bg-[#e5d7c1]" : "bg-[#e8dcc9] hover:bg-[#e3d4bd]"
                }`}
                onClick={() => onToggleProblem(problem.id)}
                type="button"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${
                    isSelected ? "bg-[#8a4fff]" : "bg-[#a7a7a7]"
                  }`}
                >
                  ✓
                </span>
                <span>{problem.question}</span>
              </button>

              {isSelected ? (
                <div className="rounded-b-lg bg-[#f4f3f3] px-6 py-5 text-xl font-semibold leading-8">
                  {problem.solution}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="sticky bottom-0 flex justify-end border-t border-[#e7ddcf] bg-[#f8f1e6]/95 py-4 backdrop-blur">
        <button
          className="h-12 rounded-md bg-[#8a4fff] px-6 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#763de6] focus:outline-none focus:ring-4 focus:ring-[#8a4fff]/25 disabled:cursor-not-allowed disabled:bg-[#b8a9ca]"
          disabled={selectedProblemIds.length === 0}
          onClick={onNext}
          type="button"
        >
          Next
        </button>
      </div>
    </section>
  );
}
