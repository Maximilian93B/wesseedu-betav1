"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { CosmicCard } from "./CosmicCard"
import { Partner } from "./types"

// Modern simplified partner card with clean design
export function PartnerCard({ partner, index }: { 
  partner: Partner; 
  index: number; 
}) {
  // Calculate scale and opacity based on index for stacked effect
  const getCardStyles = (idx: number) => {
    const scale = 1 - (idx * 0.05);
    const opacity = 1 - (idx * 0.05);
    
    return {
      transform: `scale(${scale})`,
      opacity: opacity,
      zIndex: 10 - idx
    };
  };

  const styles = getCardStyles(index);
  
  return (
    <CosmicCard 
      className="h-full flex flex-col"
      style={{...styles, transitionDelay: `${index * 100}ms`}}
    >
      <div className="flex flex-col items-center text-center h-full justify-between">
        {/* Logo section - improved with subtle gradient background */}
        <div className="mb-4">
          <div className="relative w-20 h-20 overflow-hidden rounded-full 
              bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800
              ring-1 ring-purple-500/20 shadow-md group-hover:shadow-lg transition-all duration-300">
            
            {/* Logo image with improved container */}
            <motion.div 
              className="h-full w-full relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Subtle backdrop glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-teal-500/10 opacity-40"></div>
              
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain p-4 relative z-10"
                sizes="(max-width: 640px) 80px, 80px"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
        
        {/* Partner info section - enhanced typography */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-teal-400 transition-all duration-300">
            {partner.name}
          </h3>
          <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300 flex-1">
            {partner.description}
          </p>
          
          {partner.link && (
            <Link
              href={partner.link}
              className="mt-4 inline-flex items-center text-sm font-medium text-purple-400 hover:text-teal-400 transition-colors duration-300 group/link"
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