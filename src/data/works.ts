import type { WorkItem } from "@/types"

export const works: WorkItem[] = [
  {
    id: "sas-product-demo",
    title: "SAS Product Demo",
    category: "Product Demo",
    description:
      "Clean product demonstration video showcasing features and benefits.",
    media: "/videos/work-5.mp4",
    mediaType: "video",
  },
  {
    id: "compilation-error",
    title: "Compilation Error by Ikram",
    category: "YouTube Content",
    description:
      "Educational videos focused on computer science and tech topics for Bangladeshi learners.",
    media: "/images/youtube-studio.jpg",
    mediaType: "image",
    link: "https://youtube.com/@compilererror123?si=pS7mgoITesc3ODPW",
    linkLabel: "Visit Channel",
  },
  {
    id: "talking-head",
    title: "Talking Head Video Edit",
    category: "YouTube Content",
    description:
      "Clean talking-head edit with pacing, captions, b-roll, and visual polish.",
    media: "/videos/work-1.mp4",
    mediaType: "video",
  },
  {
    id: "shorts-reels",
    title: "Shorts/Reels Edit",
    category: "Shorts/Reels",
    description:
      "Vertical short-form edit with hook, captions, zooms, and engaging pacing.",
    media: "/videos/work-2.mp4",
    mediaType: "video",
    aspectRatio: "9:16",
  },
  {
    id: "product-ad",
    title: "Product or Clothing Ad",
    category: "Ads",
    description:
      "Short promotional ad designed for social platforms.",
    media: "/videos/work-3.mp4",
    mediaType: "video",
  },
  {
    id: "thumbnail-graphics",
    title: "Thumbnail & Graphics Design",
    category: "Graphics",
    description:
      "YouTube thumbnail and social design concepts for content branding.",
    media: "/images/graphics-preview.jpg",
    mediaType: "image",
  },
  {
    id: "event-highlight",
    title: "Event Highlight Video",
    category: "Event Videos",
    description:
      "Emotional event highlight edit for weddings, birthdays, and special moments.",
    media: "/images/event-preview.jpg",
    mediaType: "image",
  },
  {
    id: "food-ad",
    title: "Food Ad",
    category: "Ads",
    description:
      "Appetizing food advertisement edit designed for social media platforms.",
    media: "/videos/work-4.mp4",
    mediaType: "video",
  },
  {
    id: "story-telling",
    title: "Story Telling Video",
    category: "YouTube Content",
    description:
      "Engaging narrative-driven video edit with emotional pacing and visuals.",
    media: "/videos/work-6.mp4",
    mediaType: "video",
  },
  {
    id: "educational-content",
    title: "Educational Content",
    category: "YouTube Content",
    description:
      "Informative video edit with clear explanations, graphics, and captions.",
    media: "/videos/work-7.mp4",
    mediaType: "video",
  },
]

export const workCategories = [
  "All",
  "YouTube Content",
  "Shorts/Reels",
  "Ads",
  "Graphics",
  "Event Videos",
  "Product Demo",
]
