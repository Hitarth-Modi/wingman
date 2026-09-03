import type { IndustryKey, ProblemQuestion } from "@/types/playbook";

export const industryLabels: Record<IndustryKey, string> = {
  ecommerce: "E-commerce",
  edtech: "EdTech",
  b2c: "B2C / Consumer Apps",
};

export const problemPlaybooks: Record<IndustryKey, ProblemQuestion[]> = {
  ecommerce: [
    {
      id: "organic-traffic-drop",
      industry: "ecommerce",
      question: "Are you seeing a drop in organic traffic on your PDPs?",
      solution:
        "For Snapdeal, Gumlet increased traffic by 60% to 100 million organic visitors a month.",
      benefits: [
        "Gumlet improves your Web Vitals to at least above 80.",
        "Your TTFB, LCP, and FCP are improved with instant-loading images and faster page loads.",
      ],
      features: [
        "Best image compression in the industry",
        "Auto-resize for mobile",
        "Serving images in modern formats like AVIF",
      ],
    },
    {
      id: "core-web-vitals",
      industry: "ecommerce",
      question: "Is your marketing team complaining about Core Web Vitals?",
      solution:
        "Gumlet helps improve Core Web Vitals by optimizing images automatically and delivering the right format, size, and quality for every user.",
      benefits: [
        "Marketing teams get a stronger page-experience story without waiting on manual engineering work.",
        "Pages can become lighter and faster across product, listing, and campaign traffic.",
      ],
      features: [
        "Automatic image optimization",
        "Responsive image resizing",
        "Fast media delivery",
      ],
    },
    {
      id: "high-bounce-rates",
      industry: "ecommerce",
      question: "Do you feel bounce rates are high on your PDPs?",
      solution:
        "Gumlet reduces heavy media delivery on product pages so shoppers can see key product content faster.",
      benefits: [
        "Product pages feel quicker on mobile and slower networks.",
        "Teams can improve page experience without maintaining many manual image variants.",
      ],
      features: [
        "Device-based resizing",
        "Image compression",
        "Lazy-loading friendly media delivery",
      ],
    },
    {
      id: "product-video-hero",
      industry: "ecommerce",
      question: "Have you tried putting video as product hero?",
      solution:
        "Gumlet can help teams use product video without making PDPs heavy or hard to manage.",
      benefits: [
        "Teams can test richer product storytelling while keeping media performance under control.",
        "Video workflows can be handled with less manual processing and vendor switching.",
      ],
      features: [
        "Video optimization",
        "Adaptive video delivery",
        "Centralized media workflow",
      ],
    },
  ],
  edtech: [
    {
      id: "lecture-video-buffering",
      industry: "edtech",
      question: "Are learners complaining about lecture videos buffering or loading slowly?",
      solution:
        "Gumlet helps optimize and deliver course video so students get a smoother learning experience across devices and networks.",
      benefits: [
        "Fewer interruptions during high-intent learning sessions.",
        "Better experience for mobile learners and lower-bandwidth regions.",
      ],
      features: ["Adaptive video delivery", "Video optimization", "Fast media delivery"],
    },
    {
      id: "course-image-management",
      industry: "edtech",
      question: "Is your team manually resizing course thumbnails or learning assets?",
      solution:
        "Gumlet automates image transformations so teams can manage course media without repetitive manual work.",
      benefits: [
        "Content and product teams can publish faster.",
        "Engineering effort moves away from routine media resizing.",
      ],
      features: ["Automatic image optimization", "Responsive resizing", "Transformation rules"],
    },
    {
      id: "multi-device-learning",
      industry: "edtech",
      question: "Do your learning pages need to perform well across laptop, tablet, and mobile?",
      solution:
        "Gumlet serves media in the right size and format for the learner's device.",
      benefits: [
        "Course pages stay lighter across form factors.",
        "Learners get a more consistent experience when switching devices.",
      ],
      features: ["Device-based resizing", "Modern image formats", "Fast media delivery"],
    },
  ],
  b2c: [
    {
      id: "app-media-load-time",
      industry: "b2c",
      question: "Are image-heavy screens slowing down your app or website experience?",
      solution:
        "Gumlet optimizes media delivery so consumer journeys feel faster and lighter.",
      benefits: [
        "Users reach key screens with less waiting.",
        "Teams can reduce the effort spent tuning media for every surface.",
      ],
      features: ["Image compression", "Responsive resizing", "Modern image formats"],
    },
    {
      id: "campaign-landing-speed",
      industry: "b2c",
      question: "Do campaign landing pages slow down when they include rich media?",
      solution:
        "Gumlet helps keep promotional pages fast by serving optimized visual assets automatically.",
      benefits: [
        "Campaign pages can stay visually rich without becoming heavy.",
        "Growth teams get faster experiments with fewer media handoffs.",
      ],
      features: ["Automatic optimization", "Fast delivery", "Transformation presets"],
    },
    {
      id: "media-ops-growth",
      industry: "b2c",
      question: "Is your media catalog growing faster than your team can manage?",
      solution:
        "Gumlet centralizes common media operations so teams do not need scattered scripts and tools.",
      benefits: [
        "Less operational drag as asset volume grows.",
        "More consistent media behavior across user journeys.",
      ],
      features: ["Centralized media workflow", "Transformation rules", "Delivery optimization"],
    },
  ],
};

export function getProblemsForIndustry(industry: IndustryKey | "") {
  return industry ? problemPlaybooks[industry] : [];
}

export function getSelectedProblems(industry: IndustryKey | "", selectedProblemIds: string[]) {
  const selected = new Set(selectedProblemIds);

  return getProblemsForIndustry(industry).filter((problem) => selected.has(problem.id));
}

export function getUniqueFeatures(problems: ProblemQuestion[]) {
  return [...new Set(problems.flatMap((problem) => problem.features))];
}
