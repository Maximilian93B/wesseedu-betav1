'use client'

import { HeroSection } from "@/components/wsu/HeroSection"
import { KeyFeatures } from "@/components/wsu/KeyFeatures"
import { Partners } from "@/components/wsu/Partners"
import { ProblemSolution } from "@/components/wsu/ProblemSolution"
import { VettingProcess } from "@/components/wsu/VettingProcess"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Add a subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#020714] via-[#0A1A3B]/95 to-[#020714] pointer-events-none" />
      <div className="relative">
        <HeroSection />
        <Partners />
        <VettingProcess />
        <KeyFeatures />
        <ProblemSolution />
        <section className="w-full py-12 md:py-24 lg:py-32 border-t border-white/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block glass-effect px-3 py-1 text-sm text-teal-500">
                  Impact Investing
                </div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-gradient-primary">
                  Make your investments count for a sustainable future.
                </h2>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block glass-effect px-3 py-1 text-sm text-teal-500">
                  Transparency
                </div>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Access detailed ESG metrics and impact reports for every investment opportunity. Our platform provides 
                  comprehensive data on environmental impact, social responsibility, and sustainable business practices 
                  to help you make informed decisions.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-gray-800 bg-gray-950 px-4 py-2 text-sm font-medium text-gray-300 shadow-sm transition-colors hover:bg-gray-900 hover:text-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:opacity-50"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

