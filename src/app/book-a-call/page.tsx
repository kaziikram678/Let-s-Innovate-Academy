import type { Metadata } from "next"
import Link from "next/link"
import Badge from "@/components/Badge"
import CTASection from "@/components/CTASection"
import { siteConfig } from "@/data/site"

export const metadata: Metadata = {
  title: "Book a Call | Md Ikram - Schedule a Project Discussion",
  description: "Book a 30-minute call with Md Ikram to discuss your video editing, content creation, or graphics design project.",
}

const discussionTopics = [
  "Project type",
  "Video length and style",
  "Deadline",
  "Budget",
  "References",
  "Delivery format",
]

const preparationSteps = [
  "Prepare your raw footage or sample links",
  "Share reference videos",
  "Decide your target platform",
  "Mention your deadline",
  "Share branding assets if available",
]

export default function BookACallPage() {
  return (
    <div>
      {/* Booking Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <Badge variant="red">Book a Call</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mt-4 mb-6">
            Book a 30-Minute Call with{" "}
            <span className="text-red-500">{siteConfig.name}</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Let's discuss your video, content idea, editing needs, or
            collaboration plan. Pick a time or send a message with your project
            details.
          </p>
        </div>
      </section>

      {/* Booking Card */}
      <section className="py-16 sm:py-20 bg-[#080808]">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              30 Min Project Call
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="px-3 py-1 bg-white/5 text-zinc-400 text-xs rounded-full">30 minutes</span>
              <span className="px-3 py-1 bg-white/5 text-zinc-400 text-xs rounded-full">Google Meet / Zoom</span>
              <span className="px-3 py-1 bg-white/5 text-zinc-400 text-xs rounded-full">Remote</span>
              <span className="px-3 py-1 bg-white/5 text-zinc-400 text-xs rounded-full">Project discussion</span>
            </div>
            <p className="text-zinc-500 text-sm mb-6">
              {/* Replace this with Cal.com, Calendly, or Google Calendar booking link */}
              Click below to open the booking link and pick a time that works for you.
            </p>
            <a
              href={siteConfig.bookingLink}
              className="inline-flex px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full transition-colors mb-4"
            >
              Open Booking Link
            </a>
            <div className="pt-4 border-t border-white/10">
              <p className="text-zinc-500 text-sm mb-3">
                No booking link yet? Send me your preferred time and project details.
              </p>
              <Link
                href="/contact"
                className="text-red-400 hover:text-red-300 text-sm font-medium"
              >
                Contact Me &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We'll Discuss */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              What We&apos;ll Discuss
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {discussionTopics.map((topic) => (
                <div
                  key={topic}
                  className="flex items-center gap-3 bg-[#111111] border border-white/10 rounded-xl p-4"
                >
                  <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-white text-sm">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before the Call */}
      <section className="py-16 sm:py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Before the Call
            </h2>
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-8">
              <ul className="space-y-4">
                {preparationSteps.map((step) => (
                  <li key={step} className="flex items-start gap-3 text-zinc-300 text-sm">
                    <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Let's plan your next strong video."
        primaryText="Open Booking Link"
        secondaryText="Message Me on LinkedIn"
        primaryHref={siteConfig.bookingLink}
        secondaryHref="https://www.linkedin.com/in/md-ikram-ab515618b/"
      />
    </div>
  )
}
