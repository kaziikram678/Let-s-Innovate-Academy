import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import CurriculumAccordion from "@/components/CurriculumAccordion"
import CourseFeatureCard from "@/components/CourseFeatureCard"
import CourseCTA from "@/components/CourseCTA"
import FAQAccordion from "@/components/FAQAccordion"
import { getCourseBySlug } from "@/data/courses"
import { getInstructorBySlug } from "@/data/instructors"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = getCourseBySlug(slug)

  if (!course) {
    return { title: "Course Not Found | Let's Innovate Academy" }
  }

  return {
    title: `${course.title} | Let's Innovate Academy`,
    description: course.subtitle,
  }
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params
  const course = getCourseBySlug(slug)

  if (!course || course.status === "coming-soon") {
    notFound()
  }

  const instructor = getInstructorBySlug(course.instructorSlug)

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Content */}
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
                {course.title}
              </h1>

              <p className="text-slate-300 text-lg mb-6 max-w-2xl">
                {course.subtitle}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-slate-400 mb-8">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {course.duration}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {course.lectures} Lectures
                </span>
                {course.studentsCount && (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {course.studentsCount}+ Students
                  </span>
                )}
                {course.rating && (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {course.rating} Rating
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  {course.language}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {course.support}
                </span>
              </div>

              {/* Preview Thumbnail */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-indigo-900" />
                {course.image && (
                  <img
                    src={course.image}
                    alt={course.title}
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

            {/* Right - CTA Card (Desktop) */}
            <div className="hidden lg:block">
              <CourseCTA
                price={course.price}
                oldPrice={course.oldPrice}
                enrollHref={`/checkout/${course.slug}`}
                classFormat={course.classFormat}
                emailNotifications={course.emailNotifications}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile CTA */}
      <div className="lg:hidden sticky bottom-0 z-40 bg-white border-t border-slate-200 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-2xl font-bold text-slate-900">{course.price}</span>
            {course.oldPrice && (
              <span className="text-sm text-slate-400 line-through ml-2">{course.oldPrice}</span>
            )}
          </div>
          <Link
            href={`/checkout/${course.slug}`}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all"
          >
            Enroll Now
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left - Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* What You Will Learn */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                What You Will Learn
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {course.learnings.map((item) => (
                  <div
                    key={item}
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

            {/* Course Features */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Course Features
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {course.features.map((feature) => (
                  <CourseFeatureCard
                    key={feature.title}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
            </section>

            {/* Live Class Info */}
            {course.classFormat === "live" && (
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
                  {course.classSchedule && (
                    <div className="mt-6 p-4 bg-white rounded-xl border border-indigo-100">
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold text-indigo-600">Schedule:</span> {course.classSchedule}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Who This Course Is For */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Who This Course Is For
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <ul className="space-y-3">
                  {course.whoFor.map((item) => (
                    <li
                      key={item}
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

            {/* Curriculum */}
            <section>
              <CurriculumAccordion curriculum={course.curriculum} />
            </section>

            {/* Instructor */}
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

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Frequently Asked Questions
              </h2>
              <FAQAccordion faqs={course.faqs} />
            </section>
          </div>

          {/* Right - Sidebar (Desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <CourseCTA
                price={course.price}
                oldPrice={course.oldPrice}
                enrollHref={`/checkout/${course.slug}`}
                classFormat={course.classFormat}
                emailNotifications={course.emailNotifications}
              />

              {/* Payment Info */}
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
