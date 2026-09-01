import { ecommerceConversation } from "@/data/conversations/ecommerce";
import type {
  AnswerRecord,
  CallStage,
  CallState,
  ConversationNode,
  FeatureRecommendation,
  Industry,
  Prospect,
  ResponseOption,
  ResponseSubmission,
} from "@/types/conversation";

const conversations: Record<Industry, ConversationNode[]> = {
  ecommerce: ecommerceConversation,
  edtech: [],
  consumer_apps: [],
};

const stageOrder: CallStage[] = ["intro", "discovery", "explore", "pitch", "demo"];

export function getConversationStart(industry: Industry | "") {
  if (!industry || conversations[industry].length === 0) {
    return null;
  }

  return conversations[industry][0].id;
}

export function createInitialCallState(prospect: Prospect): CallState {
  const startNodeId = getConversationStart(prospect.industry);

  return {
    prospect,
    currentNodeId: startNodeId ?? "",
    currentStage: "intro",
    answers: [],
    confirmedPains: [],
    rejectedPains: [],
    possiblePains: [],
    completedNodes: [],
    discussedAreas: [],
    suggestedFeatures: [],
    isComplete: !startNodeId,
  };
}

export function getCurrentNode(callState: CallState) {
  if (!callState.prospect.industry || callState.isComplete) {
    return null;
  }

  return getNodeById(callState.prospect.industry, callState.currentNodeId);
}

export function getNodeById(industry: Industry, nodeId: string) {
  return conversations[industry].find((node) => node.id === nodeId) ?? null;
}

export function getCurrentStage(callState: CallState) {
  return getCurrentNode(callState)?.stage ?? callState.currentStage;
}

export function getStageStatus(stage: CallStage, currentStage: CallStage) {
  const stageIndex = stageOrder.indexOf(stage);
  const currentIndex = stageOrder.indexOf(currentStage);

  if (stageIndex < currentIndex) {
    return "completed";
  }

  if (stageIndex === currentIndex) {
    return "current";
  }

  return "future";
}

export function getStages() {
  return stageOrder;
}

export function submitResponse(
  callState: CallState,
  submission: ResponseSubmission,
): CallState {
  const currentNode = getCurrentNode(callState);

  if (!currentNode || !callState.prospect.industry) {
    return callState;
  }

  const selectedOptions = getSelectedOptions(currentNode, submission.optionIds);
  const nextNodeId = getNextNode(currentNode, selectedOptions);
  const answer = buildAnswerRecord(currentNode, selectedOptions, submission);
  const stateWithAnswer = updateCallState(callState, currentNode, selectedOptions, answer);

  if (!nextNodeId || nextNodeId === "complete") {
    return {
      ...stateWithAnswer,
      currentStage: "demo",
      currentNodeId: "complete",
      isComplete: true,
    };
  }

  const nextNode = getNodeById(callState.prospect.industry, nextNodeId);

  if (!nextNode) {
    return {
      ...stateWithAnswer,
      currentNodeId: "complete",
      isComplete: true,
    };
  }

  return {
    ...stateWithAnswer,
    currentNodeId: nextNode.id,
    currentStage: nextNode.stage,
  };
}

export function getConfirmedPains(callState: CallState) {
  return callState.confirmedPains;
}

function getSelectedOptions(node: ConversationNode, optionIds: string[]) {
  if (node.responseType === "acknowledgement" && (!node.options || node.options.length === 0)) {
    return [
      {
        id: "continue",
        label: node.actionType === "demo" ? "Start demo" : "Continue",
        nextNodeId: node.nextNodeId,
      },
    ];
  }

  return (node.options ?? []).filter((option) => optionIds.includes(option.id));
}

export function getNextNode(node: ConversationNode, selectedOptions: ResponseOption[]) {
  if (node.responseType === "multi_select") {
    return selectedOptions.find((option) => option.nextNodeId)?.nextNodeId ?? node.nextNodeId;
  }

  return selectedOptions[0]?.nextNodeId ?? node.nextNodeId;
}

function buildAnswerRecord(
  node: ConversationNode,
  selectedOptions: ResponseOption[],
  submission: ResponseSubmission,
): AnswerRecord {
  const selectedLabels = selectedOptions.map((option) => option.label);
  const label =
    submission.rawResponse?.trim() ||
    selectedLabels.join(", ") ||
    (node.actionType === "demo" ? "Start demo" : "Continue");

  return {
    nodeId: node.id,
    nodeLabel: labelForAction(node.actionType),
    nodeText: node.text,
    stage: node.stage,
    responseType: node.responseType,
    optionIds: selectedOptions.map((option) => option.id),
    label,
    rawResponse: submission.rawResponse?.trim() || undefined,
    timestamp: new Date().toISOString(),
  };
}

function updateCallState(
  callState: CallState,
  node: ConversationNode,
  selectedOptions: ResponseOption[],
  answer: AnswerRecord,
): CallState {
  const allFeatures = [
    ...callState.suggestedFeatures,
    ...selectedOptions.flatMap((option) => option.suggestedFeatures ?? []),
    ...(node.metadata?.features ?? []),
  ];

  const nextState = selectedOptions.reduce(
    (state, option) => applyOptionState(state, option),
    {
      ...callState,
      answers: [...callState.answers, answer],
      completedNodes: unique([...callState.completedNodes, node.id]),
      discussedAreas: unique([
        ...callState.discussedAreas,
        ...(node.metadata?.discussedAreas ?? []),
        ...selectedOptions.flatMap((option) => (option.discussedArea ? [option.discussedArea] : [])),
      ]),
      suggestedFeatures: uniqueFeatures(allFeatures),
    },
  );

  return nextState;
}

function applyOptionState(callState: CallState, option: ResponseOption): CallState {
  if (!option.painCategory || !option.painStatus) {
    return callState;
  }

  if (option.painStatus === "confirmed") {
    return {
      ...callState,
      confirmedPains: unique([...callState.confirmedPains, option.painCategory]),
      possiblePains: callState.possiblePains.filter((pain) => pain !== option.painCategory),
      rejectedPains: callState.rejectedPains.filter((pain) => pain !== option.painCategory),
    };
  }

  if (option.painStatus === "possible") {
    if (callState.confirmedPains.includes(option.painCategory)) {
      return callState;
    }

    return {
      ...callState,
      possiblePains: unique([...callState.possiblePains, option.painCategory]),
      rejectedPains: callState.rejectedPains.filter((pain) => pain !== option.painCategory),
    };
  }

  return {
    ...callState,
    rejectedPains: unique([...callState.rejectedPains, option.painCategory]),
    possiblePains: callState.possiblePains.filter((pain) => pain !== option.painCategory),
    confirmedPains: callState.confirmedPains.filter((pain) => pain !== option.painCategory),
  };
}

function unique(items: string[]) {
  return [...new Set(items.filter(Boolean))];
}

function uniqueFeatures(features: FeatureRecommendation[]) {
  const seen = new Set<string>();

  return features.filter((feature) => {
    if (seen.has(feature.name)) {
      return false;
    }

    seen.add(feature.name);
    return true;
  });
}

export function labelForAction(actionType: ConversationNode["actionType"]) {
  const labels: Record<ConversationNode["actionType"], string> = {
    say: "SAY",
    ask: "ASK",
    follow_up: "FOLLOW UP",
    position: "POSITION",
    proof: "PROOF POINT",
    transition: "TRANSITION",
    demo: "DEMO THESE FEATURES",
  };

  return labels[actionType];
}
