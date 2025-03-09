"use client"

import React, { Suspense, useState, useEffect } from 'react'
import { HeroSection } from "@/components/wsu/Marketing/HeroSection"
import { CardSection } from "@/components/wsu/Marketing/CardSection"
import { PartnersAndVetting } from "@/components/wsu/Marketing/PartnersAndVetting"
import { ProblemSolutionFlow } from "@/components/wsu/Marketing/ProblemSolutionFlow"
import { KeyFeatures } from "@/components/wsu/Marketing/KeyFeatures"
import { ImpactSection } from "@/components/wsu/Marketing/ImpactSection"
import CosmicBackground from "@/components/ui/backgrounds/CosmicBeamsBackground"

// WeSeedU styled loading component
const SectionLoader = () => (
  <div className="w-full h-[50vh] flex items-center justify-center">
    <div className="relative w-full max-w-4xl h-64 rounded-xl overflow-hidden bg-black/30 backdrop-blur-sm border border-purple-500/20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-teal-500/20 to-purple-600/20 animate-pulse-slow"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}>
      </div>
      
      {/* Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative h-20 w-20">
            {/* Multiple spinning circles */}
            <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-purple-500 animate-spin" style={{ animationDuration: '1.5s' }}></div>
            <div className="absolute inset-1 rounded-full border-r-2 border-b-2 border-teal-500 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-2 rounded-full border-t-2 border-r-2 border-emerald-500 animate-spin" style={{ animationDuration: '2.5s' }}></div>
            
            {/* WeSeedU logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white font-bold text-lg bg-gradient-to-r from-purple-500 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
                WSU
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-white text-sm font-medium tracking-wider uppercase">
            Growing Innovation
          </div>
          
          {/* Loading progress bar */}
          <div className="mt-4 w-48 h-1 bg-black/30 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-teal-500 animate-pulse-slow rounded-full" 
              style={{ 
                width: '70%',
                animationDuration: '2s'
              }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default function LandingPage() {
  // State to track if component is mounted
  const [isMounted, setIsMounted] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  
  // Ensure component is mounted before rendering dynamic content
  useEffect(() => {
    // First mount the component
    setIsMounted(true);
    
    // Then after a short delay, make content visible
    // This ensures the DOM is ready before animations start
    const timer = setTimeout(() => {
      setContentVisible(true);
    }, 200);
    
    return () => {
      clearTimeout(timer);
      setIsMounted(false);
      setContentVisible(false);
    };
  }, []);

  return (
    <div 
      className={`relative min-h-screen w-full overflow-x-hidden transition-all duration-1000 ease-out ${
        isMounted ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ 
        position: 'relative',
        zIndex: 1 
      }}
    >
      {/* Background with lower z-index */}
      <div className="fixed inset-0" style={{ zIndex: -1 }}>
        <CosmicBackground />
      </div>
      
      {/* Content container with higher z-index */}
      <main 
        className={`relative w-full mx-auto max-w-screen-2xl flex flex-col transition-all duration-1000 ease-out ${
          contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ zIndex: 10, position: 'relative' }}
      >
        {/* Hero Section - Centered vertically and horizontally */}
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8" style={{ zIndex: 20, position: 'relative' }}>
          <HeroSection />
        </div>
    
  
        {/* Impact Section */}
        <Suspense fallback={<SectionLoader />}>
          <ImpactSection />
        </Suspense>

        
        {/* Card Section */}
        <Suspense fallback={<SectionLoader />}>
          <section id="card-section" className="py-24 md:py-36 flex justify-center px-4 sm:px-6 lg:px-8">
            <CardSection />
          </section>
        </Suspense>

        {/* Partners and Vetting Section */}
        <Suspense fallback={<SectionLoader />}>
          <section id="partners-section" className="py-24 md:py-36 flex justify-center px-4 sm:px-6 lg:px-8">
            <PartnersAndVetting />
          </section>
        </Suspense>

        {/* Problem Solution Flow */}
        <Suspense fallback={<SectionLoader />}>
          <section id="solution-section" className="py-24 md:py-36 flex justify-center px-4 sm:px-6 lg:px-8">
            <ProblemSolutionFlow />
          </section>
        </Suspense>
    
        {/* Key Features */}
        <Suspense fallback={<SectionLoader />}>
          <section id="features-section" className="py-24 md:py-36 flex justify-center px-4 sm:px-6 lg:px-8">
            <KeyFeatures />
          </section>
        </Suspense>
      </main>
    </div>
  )
}
