"use client"

import { HeroSection } from "@/components/wsu/Marketing/HeroSection"
import { KeyFeatures } from "@/components/wsu/Marketing/KeyFeatures"
import { Partners } from "@/components/wsu/Marketing/Partners"
import { VettingProcess } from "@/components/wsu/Marketing/VettingProcess"
import { ImpactSection } from "@/components/wsu/Marketing/ImpactSection"

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
      </div>
    </div>
  )
}

