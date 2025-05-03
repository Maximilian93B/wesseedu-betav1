"use client"

import React, { Suspense, useState, useEffect, useRef } from 'react'
import { MainNav } from "@/components/wsu/Nav"
import { Footer } from "@/components/wsu/Footer"
import { motion, useScroll, useTransform, useSpring, LazyMotion, domAnimation } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import dynamic from 'next/dynamic'
import SectionLoader from "@/components/wsu/SectionLoader"

// Dynamic imports only - remove the static imports
const HeroSection = dynamic(() => 
  import("@/components/wsu/Marketing/HeroSection").then(mod => mod.HeroSection), {
  loading: () => <SectionLoader />,
  ssr: true
})

const MobileHero = dynamic(() => 
  import("@/components/wsu/Marketing/MobileHero").then(mod => mod.MobileHero), {
  loading: () => <SectionLoader />,
  ssr: true
})

const CardSection = dynamic(() => 
  import("@/components/wsu/Marketing/CardSection").then(mod => mod.CardSection), {
  loading: () => <SectionLoader />,
  ssr: true
})

const PartnersAndVetting = dynamic(() => 
  import("@/components/wsu/Marketing/PartnersAndVetting/index").then(mod => mod.PartnersAndVetting), {
  loading: () => <SectionLoader />,
  ssr: true
})

const MoneyWorthSection = dynamic(() => 
  import("@/components/wsu/Marketing/MoneyWorthSection").then(mod => mod.MoneyWorthSection), {
  loading: () => <SectionLoader />,
  ssr: true
})

const EarnAsYouGrow = dynamic(() => 
  import("@/components/wsu/Marketing/EarnAsYouGrow").then(mod => mod.EarnAsYouGrow), {
  loading: () => <SectionLoader />,
  ssr: true
})

const SustainableImpactSection = dynamic(() => 
  import("@/components/wsu/Marketing/WsImact").then(mod => mod.SustainableImpactSection), {
  loading: () => <SectionLoader />,
  ssr: true
})

const StartupApplicationSection = dynamic(() => 
  import("@/components/wsu/Marketing/StartupApplicationSection").then(mod => mod.StartupApplicationSection), {
  loading: () => <SectionLoader />,
  ssr: true
})

export default function LandingPage() {
  // State to track if component is mounted and fully loaded
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  
  // Track scroll progress with framer-motion
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"]
  });
  
  // Create smooth scrolling effect with optimized spring physics
  const smoothScrollProgress = useSpring(scrollYProgress, {
    damping: 25, // Lower damping for smoother motion
    stiffness: 100, // Reduced stiffness for less resistance
    restDelta: 0.001,
    mass: 0.1 // Lower mass for less momentum
  });
  
  // Simplified transforms with fewer interpolation points
  const heroParallax = useTransform(smoothScrollProgress, [0, 0.3], [0, -30]);
  const cardSectionParallax = useTransform(smoothScrollProgress, [0.1, 0.4], [30, 0]);
  const partnersTransform = useTransform(smoothScrollProgress, [0.3, 0.5], [15, -15]);
  
  // Progress indicator for the scroll bar at the top
  const scaleX = useTransform(smoothScrollProgress, [0, 1], [0, 1]);
  
  // Ensure component is mounted before rendering content
  useEffect(() => {
    setIsMounted(true);
    
    return () => {
      setIsMounted(false);
    };
  }, []);
  
  // Mobile detection effect
  useEffect(() => {
    // Check if this is a mobile device on mount
    setIsMobileDevice(isMobile());
    
    // Add event listener for orientation changes
    const handleResize = () => {
      setIsMobileDevice(isMobile());
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Add smooth scroll behavior to document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-screen w-full overflow-x-hidden" style={{
        background: 'linear-gradient(115deg, #49c628 0%, #49c628 100%)'
      }}>
        {/* Navigation Component */}
        {isMounted && <MainNav currentPath={pathname} />}
        
        {/* Scroll progress indicator - hardware accelerated */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50"
          style={{ 
            scaleX, 
            transformOrigin: "0%",
            willChange: "transform",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        />
        
        {/* Main content */}
        <main 
          ref={mainRef}
          className="relative w-full min-h-screen overflow-x-hidden"
          style={{
            perspective: "1000px",
            WebkitPerspective: "1000px"
          }}
        >
          {/* Hero Section with proper Suspense boundaries */}
          <motion.div 
            id="hero-section" 
            className={`parallax-section ${isMobileDevice ? 'min-h-fit' : 'min-h-screen'} flex items-center justify-center ${isMobileDevice ? 'pt-16 pb-8' : 'pt-20 md:pt-24 lg:pt-28 mb-20 md:mb-24 lg:mb-32'}`}
            style={{ 
              y: heroParallax,
              zIndex: 20, 
              position: 'relative',
              willChange: "transform",
              backfaceVisibility: "hidden"
            }}
          >
            <Suspense fallback={<SectionLoader />}>
              {isMobileDevice ? <MobileHero /> : <HeroSection />}
            </Suspense>
          </motion.div>
       
          {/* Card Section with Suspense boundary */}
          <motion.section 
            id="card-section" 
            className="parallax-section w-full mb-20 md:mb-24 lg:mb-32 overflow-x-hidden"
            style={{ 
              y: cardSectionParallax,
              zIndex: 15,
              willChange: "transform",
              backfaceVisibility: "hidden"
            }}
          >
            <Suspense fallback={<SectionLoader />}>
              <CardSection />
            </Suspense>
          </motion.section>

          <motion.div 
            className="parallax-section px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto"
            id="partners-section"
            style={{ 
              y: partnersTransform,
              zIndex: 10,
              willChange: "transform",
              backfaceVisibility: "hidden"
            }}
          >
            <Suspense fallback={<SectionLoader />}>
              <PartnersAndVetting />
            </Suspense>
          </motion.div>
      
          {/* Solution Section - Static without parallax to improve performance */}
          <div 
            className="w-full relative overflow-hidden" 
            id="solution-section" 
            style={{ zIndex: 5 }}
          >
            {/* Remove the motion transform from background div for clean transition */}
            <div 
              className="absolute inset-0 max-w-full" 
              style={{ 
                background: 'linear-gradient(to top, #00b4db, #0083b0)',
                zIndex: 1
              }}
            >
              {/* Add a clean divider element */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#49c628] to-transparent"></div>
            </div>
            <section className="w-full pt-16 pb-20 md:pb-24 lg:pb-20 mt-0 relative" 
              style={{ zIndex: 2 }}>
              {/* Solution sections with Suspense boundaries - no motion transforms for better performance */}
              <div 
                className="px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto mt-16"
                id="startup-section"
              >
                <Suspense fallback={<SectionLoader />}>
                  <StartupApplicationSection />
                </Suspense>
              </div>
              <div 
                className="px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto mb-16"
                id="impact-section"
              >
                <Suspense fallback={<SectionLoader />}>
                  <SustainableImpactSection />
                </Suspense>
              </div>
              <div 
                className="px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto"
                id="earn-section"
              >
                <Suspense fallback={<SectionLoader />}>
                  <EarnAsYouGrow />
                </Suspense>
              </div>
              <div 
                className="px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto"
                id="money-worth-section"
              >
                <Suspense fallback={<SectionLoader />}>
                  <MoneyWorthSection />  
                </Suspense>
              </div>
            </section>
          </div>
        </main>
        
        {/* Footer */}
        {isMounted && <Footer />}
      </div>
    </LazyMotion>
  )
}

// Helper function to detect mobile devices - enhanced version
function isMobile() {
  if (typeof window === 'undefined') return false;
  
  // Check for mobile user agent
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Check for mobile screen size
  const isMobileScreen = window.innerWidth < 768;
  
  // Check for touch capability
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Consider it mobile if either condition is true
  return isMobileUA || (isMobileScreen && isTouchDevice);
}