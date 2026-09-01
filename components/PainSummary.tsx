import type { CallState } from "@/types/conversation";

type PainSummaryProps = {
  callState: CallState;
};

const trackedPains = [
  "Page performance",
  "CDN / cloud cost",
  "Operational complexity",
  "Media security",
];

export function PainSummary({ callState }: PainSummaryProps) {
  return (
    <section className="rounded-lg border border-[#e4e1eb] bg-white p-4">
      <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#746d7f]">
        Discovered
      </h2>
      <div className="mt-3 grid gap-2">
        {trackedPains.map((pain) => {
          const status = getPainStatus(callState, pain);

          return (
            <div
              key={pain}
              className="flex items-center justify-between gap-3 rounded-md border border-[#ebe8f1] px-3 py-2"
            >
              <span className="text-sm font-medium text-[#332a42]">{pain}</span>
              <span className={`text-sm font-semibold ${status.className}`}>{status.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function getPainStatus(callState: CallState, pain: string) {
  if (callState.confirmedPains.includes(pain)) {
    return { label: "✓ confirmed", className: "text-[#247a3d]" };
  }

  if (callState.possiblePains.includes(pain)) {
    return { label: "? possible", className: "text-[#8a641c]" };
  }

  if (callState.rejectedPains.includes(pain)) {
    return { label: "- not active", className: "text-[#8b8791]" };
  }

  return { label: "- not explored", className: "text-[#9a94a7]" };
}
