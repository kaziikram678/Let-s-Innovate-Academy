import type { Service } from "@/types"

export const services: Service[] = [
  {
    id: "youtube-editing",
    title: "YouTube Video Editing",
    description:
      "Long-form YouTube edits with clean cuts, pacing, storytelling, audio sync, color correction, and viewer-friendly structure.",
    icon: "play",
    deliverables: [
      "Long videos",
      "Talking head edits",
      "Educational videos",
      "Screen recordings",
      "B-roll integration",
    ],
    tags: ["YouTube", "Long-form", "Storytelling"],
  },
  {
    id: "shorts-reels",
    title: "Shorts/Reels/TikTok Editing",
    description:
      "Fast-paced vertical edits with captions, hooks, zooms, sound effects, and scroll-stopping pacing.",
    icon: "smartphone",
    deliverables: [
      "YouTube Shorts",
      "Instagram Reels",
      "Facebook Reels",
      "TikTok clips",
      "Repurposed clips",
    ],
    tags: ["Short-form", "Vertical", "Captions"],
  },
  {
    id: "social-media",
    title: "Social Media Content",
    description:
      "Platform-ready content for Facebook, Instagram, TikTok, and LinkedIn with clear messaging and visual consistency.",
    icon: "share",
    deliverables: [
      "Social posts",
      "Video clips",
      "Promo videos",
      "Content repurposing",
    ],
    tags: ["Social", "Multi-platform", "Promo"],
  },
  {
    id: "podcast",
    title: "Podcast Editing",
    description:
      "Clean podcast edits with audio cleanup, cuts, captions, short clips, and ready-to-upload exports.",
    icon: "mic",
    deliverables: [
      "Full podcast episodes",
      "Podcast shorts",
      "Audiogram clips",
      "Captions",
    ],
    tags: ["Podcast", "Audio", "Clips"],
  },
  {
    id: "ad-content",
    title: "Ad Content",
    description:
      "Short promotional videos for products, services, clothing, events, and campaigns.",
    icon: "megaphone",
    deliverables: [
      "Product ads",
      "Brand ads",
      "Event promos",
      "Service promos",
    ],
    tags: ["Ads", "Promo", "Campaign"],
  },
  {
    id: "event-video",
    title: "Event Video Editing",
    description:
      "Emotional and clean edits for weddings, birthdays, anniversaries, and special moments.",
    icon: "camera",
    deliverables: [
      "Wedding videos",
      "Birthday videos",
      "Anniversary videos",
      "Highlight reels",
    ],
    tags: ["Events", "Emotional", "Highlights"],
  },
  {
    id: "graphics",
    title: "Graphics Design",
    description:
      "Clean visual designs for thumbnails, social posts, banners, and content branding.",
    icon: "palette",
    deliverables: [
      "YouTube thumbnails",
      "Channel banners",
      "Social media graphics",
      "Posters",
    ],
    tags: ["Design", "Thumbnails", "Branding"],
  },
  {
    id: "repurposing",
    title: "Content Repurposing",
    description:
      "One long video can become multiple short clips, quote posts, teasers, and platform-ready assets.",
    icon: "repeat",
    deliverables: [
      "Shorts",
      "Reels",
      "Clips",
      "Quote cards",
      "Teasers",
    ],
    tags: ["Repurpose", "Multi-format", "Efficient"],
  },
]
