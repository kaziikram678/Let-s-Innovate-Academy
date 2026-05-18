import Image from "next/image"
import Link from "next/link"
import Badge from "@/components/Badge"
import SectionHeading from "@/components/SectionHeading"
import CourseCard from "@/components/CourseCard"
import CourseOutcomes from "@/components/CourseOutcomes"
import WhyChooseUs from "@/components/WhyChooseUs"
import InstructorCard from "@/components/InstructorCard"
import TestimonialCard from "@/components/TestimonialCard"
import HeroStats from "@/components/HeroStats"
import { courses } from "@/data/courses"
import { instructors } from "@/data/instructors"
import { testimonials } from "@/data/testimonials"

const heroStats = [
  { value: "500+", label: "Students Enrolled" },
  { value: "3", label: "Expert Courses" },
  { value: "76+", label: "Video Lessons" },
  { value: "4.8", label: "Average Rating" },
]

const courseOutcomes = [
  {
    icon: "skills",
    title: "Professional Video Editing",
    description: "Master Adobe Premiere Pro from basics to advanced techniques used by industry professionals.",
  },
  {
    icon: "career",
    title: "Freelance Ready Skills",
    description: "Learn everything needed to start earning as a freelance video editor on platforms like Fiverr and Upwork.",
  },
  {
    icon: "projects",
    title: "Real-World Portfolio",
    description: "Build a professional portfolio with hands-on projects and assignments throughout the course.",
  },
  {
    icon: "certificate",
    title: "Completion Certificate",
    description: "Receive a verified certificate upon completing all lessons and submitting required assignments.",
  },
  {
    icon: "target",
    title: "Content Creation Mastery",
    description: "Create scroll-stopping content for YouTube, Instagram, TikTok, and other platforms.",
  },
  {
    icon: "support",
    title: "Community & Support",
    description: "Join our Discord community for ongoing support, feedback, and networking with fellow creators.",
  },
]

const whyChooseUs = [
  {
    icon: "live",
    title: "Live Interactive Classes",
    description: "Learn in real-time with live sessions where you can ask questions and get instant feedback.",
  },
  {
    icon: "lifetime",
    title: "Lifetime Access",
    description: "Access all course materials, recordings, and resources forever after enrollment.",
  },
  {
    icon: "expert",
    title: "Industry Expert Instructors",
    description: "Learn from professionals with years of real-world experience in video editing and content creation.",
  },
  {
    icon: "project",
    title: "Project-Based Learning",
    description: "Apply what you learn immediately through practical assignments and real-world projects.",
  },
  {
    icon: "community",
    title: "Active Student Community",
    description: "Connect with fellow learners, share your work, and grow together in our Discord community.",
  },
  {
    icon: "affordable",
    title: "Affordable Pricing",
    description: "Premium quality education at prices that are accessible to students across Bangladesh.",
  },
]

const openCourses = courses.filter((c) => c.status === "enroll-open")

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-purple-500/3 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge variant="indigo">Live Classes</Badge>
              <Badge variant="red">Enrollment Open</Badge>
              <Badge>Lifetime Access</Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Master Video Editing &{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Creative Skills
              </span>
            </h1>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
              Learn professional video editing, motion graphics, and content creation from
              industry experts. Structured courses with live classes, hands-on projects, and
              lifetime access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-full transition-all text-center"
              >
                Browse All Courses
              </Link>
              <Link
                href="/instructors"
                className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full border border-white/10 transition-colors text-center"
              >
                Meet Our Instructors
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16">
            <HeroStats stats={heroStats} />
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 sm:py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Featured Courses"
            title="Start Your Learning Journey"
            subtitle="Expert-led courses designed to take you from beginner to professional."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {openCourses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              View All Courses
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Course Outcomes */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="What You Will Achieve"
            title="Course Outcomes & Benefits"
            subtitle="After completing our courses, you will have the skills and confidence to succeed."
          />
          <CourseOutcomes outcomes={courseOutcomes} />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Why Let's Innovate Academy"
            title="Why Students Choose Us"
            subtitle="We provide a complete learning experience that goes beyond just video lessons."
          />
          <WhyChooseUs benefits={whyChooseUs} />
        </div>
      </section>

      {/* Meet Instructors */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Expert Instructors"
            title="Learn From the Best"
            subtitle="Our instructors are industry professionals with real-world experience."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {instructors.map((instructor) => (
              <InstructorCard key={instructor.slug} instructor={instructor} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/instructors"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              View All Instructors
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Simple Process"
            title="How It Works"
            subtitle="Get started in just 3 simple steps."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Course",
                description: "Browse our course catalog and select the one that matches your goals.",
              },
              {
                step: "02",
                title: "Enroll & Pay",
                description: "Complete enrollment with bKash payment and get instant confirmation.",
              },
              {
                step: "03",
                title: "Start Learning",
                description: "Join live classes, complete assignments, and build your skills.",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-[#111111] border border-white/10 rounded-2xl p-8">
                  <span className="text-5xl font-bold text-indigo-500/20">{item.step}</span>
                  <h3 className="text-white font-bold text-xl mt-2 mb-3">{item.title}</h3>
                  <p className="text-zinc-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Testimonials"
            title="What Our Students Say"
            subtitle="Hear from students who have transformed their skills with our courses."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Channel */}
      <section className="py-16 sm:py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 sm:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-red-500/10 text-red-400 text-xs font-medium rounded-full uppercase tracking-wider mb-4">
                  Free Content
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Learn for Free on YouTube
                </h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  Our YouTube channel is packed with free tutorials, tips, and editing breakdowns.
                  Subscribe to start learning today and get a taste of our teaching style.
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
                  Visit YouTube Channel
                </a>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden border border-white/10 relative">
                <Image
                  src="/images/youtube-studio.jpg"
                  alt="Compilation Error by Ikram YouTube Channel"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-500/20 rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of students who have already transformed their video editing skills.
              Enroll today and start learning from industry experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-full transition-all"
              >
                Enroll Now
              </Link>
              <Link
                href="/book-a-call"
                className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full border border-white/10 transition-colors"
              >
                Book a Free Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
