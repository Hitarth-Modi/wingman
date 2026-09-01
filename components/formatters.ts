import type { Industry } from "@/types/conversation";

export function formatIndustry(industry: Industry | "") {
  const labels: Record<Industry, string> = {
    ecommerce: "E-commerce",
    edtech: "EdTech",
    consumer_apps: "B2C / Consumer Apps",
  };

  return industry ? labels[industry] : "Industry";
}
