import type { ProblemQuestion } from "@/types/playbook";

type BenefitsScreenProps = {
  problems: ProblemQuestion[];
  onNext: () => void;
};

export function BenefitsScreen({ problems, onNext }: BenefitsScreenProps) {
  return (
    <section className="grid min-h-[calc(100vh-7rem)] gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8a4fff]">
          Benefits
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-normal sm:text-4xl">
          Use these lines after the problem is confirmed.
        </h2>
      </div>

      <div className="grid gap-5">
        {problems.map((problem) => (
          <article key={problem.id} className="rounded-lg bg-white p-5 shadow-[0_10px_30px_rgba(54,42,27,0.08)]">
            <p className="text-lg font-semibold leading-snug sm:text-xl">{problem.question}</p>
            <p className="mt-2 text-lg font-semibold leading-snug sm:text-xl">{problem.solution}</p>
            <div className="mt-12">
              <h3 className="text-2xl font-semibold">We / Gumlet does this by</h3>
              <ul className="mt-3 list-disc space-y-2 pl-7 text-2xl font-semibold leading-tight">
                {problem.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="sticky bottom-0 flex justify-end border-t border-[#e7ddcf] bg-[#f8f1e6]/95 py-4 backdrop-blur">
        <button
          className="h-12 rounded-md bg-[#8a4fff] px-6 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#763de6] focus:outline-none focus:ring-4 focus:ring-[#8a4fff]/25"
          onClick={onNext}
          type="button"
        >
          Features for Demo
        </button>
      </div>
    </section>
  );
}
