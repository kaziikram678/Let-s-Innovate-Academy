"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

interface Enrollment {
  id: string
  course_slug: string
  course_title: string
  full_name: string
  phone: string
  email: string
  transaction_id: string
  bkash_number: string
  message: string | null
  status: "pending" | "verified" | "rejected"
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, profile, loading: authLoading, signOut } = useAuth()
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/signin?redirect=/dashboard")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (!user) return

    const fetchEnrollments = async () => {
      try {
        const response = await fetch(`/api/enrollments?userId=${user.id}`)
        const data = await response.json()

        if (data.success) {
          setEnrollments(data.enrollments)
        }
      } catch (error) {
        console.error("Failed to fetch enrollments:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEnrollments()
  }, [user])

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  const statusColors = {
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    verified: "bg-green-500/20 text-green-400 border-green-500/30",
    rejected: "bg-red-500/20 text-red-400 border-red-500/30",
  }

  const statusLabels = {
    pending: "Pending Verification",
    verified: "Verified",
    rejected: "Rejected",
  }

  const stats = {
    total: enrollments.length,
    pending: enrollments.filter((e) => e.status === "pending").length,
    verified: enrollments.filter((e) => e.status === "verified").length,
    rejected: enrollments.filter((e) => e.status === "rejected").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-4 py-12 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Welcome, {profile?.full_name || user.email}!
            </h1>
            <p className="text-gray-400">Manage your courses and enrollments</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/courses"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition"
            >
              Browse Courses
            </Link>
            <button
              onClick={signOut}
              className="px-4 py-2 text-gray-400 hover:text-white text-sm transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Total Enrollments</p>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-4">
            <p className="text-yellow-400 text-sm">Pending</p>
            <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-4">
            <p className="text-green-400 text-sm">Verified</p>
            <p className="text-3xl font-bold text-green-400">{stats.verified}</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-red-500/30 rounded-xl p-4">
            <p className="text-red-400 text-sm">Rejected</p>
            <p className="text-3xl font-bold text-red-400">{stats.rejected}</p>
          </div>
        </div>

        {/* Enrollments */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">My Enrollments</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading enrollments...</div>
          ) : enrollments.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400 mb-4">You haven&apos;t enrolled in any courses yet.</p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Course</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Date</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Transaction ID</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((enrollment) => (
                    <tr key={enrollment.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                      <td className="p-4">
                        <p className="text-white font-medium">{enrollment.course_title}</p>
                        <p className="text-gray-500 text-sm">{enrollment.full_name}</p>
                      </td>
                      <td className="p-4 text-gray-400 text-sm">
                        {new Date(enrollment.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="p-4 text-gray-400 text-sm font-mono">
                        {enrollment.transaction_id}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                            statusColors[enrollment.status]
                          }`}
                        >
                          {statusLabels[enrollment.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
