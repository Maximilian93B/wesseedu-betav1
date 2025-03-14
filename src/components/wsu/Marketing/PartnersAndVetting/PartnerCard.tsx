"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { CosmicCard } from "./CosmicCard"
import { Partner } from "./types"

// Enhanced partner card with improved visual effects and prominent logo display
export function PartnerCard({ partner, index }: { 
  partner: Partner; 
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
      className="h-full"
      style={{...styles, transitionDelay: `${index * 100}ms`}}
    >
      {/* Two-section layout with prominent logo display */}
      <div className="flex flex-col">
        {/* Logo section - larger and centered */}
        <div className="flex justify-center mb-4">
          <div className="relative group/logo">
            {/* Animated backdrop */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-teal-500/20 opacity-0 group-hover/logo:opacity-100 blur-xl transition-all duration-700 scale-150"></div>
            
            {/* Logo container with enhanced styling */}
            <div className="relative w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 overflow-hidden rounded-full 
                bg-gradient-to-br from-black/90 to-black/80 
                ring-1 ring-purple-500/30 
                shadow-[0_0_25px_rgba(139,92,246,0.2)] 
                group-hover:shadow-[0_0_35px_rgba(139,92,246,0.3)]
                transition-all duration-700 z-10">
              
              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-teal-500/5 
                  group-hover:from-purple-500/15 group-hover:to-teal-500/15 
                  transition-all duration-700"></div>
              
              {/* Ambient light reflection */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-teal-500/20 rounded-full blur-xl"></div>
              </div>
              
              {/* Inner ring highlight effect */}
              <div className="absolute inset-2 rounded-full border border-purple-500/20 
                  shadow-[inset_0_0_15px_rgba(139,92,246,0.15)]
                  group-hover:shadow-[inset_0_0_20px_rgba(139,92,246,0.25)]
                  transition-all duration-700"></div>
              
              {/* Logo image */}
              <div className="absolute inset-0 flex items-center justify-center p-5 xs:p-6">
                <div className="relative w-full h-full">
                  <motion.div 
                    className="w-full h-full"
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: [0, -3, 3, -2, 2, 0] }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut"
                    }}
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain group-hover/logo:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                      loading="lazy"
                    />
                  </motion.div>
                </div>
              </div>
              
              {/* Floating particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                <div className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-purple-300/70 animate-pulse-glow"></div>
                <div className="absolute bottom-1/4 left-1/4 w-1 h-1 rounded-full bg-teal-300/70 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Partner info section - centered layout */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-teal-400 transition-all duration-300">
            {partner.name}
          </h3>
          <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mt-2">
            {partner.description}
          </p>
          
          {partner.link && (
            <Link
              href={partner.link}
              className="mt-4 inline-flex items-center text-sm text-purple-400 hover:text-teal-400 transition-colors duration-300 group/link"
            >
              Learn more 
              <ArrowRight className="ml-1 h-3 w-3 group-hover/link:translate-x-1 transition-transform duration-300" />
            </Link>
          )}
        </div>
      </div>
    </CosmicCard>
  );
} 