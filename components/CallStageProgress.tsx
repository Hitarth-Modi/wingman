import { getStageStatus, getStages } from "@/lib/conversationEngine";
import type { CallStage } from "@/types/conversation";

type CallStageProgressProps = {
  currentStage: CallStage;
};

const labels: Record<CallStage, string> = {
  intro: "Intro",
  discovery: "Discovery",
  explore: "Explore",
  pitch: "Pitch",
  demo: "Demo",
};

export function CallStageProgress({ currentStage }: CallStageProgressProps) {
  return (
    <nav
      aria-label="Call stage progress"
      className="rounded-lg border border-[#e4e1eb] bg-white px-3 py-3"
    >
      <ol className="grid grid-cols-5 gap-2">
        {getStages().map((stage) => {
          const status = getStageStatus(stage, currentStage);
          const className =
            status === "completed"
              ? "border-[#cdeed7] bg-[#f2fbf4] text-[#247a3d]"
              : status === "current"
                ? "border-[#6d35c7] bg-[#f5f0ff] text-[#4e2396]"
                : "border-[#ebe8f1] bg-[#fbfafc] text-[#9a94a7]";

          return (
            <li key={stage}>
              <div
                className={`flex min-h-10 items-center justify-center rounded-md border px-2 text-center text-xs font-semibold uppercase tracking-[0.12em] ${className}`}
              >
                {labels[stage]}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
