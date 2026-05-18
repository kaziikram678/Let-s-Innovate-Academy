import type { Metadata } from "next"
import InstructorCard from "@/components/InstructorCard"
import { instructors } from "@/data/instructors"

export const metadata: Metadata = {
  title: "Our Instructors | Let's Innovate Academy",
  description:
    "Meet our expert instructors who bring years of industry experience to help you master video editing, motion graphics, and content creation.",
}

export default function InstructorsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-indigo-500/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <span className="inline-block px-4 py-1.5 bg-indigo-500/10 text-indigo-400 text-sm font-medium rounded-full border border-indigo-500/20 mb-6">
            Expert Team
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Instructors
            </span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Learn from industry professionals with years of real-world experience in video editing,
            motion graphics, and content creation.
          </p>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.slug} instructor={instructor} />
          ))}
        </div>
      </section>
    </div>
  )
}
