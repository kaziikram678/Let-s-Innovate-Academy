interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "red" | "indigo"
}

export default function Badge({ children, variant = "default" }: BadgeProps) {
  const styles =
    variant === "red"
      ? "bg-red-500/10 text-red-400 border-red-500/20"
      : variant === "indigo"
      ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
      : "bg-white/5 text-zinc-300 border-white/10"

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${styles}`}
    >
      {children}
    </span>
  )
}
