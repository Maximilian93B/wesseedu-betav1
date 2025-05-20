"use client"

import React, { useState, useEffect, useRef } from 'react'
import { MainNav } from "@/components/wsu/Nav"
import { Footer } from "@/components/wsu/Footer"
import { motion, useScroll, useTransform, useSpring, LazyMotion, domAnimation, useReducedMotion } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import SectionLoader from "@/components/wsu/SectionLoader"
import { ScrollProvider } from "@/context/ScrollContext"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Import components directly to prevent layout shift and reduce CLS
import { HeroSection } from "@/components/wsu/Marketing/HeroSection"
import { MobileHero } from "@/components/wsu/Marketing/MobileHero"
import { CardSection } from "@/components/wsu/Marketing/CardSection"
import { PartnersAndVetting } from "@/components/wsu/Marketing/PartnersAndVetting/index"
import { MoneyWorthSection } from "@/components/wsu/Marketing/MoneyWorthSection"
import { EarnAsYouGrow } from "@/components/wsu/Marketing/EarnAsYouGrow"
import { StartupApplicationSection } from "@/components/wsu/Marketing/StartupApplicationSection"

// Environmental configuration to easily toggle effects
const ENABLE_SCROLL_EFFECTS = false; // Set to false to ensure consistent experience

export default function LandingPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  // Disable all scroll effects based on config, reduced motion preference, or mobile
  const disableScrollEffects = !ENABLE_SCROLL_EFFECTS || prefersReducedMotion || isMobileDevice;
  
  // Track scroll progress with framer-motion (only if effects enabled)
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });
  
  // Create minimal smooth scroll progress for the progress bar only
  const smoothScrollProgress = useSpring(scrollYProgress, {
    damping: 120, 
    stiffness: 400,
    restDelta: 0.001,
    mass: 0.05
  });
  
  // Progress indicator for the scroll bar at the top
  const scaleX = useTransform(smoothScrollProgress, [0, 1], [0, 1]);
  
  // Minimalistic parallax effects - only applied when effects are enabled
  const parallaxEffects = {
    hero: useTransform(
      smoothScrollProgress, 
      [0, 0.2], 
      [0, disableScrollEffects ? 0 : -3]
    ),
    card: useTransform(
      smoothScrollProgress, 
      [0.1, 0.3], 
      [disableScrollEffects ? 0 : 3, 0]
    ),
    partners: useTransform(
      smoothScrollProgress, 
      [0.25, 0.45], 
      [disableScrollEffects ? 0 : 2, disableScrollEffects ? 0 : -2]
    )
  };
  
  // Mount effect
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Mobile detection effect with debouncing
  useEffect(() => {
    setIsMobileDevice(isMobile());
    
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobileDevice(isMobile());
      }, 100);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Simplified parallax component - optimized for performance
  interface ParallaxSectionProps {
    id: string;
    effect: any; // Motion value from useTransform
    zIndex: number;
    children: React.ReactNode;
    className?: string;
  }

  const ParallaxSection = ({ 
    id, 
    effect, 
    zIndex, 
    children, 
    className = "" 
  }: ParallaxSectionProps) => (
    <motion.div
      id={id}
      className={`parallax-section ${className}`}
      style={{
        y: disableScrollEffects ? 0 : effect, // No effect when disabled
        zIndex,
        willChange: disableScrollEffects ? 'auto' : 'transform'
      }}
    >
      {children}
    </motion.div>
  );
  
  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-screen w-full overflow-x-hidden" 
        style={{ background: 'white' }}>
        {/* Navigation Component */}
        {isMounted && <MainNav currentPath={pathname} />}
        
        {/* Scroll progress indicator - only shown if effects enabled */}
        {!disableScrollEffects && (
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-[#49c628] z-50 origin-left"
            style={{ scaleX, willChange: 'transform' }}
          />
        )}
        
        {/* Main content */}
        <ScrollProvider 
          scrollYProgress={smoothScrollProgress}
          prefersReducedMotion={prefersReducedMotion ?? false}
          isMobileDevice={isMobileDevice}
        >
          <main 
            ref={mainRef}
            className="relative w-full min-h-screen overflow-x-hidden bg-white"
          >
            {/* Hero Section */}
            <ParallaxSection
              id="hero-section"
              effect={parallaxEffects.hero}
              zIndex={20}
              className={`${isMobileDevice ? 'min-h-fit' : 'min-h-screen'} flex items-center justify-center ${isMobileDevice ? 'pt-16 pb-8' : 'pt-20 md:pt-24 lg:pt-28 mb-20 md:mb-24 lg:mb-32'} bg-white`}
            >
              {isMobileDevice ? <MobileHero /> : <HeroSection />}
            </ParallaxSection>
            
            {/* Card Section */}
            <ParallaxSection
              id="card-section"
              effect={parallaxEffects.card}
              zIndex={15}
              className="w-full mb-20 md:mb-24 lg:mb-32 overflow-x-hidden bg-white"
            >
              <CardSection />
            </ParallaxSection>
            
            {/* Partners section */}
            <ParallaxSection
              id="partners-section"
              effect={parallaxEffects.partners}
              zIndex={10}
              className="px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto bg-white"
            >
              <PartnersAndVetting />
            </ParallaxSection>

            {/* Solution Section - Static */}
            <div 
              className="w-full relative overflow-hidden bg-white" 
              id="solution-section" 
              style={{ zIndex: 5 }}
            >
              <div 
                className="absolute inset-0 max-w-full bg-white" 
                style={{ 
                  zIndex: 1
                }}
              >
              
              </div>
              <section className="w-full pt-16 pb-20 md:pb-24 lg:pb-20 mt-0 relative bg-white" 
                style={{ zIndex: 2 }}>
                {/* Solution sections - no Suspense boundaries for better performance */}
           
               
                <div 
                  className="px-4 sm:px-6 lg:px-8 w-full -mb-8 md:-mb-12 bg-white"
                  id="transition-section"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4 }}
                    className="text-center max-w-4xl mx-auto py-16 md:py-24"
                  >
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#70f570] to-[#49c628] rounded-full shadow-lg mb-6">
                      <ArrowRight size={18} className="text-white mr-2" />
                      <span className="text-sm font-medium text-white font-helvetica tracking-wider">STARTUP OPPORTUNITY</span>
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] font-display mb-8 text-black">
                      Fund Your Vision
                    </h2>
                    
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed font-light font-body max-w-3xl mx-auto mb-12 text-black/80">
                      Join the next generation of sustainable startups. We provide strategic funding, expert guidance, and access to a global network of impact investors.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                      <span className="bg-gradient-to-r from-[#70f570] to-[#49c628] text-white px-5 py-2 rounded-full text-sm font-medium font-body shadow-lg">$2M+ Average Funding</span>
                      <span className="bg-gradient-to-r from-[#70f570] to-[#49c628] text-white px-5 py-2 rounded-full text-sm font-medium font-body shadow-lg">Expert Mentorship</span>
                      <span className="bg-gradient-to-r from-[#70f570] to-[#49c628] text-white px-5 py-2 rounded-full text-sm font-medium font-body shadow-lg">Global Network</span>
                    </div>
                    
                    <Button 
                      asChild 
                      className="bg-gradient-to-r from-[#70f570] to-[#49c628] text-white hover:bg-gradient-to-l hover:from-[#70f570] hover:to-[#49c628] font-semibold
                                shadow-xl hover:shadow-2xl transition-all duration-300 
                                rounded-xl py-4 px-8 text-base font-helvetica
                                hover:scale-105 transform"
                    >
                      <Link href="/apply">
                        <span className="flex items-center justify-center">
                          Apply for Funding
                          <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </Link>
                    </Button>
                  </motion.div>
                </div>
           
                <div 
                  className="px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto mt-16 bg-white"
                  id="startup-section"
                >
                  <StartupApplicationSection />
                </div>
           
                <div 
                  className="px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto bg-white"
                  id="earn-section"
                >
                  <EarnAsYouGrow />
                </div>
                <div 
                  className="px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto bg-white"
                  id="money-worth-section"
                >
                  <MoneyWorthSection />
                </div>
              </section>
            </div>
          </main>
        </ScrollProvider>
        
        {/* Footer */}
        {isMounted && <Footer />}
      </div>
    </LazyMotion>
  )
}

// Helper function to detect mobile devices
function isMobile() {
  if (typeof window === 'undefined') return false;
  
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isMobileScreen = window.innerWidth < 850;
  const isTouchDevice = 'ontouchstart' in window || (navigator.maxTouchPoints > 0);
  
  return isMobileScreen && (isTouchDevice || isMobileUA);
}