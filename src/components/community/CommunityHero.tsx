"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      duration: 0.5
    }
  }
}

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
}

// Props interface
interface CommunityHeroProps {
  icon3DPath?: string;
  onDiscoverClick?: () => void;
  onLearnMoreClick?: () => void;
}

export function CommunityHero({
  icon3DPath = "/online-startup-growth.png", // Default path if none provided
  onDiscoverClick,
  onLearnMoreClick
}: CommunityHeroProps) {
  
  // Default handler for Discover button if none provided
  const handleDiscoverClick = () => {
    if (onDiscoverClick) {
      onDiscoverClick();
    } else {
      // Default scroll to communities list
      document.getElementById('communities-list')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border-4 border-white relative shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
    >
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-green-50 via-transparent to-transparent opacity-70"></div>
      
      {/* Green accent bar */}
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#70f570] to-[#49c628]"></div>
      
      {/* Content */}
      <div className="relative z-20 px-8 py-12 sm:px-10 sm:py-16 md:p-16 flex flex-col md:flex-row items-center">
        {/* Text content */}
        <div className="max-w-3xl md:max-w-[55%]">
        
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-black text-green-800 mb-6 tracking-tight leading-tight font-display" 
            variants={itemVariants}
          >
            <span className="text-green-700">Seed</span> Capital,
            <span className="block">Grow Impact</span>
          </motion.h1>
          
          <motion.p 
            className="text-green-700 mb-8 leading-relaxed max-w-2xl text-lg font-body" 
            variants={itemVariants}
          >
            Join specialized communities where sustainable investors cultivate ideas, nurture opportunities, and harvest collective success in regenerative markets.
          </motion.p>
          
          <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
            <Button 
              className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold px-6 py-2.5 text-sm font-helvetica shadow-lg hover:shadow transition-all duration-300 rounded-xl"
              onClick={handleDiscoverClick}
            >
              <span className="mr-2">Discover Your Community</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              className="bg-white text-green-700 hover:bg-green-50 border border-green-200 font-semibold px-6 py-2.5 text-sm font-helvetica shadow-md hover:shadow transition-all duration-300 rounded-xl"
              onClick={onLearnMoreClick}
            >
              <span className="mr-2">Learn More</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
          
          {/* Stats Bar in White Card */}
          <motion.div 
            className="mt-10 p-6 bg-white rounded-xl shadow-lg border border-green-100" 
            variants={itemVariants}
          >
            <div className="grid grid-cols-3 gap-8">
              <div className="flex flex-col space-y-1">
                <p className="text-green-700 font-extrabold text-2xl font-helvetica">3,000+</p>
                <div className="h-px w-12 bg-green-200 mb-1"></div>
                <p className="text-green-600 text-sm font-body">Impact Investors</p>
              </div>
              
              <div className="flex flex-col space-y-1">
                <p className="text-green-700 font-extrabold text-2xl font-helvetica">40+</p>
                <div className="h-px w-12 bg-green-200 mb-1"></div>
                <p className="text-green-600 text-sm font-body">Sustainable Deals</p>
              </div>
              
              <div className="flex flex-col space-y-1">
                <p className="text-green-700 font-extrabold text-2xl font-helvetica">12</p>
                <div className="h-px w-12 bg-green-200 mb-1"></div>
                <p className="text-green-600 text-sm font-body">Niche Networks</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* 3D Icon image on right side */}
        <motion.div 
          className="hidden md:flex md:w-[45%] items-center justify-center mt-8 md:mt-0"
          variants={itemVariants}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -8, 0]
          }}
          transition={{ 
            duration: 0.6,
            y: {
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
        >
          <div className="relative max-w-md mx-auto">
            {/* Shadow effect */}
            <div className="absolute -bottom-12 w-[85%] h-16 mx-auto left-0 right-0 
                           bg-slate-900/20 blur-xl rounded-full"></div>
            
            {/* The 3D icon */}
            <Image
              src='/online-startup-growth.png'
              alt="3D Sustainable Investment Icon"
              width={420}
              height={420}
              className="drop-shadow-2xl transform hover:rotate-3 transition-all duration-700"
              priority
            />
            
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-transparent to-transparent rounded-full blur-xl"></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
} 