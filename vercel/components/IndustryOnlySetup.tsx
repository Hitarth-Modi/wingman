"use client";

import { AppWindow, ArrowRight, Building2, GraduationCap, ShoppingBag } from "lucide-react";
import type { IndustryKey } from "@/types/playbook";

type IndustryOnlySetupProps = {
  industryOptions: Record<IndustryKey, string>;
  selectedIndustry: IndustryKey | "";
  onSelectIndustry: (industry: IndustryKey) => void;
};

const industryIcons = { ecommerce: ShoppingBag, edtech: GraduationCap, b2c: AppWindow };

export function IndustryOnlySetup({ industryOptions, selectedIndustry, onSelectIndustry }: IndustryOnlySetupProps) {
  const industries = Object.entries(industryOptions) as [IndustryKey, string][];

  return (
    <section className="screen setup-screen">
      <div>
        <p className="eyebrow"><Building2 size={15} aria-hidden="true" />Industry</p>
        <h2 className="screen-title">Choose the prospect industry.</h2>
      </div>
      <div className="industry-list">
        {industries.map(([value, label]) => {
          const Icon = industryIcons[value];
          return (
            <button key={value} type="button" className="industry-option"
              aria-pressed={selectedIndustry === value} onClick={() => onSelectIndustry(value)}>
              <span className={`industry-icon ${value}`}><Icon size={23} strokeWidth={1.7} aria-hidden="true" /></span>
              <span className="industry-name">{label}</span>
              <ArrowRight className="industry-arrow" size={19} aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
