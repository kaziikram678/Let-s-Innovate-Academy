"use client"

import { useState } from "react"
import type { FAQItem } from "@/types"

interface FAQAccordionProps {
  faqs: FAQItem[]
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            className="w-full flex items-center justify-between p-5 text-left"
            aria-expanded={openId === faq.id}
          >
            <span className="text-white font-medium text-sm sm:text-base pr-4">
              {faq.question}
            </span>
            <svg
              className={`w-5 h-5 text-zinc-400 flex-shrink-0 transition-transform duration-200 ${
                openId === faq.id ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openId === faq.id && (
            <div className="px-5 pb-5">
              <p className="text-zinc-400 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
