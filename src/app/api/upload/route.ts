import { NextRequest, NextResponse } from "next/server"
import { supabaseServer, isSupabaseConfigured } from "@/lib/supabase"
import cloudinary from "@/lib/cloudinary"

export async function POST(request: NextRequest) {
  try {
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

    const fileBuffer = Buffer.from(await file.arrayBuffer())

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `course-materials/${courseId}`,
          resource_type: materialType === "video" ? "video" : "raw",
          use_filename: true,
          unique_filename: true,
          access_mode: "authenticated",
          ...(materialType === "video" && {
            eager: [
              { width: 1280, crop: "scale", video_codec: "h264" },
              { width: 854, crop: "scale", video_codec: "h264" },
              { width: 640, crop: "scale", video_codec: "h264" },
            ],
          }),
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
      uploadStream.end(fileBuffer)
    })

    let fileUrl = uploadResult.secure_url

    if (materialType === "video") {
      fileUrl = uploadResult.secure_url.replace("/upload/", "/upload/fl_attachment:no/")
    }

    if (!isSupabaseConfigured || !supabaseServer) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const materialsTable = supabaseServer.from("course_materials") as any

    const { data, error } = await materialsTable
      .insert([{
        course_id: courseId,
        title,
        description: description || null,
        material_type: materialType,
        file_url: fileUrl,
        file_size: uploadResult.bytes,
        duration: uploadResult.duration ? `${Math.floor(uploadResult.duration)}s` : null,
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
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
