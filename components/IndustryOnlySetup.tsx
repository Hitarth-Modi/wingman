"use client";

import type { IndustryKey } from "@/types/playbook";
import { industryLabels } from "@/data/problemPlaybooks";

type IndustryOnlySetupProps = {
  industryOptions?: Record<IndustryKey, string>;
  selectedIndustry: IndustryKey | "";
  onSelectIndustry: (industry: IndustryKey) => void;
};

export function IndustryOnlySetup({
  industryOptions = industryLabels,
  selectedIndustry,
  onSelectIndustry,
}: IndustryOnlySetupProps) {
  const industries = Object.entries(industryOptions) as [IndustryKey, string][];

  return (
    <section className="grid min-h-[calc(100vh-7rem)] content-center gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8a4fff]">
          wingman
        </p>
        <h2 className="mt-2 max-w-3xl text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
          Choose the prospect industry.
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[#665d52]">
          The playbook will show problem questions, solutions, benefits, and demo
          features for that industry.
        </p>
      </div>

      <div className="grid max-w-xl gap-3">
        {industries.map(([value, label]) => {
          const selected = selectedIndustry === value;

          return (
            <button
              key={value}
              aria-pressed={selected}
              className={`min-h-24 rounded-lg border px-5 py-4 text-left text-xl font-semibold transition focus:outline-none focus:ring-4 focus:ring-[#8a4fff]/20 ${
                selected
                  ? "border-[#8a4fff] bg-white text-[#1f211d] shadow-[0_12px_34px_rgba(70,48,102,0.14)]"
                  : "border-[#e0d2c0] bg-[#efe4d3] text-[#2b2d28] hover:border-[#c9b79f] hover:bg-[#f4eadc]"
              }`}
              onClick={() => onSelectIndustry(value)}
              type="button"
            >
              {label}
            </button>
          );
        })}
      </div>

    </section>
  );
}
