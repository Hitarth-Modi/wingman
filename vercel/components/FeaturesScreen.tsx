import { FileChartColumn, LayoutDashboard, MessageCircle, Monitor, RotateCcw } from "lucide-react";
import type { DemoFeature } from "@/types/playbook";

type FeaturesScreenProps = { features: DemoFeature[]; onStartOver: () => void };

const featureBuckets = [
  { id: "dashboard", title: "Show in dashboard", icon: LayoutDashboard },
  { id: "report", title: "Show analyzer report or image-optimization report", icon: FileChartColumn },
  { id: "mention", title: "Mention", icon: MessageCircle },
] as const;

export function FeaturesScreen({ features, onStartOver }: FeaturesScreenProps) {
  const visibleBuckets = featureBuckets.map((bucket) => ({
    ...bucket, features: features.filter((feature) => feature.bucket === bucket.id),
  })).filter((bucket) => bucket.features.length > 0);

  return (
    <section className="screen">
      <div className="screen-heading">
        <div>
          <p className="eyebrow"><Monitor size={15} aria-hidden="true" />Demo</p>
          <h2 className="screen-title">Features to Demo</h2>
        </div>
        <span className="selection-count">{features.length} feature{features.length === 1 ? "" : "s"}</span>
      </div>
      <div className="demo-buckets">
        {visibleBuckets.map((bucket) => {
          const Icon = bucket.icon;
          return (
            <section key={bucket.id} className="demo-bucket" data-bucket={bucket.id}>
              <div className="bucket-heading">
                <span className="bucket-icon"><Icon size={18} aria-hidden="true" /></span>
                <h3>{bucket.title}</h3>
              </div>
              <ul className="bucket-points">
                {bucket.features.map((feature, index) => (
                  <li key={`${bucket.id}-${feature.label}`}>
                    <span className="feature-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <span>{feature.label}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      <div className="action-bar">
        <span className="action-status"><Monitor size={16} aria-hidden="true" />Demo checklist</span>
        <button className="secondary-button" onClick={onStartOver} type="button">
          <RotateCcw size={16} aria-hidden="true" />Start New Call
        </button>
      </div>
    </section>
  );
}
