import type { PricingPlan } from "@/types"
import Link from "next/link"

interface PricingCardProps {
  plan: PricingPlan
}

export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={`relative bg-[#111111] border rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 ${
        plan.popular
          ? "border-red-500/50 shadow-lg shadow-red-500/10"
          : "border-white/10 hover:border-red-500/30"
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-6 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
          {plan.badge}
        </span>
      )}
      <h3 className="text-white font-semibold text-xl mb-1">{plan.name}</h3>
      <p className="text-zinc-500 text-sm mb-4">{plan.bestFor}</p>
      <div className="text-3xl font-bold text-white mb-6">{plan.price}</div>
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
            <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href="/book-a-call"
        className={`block w-full py-3 text-center text-sm font-medium rounded-full transition-colors ${
          plan.popular
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
        }`}
      >
        {plan.cta}
      </Link>
    </div>
  )
}
