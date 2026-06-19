"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import type { DBCourse, CurriculumDay, CourseFeature, CourseFAQ } from "@/types"

export default function CourseFormPage() {
  const router = useRouter()
  const params = useParams()
  const { user, profile, loading } = useAuth()
  const courseId = params.id as string
  const isNew = courseId === "new"

  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    subtitle: "",
    description: "",
    status: "draft" as DBCourse["status"],
    price: 0,
    oldPrice: 0,
    duration: "",
    lecturesCount: 0,
    imageUrl: "",
    instructorSlug: "md-ikram",
    language: "Bengali",
    support: "WhatsApp & Email",
    paymentMethod: "bKash",
    classFormat: "live",
    classSchedule: "",
    emailNotifications: true,
    studentsCount: 0,
    rating: 0,
    startDate: "",
    endDate: "",
    meetingLink: "",
  })

  const [features, setFeatures] = useState<CourseFeature[]>([])
  const [learnings, setLearnings] = useState<string[]>([])
  const [whoFor, setWhoFor] = useState<string[]>([])
  const [curriculum, setCurriculum] = useState<CurriculumDay[]>([])
  const [faqs, setFaqs] = useState<CourseFAQ[]>([])
  const [saving, setSaving] = useState(false)
  const [loadingCourse, setLoadingCourse] = useState(!isNew)

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/signin?redirect=/admin/courses/new")
        return
      }
      if (profile?.role !== "admin") {
        router.push("/dashboard")
        return
      }
    }
  }, [user, profile, loading, router])

  useEffect(() => {
    if (!isNew && profile?.role === "admin") {
      fetchCourse()
    }
  }, [courseId, profile])

  const fetchCourse = async () => {
    try {
      const res = await fetch(`/api/courses?slug=${courseId}`)
      const data = await res.json()
      const course = data.course
      if (course) {
        setFormData({
          slug: course.slug,
          title: course.title,
          subtitle: course.subtitle || "",
          description: course.description || "",
          status: course.status,
          price: course.price,
          oldPrice: course.old_price || 0,
          duration: course.duration || "",
          lecturesCount: course.lectures_count || 0,
          imageUrl: course.image_url || "",
          instructorSlug: course.instructor_slug || "md-ikram",
          language: course.language || "Bengali",
          support: course.support || "WhatsApp & Email",
          paymentMethod: course.payment_method || "bKash",
          classFormat: course.class_format || "live",
          classSchedule: course.class_schedule || "",
          emailNotifications: course.email_notifications ?? true,
          studentsCount: course.students_count || 0,
          rating: course.rating || 0,
          startDate: course.start_date ? course.start_date.slice(0, 16) : "",
          endDate: course.end_date ? course.end_date.slice(0, 16) : "",
          meetingLink: course.meeting_link || "",
        })
        setFeatures(course.features || [])
        setLearnings(course.learnings || [])
        setWhoFor(course.who_for || [])
        setCurriculum(course.curriculum || [])
        setFaqs(course.faqs || [])
      }
    } catch (error) {
      console.error("Failed to fetch course:", error)
    } finally {
      setLoadingCourse(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = isNew ? "/api/courses" : "/api/courses"
      const method = isNew ? "POST" : "PATCH"
      const body = isNew
        ? { ...formData, features, learnings, whoFor, curriculum, faqs }
        : { id: courseId, ...formData, features, learnings, whoFor, curriculum, faqs }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        router.push("/admin/courses")
      }
    } catch (error) {
      console.error("Failed to save course:", error)
    } finally {
      setSaving(false)
    }
  }

  const addFeature = () => {
    setFeatures([...features, { icon: "check", title: "", description: "" }])
  }

  const updateFeature = (index: number, field: keyof CourseFeature, value: string) => {
    const updated = [...features]
    updated[index] = { ...updated[index], [field]: value }
    setFeatures(updated)
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const addLearning = () => {
    setLearnings([...learnings, ""])
  }

  const updateLearning = (index: number, value: string) => {
    const updated = [...learnings]
    updated[index] = value
    setLearnings(updated)
  }

  const removeLearning = (index: number) => {
    setLearnings(learnings.filter((_, i) => i !== index))
  }

  const addWhoFor = () => {
    setWhoFor([...whoFor, ""])
  }

  const updateWhoFor = (index: number, value: string) => {
    const updated = [...whoFor]
    updated[index] = value
    setWhoFor(updated)
  }

  const removeWhoFor = (index: number) => {
    setWhoFor(whoFor.filter((_, i) => i !== index))
  }

  const addCurriculumDay = () => {
    setCurriculum([...curriculum, { day: `Day ${curriculum.length + 1}`, title: "", lessons: [] }])
  }

  const updateCurriculumDay = (index: number, field: keyof CurriculumDay, value: any) => {
    const updated = [...curriculum]
    updated[index] = { ...updated[index], [field]: value }
    setCurriculum(updated)
  }

  const removeCurriculumDay = (index: number) => {
    setCurriculum(curriculum.filter((_, i) => i !== index))
  }

  const addLesson = (dayIndex: number) => {
    const updated = [...curriculum]
    updated[dayIndex].lessons = [...(updated[dayIndex].lessons || []), { title: "", duration: "" }]
    setCurriculum(updated)
  }

  const updateLesson = (dayIndex: number, lessonIndex: number, field: string, value: string) => {
    const updated = [...curriculum]
    updated[dayIndex].lessons[lessonIndex] = { ...updated[dayIndex].lessons[lessonIndex], [field]: value }
    setCurriculum(updated)
  }

  const removeLesson = (dayIndex: number, lessonIndex: number) => {
    const updated = [...curriculum]
    updated[dayIndex].lessons = updated[dayIndex].lessons.filter((_, i) => i !== lessonIndex)
    setCurriculum(updated)
  }

  const addFaq = () => {
    setFaqs([...faqs, { id: `faq-${Date.now()}`, question: "", answer: "" }])
  }

  const updateFaq = (index: number, field: keyof CourseFAQ, value: string) => {
    const updated = [...faqs]
    updated[index] = { ...updated[index], [field]: value }
    setFaqs(updated)
  }

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index))
  }

  if (loading || loadingCourse || profile?.role !== "admin") {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">{isNew ? "Create Course" : "Edit Course"}</h1>
          <p className="text-zinc-400 mt-1">{isNew ? "Add a new course to your academy" : "Update course details"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="bg-[#111111] border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-zinc-400 text-sm mb-1">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-zinc-400 text-sm mb-1">Description</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as DBCourse["status"] })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                >
                  <option value="draft">Draft</option>
                  <option value="enroll-open">Enroll Open</option>
                  <option value="coming-soon">Coming Soon</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="/images/courses/..."
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </section>

          <section className="bg-[#111111] border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Pricing & Schedule</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Price (৳)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Old Price (৳)</label>
                <input
                  type="number"
                  value={formData.oldPrice}
                  onChange={(e) => setFormData({ ...formData, oldPrice: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="21 Days"
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Start Date</label>
                <input
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">End Date</label>
                <input
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Meeting Link</label>
                <input
                  type="url"
                  value={formData.meetingLink}
                  onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                  placeholder="https://meet.google.com/..."
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Class Format</label>
                <select
                  value={formData.classFormat}
                  onChange={(e) => setFormData({ ...formData, classFormat: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                >
                  <option value="live">Live</option>
                  <option value="recorded">Recorded</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Class Schedule</label>
                <input
                  type="text"
                  value={formData.classSchedule}
                  onChange={(e) => setFormData({ ...formData, classSchedule: e.target.value })}
                  placeholder="Mon, Wed, Fri - 8PM BST"
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Lectures Count</label>
                <input
                  type="number"
                  value={formData.lecturesCount}
                  onChange={(e) => setFormData({ ...formData, lecturesCount: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </section>

          <section className="bg-[#111111] border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">What Students Will Learn</h2>
            {learnings.map((learning, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={learning}
                  onChange={(e) => updateLearning(index, e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
                <button type="button" onClick={() => removeLearning(index)} className="px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addLearning} className="text-red-400 hover:text-red-300 text-sm">
              + Add Learning Outcome
            </button>
          </section>

          <section className="bg-[#111111] border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Who This Course Is For</h2>
            {whoFor.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateWhoFor(index, e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
                <button type="button" onClick={() => removeWhoFor(index)} className="px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addWhoFor} className="text-red-400 hover:text-red-300 text-sm">
              + Add Target Audience
            </button>
          </section>

          <section className="bg-[#111111] border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Course Features</h2>
            {features.map((feature, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                <input
                  type="text"
                  value={feature.icon}
                  onChange={(e) => updateFeature(index, "icon", e.target.value)}
                  placeholder="Icon (check, video, etc.)"
                  className="px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => updateFeature(index, "title", e.target.value)}
                  placeholder="Feature title"
                  className="px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={feature.description}
                    onChange={(e) => updateFeature(index, "description", e.target.value)}
                    placeholder="Description"
                    className="flex-1 px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                  />
                  <button type="button" onClick={() => removeFeature(index)} className="px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg">
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addFeature} className="text-red-400 hover:text-red-300 text-sm">
              + Add Feature
            </button>
          </section>

          <section className="bg-[#111111] border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Curriculum</h2>
            {curriculum.map((day, dayIndex) => (
              <div key={dayIndex} className="mb-4 p-4 bg-[#0a0a0a] border border-white/10 rounded-lg">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={day.day}
                    onChange={(e) => updateCurriculumDay(dayIndex, "day", e.target.value)}
                    placeholder="Day 1"
                    className="w-24 px-3 py-2 bg-[#111111] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="text"
                    value={day.title}
                    onChange={(e) => updateCurriculumDay(dayIndex, "title", e.target.value)}
                    placeholder="Day title"
                    className="flex-1 px-3 py-2 bg-[#111111] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                  />
                  <button type="button" onClick={() => removeCurriculumDay(dayIndex)} className="px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg">
                    Remove
                  </button>
                </div>
                {day.lessons?.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="flex gap-2 mb-1 ml-4">
                    <input
                      type="text"
                      value={lesson.title}
                      onChange={(e) => updateLesson(dayIndex, lessonIndex, "title", e.target.value)}
                      placeholder="Lesson title"
                      className="flex-1 px-3 py-2 bg-[#111111] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                    />
                    <input
                      type="text"
                      value={lesson.duration || ""}
                      onChange={(e) => updateLesson(dayIndex, lessonIndex, "duration", e.target.value)}
                      placeholder="Duration"
                      className="w-24 px-3 py-2 bg-[#111111] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                    />
                    <button type="button" onClick={() => removeLesson(dayIndex, lessonIndex)} className="px-2 py-2 text-red-400 hover:bg-red-500/20 rounded-lg">
                      x
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => addLesson(dayIndex)} className="text-red-400 hover:text-red-300 text-sm ml-4">
                  + Add Lesson
                </button>
              </div>
            ))}
            <button type="button" onClick={addCurriculumDay} className="text-red-400 hover:text-red-300 text-sm">
              + Add Day
            </button>
          </section>

          <section className="bg-[#111111] border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">FAQs</h2>
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4 p-4 bg-[#0a0a0a] border border-white/10 rounded-lg">
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFaq(index, "question", e.target.value)}
                  placeholder="Question"
                  className="w-full px-3 py-2 bg-[#111111] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500 mb-2"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => updateFaq(index, "answer", e.target.value)}
                  placeholder="Answer"
                  rows={2}
                  className="w-full px-3 py-2 bg-[#111111] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500 mb-2"
                />
                <button type="button" onClick={() => removeFaq(index)} className="text-red-400 hover:text-red-300 text-sm">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addFaq} className="text-red-400 hover:text-red-300 text-sm">
              + Add FAQ
            </button>
          </section>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 text-white font-medium rounded-lg transition-colors"
            >
              {saving ? "Saving..." : isNew ? "Create Course" : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/courses")}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
