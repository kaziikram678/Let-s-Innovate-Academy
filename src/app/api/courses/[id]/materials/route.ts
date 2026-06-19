import { NextRequest, NextResponse } from "next/server"
import { supabaseServer, isSupabaseConfigured } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    if (!isSupabaseConfigured || !supabaseServer) {
      return NextResponse.json({ success: true, materials: [], total: 0 })
    }

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get("courseId")
    const materialId = searchParams.get("id")

    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 })
    }

    if (materialId) {
      const { data, error } = await supabaseServer
        .from("course_materials")
        .select("*")
        .eq("id", materialId)
        .eq("course_id", courseId)
        .single()

      if (error) {
        return NextResponse.json({ error: "Material not found" }, { status: 404 })
      }

      return NextResponse.json({ success: true, material: data })
    }

    const { data, error } = await supabaseServer
      .from("course_materials")
      .select("*")
      .eq("course_id", courseId)
      .order("day_number", { ascending: true })
      .order("lesson_order", { ascending: true })

    if (error) {
      console.error("Supabase query error:", error)
      return NextResponse.json({ error: "Failed to fetch materials" }, { status: 500 })
    }

    return NextResponse.json({ success: true, materials: data || [], total: (data as any[])?.length || 0 })
  } catch (error) {
    console.error("Materials API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured || !supabaseServer) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const body = await request.json()
    const {
      courseId,
      title,
      description,
      materialType,
      fileUrl,
      fileSize,
      duration,
      dayNumber,
      lessonOrder,
      isPreview,
    } = body

    if (!courseId || !title || !materialType || !fileUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const materialsTable = supabaseServer.from("course_materials") as any

    const { data, error } = await materialsTable
      .insert([{
        course_id: courseId,
        title,
        description: description || null,
        material_type: materialType,
        file_url: fileUrl,
        file_size: fileSize || null,
        duration: duration || null,
        day_number: dayNumber || null,
        lesson_order: lessonOrder || 0,
        is_preview: isPreview || false,
      }])
      .select()
      .single()

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: "Failed to create material" }, { status: 500 })
    }

    return NextResponse.json({ success: true, material: data }, { status: 201 })
  } catch (error) {
    console.error("Materials API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    if (!isSupabaseConfigured || !supabaseServer) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: "Missing material id" }, { status: 400 })
    }

    const mappedUpdates: Record<string, any> = {}
    if (updates.title !== undefined) mappedUpdates.title = updates.title
    if (updates.description !== undefined) mappedUpdates.description = updates.description
    if (updates.materialType !== undefined) mappedUpdates.material_type = updates.materialType
    if (updates.fileUrl !== undefined) mappedUpdates.file_url = updates.fileUrl
    if (updates.fileSize !== undefined) mappedUpdates.file_size = updates.fileSize
    if (updates.duration !== undefined) mappedUpdates.duration = updates.duration
    if (updates.dayNumber !== undefined) mappedUpdates.day_number = updates.dayNumber
    if (updates.lessonOrder !== undefined) mappedUpdates.lesson_order = updates.lessonOrder
    if (updates.isPreview !== undefined) mappedUpdates.is_preview = updates.isPreview

    const materialsTable = supabaseServer.from("course_materials") as any

    const { data, error } = await materialsTable
      .update(mappedUpdates)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Supabase update error:", error)
      return NextResponse.json({ error: "Failed to update material" }, { status: 500 })
    }

    return NextResponse.json({ success: true, material: data })
  } catch (error) {
    console.error("Materials API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!isSupabaseConfigured || !supabaseServer) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing material id" }, { status: 400 })
    }

    const materialsTable = supabaseServer.from("course_materials") as any

    const { error } = await materialsTable.delete().eq("id", id)

    if (error) {
      console.error("Supabase delete error:", error)
      return NextResponse.json({ error: "Failed to delete material" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Material deleted" })
  } catch (error) {
    console.error("Materials API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
