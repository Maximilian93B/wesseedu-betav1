"use client"

import { ArrowRight, Shield, CheckCircle, BarChart2, FileCheck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { cn } from "@/lib/utils"

// Define static data outside the component
const PARTNERS = [
  {
    name: "United Nations",
    logo: "/images/Flag_of_the_United_Nations.svg",
    description: "Working together for global sustainability goals",
    link: "/partners/united-nations"
  },
  {
    name: "Global Sustainability Fund",
    logo: "/images/logo-gsf.svg",
    description: "Pioneering sustainable investment strategies",
    link: "/partners/gsf"
  },
  {
    name: "World Bank",
    logo: "/images/logo-world-bank.svg",
    description: "Supporting economic development worldwide",
    link: "/partners/world-bank"
  }
];

const VETTING_STEPS = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Initial Screening",
    description: "Companies are evaluated against our sustainability criteria and UN SDGs alignment."
  },
  {
    icon: <BarChart2 className="h-6 w-6" />,
    title: "Financial Analysis",
    description: "Our team conducts thorough financial assessment and growth potential evaluation."
  },
  {
    icon: <FileCheck className="h-6 w-6" />,
    title: "Due Diligence",
    description: "Comprehensive verification of business model, team, and sustainability claims."
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Final Approval",
    description: "Selected companies are approved by our investment committee for platform listing."
  }
];

// Standardized cosmic card component
function CosmicCard({ 
  children, 
  className,
  style 
}: { 
  children: React.ReactNode; 
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-purple-500/15 bg-black/90 p-6 shadow-[0_0_20px_rgba(139,92,246,0.1)] hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-700",
        className
      )}
      style={style}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        {/* Cosmic accent elements */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
        
        {/* Enhanced edge glow */}
        <div className="absolute inset-0 rounded-xl border border-purple-500/20 shadow-[inset_0_0_20px_rgba(139,92,246,0.15)]"></div>
        
        {/* Subtle top edge highlight */}
        <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
        
        {/* Card hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-b from-purple-500/10 via-transparent to-teal-500/10"></div>
        
        {/* Solid background to ensure text clarity */}
        <div className="absolute inset-0 bg-black/85"></div>
      </div>
      
      {/* Card content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}

// Enhanced vetting card using standardized cosmic card
function VettingCard({ step, index }: { step: any; index: number }) {
  return (
    <CosmicCard>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-teal-500/20 text-teal-400 shadow-[0_0_10px_rgba(139,92,246,0.2)]">
        {step.icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-white">
        {index + 1}. {step.title}
      </h3>
      <p className="text-gray-300">{step.description}</p>
    </CosmicCard>
  );
}

// Enhanced partner card using standardized cosmic card with size variations
function PartnerCard({ partner, index }: { 
  partner: any; 
  index: number; 
}) {
  // Calculate scale and opacity based on index
  const getCardStyles = (idx: number) => {
    // First card (index 0) is largest, each subsequent card gets smaller
    const scale = 1 - (idx * 0.05); // 100%, 95%, 90% scale
    const opacity = 1 - (idx * 0.05); // 100%, 95%, 90% opacity
    
    return {
      transform: `scale(${scale})`,
      opacity: opacity,
      zIndex: 10 - idx // Ensure proper stacking
    };
  };

  const styles = getCardStyles(index);
  
  return (
    <CosmicCard 
      className="transition-all duration-500 hover:scale-105"
      style={styles}
    >
      <div className="flex items-center space-x-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full bg-white/10 ring-1 ring-purple-500/20 shadow-[0_0_10px_rgba(139,92,246,0.15)]">
          <Image
            src={partner.logo}
            alt={partner.name}
            fill
            className="object-contain p-2"
            sizes="64px"
            loading="lazy"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{partner.name}</h3>
          <p className="text-sm text-gray-300">{partner.description}</p>
        </div>
      </div>
      {partner.link && (
        <Link
          href={partner.link}
          className="mt-4 inline-flex items-center text-sm text-purple-400 hover:text-teal-400 transition-colors duration-300"
        >
          Learn more <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      )}
    </CosmicCard>
  );
}

export function PartnersAndVetting() {
  return (
    <>
      {/* Add the animations globally */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.35; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes glow-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-10px) scale(1.05); opacity: 0.7; }
        }
        .animate-glow-float {
          animation: glow-float 8s ease-in-out infinite;
        }
        
        @keyframes glow-float-delayed {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(10px) scale(1.05); opacity: 0.7; }
        }
        .animate-glow-float-delayed {
          animation: glow-float-delayed 8s ease-in-out infinite 2s;
        }
      `}</style>
      
      <div className="relative overflow-hidden py-20 md:py-32">
        <div className="container relative z-10 mx-auto px-6">
          {/* Section Header */}
          <ScrollReveal
            className="mb-16 text-center md:mb-24"
          >
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Our Partners & Vetting Process
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              We collaborate with leading organizations and employ a rigorous vetting process to ensure only the most promising sustainable startups make it to our platform.
            </p>
          </ScrollReveal>

          {/* Partners section */}
          <div className="mb-48">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-20">
              {/* Partners Header - Left column */}
              <ScrollReveal>
                <div className="flex flex-col items-start max-w-lg">
                  <div className="inline-flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8 text-xs text-purple-400 font-medium border border-purple-500/20 shadow-[0_0_10px_rgba(139,92,246,0.1)]">
                    <span>Our Global Partners</span>
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </div>

                  <h2 
                    id="partners-heading" 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight leading-tight"
                  >
                    Trusted by <span className="bg-gradient-to-r from-purple-400 to-teal-400 text-transparent bg-clip-text">Global Leaders</span> in Sustainability
                  </h2>

                  <p className="text-white/70 text-lg leading-relaxed">
                    From international organizations to sustainable investment funds, we collaborate with partners who share
                    our vision of a more sustainable future.
                  </p>
                </div>
              </ScrollReveal>

              {/* Partners Cards - Right column */}
              <div className="pt-6">
                {/* Desktop layout - modified for cascading effect with more spacing */}
                <div className="hidden md:flex flex-row justify-center items-center space-x-8">
                  {PARTNERS.map((partner, index) => (
                    <ScrollReveal
                      key={partner.name || index}
                      className="w-full max-w-[280px]"
                    >
                      <PartnerCard 
                        partner={partner} 
                        index={index}
                      />
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Vetting Process section */}
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-20">
              {/* Vetting Cards - Left column */}
              <div className="pt-6 order-2 lg:order-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {VETTING_STEPS.slice(0, 2).map((step, index) => (
                    <ScrollReveal
                      key={index}
                    >
                      <VettingCard step={step} index={index} />
                    </ScrollReveal>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                  {VETTING_STEPS.slice(2, 4).map((step, index) => (
                    <ScrollReveal
                      key={index + 2}
                    >
                      <VettingCard step={step} index={index + 2} />
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              {/* Vetting Process Header - Right column */}
              <ScrollReveal
                className="order-1 lg:order-2"
              >
                <div className="flex flex-col items-end text-right max-w-lg ml-auto">
                  <div className="inline-flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8 text-xs text-purple-400 font-medium border border-purple-500/20 shadow-[0_0_10px_rgba(139,92,246,0.1)]">
                    <span>Our Vetting Process</span>
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </div>

                  <h2 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight leading-tight"
                  >
                    Rigorous Vetting by{" "}
                    <span className="bg-gradient-to-r from-purple-400 to-teal-400 text-transparent bg-clip-text">
                      Industry Experts
                    </span>
                  </h2>

                  <p className="text-white/70 text-lg leading-relaxed">
                    Every investment opportunity on WeSeedU undergoes comprehensive verification by leading accounting firms.
                    We ensure transparency and potential in every listing through our thorough evaluation process.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
        
        {/* CTA section with enhanced button styling */}
        <div className="flex justify-center mt-24">
          <Button
            className="text-white border border-purple-500/30 
              bg-black hover:bg-purple-900/40 
              transition-all duration-300 py-6 px-8 h-auto text-base group
              shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            asChild
          >
            <Link href="/partners">
              Learn more about our partners
              <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
} 