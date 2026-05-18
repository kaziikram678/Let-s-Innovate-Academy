interface StatItem {
  value: string
  label: string
}

interface HeroStatsProps {
  stats: StatItem[]
}

export default function HeroStats({ stats }: HeroStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</p>
          <p className="text-zinc-400 text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
