import Link from "next/link"
import type { Course } from "@/types"
import { getInstructorBySlug } from "@/data/instructors"

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const isEnrollOpen = course.status === "enroll-open"
  const instructor = getInstructorBySlug(course.instructorSlug)

  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden border border-slate-200 transition-all duration-300 ${
        isEnrollOpen
          ? "hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200"
          : "opacity-75"
      }`}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-indigo-900" />
        {course.image && (
          <>
            <img
              src={course.image}
              alt={course.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          {isEnrollOpen ? (
            <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
              Enroll Open
            </span>
          ) : (
            <span className="px-3 py-1 bg-slate-500 text-white text-xs font-semibold rounded-full">
              Coming Soon
            </span>
          )}
        </div>

        {/* Live Class Badge */}
        {course.classFormat === "live" && isEnrollOpen && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 bg-indigo-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
              </svg>
              LIVE
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-slate-900 font-bold text-lg mb-2 line-clamp-2">
          {course.title}
        </h3>

        {/* Instructor */}
        {instructor && (
          <p className="text-slate-500 text-sm mb-3">by {instructor.name}</p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {course.lectures} Lectures
          </span>
        </div>

        {/* Students & Rating */}
        <div className="flex items-center gap-4 text-sm mb-4">
          {course.studentsCount && (
            <span className="flex items-center gap-1 text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {course.studentsCount}+
            </span>
          )}
          {course.rating && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-slate-700 font-medium">{course.rating}</span>
            </span>
          )}
        </div>

        {/* Live Class Info */}
        {course.classFormat === "live" && isEnrollOpen && (
          <div className="mb-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
            <p className="text-xs text-indigo-700 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Live classes with email notifications
            </p>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-slate-900">
            {course.price}
          </span>
          {course.oldPrice && (
            <span className="text-sm text-slate-400 line-through">
              {course.oldPrice}
            </span>
          )}
        </div>

        {/* CTA */}
        {isEnrollOpen ? (
          <Link
            href={`/courses/${course.slug}`}
            className="block w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-center font-semibold rounded-xl transition-all duration-200"
          >
            Enroll Now
          </Link>
        ) : (
          <button
            disabled
            className="block w-full py-3 bg-slate-100 text-slate-400 text-center font-semibold rounded-xl cursor-not-allowed"
          >
            Coming Soon
          </button>
        )}
      </div>
    </div>
  )
}
