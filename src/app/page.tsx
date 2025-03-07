"use client"

import { HeroSection } from "@/components/wsu/Marketing/HeroSection"
import { PartnersAndVetting } from "@/components/wsu/Marketing/PartnersAndVetting"
import { ProblemSolutionFlow } from "@/components/wsu/Marketing/ProblemSolutionFlow"
import { KeyFeatures } from "@/components/wsu/Marketing/KeyFeatures"
import { ImpactSection } from "@/components/wsu/Marketing/ImpactSection"
import { Suspense, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Simple loading component
const SectionLoader = () => (
  <div className="w-full h-[50vh] flex items-center justify-center">
    <div className="animate-pulse bg-gray-800/20 rounded-lg w-full max-w-4xl h-64"></div>
  </div>
)

// Import CosmicBeamsBackground with no SSR
const CosmicBeamsBackground = dynamic(
  () => import('@/components/ui/backgrounds/CosmicBeamsBackground').then(mod => mod.CosmicBeamsBackground),
  { ssr: false }
)

export default function LandingPage() {
  // State to track if component is mounted
  const [isMounted, setIsMounted] = useState(false);
  
  // Ensure component is mounted before rendering dynamic content
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Static placeholder that will be visible during SSR */}
      <div className="fixed inset-0 bg-black -z-20" />
      
      {/* Background with conditional rendering based on mount state */}
      {isMounted && (
        <div className="absolute inset-0 w-full h-full">
          <CosmicBeamsBackground intensity="medium">
            {/* This div is intentionally empty - it just holds the background */}
          </CosmicBeamsBackground>
        </div>
      )}

      {/* Content container with higher z-index */}
      <main className="relative z-10 w-full mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-16">
          <HeroSection />
        </section>
          
        {/* Partners and Vetting Section */}
        <Suspense fallback={<SectionLoader />}>
          <section className="py-20 md:py-32 flex justify-center">
            <PartnersAndVetting />
          </section>
        </Suspense>

        {/* Problem Solution Flow */}
        <Suspense fallback={<SectionLoader />}>
          <section className="py-20 md:py-32 flex justify-center">
            <ProblemSolutionFlow />
          </section>
        </Suspense>
    
        {/* Key Features */}
        <Suspense fallback={<SectionLoader />}>
          <section className="py-20 md:py-32 flex justify-center">
            <KeyFeatures />
          </section>
        </Suspense>

        {/* Impact Section */}
        <Suspense fallback={<SectionLoader />}>
          <section className="py-20 md:py-32 flex justify-center">
            <ImpactSection />
          </section>
        </Suspense>
      </main>
    </div>
  )
}
