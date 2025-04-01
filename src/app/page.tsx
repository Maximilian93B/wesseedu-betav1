"use client"

import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Navigation } from "@/components/wsu/Nav"
import { HeroSection } from "@/components/wsu/Marketing/HeroSection"
import { CardSection } from "@/components/wsu/Marketing/CardSection"
import { PartnersAndVetting } from "@/components/wsu/Marketing/PartnersAndVetting/index"
import { MoneyWorthSection } from "@/components/wsu/Marketing/MoneyWorthSection"
import { KeyFeatures } from "@/components/wsu/Marketing/KeyFeatures"
import { ImpactSection } from "@/components/wsu/Marketing/ImpactSection"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"

// Monochromatic styled loading component
const SectionLoader = () => (
  <div className="w-full h-[50vh] flex items-center justify-center">
    <div className="relative w-full max-w-4xl h-64 rounded-xl overflow-hidden bg-white/90 backdrop-blur-sm border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      {/* Animated gradient background */}
      <div className="absolute inset-0" 
        style={{ 
          backgroundImage: "linear-gradient(to right top, rgba(255,255,255,0.95), rgba(255,255,255,0.85))" 
        }}></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, black 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}>
      </div>
      
      {/* Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative h-20 w-20">
            {/* Multiple spinning circles */}
            <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-green-600 animate-spin" style={{ animationDuration: '1.5s' }}></div>
            <div className="absolute inset-1 rounded-full border-r-2 border-b-2 border-green-500 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-2 rounded-full border-t-2 border-r-2 border-green-400 animate-spin" style={{ animationDuration: '2.5s' }}></div>
            
            {/* Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-green-800 font-bold text-lg">
                WSU
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-green-700 text-sm font-medium tracking-wider uppercase">
            Loading Content
          </div>
          
          {/* Loading progress bar */}
          <div className="mt-4 w-48 h-1 bg-green-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 animate-pulse-slow rounded-full" 
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

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ 
    container: containerRef
  })
  
  // Create smooth scrolling effect with spring physics
  const smoothScrollProgress = useSpring(scrollYProgress, {
    damping: 20,
    mass: 0.5,
    stiffness: 100
  })
  
  const router = useRouter()
  const pathname = usePathname()

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element && containerRef.current) {
      containerRef.current.scrollTo({
        top: element.offsetTop,
        behavior: "smooth"
      })
    }
  }

  // Add scroll progress indicator
  const scaleX = useTransform(smoothScrollProgress, [0, 1], [0, 1])

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{
      background: 'linear-gradient(115deg, #70f570, #49c628)'
    }}>
      {/* Global animation styles */}
      <style jsx global>{`
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes animate-subtle-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-subtle-rotate {
          animation: animate-subtle-rotate 120s linear infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.32; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.8; filter: blur(1px); }
          50% { opacity: 1; filter: blur(2px); }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 6s ease-in-out infinite;
        }
        
        @keyframes float-orbit {
          0%, 100% { transform: translateX(-5%) translateY(0); }
          25% { transform: translateX(0) translateY(3%); }
          50% { transform: translateX(5%) translateY(0); }
          75% { transform: translateX(0) translateY(-3%); }
        }
        
        .animate-float-orbit {
          animation: float-orbit 90s ease-in-out infinite;
        }
        
        /* Smooth scrolling for the entire site */
        html {
          scroll-behavior: smooth;
        }
        
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
      
      {/* Navigation Component */}
      {isMounted && <Navigation scrollToSection={scrollToSection} currentPath={pathname} />}
      
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      
      {/* Content container */}
      <motion.main 
        ref={containerRef}
        className={`relative w-full h-screen flex flex-col transition-all duration-1000 ease-out hide-scrollbar overflow-y-scroll ${
          contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ 
          zIndex: 10, 
          position: 'relative',
          willChange: 'opacity, transform',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 1.0, 
          ease: [0.25, 0.1, 0.25, 1.0]
        }}
        exit={{ opacity: 0 }}
      >
        {/* Hero Section */}
        <div 
          id="hero-section" 
          className="min-h-screen flex items-center justify-center pt-28 md:pt-32 lg:pt-36 mb-36 md:mb-48 lg:mb-60" 
          style={{ 
            zIndex: 20, 
            position: 'relative',
          }}
        >
          <HeroSection />
        </div>
    
        {/* Card Section - No width constraints, full viewport section */}
        <Suspense fallback={<SectionLoader />}>
          <section id="card-section" className="min-h-screen w-full mb-48 md:mb-48 lg:mb-60">
            <CardSection />
          </section>
        </Suspense>

        {/* Remaining sections - Adjusted for consistency with increased spacing */}
        <LazyLoadSection id="partners-section" className="w-full py-36 md:py-48 lg:py-60 mb-48 md:mt-48 lg:mt-60">
          <Suspense fallback={<SectionLoader />}>
            <div className="px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
              <PartnersAndVetting />
            </div>
          </Suspense>
        </LazyLoadSection>

            {/* Money Worth Section */}
            <LazyLoadSection id="solution-section" className="w-full py-36 md:py-48 lg:py-60 mb-36 md:mb-48 lg:mb-60">
          <Suspense fallback={<SectionLoader />}>
            <div className="px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
              <MoneyWorthSection />
            </div>
          </Suspense>
        </LazyLoadSection>

  
        {/* Extra padding at bottom for cleaner scroll experience */}
        <div className="h-36 md:h-48 lg:h-60"></div>
      </motion.main>
    </div>
  )
}

// Helper function to detect mobile devices
function isMobile() {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768; // Consider tablets and small screens as mobile for performance
}

// Lazy loading component that only renders when scrolled into view
function LazyLoadSection({ id, className, children }: { id: string, className?: string, children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only need to observe once
        }
      },
      { threshold: 0.1, rootMargin: '200px 0px' } // Increased margin to load sections earlier
    );
    
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} className={className} ref={sectionRef}>
      {isVisible ? children : <div className="min-h-[60vh]" />} {/* Increased minimum height for placeholder */}
    </section>
  );
}