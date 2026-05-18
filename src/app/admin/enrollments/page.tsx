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

export default function AdminEnrollmentsPage() {
  const router = useRouter()
  const { user, profile, isAdmin, loading: authLoading } = useAuth()
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null)

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/auth/signin?redirect=/admin/enrollments")
      } else if (!isAdmin) {
        router.push("/dashboard")
      }
    }
  }, [user, isAdmin, authLoading, router])

  useEffect(() => {
    if (!isAdmin || !user) return
    fetchEnrollments()
  }, [isAdmin, user])

  const fetchEnrollments = async () => {
    try {
      const response = await fetch("/api/enrollments")
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

  const updateStatus = async (id: string, newStatus: "pending" | "verified" | "rejected") => {
    setUpdating(id)
    try {
      const response = await fetch("/api/enrollments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      })

      const data = await response.json()
      if (data.success) {
        setEnrollments((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        )
      }
    } catch (error) {
      console.error("Failed to update status:", error)
    } finally {
      setUpdating(null)
    }
  }

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesFilter = filter === "all" || enrollment.status === filter
    const matchesSearch =
      searchTerm === "" ||
      enrollment.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.course_title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "verified":
        return "bg-emerald-100 text-emerald-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const stats = {
    total: enrollments.length,
    pending: enrollments.filter((e) => e.status === "pending").length,
    verified: enrollments.filter((e) => e.status === "verified").length,
    rejected: enrollments.filter((e) => e.status === "rejected").length,
  }

  if (authLoading || !user || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Checking authorization...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Enrollment Dashboard
              </h1>
              <p className="text-slate-600 mt-1">
                Manage and track all course enrollments
              </p>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Total</p>
            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-yellow-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-emerald-600">Verified</p>
            <p className="text-2xl font-bold text-emerald-600">{stats.verified}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-red-600">Rejected</p>
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, email, transaction ID, or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <div className="flex gap-2">
              {["all", "pending", "verified", "rejected"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === status
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enrollments Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {filteredEnrollments.length === 0 ? (
            <div className="p-12 text-center">
              <svg
                className="w-16 h-16 text-slate-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p className="text-slate-500">No enrollments found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredEnrollments.map((enrollment) => (
                    <tr
                      key={enrollment.id}
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedEnrollment(enrollment)}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {enrollment.full_name}
                          </p>
                          <p className="text-xs text-slate-500">{enrollment.email}</p>
                          <p className="text-xs text-slate-500">{enrollment.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-900">{enrollment.course_title}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-mono text-slate-900">
                            {enrollment.transaction_id}
                          </p>
                          <p className="text-xs text-slate-500">
                            {enrollment.bkash_number}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            enrollment.status
                          )}`}
                        >
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                          {enrollment.status !== "verified" && (
                            <button
                              onClick={() => updateStatus(enrollment.id, "verified")}
                              disabled={updating === enrollment.id}
                              className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-lg hover:bg-emerald-200 transition-colors disabled:opacity-50"
                            >
                              {updating === enrollment.id ? "..." : "Verify"}
                            </button>
                          )}
                          {enrollment.status !== "rejected" && (
                            <button
                              onClick={() => updateStatus(enrollment.id, "rejected")}
                              disabled={updating === enrollment.id}
                              className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                            >
                              {updating === enrollment.id ? "..." : "Reject"}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-500">
                          {new Date(enrollment.created_at).toLocaleDateString()}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {filteredEnrollments.length > 0 && (
          <div className="mt-4 text-sm text-slate-500">
            Showing {filteredEnrollments.length} of {enrollments.length} enrollments
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedEnrollment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedEnrollment(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">Enrollment Details</h3>
              <button
                onClick={() => setSelectedEnrollment(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500">Student Name</p>
                <p className="font-medium text-slate-900">{selectedEnrollment.full_name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium text-slate-900">{selectedEnrollment.email}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-medium text-slate-900">{selectedEnrollment.phone}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Course</p>
                <p className="font-medium text-slate-900">{selectedEnrollment.course_title}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Transaction ID</p>
                <p className="font-mono font-medium text-slate-900">{selectedEnrollment.transaction_id}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">bKash Number</p>
                <p className="font-medium text-slate-900">{selectedEnrollment.bkash_number}</p>
              </div>
              {selectedEnrollment.message && (
                <div>
                  <p className="text-sm text-slate-500">Message</p>
                  <p className="text-slate-700">{selectedEnrollment.message}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-slate-500">Status</p>
                <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedEnrollment.status)}`}>
                  {selectedEnrollment.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-500">Submitted On</p>
                <p className="text-slate-700">{new Date(selectedEnrollment.created_at).toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {selectedEnrollment.status !== "verified" && (
                <button
                  onClick={() => {
                    updateStatus(selectedEnrollment.id, "verified")
                    setSelectedEnrollment({ ...selectedEnrollment, status: "verified" })
                  }}
                  className="flex-1 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Verify Payment
                </button>
              )}
              {selectedEnrollment.status !== "rejected" && (
                <button
                  onClick={() => {
                    updateStatus(selectedEnrollment.id, "rejected")
                    setSelectedEnrollment({ ...selectedEnrollment, status: "rejected" })
                  }}
                  className="flex-1 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
                >
                  Reject
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
