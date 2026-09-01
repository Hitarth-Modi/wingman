export type Industry = "ecommerce" | "edtech" | "consumer_apps";

export type CallStage = "intro" | "discovery" | "explore" | "pitch" | "demo";

export type ActionType =
  | "say"
  | "ask"
  | "follow_up"
  | "position"
  | "proof"
  | "transition"
  | "demo";

export type ResponseType =
  | "binary"
  | "single_select"
  | "multi_select"
  | "scale"
  | "acknowledgement";

export type PainStatus = "confirmed" | "possible" | "rejected";

export type FeatureRecommendation = {
  name: string;
  description: string;
};

export type ResponseOption = {
  id: string;
  label: string;
  nextNodeId?: string;
  value?: string;
  painCategory?: string;
  painStatus?: PainStatus;
  discussedArea?: string;
  suggestedFeatures?: FeatureRecommendation[];
  isOther?: boolean;
};

export type ConversationNode = {
  id: string;
  industry: Industry;
  stage: CallStage;
  actionType: ActionType;
  text: string;
  supportingLines?: string[];
  internalGoal?: string;
  responseType: ResponseType;
  options?: ResponseOption[];
  nextNodeId?: string;
  metadata?: {
    painCategory?: string;
    clientProof?: string[];
    features?: FeatureRecommendation[];
    discussedAreas?: string[];
  };
};

export type Prospect = {
  name: string;
  company: string;
  industry: Industry | "";
  jobTitle: string;
  companySize: string;
};

export type AnswerRecord = {
  nodeId: string;
  nodeLabel: string;
  nodeText: string;
  stage: CallStage;
  responseType: ResponseType;
  optionIds: string[];
  label: string;
  rawResponse?: string;
  timestamp: string;
};

export type CallState = {
  prospect: Prospect;
  currentNodeId: string;
  currentStage: CallStage;
  answers: AnswerRecord[];
  confirmedPains: string[];
  rejectedPains: string[];
  possiblePains: string[];
  completedNodes: string[];
  discussedAreas: string[];
  suggestedFeatures: FeatureRecommendation[];
  isComplete: boolean;
};

export type ResponseSubmission = {
  optionIds: string[];
  rawResponse?: string;
};
