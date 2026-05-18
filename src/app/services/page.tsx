import type { Metadata } from "next"
import Link from "next/link"
import SectionHeading from "@/components/SectionHeading"
import ServiceCard from "@/components/ServiceCard"
import CTASection from "@/components/CTASection"
import Badge from "@/components/Badge"
import { services } from "@/data/services"

export const metadata: Metadata = {
  title: "Services | Md Ikram - Video Editing & Graphics Design",
  description: "Explore video editing, graphics design, YouTube content, social media, podcast editing, ad content, event videos, and content repurposing services by Md Ikram.",
}

const workflowSteps = [
  {
    step: "01",
    title: "Send Your Footage",
    description: "Share your raw footage, brief, and any reference videos or style preferences.",
  },
  {
    step: "02",
    title: "I Edit the Story",
    description: "I handle cuts, pacing, captions, color correction, audio sync, and motion graphics.",
  },
  {
    step: "03",
    title: "You Review",
    description: "Review the draft and share feedback. I make revisions until you are satisfied.",
  },
  {
    step: "04",
    title: "Final Export & Delivery",
    description: "Receive your polished, ready-to-publish video in the format you need.",
  },
]

const tools = [
  "Premiere Pro",
  "After Effects",
  "Photoshop",
  "Illustrator",
  "Canva",
  "CapCut",
  "DaVinci Resolve",
  "YouTube Studio",
]

export default function ServicesPage() {
  return (
    <div>
      {/* Services Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <Badge variant="red">Services</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mt-4 mb-6">
            Creative Services for Videos That Actually{" "}
            <span className="text-red-500">Hold Attention</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto mb-8">
            From YouTube videos to short-form clips, ads, podcasts, event
            videos, graphics, and thumbnails &mdash; I help you turn ideas and
            raw footage into polished content.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full transition-colors"
          >
            Start a Project
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="All Services"
            subtitle="Everything you need to create professional, engaging content across platforms."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Process"
            title="How It Works"
            subtitle="A simple, creator-friendly workflow from start to finish."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step) => (
              <div
                key={step.step}
                className="bg-[#111111] border border-white/10 rounded-2xl p-6 text-center"
              >
                <span className="text-red-400 text-3xl font-bold">{step.step}</span>
                <h3 className="text-white font-semibold text-lg mt-3 mb-2">{step.title}</h3>
                <p className="text-zinc-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16 sm:py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Tools"
            title="Software I Use"
          />
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool) => (
              <Badge key={tool}>{tool}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Have raw footage waiting to become content?"
        subtitle="Send it my way and I'll help you turn it into something clean, engaging, and ready to publish."
        primaryText="Book a Call"
        secondaryText="Contact Me"
      />
    </div>
  )
}
