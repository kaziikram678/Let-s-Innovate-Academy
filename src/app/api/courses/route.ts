import { NextRequest, NextResponse } from "next/server"
import { supabaseServer, isSupabaseConfigured } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    if (!isSupabaseConfigured || !supabaseServer) {
      return NextResponse.json({ success: true, courses: [], total: 0 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const slug = searchParams.get("slug")

    if (slug) {
      const { data, error } = await (supabaseServer as any)
        .from("courses")
        .select("*")
        .eq("slug", slug)
        .single()

      if (error) {
        if (error.code === "PGRST116") {
          return NextResponse.json({ success: true, course: null })
        }
        console.error("Supabase query error:", error)
        return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 })
      }

      return NextResponse.json({ success: true, course: data })
    }

    let query = (supabaseServer as any)
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false })

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ success: true, course: null })
      }
      console.error("Supabase query error:", error)
      return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
    }

    if (slug) {
      return NextResponse.json({ success: true, course: data })
    }

    return NextResponse.json({ success: true, courses: data || [], total: (data as any[])?.length || 0 })
  } catch (error) {
    console.error("Courses API error:", error)
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
      slug,
      title,
      subtitle,
      description,
      status,
      price,
      oldPrice,
      duration,
      lecturesCount,
      imageUrl,
      features,
      learnings,
      whoFor,
      curriculum,
      faqs,
      instructorSlug,
      language,
      support,
      paymentMethod,
      classFormat,
      classSchedule,
      emailNotifications,
      studentsCount,
      rating,
      startDate,
      endDate,
      meetingLink,
    } = body

    if (!slug || !title) {
      return NextResponse.json({ error: "Missing required fields: slug and title" }, { status: 400 })
    }

    const coursesTable = supabaseServer.from("courses") as any

    const { data, error } = await coursesTable
      .insert([{
        slug,
        title,
        subtitle: subtitle || null,
        description: description || null,
        status: status || "draft",
        price: price || 0,
        old_price: oldPrice || null,
        duration: duration || null,
        lectures_count: lecturesCount || 0,
        image_url: imageUrl || null,
        features: features || [],
        learnings: learnings || [],
        who_for: whoFor || [],
        curriculum: curriculum || [],
        faqs: faqs || [],
        instructor_slug: instructorSlug || null,
        language: language || "Bengali",
        support: support || null,
        payment_method: paymentMethod || null,
        class_format: classFormat || null,
        class_schedule: classSchedule || null,
        email_notifications: emailNotifications !== undefined ? emailNotifications : true,
        students_count: studentsCount || 0,
        rating: rating || 0,
        start_date: startDate || null,
        end_date: endDate || null,
        meeting_link: meetingLink || null,
      }])
      .select()
      .single()

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "A course with this slug already exists" }, { status: 409 })
      }
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
    }

    return NextResponse.json({ success: true, course: data }, { status: 201 })
  } catch (error) {
    console.error("Courses API error:", error)
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
      return NextResponse.json({ error: "Missing course id" }, { status: 400 })
    }

    const mappedUpdates: Record<string, any> = {}
    if (updates.slug !== undefined) mappedUpdates.slug = updates.slug
    if (updates.title !== undefined) mappedUpdates.title = updates.title
    if (updates.subtitle !== undefined) mappedUpdates.subtitle = updates.subtitle
    if (updates.description !== undefined) mappedUpdates.description = updates.description
    if (updates.status !== undefined) mappedUpdates.status = updates.status
    if (updates.price !== undefined) mappedUpdates.price = updates.price
    if (updates.oldPrice !== undefined) mappedUpdates.old_price = updates.oldPrice
    if (updates.duration !== undefined) mappedUpdates.duration = updates.duration
    if (updates.lecturesCount !== undefined) mappedUpdates.lectures_count = updates.lecturesCount
    if (updates.imageUrl !== undefined) mappedUpdates.image_url = updates.imageUrl
    if (updates.features !== undefined) mappedUpdates.features = updates.features
    if (updates.learnings !== undefined) mappedUpdates.learnings = updates.learnings
    if (updates.whoFor !== undefined) mappedUpdates.who_for = updates.whoFor
    if (updates.curriculum !== undefined) mappedUpdates.curriculum = updates.curriculum
    if (updates.faqs !== undefined) mappedUpdates.faqs = updates.faqs
    if (updates.instructorSlug !== undefined) mappedUpdates.instructor_slug = updates.instructorSlug
    if (updates.language !== undefined) mappedUpdates.language = updates.language
    if (updates.support !== undefined) mappedUpdates.support = updates.support
    if (updates.paymentMethod !== undefined) mappedUpdates.payment_method = updates.paymentMethod
    if (updates.classFormat !== undefined) mappedUpdates.class_format = updates.classFormat
    if (updates.classSchedule !== undefined) mappedUpdates.class_schedule = updates.classSchedule
    if (updates.emailNotifications !== undefined) mappedUpdates.email_notifications = updates.emailNotifications
    if (updates.studentsCount !== undefined) mappedUpdates.students_count = updates.studentsCount
    if (updates.rating !== undefined) mappedUpdates.rating = updates.rating
    if (updates.startDate !== undefined) mappedUpdates.start_date = updates.startDate
    if (updates.endDate !== undefined) mappedUpdates.end_date = updates.endDate
    if (updates.meetingLink !== undefined) mappedUpdates.meeting_link = updates.meetingLink

    const coursesTable = supabaseServer.from("courses") as any

    const { data, error } = await coursesTable
      .update(mappedUpdates)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Supabase update error:", error)
      return NextResponse.json({ error: "Failed to update course" }, { status: 500 })
    }

    return NextResponse.json({ success: true, course: data })
  } catch (error) {
    console.error("Courses API error:", error)
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
      return NextResponse.json({ error: "Missing course id" }, { status: 400 })
    }

    const coursesTable = supabaseServer.from("courses") as any

    const { error } = await coursesTable.delete().eq("id", id)

    if (error) {
      console.error("Supabase delete error:", error)
      return NextResponse.json({ error: "Failed to delete course" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Course deleted" })
  } catch (error) {
    console.error("Courses API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
