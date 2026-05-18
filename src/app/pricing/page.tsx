import type { Metadata } from "next"
import Badge from "@/components/Badge"
import SectionHeading from "@/components/SectionHeading"
import PricingCard from "@/components/PricingCard"
import FAQAccordion from "@/components/FAQAccordion"
import CTASection from "@/components/CTASection"
import { pricingPlans, addons } from "@/data/pricing"
import { pricingFaqs } from "@/data/faqs"

export const metadata: Metadata = {
  title: "Pricing | Md Ikram - Video Editing Packages",
  description: "Transparent pricing for video editing, graphics design, and content creation services. Starter, Creator, Pro, and Custom plans available.",
}

export default function PricingPage() {
  return (
    <div>
      {/* Pricing Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <Badge variant="red">Pricing</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mt-4 mb-6">
            Simple Plans for{" "}
            <span className="text-red-500">Better Content</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-4">
            Choose a package that fits your content needs. For larger projects,
            custom monthly plans are available.
          </p>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto">
            Final pricing may vary based on project complexity, video length,
            turnaround time, and revision requirements.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 sm:py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Extras"
            title="Available Add-ons"
          />
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {addons.map((addon) => (
              <Badge key={addon}>{addon}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-[#080808]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="FAQ"
            title="Pricing Questions"
          />
          <FAQAccordion faqs={pricingFaqs} />
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Not sure which plan fits your project?"
        subtitle="Book a quick call and I'll help you choose the right editing package."
        primaryText="Book a Call"
        secondaryText="Contact Me"
      />
    </div>
  )
}
