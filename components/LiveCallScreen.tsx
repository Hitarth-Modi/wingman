"use client";

import type { CallState, ConversationNode, ResponseSubmission } from "@/types/conversation";
import { CallHistory } from "./CallHistory";
import { CallPilotHeader } from "./CallPilotHeader";
import { CallStageProgress } from "./CallStageProgress";
import { ConversationCard } from "./ConversationCard";
import { PainSummary } from "./PainSummary";
import { ProspectContext } from "./ProspectContext";

type LiveCallScreenProps = {
  callState: CallState;
  currentNode: ConversationNode | null;
  onEndCall: () => void;
  onSubmitResponse: (submission: ResponseSubmission) => void;
};

export function LiveCallScreen({
  callState,
  currentNode,
  onEndCall,
  onSubmitResponse,
}: LiveCallScreenProps) {
  return (
    <main className="min-h-screen bg-[#f7f7fb] text-[#17121f]">
      <CallPilotHeader callState={callState} onEndCall={onEndCall} />
      <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6">
        <CallStageProgress currentStage={callState.currentStage} />

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="min-w-0">
            <ConversationCard node={currentNode} onSubmitResponse={onSubmitResponse} />
          </section>

          <aside className="grid content-start gap-4">
            <ProspectContext prospect={callState.prospect} />
            <PainSummary callState={callState} />
            <CallHistory callState={callState} />
          </aside>
        </div>
      </div>
    </main>
  );
}
