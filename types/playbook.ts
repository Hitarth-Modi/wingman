export type IndustryKey = "ecommerce" | "edtech" | "b2c";

export type PilotStep = "setup" | "problems" | "benefits" | "features";

export type ProblemQuestion = {
  id: string;
  industry: IndustryKey;
  question: string;
  solution: string;
  benefits: string[];
  features: string[];
};

export type PilotState = {
  industry: IndustryKey | "";
  selectedProblemIds: string[];
  step: PilotStep;
};
