interface SectionHeadingProps {
  badge?: string
  title: string
  subtitle?: string
  align?: "left" | "center"
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
      {badge && (
        <span className="inline-block px-3 py-1 bg-red-500/10 text-red-400 text-xs font-medium rounded-full uppercase tracking-wider mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{title}</h2>
      {subtitle && (
        <p className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}
