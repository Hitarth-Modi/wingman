"use client";

import type { AnswerRecord, ConversationNode, ResponseSubmission } from "@/types/conversation";
import { labelForAction } from "@/lib/conversationEngine";
import { DemoRecommendation } from "./DemoRecommendation";
import { ResponseOptions } from "./ResponseOptions";

type ConversationCardProps = {
  node: ConversationNode | null;
  savedAnswer?: AnswerRecord;
  onSubmitResponse: (submission: ResponseSubmission) => void;
};

export function ConversationCard({ node, savedAnswer, onSubmitResponse }: ConversationCardProps) {
  if (!node) {
    return (
      <article className="min-h-[620px] rounded-lg border border-[#e4e1eb] bg-white p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6d35c7]">
          Conversation flow coming soon
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-[#17121f]">
          This playbook is not ready yet.
        </h2>
      </article>
    );
  }

  const isPitch = node.actionType === "position" || node.actionType === "proof";
  const isDemo = node.actionType === "demo";

  return (
    <article
      className={`min-h-[620px] rounded-lg border bg-white p-5 shadow-[0_16px_44px_rgba(33,24,55,0.08)] transition sm:p-8 ${
        isPitch ? "border-[#cbb9f0]" : "border-[#e4e1eb]"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${
            isDemo
              ? "bg-[#eff8f8] text-[#136c72]"
              : isPitch
                ? "bg-[#f5f0ff] text-[#5c2bad]"
                : "bg-[#f4f2f7] text-[#615a6b]"
          }`}
        >
          {labelForAction(node.actionType)}
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a94a7]">
          {node.stage}
        </span>
      </div>

      <div className="mt-8 max-w-5xl">
        <h2 className="text-[clamp(2rem,4vw,4.4rem)] font-semibold leading-[1.08] tracking-normal text-[#17121f]">
          {node.text}
        </h2>

        {node.supportingLines?.length ? (
          <div className="mt-6 grid gap-3">
            {node.supportingLines.map((line) => (
              <p
                key={line}
                className="rounded-md border border-[#ebe8f1] bg-[#fbfafc] px-4 py-3 text-lg leading-7 text-[#332a42]"
              >
                {line}
              </p>
            ))}
          </div>
        ) : null}

        {node.internalGoal ? (
          <p className="mt-5 max-w-3xl text-sm leading-6 text-[#746d7f]">
            <span className="font-semibold text-[#615a6b]">Goal:</span>{" "}
            {node.internalGoal}
          </p>
        ) : null}
      </div>

      {isDemo ? <DemoRecommendation features={node.metadata?.features ?? []} /> : null}

      <ResponseOptions
        key={`${node.id}-${savedAnswer?.timestamp ?? "new"}`}
        node={node}
        savedAnswer={savedAnswer}
        onSubmitResponse={onSubmitResponse}
      />
    </article>
  );
}
