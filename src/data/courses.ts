import type { Course } from "@/types"

export const courses: Course[] = [
  {
    slug: "premiere-pro-basic-to-advanced",
    title: "Premiere Pro Basic to Advanced",
    subtitle:
      "Learn professional video editing from basic to advanced using Adobe Premiere Pro.",
    status: "enroll-open",
    price: "৳1000",
    oldPrice: "৳3000",
    duration: "21 Days",
    lectures: "76+",
    image: "/images/courses/premiere-pro.jpg",
    description:
      "This comprehensive course takes you from zero to hero in Adobe Premiere Pro. Learn timeline editing, color grading, sound design, effects, and export settings through hands-on projects and daily assignments.",
    features: [
      {
        icon: "clock",
        title: "Lifetime Access",
        description: "Access course materials forever after enrollment",
      },
      {
        icon: "resources",
        title: "Practice Resources",
        description: "Downloadable project files and practice footage",
      },
      {
        icon: "assignment",
        title: "Assignments",
        description: "Daily assignments to reinforce your learning",
      },
      {
        icon: "beginner",
        title: "Beginner Friendly",
        description: "No prior editing experience required",
      },
      {
        icon: "project",
        title: "Project-Based Learning",
        description: "Learn by doing real-world editing projects",
      },
      {
        icon: "certificate",
        title: "Certificate",
        description: "Receive a certificate upon course completion",
      },
      {
        icon: "live",
        title: "Live Online Classes",
        description: "Interactive live sessions with real-time Q&A and guidance",
      },
      {
        icon: "email",
        title: "Email Notifications",
        description: "Receive class links, schedules, and instructions via email before each session",
      },
    ],
    learnings: [
      "Navigate and customize Adobe Premiere Pro workspace",
      "Import, organize, and manage video projects efficiently",
      "Master timeline editing with cuts, transitions, and effects",
      "Apply color grading using Lumetri Color and scopes",
      "Design professional sound effects and music sync",
      "Create speed ramps, keyframe animations, and masking",
      "Edit multicam footage and apply warp stabilization",
      "Export videos for YouTube, social media, and vertical formats",
      "Remove audio noise using AI tools",
      "Add Bangla text and typography in Premiere Pro",
    ],
    whoFor: [
      "Beginners who want to learn video editing from scratch",
      "Content creators looking to improve their editing skills",
      "Freelancers wanting to offer professional editing services",
      "Students and educators creating educational content",
      "Anyone passionate about video editing and storytelling",
    ],
    curriculum: [
      {
        day: "Day 1",
        title: "Introduction",
        lessons: [
          { title: "1.1 Introduction" },
          { title: "1.2 Prospect of Video Editing" },
          { title: "1.3 Available Softwares" },
          { title: "1.4 PC Requirements" },
          { title: "1.5 How to get Adobe Premiere Pro" },
          { title: "1.6 Star Tech Discount" },
          { title: "1.7 How to submit Assignments" },
          { title: "1.8 Discord Group" },
        ],
      },
      {
        day: "Day 2",
        title: "Getting Started with Adobe Premiere Pro",
        lessons: [
          { title: "2.1 Staying Organized" },
          { title: "2.2 Launching Premiere Pro" },
          { title: "2.3 Creating a Sequence" },
        ],
        hasPracticeResources: true,
        hasAssignment: true,
        assignmentNumber: 1,
      },
      {
        day: "Day 3",
        title: "Timeline & Tools",
        lessons: [
          { title: "3.1 Timeline Overview" },
          { title: "3.2 Application of Tools" },
        ],
      },
      {
        day: "Day 4",
        title: "Shortcuts",
        lessons: [{ title: "4.1 Setting Shortcuts" }],
        hasAssignment: true,
        assignmentNumber: 2,
      },
      {
        day: "Day 5",
        title: "Metadata & Video Resolution",
        lessons: [
          { title: "5.1 Metadata" },
          { title: "5.2 Video Resolution" },
        ],
      },
      {
        day: "Day 6",
        title: "FPS & Video Standards",
        lessons: [
          { title: "6.1 FPS" },
          { title: "6.2 NTSC & PAL" },
        ],
      },
      {
        day: "Day 7",
        title: "Montage",
        lessons: [
          { title: "7.1 Creating a Montage" },
          { title: "7.2 Layer" },
        ],
        hasPracticeResources: true,
        hasAssignment: true,
        assignmentNumber: 3,
      },
      {
        day: "Day 8",
        title: "Effect Controls",
        lessons: [{ title: "8.1 Effect Controls" }],
      },
      {
        day: "Day 9",
        title: "Music",
        lessons: [
          { title: "9.1 Music" },
          { title: "9.2 Music Sync" },
        ],
        hasPracticeResources: true,
        hasAssignment: true,
        assignmentNumber: 4,
      },
      {
        day: "Day 10",
        title: "Sound Edit",
        lessons: [{ title: "10.1 Basic Sound Edit" }],
      },
      {
        day: "Day 11",
        title: "Sound Design",
        lessons: [{ title: "11.1 Basic Sound Design" }],
        hasPracticeResources: true,
        hasAssignment: true,
        assignmentNumber: 5,
      },
      {
        day: "Day 12",
        title: "Some Important Edits",
        lessons: [
          { title: "12.1 Multicam Edit" },
          { title: "12.2 Clip Speed" },
          { title: "12.3 Warp Stabilizer & Nesting" },
        ],
        hasPracticeResources: true,
      },
      {
        day: "Day 13",
        title: "Some Important Edits",
        lessons: [
          { title: "13.1 Masking" },
          { title: "13.2 Speed Ramping" },
          { title: "13.3 Keyframe Animation" },
        ],
      },
      {
        day: "Day 14",
        title: "Text",
        lessons: [{ title: "14.1 Text Editing" }],
      },
      {
        day: "Day 15",
        title: "Lumetri Color & Scopes",
        lessons: [
          { title: "15.1 Color Interface" },
          { title: "15.2 Color Grading Scopes" },
        ],
      },
      {
        day: "Day 16",
        title: "Color Grading",
        lessons: [
          { title: "16.1 Color Grading Example 1" },
          { title: "16.2 Color Grading Example 2" },
        ],
      },
      {
        day: "Day 17",
        title: "Color Grading",
        lessons: [
          { title: "17.1 Color Grading Example 3" },
          { title: "17.2 Color Grading Example 4" },
        ],
        hasPracticeResources: true,
        hasAssignment: true,
        assignmentNumber: 7,
      },
      {
        day: "Day 18",
        title: "Green Screen",
        lessons: [{ title: "18.1 Green Screen Edit" }],
        hasPracticeResources: true,
        hasAssignment: true,
        assignmentNumber: 8,
      },
      {
        day: "Day 19",
        title: "Export Settings",
        lessons: [
          { title: "19.1 Export Settings" },
          { title: "19.2 Vertical Video Sequence" },
        ],
      },
      {
        day: "Day 20",
        title: "Organizing Projects",
        lessons: [
          { title: "20.1 Organizing Projects" },
          { title: "20.2 Conclusion" },
        ],
      },
      {
        day: "Day 21",
        title: "Bonus Class 1, Content Breakdown",
        lessons: [{ title: "Bonus Class" }],
      },
      {
        day: "Bonus Class 2",
        title: "Sound Design",
        lessons: [
          { title: "BC 2.1 What we will learn today?" },
          { title: "BC 2.2 Concept of Sound Design" },
          { title: "BC 2.3 Collecting Sound Effects" },
          { title: "BC 2.4 Syncing Sound Effects with Video" },
          { title: "BC 2.5 Adding Music" },
        ],
      },
      {
        day: "Bonus Class 3",
        title: "AI Noise Removal",
        lessons: [
          { title: "BC 3.1 What we will learn today?" },
          { title: "BC 3.2 Adobe Podcast Speech Enhancement" },
          { title: "BC 3.3 Removing Noise" },
          { title: "BC 3.4 Usage Limit" },
          { title: "BC 3.5 Alternative Options" },
          { title: "BC 3.6 How does it work?" },
          { title: "BC 3.7 Practice Audio" },
        ],
      },
      {
        day: "Bonus Class 4",
        title: "VEO 3 with Prompt",
        lessons: [{ title: "VEO 3 with 7 Prompt" }],
      },
      {
        day: "Bonus Class 5",
        title: "Bangla Text in Premiere Pro",
        lessons: [{ title: "Typing Bangla Text in Premiere Pro" }],
      },
    ],
    faqs: [
      {
        id: "pp-faq-1",
        question: "Do I need prior video editing experience?",
        answer:
          "No, this course is designed for complete beginners. We start from the very basics and gradually move to advanced topics.",
      },
      {
        id: "pp-faq-2",
        question: "How are the classes conducted?",
        answer:
          "All classes are conducted LIVE online. You will receive an email with the class link, schedule, and instructions before each session. You can ask questions in real-time during the class.",
      },
      {
        id: "pp-faq-3",
        question: "What software do I need?",
        answer:
          "You need Adobe Premiere Pro. The course covers how to get and install it. A decent PC with at least 8GB RAM is recommended.",
      },
      {
        id: "pp-faq-4",
        question: "How do I make the payment?",
        answer:
          "Payment is accepted via bKash only. Send the course fee to the provided bKash number and submit your transaction ID through the checkout form.",
      },
      {
        id: "pp-faq-5",
        question: "When will I get access after payment?",
        answer:
          "After your payment is verified, you will be added to the live class schedule. You will receive email notifications with class links and instructions before each session.",
      },
      {
        id: "pp-faq-6",
        question: "Is there a certificate after completion?",
        answer:
          "Yes, a certificate of completion is provided once you finish all lessons and submit the required assignments.",
      },
    ],
    instructorSlug: "md-ikram",
    language: "Bangla",
    support: "WhatsApp support",
    paymentMethod: "bKash",
    classFormat: "live",
    classSchedule: "Live classes held daily via online platform. Class links and instructions sent via email before each session.",
    emailNotifications: true,
    studentsCount: 150,
    rating: 4.8,
  },
  {
    slug: "after-effects-crash-course",
    title: "After Effects Crash Course",
    subtitle:
      "Master motion graphics, visual effects, and animation in Adobe After Effects.",
    status: "coming-soon",
    price: "৳1500",
    duration: "21 Days",
    lectures: "50+",
    image: "/images/courses/after-effects.jpg",
    description:
      "A fast-paced crash course covering the essentials of Adobe After Effects including motion graphics, keyframing, compositing, and visual effects.",
    features: [],
    learnings: [],
    whoFor: [],
    curriculum: [],
    faqs: [],
    instructorSlug: "md-ikram",
    language: "Bangla",
    support: "WhatsApp support",
    paymentMethod: "bKash",
    classFormat: "live",
    classSchedule: "Live classes held daily via online platform. Class links and instructions sent via email before each session.",
    emailNotifications: true,
  },
  {
    slug: "capcut-mobile-video-editing",
    title: "Mobile Video Editing",
    subtitle:
      "Create professional-looking videos on your phone using mobile applications.",
    status: "coming-soon",
    price: "৳500",
    duration: "10 Days",
    lectures: "35+",
    image: "/images/courses/capcut.jpg",
    description:
      "Learn to edit stunning videos right from your smartphone using mobile applications. Perfect for content creators who want to produce quality content on the go.",
    features: [],
    learnings: [],
    whoFor: [],
    curriculum: [],
    faqs: [],
    instructorSlug: "md-ikram",
    language: "Bangla",
    support: "WhatsApp support",
    paymentMethod: "bKash",
    classFormat: "live",
    classSchedule: "Live classes held daily via online platform. Class links and instructions sent via email before each session.",
    emailNotifications: true,
  },
]

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug)
}

export function getCoursesByInstructor(instructorSlug: string): Course[] {
  return courses.filter((course) => course.instructorSlug === instructorSlug)
}
