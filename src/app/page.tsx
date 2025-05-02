"use client"

import React, { Suspense, useState, useEffect, useRef, useMemo } from 'react'
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
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Track scroll progress with framer-motion
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"]
  });
  
  // Create smooth scrolling effect with spring physics - adjusted for better bidirectional scrolling
  const smoothScrollProgress = useSpring(scrollYProgress, {
    damping: 80, // Increased damping for less bounce
    stiffness: 350, // Decreased stiffness for gentler response
    restDelta: 0.0005,
    mass: 0.2 // Reduced mass for less momentum
  });
  
  // Symmetric bidirectional transforms
  const useParallax = !isFullyLoaded;
  
  // Bidirectional interpolation makes scrolling smooth in both directions
  const heroParallax = useTransform(smoothScrollProgress, [0, 0.3], [0, useParallax ? -40 : 0]);
  const cardSectionParallax = useTransform(smoothScrollProgress, [0.1, 0.4], [useParallax ? 40 : 0, 0]);
  const solutionSectionParallax = useTransform(smoothScrollProgress, [0.4, 0.6], [useParallax ? 20 : 0, useParallax ? -20 : 0]);
  
  // Smoother opacity transitions with more consistent values
  const heroOpacity = useTransform(smoothScrollProgress, [0, 0.15], [1, useParallax ? 0.85 : 1]);
  const cardSectionOpacity = useTransform(smoothScrollProgress, [0.1, 0.4], [useParallax ? 0.85 : 1, 1]);
  const solutionOpacity = useTransform(smoothScrollProgress, [0.4, 0.45], [useParallax ? 0.85 : 1, 1]);
  
  // More gentle section transforms with identical up/down effects
  const sectionOneTransform = useTransform(smoothScrollProgress, [0.45, 0.55], [useParallax ? 10 : 0, useParallax ? -10 : 0]);
  const sectionTwoTransform = useTransform(smoothScrollProgress, [0.5, 0.6], [useParallax ? 10 : 0, useParallax ? -10 : 0]);
  const sectionThreeTransform = useTransform(smoothScrollProgress, [0.55, 0.65], [useParallax ? 10 : 0, useParallax ? -10 : 0]);
  const sectionFourTransform = useTransform(smoothScrollProgress, [0.6, 0.7], [useParallax ? 10 : 0, useParallax ? -10 : 0]);
  const partnersTransform = useTransform(smoothScrollProgress, [0.3, 0.5], [useParallax ? 15 : 0, useParallax ? -15 : 0]);
  const partnersOpacity = useTransform(smoothScrollProgress, [0.3, 0.4], [useParallax ? 0.85 : 1, 1]);
  
  // Progress indicator for the scroll bar at the top
  const scaleX = useTransform(smoothScrollProgress, [0, 1], [0, 1]);
  
  // Ensure component is mounted before rendering content
  useEffect(() => {
    setIsMounted(true);
    
    // Track if user has scrolled to disable parallax effects
    const parallaxTimeout = setTimeout(() => {
      setIsFullyLoaded(true);
      console.log("Parallax effects disabled for better performance");
    }, 8000); // Base timeout as fallback
    
    // Listen for scroll events to intelligently disable parallax
    const handleScroll = () => {
      // If user has scrolled more than 80% of the page, disable parallax
      if (window.scrollY > (document.body.scrollHeight * 0.8)) {
        setIsFullyLoaded(true);
        clearTimeout(parallaxTimeout);
        console.log("Parallax effects disabled based on scroll position");
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      setIsMounted(false);
      clearTimeout(parallaxTimeout);
      window.removeEventListener('scroll', handleScroll);
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
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-screen w-full overflow-x-hidden" style={{
        background: 'linear-gradient(115deg, #49c628 0%, #49c628 100%)'
      }}>
        {/* Navigation Component */}
        {isMounted && <MainNav currentPath={pathname} />}
        
        {/* Scroll progress indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50"
          style={{ 
            scaleX, 
            transformOrigin: "0%",
            willChange: "transform",
            translateZ: 0
          }}
        />
        
        {/* Main content */}
        <main 
          ref={mainRef}
          className="relative w-full min-h-screen overflow-hidden"
        >
          {/* Hero Section with proper Suspense boundaries */}
          <motion.div 
            id="hero-section" 
            className={`parallax-section ${isMobileDevice ? 'min-h-fit' : 'min-h-screen'} flex items-center justify-center ${isMobileDevice ? 'pt-16 pb-8' : 'pt-20 md:pt-24 lg:pt-28 mb-20 md:mb-24 lg:mb-32'}`}
            style={{ 
              y: heroParallax,
              opacity: heroOpacity,
              zIndex: 20, 
              position: 'relative'
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
              opacity: cardSectionOpacity,
              zIndex: 15
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
              opacity: partnersOpacity,
              zIndex: 10
            }}
          >
            <Suspense fallback={<SectionLoader />}>
              <PartnersAndVetting />
            </Suspense>
          </motion.div>
      
          {/* Solution Section */}
          <motion.div 
            className="parallax-section w-full relative overflow-hidden" 
            id="solution-section" 
            style={{ 
              y: solutionSectionParallax,
              opacity: solutionOpacity,
              zIndex: 5 
            }}
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
              style={{ 
                zIndex: 2
              }}>
              {/* Solution sections with Suspense boundaries */}
              <motion.div 
                className="parallax-section px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto mt-16"
                id="startup-section"
                style={{
                  y: sectionOneTransform
                }}
              >
                <Suspense fallback={<SectionLoader />}>
                  <StartupApplicationSection />
                </Suspense>
              </motion.div>
              <motion.div 
                className="parallax-section px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto mb-16"
                id="impact-section"
                style={{
                  y: sectionTwoTransform
                }}
              >
                <Suspense fallback={<SectionLoader />}>
                  <SustainableImpactSection />
                </Suspense>
              </motion.div>
              <motion.div 
                className="parallax-section px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto"
                style={{
                  y: sectionThreeTransform
                }}
              >
                <Suspense fallback={<SectionLoader />}>
                  <EarnAsYouGrow />
                </Suspense>
              </motion.div>
              <motion.div 
                className="parallax-section px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto"
                style={{
                  y: sectionFourTransform
                }}
              >
                <Suspense fallback={<SectionLoader />}>
                  <MoneyWorthSection />  
                </Suspense>
              </motion.div>
            </section>
          </motion.div>
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