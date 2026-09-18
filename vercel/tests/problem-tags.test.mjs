import assert from "node:assert/strict";
import test from "node:test";
import { getProblemTag } from "../lib/problem-tags.mjs";

test("question tags match all explicit assignments in document (5)", () => {
  const expected = {
    SEO: ["ecom-organic-traffic-drop", "ecom-core-web-vitals"],
    Performance: ["ecom-bounce-pdp", "ecom-peer-load-times", "ecom-image-wait-time", "b2c-landing-bounce", "b2c-first-fold-video"],
    "Video for Ecomm": ["ecom-video-hero"],
    "Tech Time": ["ecom-catalog-resize", "ecom-seasonal-effort"],
    "Cloud Spend": ["ecom-cloud-cdn-spend"],
    "Video Piracy": ["edtech-course-piracy", "edtech-telegram-sharing"],
    "Video Performance": ["edtech-mobile-playback", "edtech-drm-load"],
    "Cloud Cost": ["edtech-cloud-costs", "edtech-video-pipeline-services"],
    "Cloud Costs": ["b2c-cloud-spend-profit", "b2c-cloud-spend-priority", "b2c-cdn-consumption"],
  };
  for (const [tag, ids] of Object.entries(expected)) {
    for (const id of ids) assert.equal(getProblemTag(id), tag, id);
  }
  for (const id of ["b2c-peak-loading", "b2c-peak-cdn-performance", "new-question", "toString", "__proto__"]) {
    assert.equal(getProblemTag(id), undefined);
  }
});

test("optional Sheet tags override defaults and blank tags retain document assignments", () => {
  assert.equal(getProblemTag("ecom-bounce-pdp", "  seo  "), "SEO");
  assert.equal(getProblemTag("new-question", "Video Performance"), "Video Performance");
  for (const tag of ["", "  ", null, 42, "unsupported", "<script>"]) {
    assert.equal(getProblemTag("ecom-bounce-pdp", tag), "Performance");
  }
  assert.equal(getProblemTag("new-question", "unsupported"), undefined);
});
