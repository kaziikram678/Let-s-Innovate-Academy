"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useDRMProtection } from "@/hooks/useDRMProtection"
import ProtectedVideoPlayer from "@/components/ProtectedVideoPlayer"
import type { DBCourse, CourseMaterial } from "@/types"

export default function CourseMaterialsViewer() {
  const router = useRouter()
  const params = useParams()
  const { user, profile, loading } = useAuth()
  const slug = params.slug as string

  const [course, setCourse] = useState<DBCourse | null>(null)
  const [materials, setMaterials] = useState<CourseMaterial[]>([])
  const [selectedMaterial, setSelectedMaterial] = useState<CourseMaterial | null>(null)
  const [loadingData, setLoadingData] = useState(true)
  const [isEnrolled, setIsEnrolled] = useState(false)

  useDRMProtection()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(`/auth/signin?redirect=/course/${slug}`)
        return
      }
    }
  }, [user, loading, router, slug])

  useEffect(() => {
    if (user && slug) {
      fetchData()
    }
  }, [user, slug])

  const fetchData = async () => {
    try {
      const [courseRes, enrollmentsRes] = await Promise.all([
        fetch(`/api/courses?slug=${slug}`),
        fetch(`/api/enrollments?userId=${user?.id}`),
      ])

      const courseData = await courseRes.json()
      const enrollmentsData = await enrollmentsRes.json()

      if (courseData.course) {
        setCourse(courseData.course)

        const enrolled = enrollmentsData.enrollments?.find(
          (e: any) => e.course_slug === courseData.course.slug && e.status === "verified"
        )
        setIsEnrolled(!!enrolled)

        const materialsRes = await fetch(`/api/courses/${courseData.course.id}/materials?courseId=${courseData.course.id}`)
        const materialsData = await materialsRes.json()
        setMaterials(materialsData.materials || [])
      }
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoadingData(false)
    }
  }

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Course Not Found</h1>
          <button onClick={() => router.push("/courses")} className="text-red-400 hover:text-red-300">
            Back to Courses
          </button>
        </div>
      </div>
    )
  }

  if (!isEnrolled) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-white mb-4">Enrollment Required</h1>
          <p className="text-zinc-400 mb-6">
            You need to be enrolled in this course to access the materials.
          </p>
          <button
            onClick={() => router.push(`/checkout/${slug}`)}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
          >
            Enroll Now
          </button>
        </div>
      </div>
    )
  }

  const videos = materials.filter(m => m.material_type === "video")
  const pdfs = materials.filter(m => m.material_type === "pdf")

  return (
    <div className="min-h-screen bg-[#0a0a0a]" onContextMenu={(e) => e.preventDefault()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.push(`/courses/${slug}`)}
            className="text-zinc-400 hover:text-white text-sm mb-2"
          >
            Back to Course
          </button>
          <h1 className="text-2xl font-bold text-white">{course.title}</h1>
          <p className="text-zinc-400">Course Materials</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {selectedMaterial ? (
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">{selectedMaterial.title}</h2>
                {selectedMaterial.description && (
                  <p className="text-zinc-400 mb-4">{selectedMaterial.description}</p>
                )}

                {selectedMaterial.material_type === "video" ? (
                  <ProtectedVideoPlayer
                    src={selectedMaterial.file_url}
                    title={selectedMaterial.title}
                    userEmail={user?.email}
                  />
                ) : (
                  <div className="bg-[#111111] border border-white/10 rounded-lg p-8 text-center">
                    <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-white font-semibold mb-2">{selectedMaterial.title}</h3>
                    <p className="text-zinc-400 text-sm mb-4">PDF Document</p>
                    <iframe
                      src={`${selectedMaterial.file_url}#toolbar=0&navpanes=0`}
                      className="w-full h-[600px] rounded-lg border border-white/10"
                      title={selectedMaterial.title}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#111111] border border-white/10 rounded-xl p-12 text-center">
                <p className="text-zinc-400">Select a material from the sidebar to view</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {videos.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Videos ({videos.length})
                </h3>
                <div className="space-y-2">
                  {videos.map((material) => (
                    <button
                      key={material.id}
                      onClick={() => setSelectedMaterial(material)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedMaterial?.id === material.id
                          ? "bg-red-500/20 border border-red-500/30"
                          : "bg-[#111111] border border-white/10 hover:bg-white/5"
                      }`}
                    >
                      <p className="text-white text-sm font-medium">{material.title}</p>
                      {material.day_number && (
                        <p className="text-zinc-500 text-xs">Day {material.day_number}</p>
                      )}
                      {material.duration && (
                        <p className="text-zinc-500 text-xs">{material.duration}</p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {pdfs.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  PDFs ({pdfs.length})
                </h3>
                <div className="space-y-2">
                  {pdfs.map((material) => (
                    <button
                      key={material.id}
                      onClick={() => setSelectedMaterial(material)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedMaterial?.id === material.id
                          ? "bg-red-500/20 border border-red-500/30"
                          : "bg-[#111111] border border-white/10 hover:bg-white/5"
                      }`}
                    >
                      <p className="text-white text-sm font-medium">{material.title}</p>
                      {material.day_number && (
                        <p className="text-zinc-500 text-xs">Day {material.day_number}</p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
