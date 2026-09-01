"use client";

import { useState } from "react";
import type { CallState } from "@/types/conversation";
import { DemoRecommendation } from "./DemoRecommendation";
import { formatIndustry } from "./formatters";

type SummaryScreenProps = {
  callState: CallState;
  onStartNewCall: () => void;
};

export function SummaryScreen({ callState, onStartNewCall }: SummaryScreenProps) {
  const [showHistory, setShowHistory] = useState(false);
  const { prospect } = callState;

  return (
    <main className="min-h-screen bg-[#f7f7fb] px-5 py-6 text-[#17121f] sm:px-8">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-lg border border-[#e4e1eb] bg-white p-6 shadow-[0_16px_44px_rgba(33,24,55,0.08)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6d35c7]">
            Call complete
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-[#17121f]">
            {prospect.company || "Prospect"} summary
          </h1>
          <p className="mt-2 text-lg text-[#615a6b]">
            {formatIndustry(prospect.industry)} · {prospect.jobTitle || "Role"} ·{" "}
            {prospect.companySize || "Company size"}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <SummaryBlock title="Confirmed pains" items={callState.confirmedPains} empty="None confirmed" />
            <SummaryBlock title="Areas discussed" items={callState.discussedAreas} empty="No areas recorded" />
          </div>

          <DemoRecommendation features={callState.suggestedFeatures} />

          <div className="mt-6 rounded-md border border-[#ebe8f1] bg-[#fbfafc] px-4 py-3">
            <p className="text-sm font-semibold text-[#332a42]">
              Number of conversation steps: {callState.answers.length}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className="h-11 rounded-md bg-[#6d35c7] px-5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#5c2bad] focus:outline-none focus:ring-4 focus:ring-[#6d35c7]/20"
              type="button"
              onClick={onStartNewCall}
            >
              Start New Call
            </button>
            <button
              className="h-11 rounded-md border border-[#d8d4e2] bg-white px-5 text-sm font-semibold uppercase tracking-[0.14em] text-[#332a42] transition hover:border-[#c7bfd6] hover:bg-[#fbfafc] focus:outline-none focus:ring-4 focus:ring-[#6d35c7]/15"
              type="button"
              onClick={() => setShowHistory((current) => !current)}
            >
              View Call History
            </button>
          </div>
        </div>

        {showHistory ? (
          <section className="mt-4 rounded-lg border border-[#e4e1eb] bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#746d7f]">
              Local session history
            </h2>
            <ol className="mt-4 grid gap-3">
              {callState.answers.map((answer, index) => (
                <li
                  key={`${answer.nodeId}-${answer.timestamp}`}
                  className="rounded-md border border-[#ebe8f1] bg-[#fbfafc] p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6d35c7]">
                    Step {index + 1} · {answer.nodeLabel}
                  </p>
                  <p className="mt-2 text-sm text-[#332a42]">{answer.nodeText}</p>
                  <p className="mt-2 text-sm font-semibold text-[#17121f]">→ {answer.label}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
      </section>
    </main>
  );
}

function SummaryBlock({
  title,
  items,
  empty,
}: {
  title: string;
  items: string[];
  empty: string;
}) {
  return (
    <section className="rounded-md border border-[#ebe8f1] bg-[#fbfafc] p-4">
      <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#746d7f]">
        {title}
      </h2>
      {items.length ? (
        <ul className="mt-3 grid gap-2">
          {items.map((item) => (
            <li key={item} className="text-sm font-semibold text-[#332a42]">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-[#746d7f]">{empty}</p>
      )}
    </section>
  );
}
