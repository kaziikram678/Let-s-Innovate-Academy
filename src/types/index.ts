export interface NavItem {
  label: string
  href: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  deliverables: string[]
  tags: string[]
}

export interface WorkItem {
  id: string
  title: string
  category: string
  description: string
  media: string
  mediaType: "image" | "video" | "youtube"
  aspectRatio?: "16:9" | "9:16"
  link?: string
  linkLabel?: string
}

export interface PricingPlan {
  id: string
  name: string
  price: string
  badge?: string
  bestFor: string
  features: string[]
  cta: string
  popular?: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string
  text: string
  rating: number
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface TimelineItem {
  year: string
  title: string
  description: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface CurriculumLesson {
  title: string
  duration?: string
  isPreview?: boolean
}

export interface CurriculumDay {
  day: string
  title: string
  lessons: CurriculumLesson[]
  hasPracticeResources?: boolean
  hasAssignment?: boolean
  assignmentNumber?: number
}

export interface CourseFeature {
  icon: string
  title: string
  description: string
}

export interface CourseFAQ {
  id: string
  question: string
  answer: string
}

export interface Instructor {
  slug: string
  name: string
  role: string
  bio: string
  image?: string
  specialties: string[]
  socialLinks?: {
    youtube?: string
    linkedin?: string
    twitter?: string
    website?: string
  }
  stats?: {
    studentsTaught?: number
    coursesCreated?: number
    yearsExperience?: number
    rating?: number
  }
}

export interface Course {
  slug: string
  title: string
  subtitle: string
  status: "enroll-open" | "coming-soon"
  price: string
  oldPrice?: string
  duration: string
  lectures: string
  image?: string
  description: string
  features: CourseFeature[]
  learnings: string[]
  whoFor: string[]
  curriculum: CurriculumDay[]
  faqs: CourseFAQ[]
  instructorSlug: string
  language: string
  support: string
  paymentMethod: string
  classFormat: "live" | "recorded" | "hybrid"
  classSchedule?: string
  emailNotifications: boolean
  studentsCount?: number
  rating?: number
}

export interface Enrollment {
  id: string
  userId?: string
  courseSlug: string
  courseTitle: string
  fullName: string
  phone: string
  email: string
  transactionId: string
  bkashNumber: string
  message?: string
  status: "pending" | "verified" | "rejected"
  createdAt: string
}

export interface DBCourse {
  id: string
  slug: string
  title: string
  subtitle?: string
  description?: string
  status: "draft" | "enroll-open" | "coming-soon" | "archived"
  price: number
  old_price?: number
  duration?: string
  lectures_count: number
  image_url?: string
  features: CourseFeature[]
  learnings: string[]
  who_for: string[]
  curriculum: CurriculumDay[]
  faqs: CourseFAQ[]
  instructor_slug?: string
  language: string
  support?: string
  payment_method?: string
  class_format?: string
  class_schedule?: string
  email_notifications: boolean
  students_count: number
  rating: number
  start_date?: string
  end_date?: string
  meeting_link?: string
  created_at: string
  updated_at: string
}

export interface CourseMaterial {
  id: string
  course_id: string
  title: string
  description?: string
  material_type: "video" | "pdf"
  file_url: string
  file_size?: number
  duration?: string
  day_number?: number
  lesson_order: number
  is_preview: boolean
  created_at: string
  updated_at: string
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  type: "verification" | "start_date" | "class_date" | "meeting_link" | "notice" | "custom"
  variables: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SentEmail {
  id: string
  template_id?: string
  recipient_email: string
  recipient_name?: string
  subject: string
  body: string
  type: string
  course_id?: string
  enrollment_id?: string
  status: "pending" | "sent" | "failed"
  sent_at?: string
  error_message?: string
  created_at: string
}
