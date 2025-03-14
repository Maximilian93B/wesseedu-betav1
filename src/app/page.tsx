"use client"

import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Navigation } from "@/components/wsu/Nav"
import { HeroSection } from "@/components/wsu/Marketing/HeroSection"
import { CardSection } from "@/components/wsu/Marketing/CardSection"
import { PartnersAndVetting } from "@/components/wsu/Marketing/PartnersAndVetting"
import { ProblemSolutionFlow } from "@/components/wsu/Marketing/ProblemSolutionFlow"
import { KeyFeatures } from "@/components/wsu/Marketing/KeyFeatures"
import { ImpactSection } from "@/components/wsu/Marketing/ImpactSection"
import CosmicBackground from "@/components/ui/backgrounds/CosmicBeamsBackground"
import StarryBackground from '@/components/ui/StarryBackground'
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"

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

  // Add scroll progress indicator (optional)
  const scaleX = useTransform(smoothScrollProgress, [0, 1], [0, 1])

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
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
      
      {/* Navigation Component - Positioned above all content with scroll functionality */}
      {isMounted && <Navigation scrollToSection={scrollToSection} currentPath={pathname} />}
      
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-teal-500 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      
      {isMounted && (
        <>
          <div 
            className="fixed inset-0 z-0"
            style={{ 
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.45) 100%)',
              pointerEvents: 'none',
              willChange: 'opacity',
              opacity: contentVisible ? 1 : 0,
              transition: 'opacity 0.6s ease-out' // Slightly longer for smoother transition
            }}
          ></div>
          
          {/* Optimize background components based on device capabilities */}
          {typeof window !== 'undefined' && (
            <>
              <StarryBackground />
              {/* Only render CosmicBackground on more powerful devices that don't have reduced motion preferences */}
              {!window.matchMedia('(prefers-reduced-motion: reduce)').matches && !isMobile() && (
                <CosmicBackground />
              )}
            </>
          )}
        </>
      )}
      
      {/* Content container with higher z-index and smooth scrolling - optimized animations */}
      <motion.main 
        ref={containerRef}
        className={`relative w-full h-screen mx-auto max-w-screen-2xl flex flex-col transition-all duration-1000 ease-out hide-scrollbar overflow-y-scroll ${
          contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ 
          zIndex: 10, 
          position: 'relative',
          willChange: 'opacity, transform', // Hardware acceleration hint
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 1.0, // Slower animation for smoother appearance and better performance
          ease: [0.25, 0.1, 0.25, 1.0] // Custom cubic bezier for more natural motion
        }}
        exit={{ opacity: 0 }}
      >
        {/* Hero Section with spacing adjusted for cresting planet effect */}
        <div 
          id="hero-section" 
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8" 
          style={{ 
            zIndex: 20, 
            position: 'relative',
            paddingBottom: '5vh',
            paddingTop: '5vh',
          }}
        >
          <HeroSection />
        </div>
    
        {/* Progressively load sections with better performance using priority loading */}
        <Suspense fallback={<SectionLoader />}>
          <section id="card-section" className="pt-24 pb-24 md:pb-36 flex justify-center px-4 sm:px-6 lg:px-8">
            <CardSection />
          </section>
        </Suspense>

        {/* Remaining sections with improved loading strategies */}
        <LazyLoadSection id="partners-section" className="py-24 md:py-36 flex justify-center px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<SectionLoader />}>
            <PartnersAndVetting />
          </Suspense>
        </LazyLoadSection>


        {/* Problem Solution Flow */}
        <LazyLoadSection id="solution-section" className="py-24 md:py-36 flex justify-center px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<SectionLoader />}>
            <ProblemSolutionFlow />
          </Suspense>
        </LazyLoadSection>


    {/* Use IntersectionObserver-based lazy loading for sections that aren't immediately visible */}
    <LazyLoadSection id="impact-section" className="py-24 md:py-36 flex justify-center px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<SectionLoader />}>
            <ImpactSection />
          </Suspense>
        </LazyLoadSection>


        {/* Key Features */}
        <LazyLoadSection id="features-section" className="py-24 md:py-36 flex justify-center px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<SectionLoader />}>
            <KeyFeatures />
          </Suspense>
        </LazyLoadSection>
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
      { threshold: 0.1, rootMargin: '100px 0px' } // Start loading when within 100px of viewport
    );
    
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} className={className} ref={sectionRef}>
      {isVisible ? children : <div className="min-h-[50vh]" />}
    </section>
  );
}