import "server-only";
import type {
  DemoFeature,
  DemoFeatureBucket,
  DemoFeatureInput,
  IndustryKey,
  IndustryPlaybook,
  PlaybookContent,
  ProblemQuestion,
} from "@/types/playbook";

export const industryLabels: Record<IndustryKey, string> = {
  ecommerce: "E-commerce",
  edtech: "EdTech",
  b2c: "B2C / Consumer Apps",
};

const demoFeature = (label: string, bucket?: DemoFeatureBucket): DemoFeatureInput => ({
  label,
  bucket,
});

const dashboardFeature = (label: string) => demoFeature(label, "dashboard");
const reportFeature = (label: string) => demoFeature(label, "report");
const mentionFeature = (label: string) => demoFeature(label, "mention");

const ecommerceTrafficBenefits = [
  "Gumlet improves your Web Vitals to at least above 80.",
  "Your TTFB, LCP, and FCP are improved with instant-loading images and faster page loads.",
];

const ecommerceTrafficFeatures = [
  reportFeature("Best image compression in the industry"),
  reportFeature("Auto-resize for mobile"),
  mentionFeature("Serving images in modern formats like AVIF"),
];

const ecommerceVideoBenefits = [
  "Gumlet videos have an instant start time.",
  "Gumlet's player loads videos quickly to ensure a premium shopping experience.",
];

const ecommerceVideoFeatures = [
  mentionFeature("We've spent years of R&D to ensure the fastest video load times in the industry"),
  dashboardFeature("Video CTAs & lead-gen forms to drive conversions"),
  dashboardFeature("Customizable, lightweight video player"),
];

const ecommerceLoadTimeBenefits = [
  "Gumlet ensures images load superfast.",
  "Since images usually take up to 70% of page-load data, faster media leads to practically zero waiting time for shoppers on PDPs.",
];

const ecommerceCatalogBenefits = [
  "Gumlet automates image processing and compression.",
  "Automatic optimization and resizing happen based on the devices used to view your images.",
  "Gumlet offers AI tools to help images meet catalog guidelines without manual edits.",
];

const ecommerceCatalogFeatures = [
  reportFeature("Auto-resize images for any device, high compression, auto format conversion"),
  reportFeature("AI background removal, face crop, smart crop"),
];

const ecommerceCostBenefits = [
  "Gumlet reduces image and video file sizes by an average of 40%, cutting bandwidth usage.",
  "Five different services and APIs are streamlined into one platform that costs at least 30% less than the others.",
];

const edtechPiracyBenefits = [
  "Easiest to implement multi-DRM.",
  "Gumlet caps resolution for devices with low security so high-resolution videos are not screen-recorded while learners retain access.",
  "In addition to DRM, Gumlet has other features that strengthen content security.",
];

const edtechPiracyFeatures = [
  dashboardFeature("Multi-DRM with Widevine and FairPlay protection"),
  dashboardFeature("Dynamic watermarking"),
  dashboardFeature("Geo-blocking"),
  dashboardFeature("Signed URLs"),
  dashboardFeature("Allowed referrers"),
  dashboardFeature("Password protection"),
];

const edtechPlaybackBenefits = [
  "Buffer-free streaming across all devices and network types.",
  "Barely noticeable load time on DRM-protected videos.",
];

const edtechPlaybackFeatures = [
  reportFeature("Best media compression in the world"),
  reportFeature("Fast video load times even with DRM"),
  mentionFeature("AWS CloudFront CDN for worldwide media delivery"),
];

const edtechCostBenefits = [
  "At least 40% reduction in bandwidth usage.",
  "Free transcoding helps reduce expenses there.",
  "After Gumlet, you do not need engineering effort on the video pipeline.",
];

const edtechStackBenefits = [
  "Five different services and APIs are streamlined into one platform that costs at least 30% less than the others.",
  "No need to configure every optimization manually because the best optimizations are built in.",
];

const b2cCostBenefits = [
  "Gumlet reduces image and video sizes by 30% without affecting quality.",
];

const b2cCostFeatures = [
  reportFeature("Best media compression in the world"),
  reportFeature("Smallest file sizes without affecting visual quality"),
  dashboardFeature("Automatic format conversion"),
  dashboardFeature("Compression levels based on the user's network speed"),
];

const b2cVideoBenefits = [
  "Gumlet videos have an instant start time.",
  "Gumlet's player loads videos quickly.",
];

const b2cPeakBenefits = [
  "Helps deliver seven 9s uptime SLA (99.99999%) even during traffic spikes.",
  "Gumlet media loads 40% faster.",
];

export const problemPlaybooks: PlaybookContent = {
  ecommerce: {
    situation:
      "A lot of e-commerce sites compete for the same buyers' attention and need to win traffic, conversion, and retention.",
    challenges: [
      "Getting traffic is hard",
      "Ad spend is too costly",
      "Converting incoming traffic is a constant battle",
      "Retaining buyers matters so repeat purchases come directly to the brand",
    ],
    problems: [
      {
        id: "ecom-organic-traffic-drop",
        industry: "ecommerce",
        question: "Are you seeing a drop in organic traffic on your PDPs?",
        solution:
          "For Snapdeal, Gumlet increased traffic by 60% to 100 million organic visitors a month.",
        benefits: ecommerceTrafficBenefits,
        features: ecommerceTrafficFeatures,
      },
      {
        id: "ecom-core-web-vitals",
        industry: "ecommerce",
        question: "Is your marketing team complaining about Core Web Vitals?",
        solution:
          "For Snapdeal, Gumlet increased traffic by 60% to 100 million organic visitors a month.",
        benefits: ecommerceTrafficBenefits,
        features: ecommerceTrafficFeatures,
      },
      {
        id: "ecom-bounce-pdp",
        industry: "ecommerce",
        question: "Do you feel bounce rates are high on your PDPs?",
        solution:
          "Gumlet can help you hook users with videos in the product hero, retaining their attention and reducing bounce rates. Gumlet also increased add-to-carts for Snapdeal by 15%.",
        benefits: ecommerceVideoBenefits,
        features: ecommerceVideoFeatures,
      },
      {
        id: "ecom-video-hero",
        industry: "ecommerce",
        question: "Have you tried putting video as product hero?",
        solution:
          "Gumlet can help you hook users with videos in the product hero, retaining their attention and reducing bounce rates. Gumlet also increased add-to-carts for Snapdeal by 15%.",
        benefits: ecommerceVideoBenefits,
        features: ecommerceVideoFeatures,
      },
      {
        id: "ecom-peer-load-times",
        industry: "ecommerce",
        question: "Do you think you rank first when it comes to load times compared to your peers?",
        solution:
          "Gumlet helped Tata 1mg improve page load speed by loading dozens of images in less than 100ms.",
        benefits: ecommerceLoadTimeBenefits,
        features: [
          reportFeature(
            "Gumlet has the best media compression in the world, ensuring at least 40% less media weight",
          ),
        ],
      },
      {
        id: "ecom-image-wait-time",
        industry: "ecommerce",
        question: "How long do shoppers wait for your product images to load?",
        solution:
          "Gumlet helped Tata 1mg improve page load speed by loading dozens of images in less than 100ms.",
        benefits: ecommerceLoadTimeBenefits,
        features: [
          reportFeature(
            "Gumlet has the best media compression in the world, ensuring at least 40% less media weight",
          ),
        ],
      },
      {
        id: "ecom-catalog-resize",
        industry: "ecommerce",
        question: "Do your catalog teams need to resize images before uploading them into the platform?",
        solution:
          "Gumlet delivers an excellent shopping experience on any device or network, regardless of the size of the original image.",
        benefits: ecommerceCatalogBenefits,
        features: ecommerceCatalogFeatures,
      },
      {
        id: "ecom-seasonal-effort",
        industry: "ecommerce",
        question: "How much does the required effort increase during sales and new-launch seasons?",
        solution:
          "Gumlet delivers an excellent shopping experience on any device or network, regardless of the size of the original image.",
        benefits: ecommerceCatalogBenefits,
        features: ecommerceCatalogFeatures,
      },
      {
        id: "ecom-cloud-cdn-spend",
        industry: "ecommerce",
        question: "How much do you spend on cloud services and CDN usage?",
        solution:
          "Gumlet eliminates the need for 5+ cloud services. Tata 1mg reduced cloud costs by 56% by implementing Gumlet.",
        benefits: ecommerceCostBenefits,
        features: [
          reportFeature("Gumlet has the best media compression in the world"),
          mentionFeature("Predictable and simple pricing"),
          mentionFeature("End-to-end solution"),
        ],
        note: "Only for large e-commerce prospects.",
      },
    ],
  },
  edtech: {
    situation:
      "EdTech platforms often want to grow subscribers, improve profitability, and protect paid course content.",
    challenges: [
      "Get more subscribers",
      "Improve profitability",
      "Prevent content piracy",
    ],
    problems: [
      {
        id: "edtech-course-piracy",
        industry: "edtech",
        question: "Are your courses being pirated? Has that been a recurring problem?",
        solution: "Prevent downloads, stop screen recording, and reduce password sharing.",
        benefits: edtechPiracyBenefits,
        features: edtechPiracyFeatures,
      },
      {
        id: "edtech-telegram-sharing",
        industry: "edtech",
        question: "Have you noticed your paid lessons being shared on other platforms, such as Telegram?",
        solution: "Prevent downloads, stop screen recording, and reduce password sharing.",
        benefits: edtechPiracyBenefits,
        features: edtechPiracyFeatures,
      },
      {
        id: "edtech-mobile-playback",
        industry: "edtech",
        question: "Are mobile users complaining about poor video loading or playback?",
        solution:
          "Gumlet improved video load times for Career Launcher even after implementing DRM.",
        benefits: edtechPlaybackBenefits,
        features: edtechPlaybackFeatures,
      },
      {
        id: "edtech-drm-load",
        industry: "edtech",
        question: "Do your DRM-protected videos tend to load more slowly than others?",
        solution:
          "Gumlet improved video load times for Career Launcher even after implementing DRM.",
        benefits: edtechPlaybackBenefits,
        features: edtechPlaybackFeatures,
      },
      {
        id: "edtech-cloud-costs",
        industry: "edtech",
        question: "Is your organization looking to reduce cloud costs?",
        solution:
          "Gumlet significantly reduces CDN and cloud costs by more than 30%, as seen for EdTech clients such as Career Launcher.",
        benefits: edtechCostBenefits,
        features: [
          reportFeature("Best media compression in the world"),
          mentionFeature("Predictable and scale-friendly pricing"),
          mentionFeature("GPU-based video transcoding for faster processing and lower costs"),
        ],
      },
      {
        id: "edtech-video-pipeline-services",
        industry: "edtech",
        question: "How many cloud services are you paying for in your video pipeline?",
        solution:
          "Gumlet streamlines your tech stack, giving you a single line item and platform for your team to work with.",
        benefits: edtechStackBenefits,
        features: [
          mentionFeature("End-to-end solution for storage, security, and hosting"),
          mentionFeature("Media infrastructure replacement with minimal friction"),
        ],
        note: "Best for large EdTech prospects.",
      },
    ],
  },
  b2c: {
    situation:
      "Consumer apps need to convert new visitors, make the most revenue during big promotions, improve profitability, and retain users.",
    challenges: [
      "Convert more new visitors into users",
      "Make the most revenue during big promotions",
      "Improve profitability",
      "Retain users so they return directly instead of searching elsewhere",
    ],
    problems: [
      {
        id: "b2c-cloud-spend-profit",
        industry: "b2c",
        question: "Do you feel the cloud spend is hurting profits?",
        solution: "Gumlet has cut cloud spend at scale for Spinny by 62%.",
        benefits: b2cCostBenefits,
        features: b2cCostFeatures,
      },
      {
        id: "b2c-cloud-spend-priority",
        industry: "b2c",
        question: "Is reducing cloud spend a priority?",
        solution: "Gumlet has cut cloud spend at scale for Spinny by 62%.",
        benefits: b2cCostBenefits,
        features: b2cCostFeatures,
      },
      {
        id: "b2c-cdn-consumption",
        industry: "b2c",
        question: "Has your CDN consumption increased in the past few quarters?",
        solution: "Gumlet has cut cloud spend at scale for Spinny by 62%.",
        benefits: b2cCostBenefits,
        features: b2cCostFeatures,
      },
      {
        id: "b2c-landing-bounce",
        industry: "b2c",
        question: "Do you feel bounce rates are high on your landing pages?",
        solution:
          "Gumlet will help you hook users with videos in the first fold, retaining their attention and reducing bounce rates. Gumlet also increased add-to-carts for Snapdeal by 15%.",
        benefits: b2cVideoBenefits,
        features: [reportFeature("Fast video load times backed by years of R&D")],
      },
      {
        id: "b2c-first-fold-video",
        industry: "b2c",
        question: "Have you tried putting videos on the first fold on your landing pages to increase engagement?",
        solution:
          "Gumlet will help you hook users with videos in the first fold, retaining their attention and reducing bounce rates. Gumlet also increased add-to-carts for Snapdeal by 15%.",
        benefits: b2cVideoBenefits,
        features: [reportFeature("Fast video load times backed by years of R&D")],
      },
      {
        id: "b2c-peak-loading",
        industry: "b2c",
        question: "Do your users complain about loading issues during peak sales?",
        solution:
          "Gumlet helps pages load faster and maintain performance reliability during sales and launches at high scale.",
        benefits: b2cPeakBenefits,
        features: [
          dashboardFeature("Multi-region failover"),
          dashboardFeature("Multi-CDN setup"),
          reportFeature("Compression"),
          reportFeature("Load-time optimization built from years of engineering work"),
        ],
      },
      {
        id: "b2c-peak-cdn-performance",
        industry: "b2c",
        question: "Do you face CDN performance issues during peak traffic times?",
        solution:
          "Gumlet helps pages load faster and maintain performance reliability during sales and launches at high scale.",
        benefits: b2cPeakBenefits,
        features: [
          dashboardFeature("Multi-region failover"),
          dashboardFeature("Multi-CDN setup"),
          reportFeature("Compression"),
          reportFeature("Load-time optimization built from years of engineering work"),
        ],
      },
    ],
  },
};

export function getPlaybookForIndustry(
  industry: IndustryKey | "",
  playbooks: PlaybookContent = problemPlaybooks,
) {
  return industry ? playbooks[industry] : null;
}

export function getProblemsForIndustry(
  industry: IndustryKey | "",
  playbooks: PlaybookContent = problemPlaybooks,
) {
  return getPlaybookForIndustry(industry, playbooks)?.problems ?? [];
}

export function getSelectedProblems(
  industry: IndustryKey | "",
  selectedProblemIds: string[],
  playbooks: PlaybookContent = problemPlaybooks,
) {
  const selected = new Set(selectedProblemIds);

  return getProblemsForIndustry(industry, playbooks).filter((problem) =>
    selected.has(problem.id),
  );
}

function normalizeFeature(feature: DemoFeatureInput): DemoFeature {
  if (typeof feature === "string") {
    return {
      label: feature,
      bucket: "mention",
    };
  }

  return {
    label: feature.label,
    bucket: feature.bucket ?? "mention",
  };
}

export function getUniqueFeatures(problems: ProblemQuestion[]) {
  const featureMap = new Map<string, DemoFeature>();

  problems.flatMap((problem) => problem.features).forEach((feature) => {
    const normalizedFeature = normalizeFeature(feature);
    const key = `${normalizedFeature.bucket}:${normalizedFeature.label}`;

    if (!featureMap.has(key)) {
      featureMap.set(key, normalizedFeature);
    }
  });

  return [...featureMap.values()];
}
