"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import type { DBCourse } from "@/types"

export default function AdminCourses() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()
  const [courses, setCourses] = useState<DBCourse[]>([])
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/signin?redirect=/admin/courses")
        return
      }
      if (profile?.role !== "admin") {
        router.push("/dashboard")
        return
      }
    }
  }, [user, profile, loading, router])

  useEffect(() => {
    if (profile?.role === "admin") {
      fetchCourses()
    }
  }, [profile])

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses")
      const data = await res.json()
      setCourses(data.courses || [])
    } catch (error) {
      console.error("Failed to fetch courses:", error)
    } finally {
      setLoadingData(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course? This cannot be undone.")) return

    try {
      const res = await fetch(`/api/courses?id=${id}`, { method: "DELETE" })
      if (res.ok) {
        setCourses(courses.filter(c => c.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete course:", error)
    }
  }

  const filteredCourses = courses
    .filter(c => filter === "all" || c.status === filter)
    .filter(c => !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.slug.toLowerCase().includes(search.toLowerCase()))

  if (loading || profile?.role !== "admin") {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
  }

  const statusColors: Record<string, string> = {
    draft: "bg-zinc-500/20 text-zinc-400",
    "enroll-open": "bg-green-500/20 text-green-400",
    "coming-soon": "bg-yellow-500/20 text-yellow-400",
    archived: "bg-red-500/20 text-red-400",
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Manage Courses</h1>
            <p className="text-zinc-400 mt-1">Create, edit, and delete courses</p>
          </div>
          <Link
            href="/admin/courses/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Course
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 bg-[#111111] border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
          />
          <div className="flex gap-2">
            {["all", "draft", "enroll-open", "coming-soon", "archived"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  filter === status
                    ? "bg-red-500 text-white"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10"
                }`}
              >
                {status === "all" ? "All" : status}
              </button>
            ))}
          </div>
        </div>

        {loadingData ? (
          <div className="text-center py-12 text-zinc-400">Loading courses...</div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-400 mb-4">No courses found</p>
            <Link href="/admin/courses/new" className="text-red-400 hover:text-red-300">
              Create your first course
            </Link>
          </div>
        ) : (
          <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr>
                    <th className="text-left px-4 py-3 text-zinc-400 text-sm font-medium">Course</th>
                    <th className="text-left px-4 py-3 text-zinc-400 text-sm font-medium">Status</th>
                    <th className="text-left px-4 py-3 text-zinc-400 text-sm font-medium">Price</th>
                    <th className="text-left px-4 py-3 text-zinc-400 text-sm font-medium">Start Date</th>
                    <th className="text-left px-4 py-3 text-zinc-400 text-sm font-medium">Students</th>
                    <th className="text-right px-4 py-3 text-zinc-400 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-4 py-3">
                        <p className="text-white font-medium">{course.title}</p>
                        <p className="text-zinc-500 text-sm">{course.slug}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${statusColors[course.status] || statusColors.draft}`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white">
                        {course.price > 0 ? `৳${course.price}` : "Free"}
                      </td>
                      <td className="px-4 py-3 text-zinc-400">
                        {course.start_date ? new Date(course.start_date).toLocaleDateString() : "Not set"}
                      </td>
                      <td className="px-4 py-3 text-white">{course.students_count}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/courses/${course.id}/edit`}
                            className="px-3 py-1 text-sm bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded transition-colors"
                          >
                            Edit
                          </Link>
                          <Link
                            href={`/admin/courses/${course.id}/materials`}
                            className="px-3 py-1 text-sm bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded transition-colors"
                          >
                            Materials
                          </Link>
                          <button
                            onClick={() => handleDelete(course.id)}
                            className="px-3 py-1 text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
