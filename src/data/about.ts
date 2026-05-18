import type { TimelineItem } from "@/types"

export const timeline: TimelineItem[] = [
  {
    year: "2020",
    title: "Started Creating Content",
    description:
      "Began exploring video editing and content creation, learning the fundamentals of storytelling through visual media.",
  },
  {
    year: "2021",
    title: "Built Compilation Error by Ikram",
    description:
      "Launched a YouTube channel focused on helping Bangladeshi students understand computer science and tech topics in a simple, practical way.",
  },
  {
    year: "2022",
    title: "Expanded into Video Editing & Graphics",
    description:
      "Started offering professional video editing and graphics design services to creators, brands, and educators.",
  },
  {
    year: "2023",
    title: "Helping Creators and Brands",
    description:
      "Now working with a growing list of clients, helping them turn raw footage into polished, engaging content across multiple platforms.",
  },
  {
    year: "Feb 2026",
    title: "Video Editing Trainer at Bangladesh Computer Council",
    description:
      "Completed a training journey with batch (PCGDM-03)-BCC-CTG, teaching creative storytelling, editing techniques, and practical skills to help learners advance in the digital media industry.",
  },
]

export const skills = [
  "Adobe Premiere Pro",
  "After Effects",
  "CapCut",
  "DaVinci Resolve",
  "Photoshop",
  "Illustrator",
  "Canva",
  "YouTube Content Strategy",
  "Thumbnail Design",
  "Motion Graphics",
  "Color Correction",
  "Audio Sync",
  "Short-form Editing",
  "Long-form Editing",
  "Podcast Editing",
]

export interface Certificate {
  title: string
  issuer: string
  date: string
  image?: string
}

export const certificates: Certificate[] = [
  {
    title: "Video Editing MasterCourse: Beginner to Advanced",
    issuer: "MasterCourse",
    date: "Jun 2023",
    image: "/images/certificate.jpg",
  },
]
