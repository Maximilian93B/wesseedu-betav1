"use client"

import { HeroSection } from "@/components/wsu/Marketing/HeroSection"
import { KeyFeatures } from "@/components/wsu/Marketing/KeyFeatures"
import { Partners } from "@/components/wsu/Marketing/Partners"
import { VettingProcess } from "@/components/wsu/Marketing/VettingProcess"
import { ImpactSection } from "@/components/wsu/Marketing/ImpactSection"
import { ProblemSolutionFlow } from "@/components/wsu/Marketing/ProblemSolutionFlow"
import { ScrollSection } from "@/components/ui/scroll-section"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
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
            {/* Hero Section - No scroll animation to ensure immediate visibility */}
            <section className="min-h-screen flex items-center mt-10">
              <MemoizedHeroSection />
            </section>
            
            {/* Partners Section */}
            <ScrollReveal 
              className="min-h-screen py-16 w-full" 
              animation="fade-in"
              threshold={0.1}
            >
              <MemoizedPartners />
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
            
            {/* Vetting Process */}
            <ScrollReveal 
              className="min-h-screen py-16 w-full" 
              animation="fade-in"
              threshold={0.1}
            >
              <MemoizedVettingProcess />
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
      </BeamsBackground>
    </>
  )
}
