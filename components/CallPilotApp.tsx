"use client";

import { useMemo, useState } from "react";
import { createInitialCallState, getCurrentNode, submitResponse } from "@/lib/conversationEngine";
import type {
  AnswerRecord,
  CallState,
  Industry,
  Prospect,
  ResponseSubmission,
} from "@/types/conversation";
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
  const [pastStates, setPastStates] = useState<CallState[]>([]);
  const [futureStates, setFutureStates] = useState<CallState[]>([]);
  const currentNode = useMemo(
    () => (callState ? getCurrentNode(callState) : null),
    [callState],
  );
  const forwardAnswer = useMemo(
    () =>
      currentNode && futureStates[0]
        ? findAnswerForNode(futureStates[0].answers, currentNode.id)
        : undefined,
    [currentNode, futureStates],
  );

  function startCall(prospect: Prospect) {
    const normalizedProspect = {
      ...prospect,
      company: prospect.company.trim(),
      name: prospect.name.trim(),
      industry: prospect.industry as Industry,
    };

    setCallState(createInitialCallState(normalizedProspect));
    setPastStates([]);
    setFutureStates([]);
    setScreen("live");
  }

  function recordResponse(submission: ResponseSubmission) {
    if (!callState) {
      return;
    }

    const nextState = submitResponse(callState, submission);
    setPastStates((current) => [...current, callState]);
    setFutureStates([]);
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

    setPastStates((current) => [...current, callState]);
    setFutureStates([]);
    setCallState({
      ...callState,
      isComplete: true,
    });
    setScreen("summary");
  }

  function startNewCall() {
    setCallState(null);
    setPastStates([]);
    setFutureStates([]);
    setScreen("setup");
  }

  function goBack() {
    if (pastStates.length === 0 || !callState) {
      return;
    }

    const previousState = pastStates[pastStates.length - 1];
    setPastStates((current) => current.slice(0, -1));
    setFutureStates((current) => [callState, ...current]);
    setCallState(previousState);
    setScreen(previousState.isComplete ? "summary" : "live");
  }

  function goForward() {
    if (futureStates.length === 0 || !callState) {
      return;
    }

    const nextState = futureStates[0];
    setPastStates((current) => [...current, callState]);
    setFutureStates((current) => current.slice(1));
    setCallState(nextState);
    setScreen(nextState.isComplete ? "summary" : "live");
  }

  const navigationProps = {
    canGoBack: pastStates.length > 0,
    canGoForward: futureStates.length > 0,
    onBack: goBack,
    onForward: goForward,
  };

  if (screen === "setup") {
    return (
      <SetupScreen
        initialProspect={emptyProspect}
        navigation={navigationProps}
        onStartCall={startCall}
      />
    );
  }

  if (screen === "summary" && callState) {
    return (
      <SummaryScreen
        callState={callState}
        navigation={navigationProps}
        onStartNewCall={startNewCall}
      />
    );
  }

  if (!callState) {
    return (
      <SetupScreen
        initialProspect={emptyProspect}
        navigation={navigationProps}
        onStartCall={startCall}
      />
    );
  }

  return (
    <LiveCallScreen
      callState={callState}
      currentNode={currentNode}
      forwardAnswer={forwardAnswer}
      navigation={navigationProps}
      onEndCall={endCall}
      onSubmitResponse={recordResponse}
    />
  );
}

function findAnswerForNode(answers: AnswerRecord[], nodeId: string) {
  for (let index = answers.length - 1; index >= 0; index -= 1) {
    if (answers[index].nodeId === nodeId) {
      return answers[index];
    }
  }

  return undefined;
}
