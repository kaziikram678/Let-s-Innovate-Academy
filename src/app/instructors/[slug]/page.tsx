import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import CourseCard from "@/components/CourseCard"
import { getInstructorBySlug } from "@/data/instructors"
import { getCoursesByInstructor } from "@/data/courses"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const instructor = getInstructorBySlug(slug)
  if (!instructor) {
    return { title: "Instructor Not Found" }
  }
  return {
    title: `${instructor.name} | Let's Innovate Academy`,
    description: instructor.bio,
  }
}

export default async function InstructorPage({ params }: Props) {
  const { slug } = await params
  const instructor = getInstructorBySlug(slug)
  if (!instructor) notFound()

  const courses = getCoursesByInstructor(slug)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-indigo-500/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Profile */}
            <div className="lg:col-span-1">
              <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sticky top-24">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-500 mx-auto mb-6 flex items-center justify-center">
                  {instructor.image ? (
                    <Image
                      src={instructor.image}
                      alt={instructor.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-4xl font-bold">
                      {instructor.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-white text-center mb-2">{instructor.name}</h1>
                <p className="text-zinc-400 text-sm text-center mb-6">{instructor.role}</p>

                {/* Social Links */}
                {instructor.socialLinks && (
                  <div className="flex justify-center gap-3 mb-6">
                    {instructor.socialLinks.youtube && (
                      <a
                        href={instructor.socialLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </a>
                    )}
                    {instructor.socialLinks.linkedin && (
                      <a
                        href={instructor.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}

                {/* Stats */}
                {instructor.stats && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{instructor.stats.studentsTaught || 0}+</p>
                      <p className="text-zinc-500 text-xs">Students</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{instructor.stats.coursesCreated || 0}</p>
                      <p className="text-zinc-500 text-xs">Courses</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{instructor.stats.yearsExperience || 0}+</p>
                      <p className="text-zinc-500 text-xs">Years Exp.</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{instructor.stats.rating || 0}</p>
                      <p className="text-zinc-500 text-xs">Rating</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-2">
              {/* Bio */}
              <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">About</h2>
                <p className="text-zinc-300 leading-relaxed">{instructor.bio}</p>
              </div>

              {/* Specialties */}
              <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Specialties</h2>
                <div className="flex flex-wrap gap-3">
                  {instructor.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-4 py-2 bg-indigo-500/10 text-indigo-400 text-sm rounded-full border border-indigo-500/20"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Courses */}
              <div className="bg-[#111111] border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Courses by {instructor.name}</h2>
                {courses.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-6">
                    {courses.map((course) => (
                      <CourseCard key={course.slug} course={course} />
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-400">No courses available yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
