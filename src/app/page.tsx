"use client"

import { HeroSection } from "@/components/wsu/HeroSection"
import { KeyFeatures } from "@/components/wsu/KeyFeatures"
import { Partners } from "@/components/wsu/Partners"
import { VettingProcess } from "@/components/wsu/VettingProcess"
import { ImpactSection } from "@/components/wsu/ImpactSection"
import { Footer } from "@/components/wsu/Footer"
export default function LandingPage() {
  return (
    <div className="relative">
      <div className="fixed inset-0 bg-gradient-to-b from-[#020714] via-[#0A1A3B]/95 to-[#020714] pointer-events-none" />
      <div className="relative">
        <HeroSection />
        <Partners />
        <KeyFeatures />
        <VettingProcess />
        <ImpactSection />
        <Footer />
      </div>
    </div>
  )
}

