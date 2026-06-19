import { NextRequest, NextResponse } from "next/server"
import { supabaseServer, isSupabaseConfigured } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured || !supabaseServer) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const courseId = formData.get("courseId") as string
    const title = formData.get("title") as string
    const materialType = formData.get("materialType") as "video" | "pdf"
    const description = formData.get("description") as string
    const dayNumber = formData.get("dayNumber") as string
    const lessonOrder = formData.get("lessonOrder") as string
    const isPreview = formData.get("isPreview") === "true"

    if (!file || !courseId || !title || !materialType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const allowedTypes = materialType === "video"
      ? ["video/webm", "video/mp4", "video/quicktime"]
      : ["application/pdf"]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        error: `Invalid file type. Expected ${materialType === "video" ? "video (webm, mp4)" : "PDF"}`,
      }, { status: 400 })
    }

    const maxSize = materialType === "video" ? 100 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({
        error: `File too large. Max size: ${materialType === "video" ? "100MB" : "10MB"}`,
      }, { status: 400 })
    }

    const ext = file.name.split(".").pop()
    const fileName = `${courseId}/${Date.now()}-${title.replace(/[^a-zA-Z0-9]/g, "-")}.${ext}`
    const filePath = `course-materials/${fileName}`

    const fileBuffer = await file.arrayBuffer()

    const { data: uploadData, error: uploadError } = await supabaseServer.storage
      .from("course-materials")
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      })

    if (uploadError) {
      console.error("Supabase storage upload error:", uploadError)
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
    }

    const { data: urlData } = supabaseServer.storage
      .from("course-materials")
      .getPublicUrl(uploadData.path)

    const fileUrl = urlData.publicUrl

    const materialsTable = supabaseServer.from("course_materials") as any

    const { data, error } = await materialsTable
      .insert([{
        course_id: courseId,
        title,
        description: description || null,
        material_type: materialType,
        file_url: fileUrl,
        file_size: file.size,
        day_number: dayNumber ? parseInt(dayNumber) : null,
        lesson_order: lessonOrder ? parseInt(lessonOrder) : 0,
        is_preview: isPreview,
      }])
      .select()
      .single()

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: "Failed to save material record" }, { status: 500 })
    }

    return NextResponse.json({ success: true, material: data }, { status: 201 })
  } catch (error) {
    console.error("Upload API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
