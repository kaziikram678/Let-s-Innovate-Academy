import type { Instructor } from "@/types"

export const instructors: Instructor[] = [
  {
    slug: "md-ikram",
    name: "Md Ikram",
    role: "Video Editor, Graphics Designer & Content Creator",
    bio: "Md Ikram is a professional video editor and content creator with years of experience in YouTube editing, ads, short-form content, and event videos. He runs the YouTube channel 'Compilation Error by Ikram' and has helped numerous creators and brands produce high-quality video content.",
    image: "/images/profile_pic.jpg",
    specialties: ["Premiere Pro", "After Effects", "Motion Graphics", "YouTube Editing"],
    socialLinks: {
      youtube: "https://youtube.com/@compilererror123?si=pS7mgoITesc3ODPW",
      linkedin: "https://www.linkedin.com/in/md-ikram-ab515618b/",
    },
    stats: {
      studentsTaught: 500,
      coursesCreated: 3,
      yearsExperience: 4,
      rating: 4.8,
    },
  },
]

export function getInstructorBySlug(slug: string): Instructor | undefined {
  return instructors.find((instructor) => instructor.slug === slug)
}
