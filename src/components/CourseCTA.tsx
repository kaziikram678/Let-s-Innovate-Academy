import Link from "next/link"

interface CourseCTAProps {
  price: string
  oldPrice?: string
  enrollHref: string
  classFormat?: "live" | "recorded" | "hybrid"
  emailNotifications?: boolean
  startDate?: string
  meetingLink?: string
}

export default function CourseCTA({ price, oldPrice, enrollHref, classFormat, emailNotifications, startDate, meetingLink }: CourseCTAProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl font-bold text-slate-900">{price}</span>
        {oldPrice && (
          <span className="text-lg text-slate-400 line-through">{oldPrice}</span>
        )}
      </div>

      {oldPrice && (
        <div className="inline-flex items-center px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full mb-4">
          Discounted Price
        </div>
      )}

      {startDate && (
        <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-xs text-amber-700 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Starts: {startDate}
          </p>
        </div>
      )}

      <Link
        href={enrollHref}
        className="block w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-center font-semibold rounded-xl transition-all duration-200 mb-3"
      >
        Enroll Now
      </Link>

      <div className="space-y-2 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Lifetime access
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Practice resources included
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          WhatsApp support
        </div>
        {classFormat === "live" && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Live online classes
          </div>
        )}
        {emailNotifications && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email notifications for each class
          </div>
        )}
        {meetingLink && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <a href={meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 underline">
              Meeting Link
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
