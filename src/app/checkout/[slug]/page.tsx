"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { notFound, useParams, useRouter } from "next/navigation"
import { getCourseBySlug } from "@/data/courses"
import { useAuth } from "@/context/AuthContext"

function getCourse(slug: string) {
  return getCourseBySlug(slug)
}

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string
  const course = getCourse(slug)
  const { user, profile, loading: authLoading } = useAuth()

  if (!course) {
    notFound()
  }

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    transactionId: "",
    bkashNumber: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (user && profile && !authLoading) {
      setFormData((prev) => ({
        ...prev,
        fullName: profile.full_name || prev.fullName,
        phone: profile.phone || prev.phone,
        email: user.email || prev.email,
      }))
    }
  }, [user, profile, authLoading])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseSlug: course.slug,
          courseTitle: course.title,
          ...formData,
          userId: user?.id || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      console.log("Enrollment submitted:", data)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-emerald-600"
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
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Enrollment Submitted!
          </h2>
          <p className="text-slate-600 mb-6">
            Thank you for enrolling in{" "}
            <span className="font-semibold">{course.title}</span>. Your payment
            details have been received. You will receive an email with the live class
            schedule, links, and instructions before each session.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Back to Courses
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
              >
                View Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href={`/courses/${course.slug}`}
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Course
        </Link>

        {/* Auth prompt for guest users */}
        {!user && !authLoading && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6 flex items-center justify-between">
            <p className="text-sm text-indigo-700">
              Already have an account? Sign in to track your enrollments.
            </p>
            <Link
              href={`/auth/signin?redirect=/checkout/${course.slug}`}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
            >
              Sign In
            </Link>
          </div>
        )}

        <div className="grid md:grid-cols-5 gap-8">
          {/* Form */}
          <div className="md:col-span-3">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Complete Enrollment
            </h1>
            <p className="text-slate-500 mb-8">
              Fill in your details and submit your bKash payment information.
            </p>

            {/* Payment Instructions */}
            <div className="bg-pink-50 border border-pink-200 rounded-xl p-5 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  bK
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    Payment Instructions
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Please send <span className="font-semibold">{course.price}</span> to this bKash number first, then submit your transaction ID below.
                  </p>
                  <div className="bg-white rounded-lg p-3 border border-pink-100">
                    <p className="text-xs text-slate-500 mb-1">bKash Number</p>
                    <p className="text-lg font-bold text-slate-900">
                      +8801XXXXXXXXX
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 mt-3">
                    After payment verification, you will be added to the live class
                    schedule. You will receive email notifications with class links
                    and instructions before each session.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                  {error}
                </div>
              )}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+8801XXXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div>
                <label
                  htmlFor="transactionId"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  bKash Transaction ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="transactionId"
                  name="transactionId"
                  required
                  value={formData.transactionId}
                  onChange={handleChange}
                  placeholder="e.g. 8NFR7TGH6X"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div>
                <label
                  htmlFor="bkashNumber"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  bKash Number Used for Payment{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="bkashNumber"
                  name="bkashNumber"
                  required
                  value={formData.bkashNumber}
                  onChange={handleChange}
                  placeholder="+8801XXXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Optional Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any additional information..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-900 placeholder:text-slate-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Submitting..." : "Submit Enrollment"}
              </button>

              <p className="text-xs text-slate-500 text-center">
                By submitting, you agree to receive live class schedules, links,
                and instructions via email after payment verification.
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
              <h3 className="font-semibold text-slate-900 mb-4">
                Order Summary
              </h3>

              <div className="flex gap-4 mb-4">
                <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-indigo-900" />
                  {course.image && (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 line-clamp-2">
                    {course.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {course.duration} &middot; {course.lectures} Lectures
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Course Fee</span>
                  <span className="line-through text-slate-400">
                    {course.oldPrice}
                  </span>
                </div>
                <div className="flex justify-between text-slate-900 font-semibold text-lg">
                  <span>Total</span>
                  <span>{course.price}</span>
                </div>
              </div>

              <div className="border-t border-slate-200 mt-4 pt-4 space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Lifetime access
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Practice resources
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  WhatsApp support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
