"use client"

import { HeroSection } from "@/components/wsu/Marketing/HeroSection"
import { KeyFeatures } from "@/components/wsu/Marketing/KeyFeatures"
import { Partners } from "@/components/wsu/Marketing/Partners"
import { VettingProcess } from "@/components/wsu/Marketing/VettingProcess"
import { ImpactSection } from "@/components/wsu/Marketing/ImpactSection"
import { ProblemSolutionFlow } from "@/components/wsu/Marketing/ProblemSolutionFlow"
import dynamic from 'next/dynamic'
import { memo } from 'react'

// Import BeamsBackground with no SSR
const BeamsBackground = dynamic(
  () => import('@/components/ui/backgrounds/BeamsBackground').then(mod => mod.BeamsBackground),
  { ssr: false }
)

// Memoize individual sections to prevent unnecessary re-renders
const MemoizedHeroSection = memo(HeroSection)
const MemoizedProblemSolutionFlow = memo(ProblemSolutionFlow)
const MemoizedPartners = memo(Partners)
const MemoizedKeyFeatures = memo(KeyFeatures)
const MemoizedVettingProcess = memo(VettingProcess)
const MemoizedImpactSection = memo(ImpactSection)

export default function LandingPage() {
  return (
    <>
      {/* Static placeholder that will be visible during SSR */}
      <div className="fixed inset-0 bg-neutral-950 -z-10" />
      
      {/* Client-only BeamsBackground */}
      <BeamsBackground intensity="medium">
        <main className="relative overflow-x-hidden">
          <div className="relative z-10">
            <section className="min-h-screen flex items-center mt-10">
              <MemoizedHeroSection />
            </section>
            <section className="min-h-screen py-16">
              <MemoizedPartners />
            </section>
            <section className="min-h-screen py-16">
              <MemoizedProblemSolutionFlow />
            </section>
        
            <section className="min-h-screen py-16">
              <MemoizedKeyFeatures />
            </section>
            <section className="min-h-screen py-16">
              <MemoizedVettingProcess />
            </section>
            <section className="min-h-screen py-16">
              <MemoizedImpactSection />
            </section>
          </div>
        </main>
      </BeamsBackground>
    </>
  )
}
