"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"

export default function AdminDashboard() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()
  const [stats, setStats] = useState({
    totalCourses: 0,
    activeCourses: 0,
    totalEnrollments: 0,
    pendingEnrollments: 0,
    totalEmails: 0,
  })

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/signin?redirect=/admin")
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
      fetchStats()
    }
  }, [profile])

  const fetchStats = async () => {
    try {
      const [coursesRes, enrollmentsRes] = await Promise.all([
        fetch("/api/courses"),
        fetch("/api/enrollments"),
      ])

      const coursesData = await coursesRes.json()
      const enrollmentsData = await enrollmentsRes.json()

      const courses = coursesData.courses || []
      const enrollments = enrollmentsData.enrollments || []

      setStats({
        totalCourses: courses.length,
        activeCourses: courses.filter((c: any) => c.status === "enroll-open").length,
        totalEnrollments: enrollments.length,
        pendingEnrollments: enrollments.filter((e: any) => e.status === "pending").length,
        totalEmails: 0,
      })
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    }
  }

  if (loading || profile?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const adminLinks = [
    {
      title: "Manage Enrollments",
      description: "View and verify student enrollments",
      href: "/admin/enrollments",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "from-blue-500/20 to-blue-600/5 border-blue-500/20",
    },
    {
      title: "Manage Courses",
      description: "Create, edit, and delete courses",
      href: "/admin/courses",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: "from-red-500/20 to-red-600/5 border-red-500/20",
    },
    {
      title: "Email Center",
      description: "Send emails and manage templates",
      href: "/admin/emails",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "from-green-500/20 to-green-600/5 border-green-500/20",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-zinc-400 mt-2">Manage your academy from here</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#111111] border border-white/10 rounded-xl p-4">
            <p className="text-zinc-400 text-sm">Total Courses</p>
            <p className="text-2xl font-bold text-white mt-1">{stats.totalCourses}</p>
          </div>
          <div className="bg-[#111111] border border-white/10 rounded-xl p-4">
            <p className="text-zinc-400 text-sm">Active Courses</p>
            <p className="text-2xl font-bold text-green-400 mt-1">{stats.activeCourses}</p>
          </div>
          <div className="bg-[#111111] border border-white/10 rounded-xl p-4">
            <p className="text-zinc-400 text-sm">Total Enrollments</p>
            <p className="text-2xl font-bold text-white mt-1">{stats.totalEnrollments}</p>
          </div>
          <div className="bg-[#111111] border border-white/10 rounded-xl p-4">
            <p className="text-zinc-400 text-sm">Pending</p>
            <p className="text-2xl font-bold text-yellow-400 mt-1">{stats.pendingEnrollments}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`bg-gradient-to-br ${link.color} border rounded-2xl p-6 hover:scale-105 transition-transform`}
            >
              <div className="text-white mb-4">{link.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{link.title}</h3>
              <p className="text-zinc-400 text-sm">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
