"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import type { EmailTemplate, SentEmail, DBCourse } from "@/types"

export default function AdminEmails() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()

  const [activeTab, setActiveTab] = useState<"templates" | "send" | "history">("templates")
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [sentEmails, setSentEmails] = useState<SentEmail[]>([])
  const [courses, setCourses] = useState<DBCourse[]>([])
  const [loadingData, setLoadingData] = useState(true)

  const [editTemplate, setEditTemplate] = useState<EmailTemplate | null>(null)
  const [showNewTemplate, setShowNewTemplate] = useState(false)

  const [sendForm, setSendForm] = useState({
    mode: "template" as "template" | "custom" | "bulk",
    templateId: "",
    recipientEmail: "",
    recipientName: "",
    subject: "",
    body: "",
    courseSlug: "",
    variables: {} as Record<string, string>,
  })
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/signin?redirect=/admin/emails")
        return
      }
      if (profile && profile.role !== "admin") {
        router.push("/dashboard")
        return
      }
    }
  }, [user, profile, loading, router])

  useEffect(() => {
    if (profile?.role === "admin") {
      fetchData()
    }
  }, [profile])

  const fetchData = async () => {
    try {
      const [templatesRes, emailsRes, coursesRes] = await Promise.all([
        fetch("/api/emails?templates=true"),
        fetch("/api/emails?sent=true"),
        fetch("/api/courses"),
      ])

      const templatesData = await templatesRes.json()
      const emailsData = await emailsRes.json()
      const coursesData = await coursesRes.json()

      setTemplates(templatesData.templates || [])
      setSentEmails(emailsData.emails || [])
      setCourses(coursesData.courses || [])
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoadingData(false)
    }
  }

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    try {
      let action = "send-custom"
      let body: any = {}

      if (sendForm.mode === "template") {
        action = "send-template"
        body = {
          action,
          templateId: sendForm.templateId,
          recipientEmail: sendForm.recipientEmail,
          recipientName: sendForm.recipientName,
          variables: sendForm.variables,
        }
      } else if (sendForm.mode === "custom") {
        action = "send-custom"
        body = {
          action,
          recipientEmail: sendForm.recipientEmail,
          recipientName: sendForm.recipientName,
          subject: sendForm.subject,
          body: sendForm.body,
        }
      } else if (sendForm.mode === "bulk") {
        action = "send-to-all-enrolled"
        body = {
          action,
          courseSlug: sendForm.courseSlug,
          subject: sendForm.subject,
          body: sendForm.body,
        }
      }

      const res = await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        alert("Email sent successfully!")
        setSendForm({
          mode: sendForm.mode,
          templateId: "",
          recipientEmail: "",
          recipientName: "",
          subject: "",
          body: "",
          courseSlug: "",
          variables: {},
        })
        fetchData()
      }
    } catch (error) {
      console.error("Failed to send email:", error)
    } finally {
      setSending(false)
    }
  }

  const handleSaveTemplate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editTemplate) return

    try {
      const action = editTemplate.id ? "update-template" : "create-template"
      const res = await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          id: editTemplate.id,
          name: editTemplate.name,
          subject: editTemplate.subject,
          body: editTemplate.body,
          templateType: editTemplate.type,
          isActive: editTemplate.is_active,
        }),
      })

      if (res.ok) {
        setEditTemplate(null)
        setShowNewTemplate(false)
        fetchData()
      }
    } catch (error) {
      console.error("Failed to save template:", error)
    }
  }

  if (loading || !profile || profile.role !== "admin") {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Email Center</h1>
          <p className="text-zinc-400 mt-1">Manage email templates, send emails, and view history</p>
        </div>

        <div className="flex gap-4 mb-8 border-b border-white/10">
          {(["templates", "send", "history"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "text-red-400 border-b-2 border-red-400"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab === "templates" ? "Templates" : tab === "send" ? "Send Email" : "Sent History"}
            </button>
          ))}
        </div>

        {loadingData ? (
          <div className="text-center py-12 text-zinc-400">Loading...</div>
        ) : (
          <>
            {activeTab === "templates" && (
              <div>
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => {
                      setEditTemplate({
                        id: "",
                        name: "",
                        subject: "",
                        body: "",
                        type: "custom",
                        variables: [],
                        is_active: true,
                        created_at: "",
                        updated_at: "",
                      })
                      setShowNewTemplate(true)
                    }}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
                  >
                    New Template
                  </button>
                </div>

                {showNewTemplate && editTemplate && (
                  <form onSubmit={handleSaveTemplate} className="bg-[#111111] border border-white/10 rounded-xl p-6 mb-6">
                    <h2 className="text-xl font-semibold text-white mb-4">
                      {editTemplate.id ? "Edit Template" : "New Template"}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-zinc-400 text-sm mb-1">Name *</label>
                        <input
                          type="text"
                          required
                          value={editTemplate.name}
                          onChange={(e) => setEditTemplate({ ...editTemplate, name: e.target.value })}
                          className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 text-sm mb-1">Type *</label>
                        <select
                          value={editTemplate.type}
                          onChange={(e) => setEditTemplate({ ...editTemplate, type: e.target.value as EmailTemplate["type"] })}
                          className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                        >
                          <option value="verification">Verification</option>
                          <option value="start_date">Start Date</option>
                          <option value="class_date">Class Date</option>
                          <option value="meeting_link">Meeting Link</option>
                          <option value="notice">Notice</option>
                          <option value="custom">Custom</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-zinc-400 text-sm mb-1">Subject *</label>
                        <input
                          type="text"
                          required
                          value={editTemplate.subject}
                          onChange={(e) => setEditTemplate({ ...editTemplate, subject: e.target.value })}
                          placeholder="Use {{variable_name}} for dynamic content"
                          className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-zinc-400 text-sm mb-1">Body *</label>
                        <textarea
                          required
                          rows={8}
                          value={editTemplate.body}
                          onChange={(e) => setEditTemplate({ ...editTemplate, body: e.target.value })}
                          placeholder="Use {{student_name}}, {{course_title}}, {{start_date}}, {{meeting_link}}, {{brand_name}}"
                          className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button type="submit" className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors">
                        Save Template
                      </button>
                      <button
                        type="button"
                        onClick={() => { setEditTemplate(null); setShowNewTemplate(false) }}
                        className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid gap-4">
                  {templates.map((template) => (
                    <div key={template.id} className="bg-[#111111] border border-white/10 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-white font-semibold">{template.name}</h3>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                            template.is_active ? "bg-green-500/20 text-green-400" : "bg-zinc-500/20 text-zinc-400"
                          }`}>
                            {template.type}
                          </span>
                        </div>
                        <button
                          onClick={() => { setEditTemplate(template); setShowNewTemplate(false) }}
                          className="px-3 py-1 text-sm bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-zinc-400 text-sm mb-2">{template.subject}</p>
                      <p className="text-zinc-500 text-sm line-clamp-2">{template.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "send" && (
              <form onSubmit={handleSendEmail} className="bg-[#111111] border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Send Email</h2>

                <div className="flex gap-4 mb-6">
                  {(["template", "custom", "bulk"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setSendForm({ ...sendForm, mode })}
                      className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                        sendForm.mode === mode
                          ? "bg-red-500 text-white"
                          : "bg-white/5 text-zinc-400 hover:bg-white/10"
                      }`}
                    >
                      {mode === "template" ? "From Template" : mode === "custom" ? "Custom Email" : "Bulk to Course"}
                    </button>
                  ))}
                </div>

                {sendForm.mode === "template" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-zinc-400 text-sm mb-1">Template *</label>
                        <select
                          required
                          value={sendForm.templateId}
                          onChange={(e) => setSendForm({ ...sendForm, templateId: e.target.value })}
                          className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                        >
                          <option value="">Select template</option>
                          {templates.map((t) => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-zinc-400 text-sm mb-1">Recipient Email *</label>
                        <input
                          type="email"
                          required
                          value={sendForm.recipientEmail}
                          onChange={(e) => setSendForm({ ...sendForm, recipientEmail: e.target.value })}
                          className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 text-sm mb-1">Recipient Name</label>
                        <input
                          type="text"
                          value={sendForm.recipientName}
                          onChange={(e) => setSendForm({ ...sendForm, recipientName: e.target.value })}
                          className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-4 mb-4">
                      <p className="text-zinc-400 text-sm mb-2">Template Variables (fill to replace placeholders):</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {["student_name", "course_title", "start_date", "meeting_link", "class_date", "class_time", "brand_name", "notice_message"].map((v) => (
                          <input
                            key={v}
                            type="text"
                            placeholder={v}
                            value={sendForm.variables[v] || ""}
                            onChange={(e) => setSendForm({
                              ...sendForm,
                              variables: { ...sendForm.variables, [v]: e.target.value },
                            })}
                            className="px-3 py-2 bg-[#111111] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-red-500"
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {sendForm.mode === "custom" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-zinc-400 text-sm mb-1">Recipient Email *</label>
                      <input
                        type="email"
                        required
                        value={sendForm.recipientEmail}
                        onChange={(e) => setSendForm({ ...sendForm, recipientEmail: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 text-sm mb-1">Recipient Name</label>
                      <input
                        type="text"
                        value={sendForm.recipientName}
                        onChange={(e) => setSendForm({ ...sendForm, recipientName: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-zinc-400 text-sm mb-1">Subject *</label>
                      <input
                        type="text"
                        required
                        value={sendForm.subject}
                        onChange={(e) => setSendForm({ ...sendForm, subject: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-zinc-400 text-sm mb-1">Body *</label>
                      <textarea
                        required
                        rows={8}
                        value={sendForm.body}
                        onChange={(e) => setSendForm({ ...sendForm, body: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                )}

                {sendForm.mode === "bulk" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="md:col-span-2">
                      <label className="block text-zinc-400 text-sm mb-1">Course *</label>
                      <select
                        required
                        value={sendForm.courseSlug}
                        onChange={(e) => setSendForm({ ...sendForm, courseSlug: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                      >
                        <option value="">Select course</option>
                        {courses.map((c) => (
                          <option key={c.id} value={c.slug}>{c.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-zinc-400 text-sm mb-1">Subject *</label>
                      <input
                        type="text"
                        required
                        value={sendForm.subject}
                        onChange={(e) => setSendForm({ ...sendForm, subject: e.target.value })}
                        placeholder="Use {{course_title}} for dynamic content"
                        className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-zinc-400 text-sm mb-1">Body *</label>
                      <textarea
                        required
                        rows={8}
                        value={sendForm.body}
                        onChange={(e) => setSendForm({ ...sendForm, body: e.target.value })}
                        placeholder="Use {{student_name}}, {{course_title}}, {{meeting_link}}, {{brand_name}}"
                        className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 text-white font-medium rounded-lg transition-colors"
                >
                  {sending ? "Sending..." : "Send Email"}
                </button>
              </form>
            )}

            {activeTab === "history" && (
              <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
                {sentEmails.length === 0 ? (
                  <div className="text-center py-12 text-zinc-400">No emails sent yet</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-white/10">
                        <tr>
                          <th className="text-left px-4 py-3 text-zinc-400 text-sm font-medium">Recipient</th>
                          <th className="text-left px-4 py-3 text-zinc-400 text-sm font-medium">Subject</th>
                          <th className="text-left px-4 py-3 text-zinc-400 text-sm font-medium">Type</th>
                          <th className="text-left px-4 py-3 text-zinc-400 text-sm font-medium">Status</th>
                          <th className="text-left px-4 py-3 text-zinc-400 text-sm font-medium">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sentEmails.map((email) => (
                          <tr key={email.id} className="border-b border-white/5 hover:bg-white/5">
                            <td className="px-4 py-3">
                              <p className="text-white text-sm">{email.recipient_email}</p>
                              {email.recipient_name && <p className="text-zinc-500 text-xs">{email.recipient_name}</p>}
                            </td>
                            <td className="px-4 py-3 text-white text-sm max-w-xs truncate">{email.subject}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 text-xs rounded-full bg-zinc-500/20 text-zinc-400">
                                {email.type}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                email.status === "sent" ? "bg-green-500/20 text-green-400" :
                                email.status === "failed" ? "bg-red-500/20 text-red-400" :
                                "bg-yellow-500/20 text-yellow-400"
                              }`}>
                                {email.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-zinc-400 text-sm">
                              {email.sent_at ? new Date(email.sent_at).toLocaleDateString() : "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
