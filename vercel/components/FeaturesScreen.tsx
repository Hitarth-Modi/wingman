import type { DemoFeature } from "@/types/playbook";

type FeaturesScreenProps = {
  features: DemoFeature[];
  onStartOver: () => void;
};

const featureBuckets: {
  id: DemoFeature["bucket"];
  title: string;
}[] = [
  {
    id: "dashboard",
    title: "Show in dashboard",
  },
  {
    id: "report",
    title: "Show analyzer report or image-optimization report",
  },
  {
    id: "mention",
    title: "Mention",
  },
];

export function FeaturesScreen({ features, onStartOver }: FeaturesScreenProps) {
  const visibleBuckets = featureBuckets
    .map((bucket) => ({
      ...bucket,
      features: features.filter((feature) => feature.bucket === bucket.id),
    }))
    .filter((bucket) => bucket.features.length > 0);

  return (
    <section className="grid min-h-[calc(100vh-7rem)] content-start gap-10 bg-white px-2 py-6 sm:px-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8a4fff]">
          Demo
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-normal sm:text-4xl">
          Features to Demo
        </h2>
      </div>

      <div className="grid gap-8">
        {visibleBuckets.map((bucket) => (
          <section key={bucket.id} className="border-l-4 border-[#8a4fff] pl-5">
            <h3 className="text-lg font-semibold uppercase tracking-[0.14em] text-[#8a4fff]">
              {bucket.title}
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-7 text-2xl font-semibold leading-tight sm:text-3xl">
              {bucket.features.map((feature) => (
                <li key={`${bucket.id}-${feature.label}`}>{feature.label}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div>
        <button
          className="h-12 rounded-md border border-[#d8c8b3] bg-white px-6 text-sm font-semibold uppercase tracking-[0.14em] text-[#2b2d28] transition hover:bg-[#f8f1e6] focus:outline-none focus:ring-4 focus:ring-[#8a4fff]/20"
          onClick={onStartOver}
          type="button"
        >
          Start New Call
        </button>
      </div>
    </section>
  );
}
