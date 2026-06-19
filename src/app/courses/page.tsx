import type { Metadata } from "next"
import { supabaseServer, isSupabaseConfigured } from "@/lib/supabase"
import CourseCard from "@/components/CourseCard"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Courses | Let's Innovate Academy",
  description:
    "Learn professional video editing, motion graphics, and content creation from industry experts. Enroll in our expert-led courses today.",
}

async function getCourses() {
  if (!isSupabaseConfigured || !supabaseServer) {
    return []
  }

  const { data, error } = await (supabaseServer as any)
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Failed to fetch courses:", error)
    return []
  }

  return data || []
}

export default async function CoursesPage() {
  const dbCourses = await getCourses()

  const totalLectures = dbCourses.reduce((sum: number, c: any) => sum + (c.lectures_count || 0), 0)

  return (
    <div className="bg-gradient-to-b from-slate-950 via-indigo-950/30 to-slate-950 min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-indigo-500/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <span className="inline-block px-4 py-1.5 bg-indigo-500/10 text-indigo-400 text-sm font-medium rounded-full border border-indigo-500/20 mb-6">
            Let's Innovate Academy
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Master Creative Skills with{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Expert-Led Courses
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Learn video editing, motion graphics, and content creation from
            scratch. Practical lessons, real projects, and lifetime access.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{dbCourses.length}</p>
            <p className="text-sm text-slate-400">Courses</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{totalLectures}+</p>
            <p className="text-sm text-slate-400">Lessons</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">24/7</p>
            <p className="text-sm text-slate-400">Support</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {dbCourses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No courses available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dbCourses.map((course: any) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
