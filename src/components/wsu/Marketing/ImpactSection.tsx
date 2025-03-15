"use client"

import { useRef, useState, useLayoutEffect } from "react"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { OptimizedAnimatedTagline } from "@/components/ui/OptimizedAnimatedTagline"

import { 
  CategorySection, 
  FooterCTA, 
  BackgroundEffects, 
  ImpactCategory
} from "./ImpactSectionComponents"

// Sample data for demonstration
const impactCategories: ImpactCategory[] = [
  {
    title: "Environmental Impact",
    description: "We're accelerating solutions for climate challenges through innovative technologies and sustainable approaches.",
    contentItems: [
      {
        title: "Carbon Reduction Initiatives",
        content: "Supporting green technologies that help businesses and communities reduce their carbon footprint through measurable improvements."
      },
      {
        title: "Sustainable Infrastructure",
        content: "Investing in projects that redesign urban and rural infrastructure to be more efficient, resilient, and environmentally friendly."
      },
      {
        title: "Clean Energy Solutions",
        content: "Advancing renewable energy adoption through innovative financing models and technology partnerships."
      }
    ],
    backgroundImageUrl: "/images/environmental-impact.jpg"
  },
  {
    title: "Social Innovation",
    description: "Building a more equitable future by supporting underrepresented founders and sustainable startups.",
    contentItems: [
      {
        title: "Inclusive Entrepreneurship",
        content: "Creating pathways for underrepresented founders to access capital, mentorship, and market opportunities."
      },
      {
        title: "Education Equity",
        content: "Developing solutions that make quality education more accessible to communities around the world."
      },
      {
        title: "Health Access Improvements",
        content: "Supporting innovations that bring healthcare solutions to underserved populations and regions."
      }
    ],
    backgroundImageUrl: "/images/social-innovation.jpg"
  },
  {
    title: "Investment Revolution",
    description: "Transforming how capital is deployed to support both profit and purpose through innovative investment models.",
    contentItems: [
      {
        title: "Impact Measurement",
        content: "Pioneering new metrics and frameworks that accurately capture both financial returns and social/environmental impact."
      },
      {
        title: "Blended Finance Models",
        content: "Creating investment structures that bring together public, private, and philanthropic capital for maximum impact."
      },
      {
        title: "Sustainable Growth",
        content: "Supporting businesses that demonstrate how profitability and positive impact can grow together."
      }
    ],
    backgroundImageUrl: "/images/investment-revolution.jpg"
  }
];

// Helper function to detect low power devices - extracted outside component
const detectLowPowerDevice = (): boolean => {
  // Check for battery API support
  if ('getBattery' in navigator) {
    // @ts-ignore - getBattery() is not in the standard Navigator type
    navigator.getBattery().then((battery: any) => {
      // Consider it a low power device if in low power mode or battery below 15%
      if (battery.charging === false && battery.level < 0.15) {
        return true;
      }
    }).catch(() => false);
  }
  
  // Simple heuristic - check for mobile devices which are more likely to be battery-constrained
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Additional check for device memory if available
  if ('deviceMemory' in navigator) {
    // @ts-ignore - deviceMemory is not in the standard Navigator type
    const lowMemory = (navigator as any).deviceMemory < 4;
    return isMobile || lowMemory;
  }
  
  return isMobile;
};

export const ImpactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1 
  });
  
  // Check for mobile viewport with useLayoutEffect to avoid render issues
  const [isMobile, setIsMobile] = useState(false);
  useLayoutEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Get container height for animations with useLayoutEffect
  const [containerHeight, setContainerHeight] = useState(0);
  useLayoutEffect(() => {
    if (sectionRef.current) {
      setContainerHeight(sectionRef.current.clientHeight);
    }
  }, []);
  
  // Simple image props for background images
  const backgroundImageProps = {};

  return (
    <section 
      ref={sectionRef}
      className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28 min-h-[calc(100vh-4rem)] flex flex-col justify-center relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/5"
    >
      {/* Radiant border effect */}
      <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-br from-purple-500/10 via-transparent to-teal-500/10 rounded-2xl md:rounded-3xl blur-sm opacity-40 group-hover:opacity-70 transition-opacity duration-700"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-teal-500/5 rounded-2xl md:rounded-3xl"></div>
      
      {/* Corner glow effects */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-500/10 rounded-full blur-[80px] animate-pulse-subtle"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-teal-500/10 rounded-full blur-[80px] animate-pulse-subtle" style={{ animationDelay: "2s" }}></div>
      
      {/* Pulsing edge highlights */}
      <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-pulse-subtle"></div>
      <div className="absolute bottom-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-teal-400/30 to-transparent animate-pulse-subtle" style={{ animationDelay: "1.5s" }}></div>
      
      {/* Background effects */}
      <BackgroundEffects />
      
      {/* Container for impact categories */}
      <div className="container px-4 xs:px-5 sm:px-6 lg:px-8 xl:px-10 mx-auto max-w-7xl flex-1 flex flex-col justify-center relative z-10">
        {/* Section header */}
        <div 
          className={cn(
            "flex flex-col items-center text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16 transition-all duration-500 space-y-3 xs:space-y-4 sm:space-y-5",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="inline-block">
            <span className="inline-flex items-center px-3 xs:px-4 py-1 xs:py-1.5 text-xs font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Impact Framework
            </span>
          </div>
          
          <div className="space-y-3 xs:space-y-4 sm:space-y-6">
            <OptimizedAnimatedTagline
              text="Creating Impact That Matters"
              highlightWords={["Impact"]}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
              delay={0.3}
            />
            
            <p className="text-sm xs:text-base sm:text-lg text-gray-300 max-w-xl xs:max-w-2xl mx-auto">
              We're building a better future through sustainable investments, innovative technology, and community empowerment.
            </p>
          </div>
        </div>
        
        {/* Impact categories */}
        <div className="space-y-8 md:space-y-12 lg:space-y-16">
          {impactCategories.map((category, index) => (
            <CategorySection
              key={index}
              category={category}
              index={index}
              inView={isInView}
              isMobile={isMobile}
              containerHeight={containerHeight}
              backgroundImageProps={backgroundImageProps}
            />
          ))}
        </div>
        
        {/* Footer CTA */}
        <div className="mt-12 xs:mt-16 sm:mt-20 md:mt-24">
          <FooterCTA />
        </div>
      </div>
    </section>
  );
}; 