import type { PricingPlan } from "@/types"

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Plan",
    price: "Starting from $10",
    bestFor: "Short edits and simple social videos",
    features: [
      "1 short video edit",
      "Basic cuts and pacing",
      "Basic captions",
      "Basic color correction",
      "1 revision",
      "Export for one platform",
    ],
    cta: "Book a Call",
  },
  {
    id: "creator",
    name: "Creator Plan",
    price: "Starting from $50",
    badge: "Popular",
    bestFor: "YouTubers and creators posting regularly",
    features: [
      "1 long-form YouTube video or 3 short videos",
      "Clean cuts and storytelling",
      "Captions and motion emphasis",
      "Audio sync and cleanup",
      "Thumbnail support",
      "2 revisions",
    ],
    cta: "Book a Call",
    popular: true,
  },
  {
    id: "pro",
    name: "Pro Content Plan",
    price: "Starting from $150",
    bestFor: "Brands, educators, podcasters, and content batches",
    features: [
      "Long-form video editing",
      "Multiple short clips",
      "Branded captions",
      "Graphics and thumbnail design",
      "Content repurposing",
      "Priority delivery",
      "3 revisions",
    ],
    cta: "Book a Call",
  },
  {
    id: "custom",
    name: "Custom Monthly Plan",
    price: "Custom",
    bestFor:
      "Creators, educators, and businesses that need ongoing editing and content support.",
    features: [
      "Weekly or monthly editing",
      "YouTube + Shorts + Reels",
      "Thumbnails and graphics",
      "Podcast clips",
      "Ad content",
      "Flexible delivery schedule",
    ],
    cta: "Discuss Custom Plan",
  },
]

export const addons = [
  "Extra revisions",
  "Thumbnail design",
  "Urgent delivery",
  "Extra short clips",
  "Subtitles/captions",
  "Social media graphics",
  "Raw footage cleanup",
  "Source file delivery",
]
