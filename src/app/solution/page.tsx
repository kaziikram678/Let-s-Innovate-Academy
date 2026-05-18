import type { Metadata } from "next"
import Link from "next/link"
import Badge from "@/components/Badge"
import SectionHeading from "@/components/SectionHeading"
import FAQAccordion from "@/components/FAQAccordion"
import CTASection from "@/components/CTASection"
import { faqs } from "@/data/faqs"

export const metadata: Metadata = {
  title: "Solution | Md Ikram - Video Editing Solutions for Creators",
  description: "Discover how Md Ikram solves common creator problems with professional video editing, design, and content repurposing services.",
}

const problems = [
  "Editing takes too long",
  "Videos feel boring or slow",
  "Captions are difficult to add",
  "Audio and visuals do not feel polished",
  "Long videos are not repurposed",
  "Thumbnails and graphics are inconsistent",
]

const solutions = [
  "Story-first editing with clean pacing",
  "Hook-focused cuts for better retention",
  "Burned-in captions and visual emphasis",
  "Color correction, audio sync, and cleanup",
  "Short clips from long videos",
  "Consistent thumbnails and branded graphics",
]

const whoIHelp = [
  "YouTubers",
  "Students and Educators",
  "Personal Brands",
  "Small Businesses",
  "Podcasters",
  "Event Clients",
]

const repurposingExamples = [
  "3 Shorts",
  "2 Reels",
  "1 LinkedIn clip",
  "1 thumbnail",
  "3 quote graphics",
  "1 teaser video",
]

const whyWorkWithMe = [
  "Clean visual style",
  "Simple communication",
  "Fast delivery",
  "Creator-friendly workflow",
  "Educational content experience",
  "Design + editing combination",
]

export default function SolutionPage() {
  return (
    <div>
      {/* Solution Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <Badge variant="red">Solution</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mt-4 mb-6">
            Editing Should Not Slow Down{" "}
            <span className="text-red-500">Your Content</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto mb-8">
            Most creators have ideas, footage, and stories &mdash; but editing
            takes time. I help you turn raw clips into professional content so
            you can focus on recording, teaching, creating, or running your
            brand.
          </p>
          <Link
            href="/book-a-call"
            className="inline-flex px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full transition-colors"
          >
            Book a Call
          </Link>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="py-16 sm:py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="The Problem vs The Solution"
          />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-8">
              <h3 className="text-zinc-400 font-semibold text-lg mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Creator Problems
              </h3>
              <ul className="space-y-4">
                {problems.map((problem) => (
                  <li key={problem} className="flex items-start gap-3 text-zinc-400 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    {problem}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#111111] border border-green-500/20 rounded-2xl p-8">
              <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Md Ikram&apos;s Solutions
              </h3>
              <ul className="space-y-4">
                {solutions.map((solution) => (
                  <li key={solution} className="flex items-start gap-3 text-zinc-300 text-sm">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {solution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who I Help */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Who I Help"
            title="Who I Work With"
          />
          <div className="flex flex-wrap justify-center gap-3">
            {whoIHelp.map((item) => (
              <div
                key={item}
                className="px-5 py-3 bg-[#111111] border border-white/10 rounded-full text-white text-sm font-medium hover:border-red-500/30 transition-colors"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Repurposing */}
      <section className="py-16 sm:py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Repurposing"
            title="One Video. Multiple Assets."
            subtitle="One long YouTube video can become all of these:"
          />
          <div className="flex flex-wrap justify-center gap-3">
            {repurposingExamples.map((item) => (
              <Badge key={item} variant="red">{item}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Me */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Benefits"
            title="Why Work With Me"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {whyWorkWithMe.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-[#111111] border border-white/10 rounded-xl p-4"
              >
                <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-[#080808]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="FAQ"
            title="Frequently Asked Questions"
          />
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Ready to stop worrying about editing?"
        subtitle="Send your raw footage. I'll handle the edit, pacing, captions, graphics, and final export."
      />
    </div>
  )
}
