import type { ProblemTag } from "@/types/playbook";

const tagTones: Record<ProblemTag, string> = {
  SEO: "seo",
  Performance: "performance",
  "Video for Ecomm": "video",
  "Tech Time": "time",
  "Cloud Spend": "cloud",
  "Video Piracy": "video",
  "Video Performance": "performance",
  "Cloud Cost": "cloud",
  "Cloud Costs": "cloud",
};

export function ContentTag({ tag }: { tag?: ProblemTag }) {
  if (!tag) return null;
  return <> <span className="content-tag" data-tone={tagTones[tag]}>{tag}</span></>;
}
