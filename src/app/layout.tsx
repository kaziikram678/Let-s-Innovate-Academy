import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { AuthProvider } from "@/context/AuthContext"

export const metadata: Metadata = {
  title: "Let's Innovate Academy | Video Editing & Creative Courses",
  description:
    "Learn professional video editing, motion graphics, and content creation from industry experts. Expert-led courses with lifetime access and practical projects.",
  openGraph: {
    title: "Let's Innovate Academy | Video Editing & Creative Courses",
    description:
      "Learn professional video editing, motion graphics, and content creation from industry experts. Expert-led courses with lifetime access and practical projects.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Let's Innovate Academy | Video Editing & Creative Courses",
    description:
      "Learn professional video editing, motion graphics, and content creation from industry experts. Expert-led courses with lifetime access and practical projects.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
