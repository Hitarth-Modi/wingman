import type { CallState } from "@/types/conversation";

type CallHistoryProps = {
  callState: CallState;
};

export function CallHistory({ callState }: CallHistoryProps) {
  const recentAnswers = callState.answers.slice(-6).reverse();

  return (
    <section className="rounded-lg border border-[#e4e1eb] bg-white p-4">
      <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#746d7f]">
        Call notes / history
      </h2>
      {recentAnswers.length ? (
        <ol className="mt-3 grid gap-3">
          {recentAnswers.map((answer) => (
            <li key={`${answer.nodeId}-${answer.timestamp}`} className="border-l-2 border-[#d9ccef] pl-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6d35c7]">
                {answer.nodeLabel}
              </p>
              <p className="mt-1 line-clamp-2 text-sm text-[#332a42]">{shorten(answer.nodeText)}</p>
              <p className="mt-1 text-sm font-semibold text-[#17121f]">→ {answer.label}</p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-3 text-sm leading-6 text-[#746d7f]">
          Answers will appear here as the call progresses.
        </p>
      )}
    </section>
  );
}

function shorten(text: string) {
  return text.length > 92 ? `${text.slice(0, 89)}...` : text;
}
