"use client";

import { useMemo, useState } from "react";
import type { ConversationNode, ResponseSubmission } from "@/types/conversation";

type ResponseOptionsProps = {
  node: ConversationNode;
  onSubmitResponse: (submission: ResponseSubmission) => void;
};

export function ResponseOptions({ node, onSubmitResponse }: ResponseOptionsProps) {
  const acknowledgementOption = useMemo(
    () => ({
      id: "continue",
      label: node.actionType === "demo" ? "Start demo" : "Continue",
    }),
    [node.actionType],
  );
  const options =
    node.responseType === "acknowledgement" && (!node.options || node.options.length === 0)
      ? [acknowledgementOption]
      : (node.options ?? []);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherText, setOtherText] = useState("");
  const isMultiSelect = node.responseType === "multi_select";
  const selectedOther = options.some((option) => option.isOther && selectedIds.includes(option.id));
  const canContinue = isMultiSelect
    ? selectedIds.length > 0
    : selectedIds.length > 0 || node.responseType === "acknowledgement";

  function toggleOption(optionId: string) {
    const option = options.find((item) => item.id === optionId);

    if (isMultiSelect) {
      setSelectedIds((current) =>
        current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId],
      );
    } else {
      setSelectedIds([optionId]);
    }

    setShowOtherInput(Boolean(option?.isOther));

    if (!isMultiSelect && !option?.isOther) {
      onSubmitResponse({ optionIds: [optionId] });
    }
  }

  function submitSelected() {
    const optionIds =
      node.responseType === "acknowledgement" && selectedIds.length === 0
        ? [acknowledgementOption.id]
        : selectedIds;

    const submission: ResponseSubmission = {
      optionIds,
    };

    if (selectedOther && otherText.trim()) {
      // Future versions will send this response plus conversation context to an AI classifier.
      submission.rawResponse = otherText.trim();
    }

    onSubmitResponse(submission);
    setSelectedIds([]);
    setShowOtherInput(false);
    setOtherText("");
  }

  return (
    <section className="mt-9 border-t border-[#ebe8f1] pt-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#746d7f]">
        What did they say?
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
        {options.map((option) => {
          const selected = selectedIds.includes(option.id);

          return (
            <button
              key={option.id}
              type="button"
              className={`min-h-14 rounded-md border px-4 py-3 text-left text-base font-semibold transition focus:outline-none focus:ring-4 focus:ring-[#6d35c7]/15 ${
                selected
                  ? "border-[#6d35c7] bg-[#f5f0ff] text-[#4e2396]"
                  : "border-[#d8d4e2] bg-white text-[#332a42] hover:border-[#b9adc9] hover:bg-[#fbfafc]"
              }`}
              aria-pressed={selected}
              onClick={() => toggleOption(option.id)}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {showOtherInput ? (
        <div className="mt-4 rounded-md border border-[#d8d4e2] bg-[#fbfafc] p-4">
          <label className="grid gap-2 text-sm font-semibold text-[#332a42]">
            Briefly note what they said
            <textarea
              className="min-h-20 rounded-md border border-[#d8d4e2] bg-white px-3 py-2 text-base font-normal outline-none transition placeholder:text-[#9a94a7] focus:border-[#6d35c7] focus:ring-4 focus:ring-[#6d35c7]/10"
              value={otherText}
              onChange={(event) => setOtherText(event.target.value)}
              placeholder="Short note for this call only"
            />
          </label>
        </div>
      ) : null}

      {(isMultiSelect || showOtherInput) && (
        <button
          className="mt-4 h-12 rounded-md bg-[#6d35c7] px-5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#5c2bad] focus:outline-none focus:ring-4 focus:ring-[#6d35c7]/20 disabled:cursor-not-allowed disabled:bg-[#b9adc9]"
          type="button"
          disabled={!canContinue}
          onClick={submitSelected}
        >
          Continue
        </button>
      )}

      {!isMultiSelect && !showOtherInput ? (
        <div className="mt-4 text-sm text-[#746d7f]">
          {node.responseType === "acknowledgement"
            ? "Click Continue when you have delivered the line."
            : "Click the closest response to advance immediately."}
        </div>
      ) : null}
    </section>
  );
}
