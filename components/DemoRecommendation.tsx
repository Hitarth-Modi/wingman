import type { FeatureRecommendation } from "@/types/conversation";

type DemoRecommendationProps = {
  features: FeatureRecommendation[];
};

export function DemoRecommendation({ features }: DemoRecommendationProps) {
  if (features.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 rounded-lg border border-[#d5ecee] bg-[#f6fbfc] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#136c72]">
        Recommended demo
      </p>
      <div className="mt-4 grid gap-3">
        {features.map((feature, index) => (
          <div
            key={feature.name}
            className="grid grid-cols-[36px_1fr] gap-3 rounded-md border border-[#dceff0] bg-white p-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#e8f6f7] text-sm font-semibold text-[#136c72]">
              {index + 1}
            </span>
            <div>
              <h3 className="text-base font-semibold text-[#1d3032]">{feature.name}</h3>
              <p className="mt-1 text-sm leading-5 text-[#557174]">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
