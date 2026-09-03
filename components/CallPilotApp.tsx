"use client";

import { useMemo, useState } from "react";
import {
  getPlaybookForIndustry,
  getProblemsForIndustry,
  getSelectedProblems,
  getUniqueFeatures,
} from "@/data/problemPlaybooks";
import type { IndustryKey, PilotState, PilotStep } from "@/types/playbook";
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

export function CallPilotApp() {
  const [pilotState, setPilotState] = useState<PilotState>(initialState);
  const [pastStates, setPastStates] = useState<PilotState[]>([]);
  const [futureStates, setFutureStates] = useState<PilotState[]>([]);
  const problems = useMemo(
    () => getProblemsForIndustry(pilotState.industry),
    [pilotState.industry],
  );
  const playbook = useMemo(
    () => getPlaybookForIndustry(pilotState.industry),
    [pilotState.industry],
  );
  const selectedProblems = useMemo(
    () => getSelectedProblems(pilotState.industry, pilotState.selectedProblemIds),
    [pilotState.industry, pilotState.selectedProblemIds],
  );
  const features = useMemo(() => getUniqueFeatures(selectedProblems), [selectedProblems]);

  function selectIndustry(industry: IndustryKey) {
    setPilotState({
      industry,
      selectedProblemIds: [],
      step: "setup",
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
          selectedIndustry={pilotState.industry}
          onSelectIndustry={selectIndustry}
          onNext={() => goToStep("problems")}
        />
      ) : null}

      {pilotState.step === "problems" ? (
        <ProblemQuestionList
          problems={problems}
          playbook={playbook}
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
