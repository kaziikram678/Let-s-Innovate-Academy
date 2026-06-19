import { NextRequest, NextResponse } from "next/server"
import { supabaseServer, isSupabaseConfigured } from "@/lib/supabase"
import { resend, fromEmail } from "@/lib/resend"
import { siteConfig } from "@/data/site"

export async function GET(request: NextRequest) {
  try {
    if (!isSupabaseConfigured || !supabaseServer) {
      return NextResponse.json({ success: true, emails: [], templates: [], total: 0 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const getTemplates = searchParams.get("templates") === "true"
    const getSentEmails = searchParams.get("sent") === "true"

    const result: any = { success: true }

    if (getTemplates) {
      const { data: templates, error: templatesError } = await (supabaseServer as any)
        .from("email_templates")
        .select("*")
        .order("created_at", { ascending: false })

      if (templatesError) {
        console.error("Supabase templates error:", templatesError)
        return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 })
      }

      result.templates = templates || []
    }

    if (getSentEmails) {
      let query = (supabaseServer as any)
        .from("emails")
        .select("*, courses(title), email_templates(name)")
        .order("created_at", { ascending: false })

      if (type && type !== "all") {
        query = query.eq("type", type)
      }

      const { data: emails, error: emailsError } = await query

      if (emailsError) {
        console.error("Supabase emails error:", emailsError)
        return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 })
      }

      result.emails = emails || []
      result.total = (emails as any[])?.length || 0
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Emails API error:", error)
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
      action,
      templateId,
      recipientEmail,
      recipientName,
      subject,
      body: emailBody,
      type,
      courseId,
      enrollmentId,
      courseSlug,
      variables,
    } = body

    if (action === "send-template") {
      if (!templateId || !recipientEmail) {
        return NextResponse.json({ error: "Missing templateId or recipientEmail" }, { status: 400 })
      }

      const { data: template, error: templateError } = await (supabaseServer as any)
        .from("email_templates")
        .select("*")
        .eq("id", templateId)
        .single()

      if (templateError || !template) {
        return NextResponse.json({ error: "Template not found" }, { status: 404 })
      }

      let processedSubject = template.subject as string
      let processedBody = template.body as string

      if (variables) {
        for (const [key, value] of Object.entries(variables)) {
          const placeholder = `{{${key}}}`
          processedSubject = processedSubject.replace(new RegExp(placeholder, "g"), String(value))
          processedBody = processedBody.replace(new RegExp(placeholder, "g"), String(value))
        }
      }

      processedSubject = processedSubject.replace(/\{\{[^}]+\}\}/g, "")
      processedBody = processedBody.replace(/\{\{[^}]+\}\}/g, "N/A")

      if (!resend) {
        const { data: emailRecord, error: insertError } = await (supabaseServer as any)
          .from("emails")
          .insert([{
            template_id: templateId,
            recipient_email: recipientEmail,
            recipient_name: recipientName || null,
            subject: processedSubject,
            body: processedBody,
            type: template.type,
            course_id: courseId || null,
            enrollment_id: enrollmentId || null,
            status: "failed",
            error_message: "Resend API not configured",
          }])
          .select()
          .single()

        return NextResponse.json({ success: false, error: "Email service not configured", email: emailRecord }, { status: 503 })
      }

      const { error: sendError } = await resend.emails.send({
        from: fromEmail,
        to: recipientEmail,
        subject: processedSubject,
        html: processedBody.replace(/\n/g, "<br/>"),
      })

      const emailStatus = sendError ? "failed" : "sent"
      const errorMessage = sendError ? sendError.message : null

      const { data: emailRecord } = await (supabaseServer as any)
        .from("emails")
        .insert([{
          template_id: templateId,
          recipient_email: recipientEmail,
          recipient_name: recipientName || null,
          subject: processedSubject,
          body: processedBody,
          type: template.type,
          course_id: courseId || null,
          enrollment_id: enrollmentId || null,
          status: emailStatus,
          sent_at: emailStatus === "sent" ? new Date().toISOString() : null,
          error_message: errorMessage,
        }])
        .select()
        .single()

      if (sendError) {
        return NextResponse.json({ success: false, error: sendError.message, email: emailRecord }, { status: 500 })
      }

      return NextResponse.json({ success: true, email: emailRecord }, { status: 201 })
    }

    if (action === "send-custom") {
      if (!recipientEmail || !subject || !emailBody) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
      }

      if (!resend) {
        return NextResponse.json({ error: "Email service not configured" }, { status: 503 })
      }

      const { error: sendError } = await resend.emails.send({
        from: fromEmail,
        to: recipientEmail,
        subject,
        html: emailBody.replace(/\n/g, "<br/>"),
      })

      const emailStatus = sendError ? "failed" : "sent"
      const errorMessage = sendError ? sendError.message : null

      const { data: emailRecord } = await (supabaseServer as any)
        .from("emails")
        .insert([{
          template_id: null,
          recipient_email: recipientEmail,
          recipient_name: recipientName || null,
          subject,
          body: emailBody,
          type: type || "custom",
          course_id: courseId || null,
          enrollment_id: enrollmentId || null,
          status: emailStatus,
          sent_at: emailStatus === "sent" ? new Date().toISOString() : null,
          error_message: errorMessage,
        }])
        .select()
        .single()

      if (sendError) {
        return NextResponse.json({ success: false, error: sendError.message, email: emailRecord }, { status: 500 })
      }

      return NextResponse.json({ success: true, email: emailRecord }, { status: 201 })
    }

    if (action === "send-to-all-enrolled") {
      if (!courseSlug || !subject || !emailBody) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
      }

      const { data: course } = await (supabaseServer as any)
        .from("courses")
        .select("id, title")
        .eq("slug", courseSlug)
        .single()

      if (!course) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 })
      }

      const { data: enrollments } = await (supabaseServer as any)
        .from("enrollments")
        .select("email, full_name, id")
        .eq("course_slug", courseSlug)
        .eq("status", "verified")

      if (!enrollments || enrollments.length === 0) {
        return NextResponse.json({ success: true, sent: 0, message: "No verified enrollments found" })
      }

      const results = []
      for (const enrollment of enrollments) {
        if (!resend) continue

        const { error: sendError } = await resend.emails.send({
          from: fromEmail,
          to: enrollment.email,
          subject: subject.replace(/\{\{course_title\}\}/g, course.title),
          html: emailBody
            .replace(/\{\{course_title\}\}/g, course.title)
            .replace(/\{\{student_name\}\}/g, enrollment.full_name)
            .replace(/\{\{brand_name\}\}/g, siteConfig.name)
            .replace(/\n/g, "<br/>"),
        })

        const emailStatus = sendError ? "failed" : "sent"

        await (supabaseServer as any)
          .from("emails")
          .insert([{
            recipient_email: enrollment.email,
            recipient_name: enrollment.full_name,
            subject: subject.replace(/\{\{course_title\}\}/g, course.title),
            body: emailBody,
            type: type || "notice",
            course_id: course.id,
            enrollment_id: enrollment.id,
            status: emailStatus,
            sent_at: emailStatus === "sent" ? new Date().toISOString() : null,
            error_message: sendError?.message || null,
          }])

        results.push({ email: enrollment.email, status: emailStatus })
      }

      return NextResponse.json({ success: true, sent: results.filter(r => r.status === "sent").length, results })
    }

    if (action === "create-template" || action === "update-template") {
      const { id, name, subject: tplSubject, body: tplBody, templateType, isActive } = body

      if (!name || !tplSubject || !tplBody || !templateType) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
      }

      const templatesTable = supabaseServer.from("email_templates") as any

      if (action === "create-template") {
        const { data, error } = await templatesTable
          .insert([{
            name,
            subject: tplSubject,
            body: tplBody,
            type: templateType,
            is_active: isActive !== undefined ? isActive : true,
          }])
          .select()
          .single()

        if (error) {
          console.error("Supabase insert error:", error)
          return NextResponse.json({ error: "Failed to create template" }, { status: 500 })
        }

        return NextResponse.json({ success: true, template: data }, { status: 201 })
      } else {
        if (!id) {
          return NextResponse.json({ error: "Missing template id" }, { status: 400 })
        }

        const { data, error } = await templatesTable
          .update({
            name,
            subject: tplSubject,
            body: tplBody,
            type: templateType,
            is_active: isActive !== undefined ? isActive : true,
          })
          .eq("id", id)
          .select()
          .single()

        if (error) {
          console.error("Supabase update error:", error)
          return NextResponse.json({ error: "Failed to update template" }, { status: 500 })
        }

        return NextResponse.json({ success: true, template: data })
      }
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Emails API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    if (!isSupabaseConfigured || !supabaseServer) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const body = await request.json()
    const { id, status, errorMessage } = body

    if (!id || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const updates: Record<string, any> = { status }
    if (status === "sent") {
      updates.sent_at = new Date().toISOString()
    }
    if (errorMessage) {
      updates.error_message = errorMessage
    }

    const { data, error } = await (supabaseServer as any)
      .from("emails")
      .update(updates)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Supabase update error:", error)
      return NextResponse.json({ error: "Failed to update email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, email: data })
  } catch (error) {
    console.error("Emails API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
