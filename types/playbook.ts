export type IndustryKey = "ecommerce" | "edtech" | "b2c";

export type PilotStep = "setup" | "problems" | "benefits" | "features";

export type DemoFeatureBucket = "dashboard" | "report" | "mention";

export type DemoFeatureInput =
  | string
  | {
      label: string;
      bucket?: DemoFeatureBucket;
    };

export type DemoFeature = {
  label: string;
  bucket: DemoFeatureBucket;
};

export type ProblemQuestion = {
  id: string;
  industry: IndustryKey;
  question: string;
  solution: string;
  benefits: string[];
  features: DemoFeatureInput[];
  note?: string;
};

export type IndustryPlaybook = {
  situation: string;
  challenges: string[];
  problems: ProblemQuestion[];
};

export type PilotState = {
  industry: IndustryKey | "";
  selectedProblemIds: string[];
  step: PilotStep;
};
