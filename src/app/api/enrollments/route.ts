import { NextRequest, NextResponse } from "next/server"
import { supabaseServer, isSupabaseConfigured, supabaseClient } from "@/lib/supabase"
import { resend, fromEmail } from "@/lib/resend"
import { siteConfig } from "@/data/site"

interface EnrollmentRow {
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
  user_id: string | null
  created_at: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      courseSlug,
      courseTitle,
      fullName,
      phone,
      email,
      transactionId,
      bkashNumber,
      message,
      userId,
    } = body

    if (!courseSlug || !fullName || !phone || !email || !transactionId || !bkashNumber) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    if (!isSupabaseConfigured || !supabaseServer) {
      console.error("Supabase not configured. Set up environment variables.")
      return NextResponse.json(
        { error: "Database not configured. Please contact admin." },
        { status: 503 }
      )
    }

    const { data: existingEnrollment } = await supabaseServer
      .from("enrollments")
      .select("id")
      .eq("transaction_id", transactionId)
      .single()

    if (existingEnrollment) {
      return NextResponse.json(
        { error: "This transaction ID has already been used" },
        { status: 409 }
      )
    }

    const enrollmentsTable = supabaseServer.from("enrollments") as any

    const { data: newEnrollment, error: insertError } = await enrollmentsTable
      .insert([{
        course_slug: courseSlug,
        course_title: courseTitle,
        full_name: fullName,
        phone,
        email,
        transaction_id: transactionId,
        bkash_number: bkashNumber,
        message: message || null,
        status: "pending",
        user_id: userId || null,
      }])
      .select()
      .single()

    if (insertError) {
      console.error("Supabase insert error:", insertError)
      return NextResponse.json(
        { error: "Failed to save enrollment" },
        { status: 500 }
      )
    }

    if (resend) {
      try {
        await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: `Enrollment Confirmed - ${courseTitle}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #4f46e5;">Welcome to ${siteConfig.name}!</h2>
              <p>Hi ${fullName},</p>
              <p>Thank you for enrolling in <strong>${courseTitle}</strong>.</p>
              <p>Your enrollment has been received and is currently being verified. Here are your details:</p>
              
              <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">
                <p><strong>Course:</strong> ${courseTitle}</p>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Transaction ID:</strong> ${transactionId}</p>
              </div>

              <h3 style="color: #4f46e5;">What happens next?</h3>
              <ol>
                <li>We will verify your payment within 24 hours</li>
                <li>You will receive an email with the live class schedule and links</li>
                <li>Before each class, you will get an email with instructions and the meeting link</li>
              </ol>

              <p>If you have any questions, feel free to reach out to us on WhatsApp: <a href="https://wa.me/${siteConfig.whatsapp.replace('+', '')}">${siteConfig.whatsapp}</a></p>
              
              <p>Best regards,<br/>${siteConfig.name} Team</p>
            </div>
          `,
        })
        console.log("Confirmation email sent to:", email)
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError)
      }
    }

    if (resend && siteConfig.email) {
      try {
        await resend.emails.send({
          from: fromEmail,
          to: siteConfig.email,
          subject: `New Enrollment: ${courseTitle} - ${fullName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #4f46e5;">New Enrollment Received</h2>
              
              <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">
                <p><strong>Course:</strong> ${courseTitle}</p>
                <p><strong>Student Name:</strong> ${fullName}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Transaction ID:</strong> ${transactionId}</p>
                <p><strong>bKash Number:</strong> ${bkashNumber}</p>
                ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
              </div>

              <p>Verify the payment and update the enrollment status in the admin dashboard.</p>
              <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/enrollments" style="background: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">View in Admin Dashboard</a></p>
            </div>
          `,
        })
        console.log("Admin notification email sent to:", siteConfig.email)
      } catch (emailError) {
        console.error("Failed to send admin notification email:", emailError)
      }
    }

    return NextResponse.json(
      {
        success: true,
        enrollment: newEnrollment,
        message: "Enrollment submitted successfully. You will receive class details via email.",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Enrollment API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!isSupabaseConfigured || !supabaseServer) {
      return NextResponse.json({
        success: true,
        enrollments: [],
        total: 0,
      })
    }

    const { searchParams } = new URL(request.url)
    const courseSlug = searchParams.get("courseSlug")
    const status = searchParams.get("status")
    const userId = searchParams.get("userId")

    let query = supabaseServer
      .from("enrollments")
      .select("*")
      .order("created_at", { ascending: false })

    if (userId) {
      query = query.eq("user_id", userId)
    }

    if (courseSlug) {
      query = query.eq("course_slug", courseSlug)
    }

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    const { data: enrollments, error } = await query

    if (error) {
      console.error("Supabase query error:", error)
      return NextResponse.json(
        { error: "Failed to fetch enrollments" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      enrollments: enrollments as EnrollmentRow[] || [],
      total: enrollments?.length || 0,
    })
  } catch (error) {
    console.error("Enrollment API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    if (!isSupabaseConfigured || !supabaseServer) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing required fields: id and status" },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServer
      .from("enrollments")
      .update({ status } as unknown as Partial<EnrollmentRow>)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Supabase update error:", error)
      return NextResponse.json(
        { error: "Failed to update enrollment" },
        { status: 500 }
      )
    }

    const enrollmentData = data as EnrollmentRow

    if (status === "verified" && resend) {
      try {
        await resend.emails.send({
          from: fromEmail,
          to: enrollmentData.email,
          subject: `Payment Verified - ${enrollmentData.course_title}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #10b981;">Payment Verified!</h2>
              <p>Hi ${enrollmentData.full_name},</p>
              <p>Your payment for <strong>${enrollmentData.course_title}</strong> has been verified successfully.</p>
              <p>You will receive an email with the live class schedule, meeting links, and instructions before each session.</p>
              <p>If you have any questions, contact us on WhatsApp: <a href="https://wa.me/${siteConfig.whatsapp.replace('+', '')}">${siteConfig.whatsapp}</a></p>
              <p>Best regards,<br/>${siteConfig.name} Team</p>
            </div>
          `,
        })
        console.log("Verification email sent to:", enrollmentData.email)
      } catch (emailError) {
        console.error("Failed to send verification email:", emailError)
      }
    }

    return NextResponse.json({
      success: true,
      enrollment: data,
    })
  } catch (error) {
    console.error("Enrollment API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
