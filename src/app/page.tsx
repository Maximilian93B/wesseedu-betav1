"use client"

import { HeroSection } from "@/components/wsu/Marketing/HeroSection"
import { KeyFeatures } from "@/components/wsu/Marketing/KeyFeatures"
import { ImpactSection } from "@/components/wsu/Marketing/ImpactSection"
import { ProblemSolutionFlow } from "@/components/wsu/Marketing/ProblemSolutionFlow"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { PartnersAndVetting } from "@/components/wsu/Marketing/PartnersAndVetting"
import { memo } from 'react'
import dynamic from 'next/dynamic'

// Memoize individual sections to prevent unnecessary re-renders
const MemoizedHeroSection = memo(HeroSection)
const MemoizedProblemSolutionFlow = memo(ProblemSolutionFlow)
const MemoizedPartnersandVetting = memo(PartnersAndVetting)
const MemoizedKeyFeatures = memo(KeyFeatures)
const MemoizedImpactSection = memo(ImpactSection)

// Import CosmicBeamsBackground with no SSR
const CosmicBeamsBackground = dynamic(
  () => import('@/components/ui/backgrounds/CosmicBeamsBackground').then(mod => mod.CosmicBeamsBackground),
  { ssr: false }
)

export default function LandingPage() {
  return (
    <>
      {/* Static placeholder that will be visible during SSR */}
      <div className="fixed inset-0 bg-black -z-10" />
      
      {/* Client-only CosmicBeamsBackground */}
      <CosmicBeamsBackground intensity="medium">
        <main className="relative overflow-x-hidden">
          <div className="relative z-10">
            {/* Hero Section - No scroll animation to ensure immediate visibility */}
            <section className="min-h-screen flex items-center mt-10">
              <MemoizedHeroSection />
            </section>
              
            {/* Partners and Vetting Section */}
            <ScrollReveal
               className="min-h-screen py-16 w-full" 
              animation="fade-in"
              threshold={0.1}
            >
              <MemoizedPartnersandVetting />
            </ScrollReveal>

            {/* Problem Solution Flow */}
            <ScrollReveal 
              className="min-h-screen py-16 w-full" 
              animation="fade-in"
              threshold={0.1}
            >
              <MemoizedProblemSolutionFlow />
            </ScrollReveal>
        
            {/* Key Features */}
            <ScrollReveal 
              className="min-h-screen py-16 w-full" 
              animation="fade-in"
              threshold={0.1}
            >
              <MemoizedKeyFeatures />
            </ScrollReveal>


            {/* Impact Section */}
            <ScrollReveal 
              className="min-h-screen py-16 w-full" 
              animation="fade-in"
              threshold={0.1}
            >
              <MemoizedImpactSection />
            </ScrollReveal>
          </div>
        </main>
      </CosmicBeamsBackground>
    </>
  )
}
