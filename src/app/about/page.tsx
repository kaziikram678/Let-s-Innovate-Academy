import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Badge from "@/components/Badge"
import SectionHeading from "@/components/SectionHeading"
import CTASection from "@/components/CTASection"
import { timeline, skills, certificates } from "@/data/about"
import { siteConfig } from "@/data/site"

export const metadata: Metadata = {
  title: "About Md Ikram | Video Editor & Content Creator",
  description: "Learn about Md Ikram, creator of Compilation Error by Ikram, and his journey as a video editor, graphics designer, and content creator.",
}

const whatIDo = [
  {
    title: "Video Editing",
    description: "Clean, story-driven edits for YouTube, social media, podcasts, ads, and events.",
  },
  {
    title: "Graphics Design",
    description: "Eye-catching thumbnails, banners, social posts, and content branding.",
  },
  {
    title: "Content Creation",
    description: "End-to-end content strategy, planning, and production for digital platforms.",
  },
  {
    title: "Educational YouTube Content",
    description: "Simplifying computer science and tech topics for students through clear video lessons.",
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* About Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="red">About Me</Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mt-4 mb-6">
                I&apos;m {siteConfig.name} &mdash; Video Editor, Graphics Designer & Content Creator
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                I create clean, engaging, and story-driven videos for YouTube,
                social media, podcasts, ads, and events. I also create
                educational content through {siteConfig.brand}, where I
                simplify computer science and tech-related topics for students
                and learners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/works"
                  className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full transition-colors text-center"
                >
                  View My Work
                </Link>
                <a
                  href="https://www.linkedin.com/in/md-ikram-ab515618b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full border border-white/10 transition-colors text-center"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border border-white/10 relative">
                <Image
                  src="/images/profile_pic.jpg"
                  alt="Md Ikram"
                  fill
                  sizes="(max-width: 640px) 256px, 320px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="py-16 sm:py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Expertise"
            title="What I Do Best"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatIDo.map((item) => (
              <div
                key={item.title}
                className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:border-red-500/30 transition-colors"
              >
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            badge="Mission"
            title="My Mission"
            subtitle="My goal is to make content easier to understand, easier to watch, and harder to ignore. Whether I am editing a client video or creating an educational tutorial, I focus on clarity, pacing, and visual storytelling."
          />
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 sm:py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Skills"
            title="Tools & Skills"
          />
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Credentials"
            title="Certifications"
          />
          <div className="max-w-2xl mx-auto">
            {certificates.map((cert) => (
              <div
                key={cert.title}
                className="bg-[#111111] border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{cert.title}</h3>
                    <p className="text-zinc-400 text-sm mt-1">{cert.issuer} · Issued {cert.date}</p>
                  </div>
                </div>
                {cert.image && (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/5 group">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Channel */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 sm:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <span className="inline-block px-3 py-1 bg-red-500/10 text-red-400 text-xs font-medium rounded-full uppercase tracking-wider mb-4">
                YouTube Channel
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {siteConfig.brand}
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                A learning-focused YouTube channel made to help Bangladeshi
                students understand computer science, programming, and tech
                topics with simple explanations.
              </p>
              <a
                href="https://youtube.com/@compilererror123?si=pS7mgoITesc3ODPW"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full transition-colors"
              >
                Explore Channel
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Journey"
            title="My Timeline"
          />
          <div className="max-w-2xl mx-auto">
            <div className="relative border-l-2 border-red-500/30 ml-4 space-y-8">
              {timeline.map((item) => (
                <div key={item.year} className="relative pl-8">
                  <div className="absolute -left-2 top-1 w-4 h-4 rounded-full bg-red-500 border-4 border-[#080808]" />
                  <span className="text-red-400 text-sm font-medium">{item.year}</span>
                  <h3 className="text-white font-semibold text-lg mt-1">{item.title}</h3>
                  <p className="text-zinc-400 text-sm mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Need a creative editor for your next project?"
        subtitle="Let's discuss your vision and bring it to life with clean, engaging video content."
      />
    </div>
  )
}
