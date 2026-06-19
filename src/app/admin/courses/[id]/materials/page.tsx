"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import type { CourseMaterial } from "@/types"

export default function CourseMaterialsPage() {
  const router = useRouter()
  const params = useParams()
  const { user, profile, loading } = useAuth()
  const courseId = params.id as string

  const [materials, setMaterials] = useState<CourseMaterial[]>([])
  const [uploading, setUploading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [courseTitle, setCourseTitle] = useState("")
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    materialType: "video" as "video" | "pdf",
    dayNumber: "",
    lessonOrder: "0",
    isPreview: false,
    file: null as File | null,
  })

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/signin?redirect=/admin/courses")
        return
      }
      if (profile && profile.role !== "admin") {
        router.push("/dashboard")
        return
      }
    }
  }, [user, profile, loading, router])

  useEffect(() => {
    if (profile?.role === "admin" && courseId) {
      fetchMaterials()
      fetchCourse()
    }
  }, [courseId, profile])

  const fetchCourse = async () => {
    try {
      const res = await fetch(`/api/courses?id=${courseId}`)
      const data = await res.json()
      if (data.course) {
        setCourseTitle(data.course.title)
      }
    } catch (error) {
      console.error("Failed to fetch course:", error)
    }
  }

  const fetchMaterials = async () => {
    try {
      const res = await fetch(`/api/courses/${courseId}/materials?courseId=${courseId}`)
      const data = await res.json()
      setMaterials(data.materials || [])
    } catch (error) {
      console.error("Failed to fetch materials:", error)
    } finally {
      setLoadingData(false)
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadForm.file) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", uploadForm.file)
      formData.append("courseId", courseId)
      formData.append("title", uploadForm.title)
      formData.append("materialType", uploadForm.materialType)
      formData.append("description", uploadForm.description)
      formData.append("dayNumber", uploadForm.dayNumber || "0")
      formData.append("lessonOrder", uploadForm.lessonOrder)
      formData.append("isPreview", uploadForm.isPreview.toString())

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        setUploadForm({
          title: "",
          description: "",
          materialType: "video",
          dayNumber: "",
          lessonOrder: "0",
          isPreview: false,
          file: null,
        })
        setShowUploadForm(false)
        fetchMaterials()
      }
    } catch (error) {
      console.error("Failed to upload:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (materialId: string, fileUrl: string) => {
    if (!confirm("Delete this material? This cannot be undone.")) return

    try {
      const res = await fetch(`/api/courses/${courseId}/materials?id=${materialId}`, { method: "DELETE" })
      if (res.ok) {
        setMaterials(materials.filter(m => m.id !== materialId))
      }
    } catch (error) {
      console.error("Failed to delete material:", error)
    }
  }

  if (loading || !profile || profile.role !== "admin") {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-zinc-400 text-sm mb-1">
              <button onClick={() => router.push("/admin/courses")} className="hover:text-white">
                Courses
              </button>
              <span>/</span>
              <span className="text-white">{courseTitle}</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Course Materials</h1>
          </div>
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m0 0l4 4m0 0l4-4" />
            </svg>
            Upload Material
          </button>
        </div>

        {showUploadForm && (
          <form onSubmit={handleUpload} className="bg-[#111111] border border-white/10 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Upload New Material</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Type *</label>
                <select
                  value={uploadForm.materialType}
                  onChange={(e) => setUploadForm({ ...uploadForm, materialType: e.target.value as "video" | "pdf" })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                >
                  <option value="video">Video (webm/mp4)</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Day Number</label>
                <input
                  type="number"
                  value={uploadForm.dayNumber}
                  onChange={(e) => setUploadForm({ ...uploadForm, dayNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Order</label>
                <input
                  type="number"
                  value={uploadForm.lessonOrder}
                  onChange={(e) => setUploadForm({ ...uploadForm, lessonOrder: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-zinc-400 text-sm mb-1">Description</label>
                <input
                  type="text"
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-zinc-400 text-sm mb-1">File *</label>
                <input
                  type="file"
                  required
                  accept={uploadForm.materialType === "video" ? "video/*" : ".pdf"}
                  onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files?.[0] || null })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
                <p className="text-zinc-500 text-xs mt-1">
                  Max: {uploadForm.materialType === "video" ? "100MB" : "10MB"}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-zinc-400">
                  <input
                    type="checkbox"
                    checked={uploadForm.isPreview}
                    onChange={(e) => setUploadForm({ ...uploadForm, isPreview: e.target.checked })}
                    className="rounded border-white/20 bg-[#0a0a0a]"
                  />
                  Mark as preview (visible to non-enrolled users)
                </label>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={uploading}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 text-white font-medium rounded-lg transition-colors"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {loadingData ? (
          <div className="text-center py-12 text-zinc-400">Loading materials...</div>
        ) : materials.length === 0 ? (
          <div className="text-center py-12 bg-[#111111] border border-white/10 rounded-xl">
            <p className="text-zinc-400 mb-4">No materials uploaded yet</p>
            <button
              onClick={() => setShowUploadForm(true)}
              className="text-red-400 hover:text-red-300"
            >
              Upload your first material
            </button>
          </div>
        ) : (
          <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="text-left px-4 py-3 text-zinc-400 text-sm font-medium">Title</th>
                  <th className="text-left px-4 py-3 text-zinc-400 text-sm font-medium">Type</th>
                  <th className="text-left px-4 py-3 text-zinc-400 text-sm font-medium">Day</th>
                  <th className="text-left px-4 py-3 text-zinc-400 text-sm font-medium">Preview</th>
                  <th className="text-left px-4 py-3 text-zinc-400 text-sm font-medium">Size</th>
                  <th className="text-right px-4 py-3 text-zinc-400 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => (
                  <tr key={material.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-4 py-3">
                      <p className="text-white font-medium">{material.title}</p>
                      {material.description && <p className="text-zinc-500 text-sm">{material.description}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        material.material_type === "video" ? "bg-blue-500/20 text-blue-400" : "bg-orange-500/20 text-orange-400"
                      }`}>
                        {material.material_type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-400">
                      {material.day_number ? `Day ${material.day_number}` : "-"}
                    </td>
                    <td className="px-4 py-3">
                      {material.is_preview ? (
                        <span className="text-green-400 text-sm">Yes</span>
                      ) : (
                        <span className="text-zinc-500 text-sm">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-zinc-400">
                      {material.file_size ? `${(material.file_size / 1024 / 1024).toFixed(1)} MB` : "-"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(material.id, material.file_url)}
                        className="px-3 py-1 text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
