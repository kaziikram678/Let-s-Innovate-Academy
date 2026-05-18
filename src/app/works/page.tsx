"use client"

import { useState } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import Badge from "@/components/Badge"
import SectionHeading from "@/components/SectionHeading"
import WorkCard from "@/components/WorkCard"
import CTASection from "@/components/CTASection"
import { works, workCategories } from "@/data/works"
import { siteConfig } from "@/data/site"

export default function WorksPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredWorks =
    activeCategory === "All"
      ? works
      : works.filter((w) => w.category === activeCategory)

  return (
    <div>
      {/* Portfolio Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <Badge variant="red">Portfolio</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mt-4 mb-6">
            My Works
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
            A selection of video edits, graphics, YouTube content, social media
            clips, ads, and creative projects.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full transition-colors"
          >
            Discuss a Project
          </Link>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {workCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  activeCategory === category
                    ? "bg-red-500 text-white"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredWorks.map((work) => (
              <div key={work.id} className="break-inside-avoid">
                <WorkCard work={work} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube CTA */}
      <section className="py-16 sm:py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 sm:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Explore {siteConfig.brand}
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Visit my YouTube channel to see my educational content style and
                storytelling approach.
              </p>
              <a
                href="https://youtube.com/@compilererror123?si=pS7mgoITesc3ODPW"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Open YouTube Channel
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Transformation"
            title="From Raw Footage to Polished Story"
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-8">
              <h3 className="text-zinc-400 font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-zinc-500" />
                Before
              </h3>
              <ul className="space-y-3 text-zinc-500 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-600 flex-shrink-0" />
                  Raw clips, unclear pacing
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-600 flex-shrink-0" />
                  Basic visuals, no branding
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-600 flex-shrink-0" />
                  No captions or motion graphics
                </li>
              </ul>
            </div>
            <div className="bg-[#111111] border border-red-500/20 rounded-2xl p-8">
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                After
              </h3>
              <ul className="space-y-3 text-zinc-300 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Clean edit with strong story flow
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Captions, music, color correction
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Branded and ready to publish
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Want your content featured here next?"
        subtitle="Let's work together to create something that represents your brand perfectly."
        primaryText="Start a Project"
        secondaryText="Book a Call"
        primaryHref="/contact"
        secondaryHref="/book-a-call"
      />
    </div>
  )
}
