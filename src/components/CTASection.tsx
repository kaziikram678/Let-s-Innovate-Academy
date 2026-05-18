import Link from "next/link"

interface CTASectionProps {
  title?: string
  subtitle?: string
  primaryText?: string
  secondaryText?: string
  primaryHref?: string
  secondaryHref?: string
}

export default function CTASection({
  title = "Let's Bring Your Content to Life",
  subtitle = "Send your footage. I'll turn it into content that looks clean, feels engaging, and helps your brand stand out.",
  primaryText = "Book a Call",
  secondaryText = "Let's Talk",
  primaryHref = "/book-a-call",
  secondaryHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto mb-8">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryHref}
            className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full transition-colors"
          >
            {primaryText}
          </Link>
          <Link
            href={secondaryHref}
            className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full border border-white/10 transition-colors"
          >
            {secondaryText}
          </Link>
        </div>
      </div>
    </section>
  )
}
