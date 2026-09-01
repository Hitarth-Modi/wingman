"use client";

import { useMemo, useState } from "react";
import { createInitialCallState, getCurrentNode, submitResponse } from "@/lib/conversationEngine";
import type { CallState, Industry, Prospect, ResponseSubmission } from "@/types/conversation";
import { LiveCallScreen } from "./LiveCallScreen";
import { SetupScreen } from "./SetupScreen";
import { SummaryScreen } from "./SummaryScreen";

type Screen = "setup" | "live" | "summary";

const emptyProspect: Prospect = {
  name: "",
  company: "",
  industry: "",
  jobTitle: "",
  companySize: "",
};

export function CallPilotApp() {
  const [screen, setScreen] = useState<Screen>("setup");
  const [callState, setCallState] = useState<CallState | null>(null);
  const currentNode = useMemo(
    () => (callState ? getCurrentNode(callState) : null),
    [callState],
  );

  function startCall(prospect: Prospect) {
    const normalizedProspect = {
      ...prospect,
      company: prospect.company.trim(),
      name: prospect.name.trim(),
      industry: prospect.industry as Industry,
    };

    setCallState(createInitialCallState(normalizedProspect));
    setScreen("live");
  }

  function recordResponse(submission: ResponseSubmission) {
    if (!callState) {
      return;
    }

    const nextState = submitResponse(callState, submission);
    setCallState(nextState);

    if (nextState.isComplete) {
      setScreen("summary");
    }
  }

  function endCall() {
    if (!callState) {
      setScreen("setup");
      return;
    }

    setCallState({
      ...callState,
      isComplete: true,
    });
    setScreen("summary");
  }

  function startNewCall() {
    setCallState(null);
    setScreen("setup");
  }

  if (screen === "setup") {
    return <SetupScreen initialProspect={emptyProspect} onStartCall={startCall} />;
  }

  if (screen === "summary" && callState) {
    return <SummaryScreen callState={callState} onStartNewCall={startNewCall} />;
  }

  if (!callState) {
    return <SetupScreen initialProspect={emptyProspect} onStartCall={startCall} />;
  }

  return (
    <LiveCallScreen
      callState={callState}
      currentNode={currentNode}
      onEndCall={endCall}
      onSubmitResponse={recordResponse}
    />
  );
}
