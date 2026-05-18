import type { NavItem, SocialLink } from "@/types"

export const siteConfig = {
  name: "Let's Innovate Academy",
  brand: "Compilation Error by Ikram",
  role: "Video Editor, Graphics Designer & Content Creator",
  location: "Bangladesh",
  email: "kazi.ikram678@gmail.com",
  whatsapp: "+8801619536645",
  bookingLink: "https://cal.com/md-kazi-ikram-uddin-qxgkyb/30min",
  description:
    "Let's Innovate Academy — Learn professional video editing, motion graphics, and content creation from industry experts.",
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Instructors", href: "/instructors" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export const socialLinks: SocialLink[] = [
  {
    name: "YouTube",
    url: "https://youtube.com/@compilererror123?si=pS7mgoITesc3ODPW",
    icon: "youtube",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/md-ikram-ab515618b/",
    icon: "linkedin",
  },
]
