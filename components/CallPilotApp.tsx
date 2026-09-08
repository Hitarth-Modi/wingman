"use client";

import { useMemo, useState } from "react";
import {
  industryLabels as fallbackIndustryLabels,
  problemPlaybooks,
  getProblemsForIndustry,
  getSelectedProblems,
  getUniqueFeatures,
} from "@/data/problemPlaybooks";
import type {
  IndustryKey,
  PilotState,
  PilotStep,
  PlaybookContent,
} from "@/types/playbook";
import { BenefitsScreen } from "./BenefitsScreen";
import { FeaturesScreen } from "./FeaturesScreen";
import { IndustryOnlySetup } from "./IndustryOnlySetup";
import { PilotFrame } from "./PilotFrame";
import { ProblemQuestionList } from "./ProblemQuestionList";

const initialState: PilotState = {
  industry: "",
  selectedProblemIds: [],
  step: "setup",
};

type CallPilotAppProps = {
  industryOptions?: Record<IndustryKey, string>;
  playbooks?: PlaybookContent;
};

export function CallPilotApp({
  industryOptions = fallbackIndustryLabels,
  playbooks = problemPlaybooks,
}: CallPilotAppProps) {
  const [pilotState, setPilotState] = useState<PilotState>(initialState);
  const [pastStates, setPastStates] = useState<PilotState[]>([]);
  const [futureStates, setFutureStates] = useState<PilotState[]>([]);
  const problems = useMemo(
    () => getProblemsForIndustry(pilotState.industry, playbooks),
    [pilotState.industry, playbooks],
  );
  const selectedProblems = useMemo(
    () =>
      getSelectedProblems(
        pilotState.industry,
        pilotState.selectedProblemIds,
        playbooks,
      ),
    [pilotState.industry, pilotState.selectedProblemIds, playbooks],
  );
  const features = useMemo(() => getUniqueFeatures(selectedProblems), [selectedProblems]);

  function selectIndustry(industry: IndustryKey) {
    const setupState: PilotState = {
      industry,
      selectedProblemIds: [],
      step: "setup",
    };

    setPastStates((current) => [...current, setupState]);
    setPilotState({
      ...setupState,
      step: "problems",
    });
    setFutureStates([]);
  }

  function toggleProblem(problemId: string) {
    setPilotState((current) => {
      const selected = new Set(current.selectedProblemIds);

      if (selected.has(problemId)) {
        selected.delete(problemId);
      } else {
        selected.add(problemId);
      }

      return {
        ...current,
        selectedProblemIds: [...selected],
      };
    });
    setFutureStates([]);
  }

  function goToStep(step: PilotStep) {
    setPastStates((current) => [...current, pilotState]);
    setFutureStates([]);
    setPilotState((current) => ({
      ...current,
      step,
    }));
  }

  function startNewCall() {
    setPilotState(initialState);
    setPastStates([]);
    setFutureStates([]);
  }

  function goBack() {
    if (pastStates.length === 0) {
      return;
    }

    const previousState = pastStates[pastStates.length - 1];
    setPastStates((current) => current.slice(0, -1));
    setFutureStates((current) => [pilotState, ...current]);
    setPilotState(previousState);
  }

  function goForward() {
    if (futureStates.length === 0) {
      return;
    }

    const nextState = futureStates[0];
    setPastStates((current) => [...current, pilotState]);
    setFutureStates((current) => current.slice(1));
    setPilotState(nextState);
  }

  const navigationProps = {
    canGoBack: pastStates.length > 0,
    canGoForward: futureStates.length > 0,
    onBack: goBack,
    onForward: goForward,
  };

  return (
    <PilotFrame step={pilotState.step} navigation={navigationProps}>
      {pilotState.step === "setup" ? (
        <IndustryOnlySetup
          industryOptions={industryOptions}
          selectedIndustry={pilotState.industry}
          onSelectIndustry={selectIndustry}
        />
      ) : null}

      {pilotState.step === "problems" ? (
        <ProblemQuestionList
          problems={problems}
          selectedProblemIds={pilotState.selectedProblemIds}
          onToggleProblem={toggleProblem}
          onNext={() => goToStep("benefits")}
        />
      ) : null}

      {pilotState.step === "benefits" ? (
        <BenefitsScreen problems={selectedProblems} onNext={() => goToStep("features")} />
      ) : null}

      {pilotState.step === "features" ? (
        <FeaturesScreen features={features} onStartOver={startNewCall} />
      ) : null}
    </PilotFrame>
  );
}
