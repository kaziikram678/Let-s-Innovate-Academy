"use client"

import { useState } from "react"
import type { CurriculumDay } from "@/types"

interface CurriculumAccordionProps {
  curriculum: CurriculumDay[]
}

export default function CurriculumAccordion({
  curriculum,
}: CurriculumAccordionProps) {
  const [openDay, setOpenDay] = useState<string | null>(null)

  const totalLessons = curriculum.reduce(
    (sum, day) => sum + day.lessons.length,
    0
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900">
          Course Curriculum
        </h3>
        <span className="text-sm text-slate-500">
          {curriculum.length} Sections &middot; {totalLessons} Lessons
        </span>
      </div>

      <div className="space-y-2">
        {curriculum.map((day) => {
          const isOpen = openDay === day.day
          const lessonCount = day.lessons.length +
            (day.hasPracticeResources ? 1 : 0) +
            (day.hasAssignment ? 1 : 0)

          return (
            <div
              key={day.day}
              className="border border-slate-200 rounded-xl overflow-hidden bg-white"
            >
              <button
                onClick={() => setOpenDay(isOpen ? null : day.day)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isOpen
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {day.day}: {day.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {lessonCount} lesson{lessonCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 border-t border-slate-100">
                  <ul className="pt-3 space-y-2">
                    {day.lessons.map((lesson) => (
                      <li
                        key={lesson.title}
                        className="flex items-center gap-3 text-sm text-slate-600 py-1.5"
                      >
                        <svg
                          className="w-4 h-4 text-slate-400 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{lesson.title}</span>
                      </li>
                    ))}

                    {day.hasPracticeResources && (
                      <li className="flex items-center gap-3 text-sm text-indigo-600 py-1.5 font-medium">
                        <svg
                          className="w-4 h-4 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Practice Resources
                      </li>
                    )}

                    {day.hasAssignment && (
                      <li className="flex items-center gap-3 text-sm text-amber-600 py-1.5 font-medium">
                        <svg
                          className="w-4 h-4 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Assignment {day.assignmentNumber}
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
