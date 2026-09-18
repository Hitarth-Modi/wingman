// Document (5) assignments use stable IDs so Sheet wording can change safely.
/** @type {Readonly<Record<string, import("../types/playbook").ProblemTag>>} */
const documentTags = {
  "ecom-organic-traffic-drop": "SEO",
  "ecom-core-web-vitals": "SEO",
  "ecom-bounce-pdp": "Performance",
  "ecom-video-hero": "Video for Ecomm",
  "ecom-peer-load-times": "Performance",
  "ecom-image-wait-time": "Performance",
  "ecom-catalog-resize": "Tech Time",
  "ecom-seasonal-effort": "Tech Time",
  "ecom-cloud-cdn-spend": "Cloud Spend",
  "edtech-course-piracy": "Video Piracy",
  "edtech-telegram-sharing": "Video Piracy",
  "edtech-mobile-playback": "Video Performance",
  "edtech-drm-load": "Video Performance",
  "edtech-cloud-costs": "Cloud Cost",
  "edtech-video-pipeline-services": "Cloud Cost",
  "b2c-cloud-spend-profit": "Cloud Costs",
  "b2c-cloud-spend-priority": "Cloud Costs",
  "b2c-cdn-consumption": "Cloud Costs",
  "b2c-landing-bounce": "Performance",
  "b2c-first-fold-video": "Performance",
};

const supportedTags = [...new Set(Object.values(documentTags))];

/**
 * @param {string} problemId
 * @param {unknown} [sheetTag]
 * @returns {import("../types/playbook").ProblemTag | undefined}
 */
export function getProblemTag(problemId, sheetTag) {
  const label = typeof sheetTag === "string" ? sheetTag.trim().toLowerCase() : "";
  return supportedTags.find((tag) => tag.toLowerCase() === label) ??
    (Object.hasOwn(documentTags, problemId) ? documentTags[problemId] : undefined);
}
