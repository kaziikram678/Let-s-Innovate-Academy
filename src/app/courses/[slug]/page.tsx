import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import CurriculumAccordion from "@/components/CurriculumAccordion"
import CourseFeatureCard from "@/components/CourseFeatureCard"
import CourseCTA from "@/components/CourseCTA"
import FAQAccordion from "@/components/FAQAccordion"
import { getCourseBySlug } from "@/data/courses"
import { getInstructorBySlug } from "@/data/instructors"
import { supabaseServer, isSupabaseConfigured } from "@/lib/supabase"

type Props = {
  params: Promise<{ slug: string }>
}

async function getCourse(slug: string) {
  if (isSupabaseConfigured && supabaseServer) {
    const { data } = await supabaseServer
      .from("courses")
      .select("*")
      .eq("slug", slug)
      .single()

    if (data) {
      return { source: "db" as const, data }
    }
  }

  const staticCourse = getCourseBySlug(slug)
  if (staticCourse) {
    return { source: "static" as const, data: staticCourse }
  }

  return null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const courseData = await getCourse(slug)

  if (!courseData) {
    return { title: "Course Not Found | Let's Innovate Academy" }
  }

  const course = courseData.data
  const title = "source" in courseData && courseData.source === "db"
    ? (course as any).title
    : (course as any).title

  const subtitle = "source" in courseData && courseData.source === "db"
    ? (course as any).subtitle
    : (course as any).subtitle

  return {
    title: `${title} | Let's Innovate Academy`,
    description: subtitle || "",
  }
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params
  const courseData = await getCourse(slug)

  if (!courseData) {
    notFound()
  }

  const isDB = courseData.source === "db"
  const course = courseData.data as any

  const status = isDB ? course.status : course.status
  if (status === "coming-soon" || status === "draft" || status === "archived") {
    notFound()
  }

  const title = isDB ? course.title : course.title
  const subtitle = isDB ? course.subtitle : course.subtitle
  const duration = isDB ? course.duration : course.duration
  const lectures = isDB ? course.lectures_count : course.lectures
  const image = isDB ? course.image_url : course.image
  const studentsCount = isDB ? course.students_count : course.studentsCount
  const rating = isDB ? course.rating : course.rating
  const language = isDB ? course.language : course.language
  const support = isDB ? course.support : course.support
  const price = isDB ? course.price : course.price
  const oldPrice = isDB ? course.old_price : course.oldPrice
  const classFormat = isDB ? course.class_format : course.classFormat
  const emailNotifications = isDB ? course.email_notifications : course.emailNotifications
  const classSchedule = isDB ? course.class_schedule : course.classSchedule
  const learnings = isDB ? course.learnings : course.learnings
  const features = isDB ? course.features : course.features
  const whoFor = isDB ? course.who_for : course.whoFor
  const curriculum = isDB ? course.curriculum : course.curriculum
  const faqs = isDB ? course.faqs : course.faqs
  const instructorSlug = isDB ? course.instructor_slug : course.instructorSlug
  const startDate = isDB ? course.start_date : null
  const meetingLink = isDB ? course.meeting_link : null

  const instructor = getInstructorBySlug(instructorSlug || "md-ikram")

  const formattedStartDate = startDate
    ? new Date(startDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium mb-6 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Courses
              </Link>

              <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20 mb-4">
                Enroll Open
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                {title}
              </h1>

              <p className="text-slate-300 text-lg mb-6 max-w-2xl">
                {subtitle}
              </p>

              {formattedStartDate && (
                <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <p className="text-amber-300 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold">Course Starts:</span> {formattedStartDate}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-slate-400 mb-8">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {duration}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {lectures} Lectures
                </span>
                {studentsCount && studentsCount > 0 && (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {studentsCount}+ Students
                  </span>
                )}
                {rating && rating > 0 && (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {rating} Rating
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  {language}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {support}
                </span>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-indigo-900" />
                {image && (
                  <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <CourseCTA
                price={typeof price === "number" ? `৳${price}` : price}
                oldPrice={oldPrice ? (typeof oldPrice === "number" ? `৳${oldPrice}` : oldPrice) : undefined}
                enrollHref={`/checkout/${slug}`}
                classFormat={classFormat}
                emailNotifications={emailNotifications}
                startDate={formattedStartDate || undefined}
                meetingLink={meetingLink || undefined}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="lg:hidden sticky bottom-0 z-40 bg-white border-t border-slate-200 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-2xl font-bold text-slate-900">
              {typeof price === "number" ? `৳${price}` : price}
            </span>
            {oldPrice && (
              <span className="text-sm text-slate-400 line-through ml-2">
                {typeof oldPrice === "number" ? `৳${oldPrice}` : oldPrice}
              </span>
            )}
          </div>
          <Link
            href={`/checkout/${slug}`}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all"
          >
            Enroll Now
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                What You Will Learn
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {learnings.map((item: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200"
                  >
                    <svg
                      className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Course Features
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature: any, i: number) => (
                  <CourseFeatureCard
                    key={i}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
            </section>

            {classFormat === "live" && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Live Online Classes
                </h2>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg mb-1">
                        How Live Classes Work
                      </h3>
                      <p className="text-slate-600 text-sm">
                        All topics are taught through interactive live online sessions. Here is what you can expect:
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3 ml-16">
                    <li className="flex items-start gap-3 text-slate-700 text-sm">
                      <svg className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Live interactive sessions covering all course topics
                    </li>
                    <li className="flex items-start gap-3 text-slate-700 text-sm">
                      <svg className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Email notifications with class links and instructions before each session
                    </li>
                    <li className="flex items-start gap-3 text-slate-700 text-sm">
                      <svg className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Real-time Q&A during classes to clear your doubts
                    </li>
                    <li className="flex items-start gap-3 text-slate-700 text-sm">
                      <svg className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Practice assignments after each class to reinforce learning
                    </li>
                  </ul>
                  {classSchedule && (
                    <div className="mt-6 p-4 bg-white rounded-xl border border-indigo-100">
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold text-indigo-600">Schedule:</span> {classSchedule}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Who This Course Is For
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <ul className="space-y-3">
                  {whoFor.map((item: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-slate-700"
                    >
                      <svg
                        className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <CurriculumAccordion curriculum={curriculum} />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Your Instructor
              </h2>
              {instructor && (
                <Link
                  href={`/instructors/${instructor.slug}`}
                  className="block bg-white rounded-2xl border border-slate-200 p-6 hover:border-indigo-200 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                      {instructor.image ? (
                        <img
                          src={instructor.image}
                          alt={instructor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                          {instructor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">
                        {instructor.name}
                      </h3>
                      <p className="text-indigo-600 text-sm font-medium mb-3">
                        {instructor.role}
                      </p>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                        {instructor.bio}
                      </p>
                      <span className="inline-flex items-center gap-1 text-indigo-600 text-sm font-medium mt-3">
                        View Profile
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Frequently Asked Questions
              </h2>
              <FAQAccordion faqs={faqs} />
            </section>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24">
              <CourseCTA
                price={typeof price === "number" ? `৳${price}` : price}
                oldPrice={oldPrice ? (typeof oldPrice === "number" ? `৳${oldPrice}` : oldPrice) : undefined}
                enrollHref={`/checkout/${slug}`}
                classFormat={classFormat}
                emailNotifications={emailNotifications}
                startDate={formattedStartDate || undefined}
                meetingLink={meetingLink || undefined}
              />

              <div className="mt-4 bg-white rounded-2xl border border-slate-200 p-5">
                <h4 className="font-semibold text-slate-900 mb-3 text-sm">
                  Payment Method
                </h4>
                <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-xl border border-pink-100">
                  <div className="w-10 h-10 rounded-lg bg-pink-500 flex items-center justify-center text-white font-bold text-xs">
                    bK
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">bKash</p>
                    <p className="text-xs text-slate-500">
                      Personal / Merchant Payment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
