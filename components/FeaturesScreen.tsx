type FeaturesScreenProps = {
  features: string[];
  onStartOver: () => void;
};

export function FeaturesScreen({ features, onStartOver }: FeaturesScreenProps) {
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

      <ul className="list-disc space-y-2 pl-7 text-2xl font-semibold leading-tight sm:text-3xl">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

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
