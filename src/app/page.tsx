"use client"

import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Navigation } from "@/components/wsu/Nav"
import { HeroSection } from "@/components/wsu/Marketing/HeroSection"
import { CardSection } from "@/components/wsu/Marketing/CardSection"
import { PartnersAndVetting } from "@/components/wsu/Marketing/PartnersAndVetting/index"
import { MoneyWorthSection } from "@/components/wsu/Marketing/MoneyWorthSection"
import { EarnAsYouGrow } from "@/components/wsu/Marketing/EarnAsYouGrow"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import { SustainableImpactSection } from "@/components/wsu/Marketing/WsImact"
import { GrowFooter } from "@/components/wsu/Marketing/GrowFooter"
import { StartupApplicationSection } from "@/components/wsu/Marketing/StartupApplicationSection"


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
        }}></div>
      
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
              <div className="text-green-800 font-bold text-lg">WSU</div>
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
              }}></div>
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
    setIsMounted(true);
    
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
  
  // Enhanced mobile detection with device characteristics
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  
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
  
  // Optimization for mobile - adjust animation params based on device
  const springConfig = isMobileDevice 
    ? { damping: 25, mass: 0.8, stiffness: 120 } // More stable for mobile
    : { damping: 20, mass: 0.5, stiffness: 100 }; // Original for desktop
    
  // Create smooth scrolling effect with spring physics
  const smoothScrollProgress = useSpring(scrollYProgress, springConfig);
  
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
      background: 'linear-gradient(115deg, #49c628)'
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
        
        html {
          scroll-behavior: smooth;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Optimize animations for mobile */
        @media (max-width: 768px) {
          .animate-subtle-rotate {
            animation: animate-subtle-rotate 180s linear infinite; /* Slower on mobile */
          }
          
          .animate-float-orbit {
            animation: float-orbit 120s ease-in-out infinite; /* Slower on mobile */
          }
          
          .animate-pulse-slow {
            animation: pulse-slow 10s ease-in-out infinite; /* Slower on mobile */
          }
        }
        
        /* Fix touch action issues */
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Improve scrolling on iOS */
        @supports (-webkit-touch-callout: none) {
          .main-content {
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
      
      {/* Navigation Component */}
      {isMounted && <Navigation scrollToSection={scrollToSection} currentPath={pathname} />}
      
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      
      {/* Content container - optimize for mobile */}
      <motion.main 
        ref={containerRef}
        className={`main-content relative w-full h-screen flex flex-col transition-all duration-700 ease-out hide-scrollbar overflow-y-scroll ${
          contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ 
          zIndex: 10, 
          position: 'relative',
          willChange: 'opacity, transform',
          touchAction: 'pan-y', // Optimize touch behavior
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: isMobileDevice ? 0.8 : 1.0, // Faster animation on mobile 
          ease: [0.25, 0.1, 0.25, 1.0]
        }}
        exit={{ opacity: 0 }}
      >
        {/* Hero Section */}
        <div 
          id="hero-section" 
          className="min-h-screen flex items-center justify-center pt-20 md:pt-24 lg:pt-28 mb-20 md:mb-24 lg:mb-32" 
          style={{ zIndex: 20, position: 'relative' }}
        >
          <HeroSection />
        </div>
     
        {/* Card Section */}
        <Suspense fallback={<SectionLoader />}>
          <section id="card-section" className="w-full mb-20 md:mb-24 lg:mb-32">
            <CardSection />
          </section>
        </Suspense>



       
          <Suspense fallback={<SectionLoader />}>
            <div className="px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
              <PartnersAndVetting />
            </div>
          </Suspense>
    

        {/* Solution Section */}
        <LazyLoadSection id="solution-section" className="w-full pt-0 md:pt-0 lg:pt-0 pb-20 md:pb-24 lg:pb-20 mt-0" 
          style={{ background: 'linear-gradient(to top, #00b4db, #0083b0)' }}>
          <Suspense fallback={<SectionLoader />}>
          <div className="px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto mt-16">
              <StartupApplicationSection />
            </div>
            <div className="px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
              <EarnAsYouGrow />
            </div>
            <div className="px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto mb-16">
              <MoneyWorthSection />
            </div>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
          <SustainableImpactSection />

          <GrowFooter />
          </Suspense>
        </LazyLoadSection>
      </motion.main>
    </div>
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

// Optimize LazyLoadSection for mobile
function LazyLoadSection({ id, className, children, style }: { id: string, className?: string, children: React.ReactNode, style?: React.CSSProperties }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  
  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: isMobileDevice ? 0.05 : 0.1, // Lower threshold on mobile
        rootMargin: isMobileDevice ? '300px 0px' : '150px 0px' // Larger rootMargin on mobile
      }
    );
    
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isMobileDevice]);

  return (
    <section id={id} className={className} ref={sectionRef} style={style}>
      {isVisible ? children : <div className="min-h-[50vh]" />}
    </section>
  );
}