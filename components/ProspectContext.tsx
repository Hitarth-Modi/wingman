import type { Prospect } from "@/types/conversation";
import { formatIndustry } from "./formatters";

type ProspectContextProps = {
  prospect: Prospect;
};

export function ProspectContext({ prospect }: ProspectContextProps) {
  const rows = [
    ["Company", prospect.company || "Not entered"],
    ["Industry", formatIndustry(prospect.industry)],
    ["Role", prospect.jobTitle || "Not selected"],
    ["Company size", prospect.companySize || "Not selected"],
    ["Prospect", prospect.name || "Not entered"],
  ];

  return (
    <section className="rounded-lg border border-[#e4e1eb] bg-white p-4">
      <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#746d7f]">
        Prospect
      </h2>
      <dl className="mt-3 grid gap-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-4">
            <dt className="text-sm text-[#746d7f]">{label}</dt>
            <dd className="text-right text-sm font-semibold text-[#332a42]">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
