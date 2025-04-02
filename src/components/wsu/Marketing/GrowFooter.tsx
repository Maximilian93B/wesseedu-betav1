"use client"

import React from 'react'
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
}

interface GrowFooterProps {
  onAction?: () => void;
  actionButtonText?: string;
}

export function GrowFooter({ 
  onAction, 
  actionButtonText = "Start Investing Today" 
}: GrowFooterProps) {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10 
                    flex flex-col md:flex-row items-center justify-between gap-12">
      
      {/* Text Content */}
      <div className="relative md:max-w-[55%] w-full">
        {/* Text content */}
        <div className="relative z-10 text-center md:text-left">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
          
            {/* Main Heading - using Green Apple typography guidelines */}
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight text-white"
              variants={itemVariants}
            >
              Let your finances grow with{" "}
              <span className="block mt-2 md:mt-3 relative">
                WeSeedU
              </span>
            </motion.h1>
            
            {/* Subheading - using Green Apple text opacity values */}
            <motion.p 
              className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed"
              variants={itemVariants}
            >
              Discover sustainable investment opportunities that grow your wealth while making a positive impact on the world.
            </motion.p>
            
            {/* CTA Button - using Green Apple primary button style */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center md:justify-start relative z-20"
            >
              <Button
                onClick={onAction}
                className="bg-white hover:bg-slate-50 text-green-700 font-medium px-8 py-6 rounded-lg text-lg
                           shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)]
                           transition-all duration-300 ease-out hover:translate-y-[-2px] group"
              >
                {actionButtonText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
            {/* Image Element with simplified floating effect using just shadows */}
            <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: [0, -10, 0],  // Vertical floating movement
          rotate: [0, 0.5, 0, -0.5, 0]  // Very subtle rotation
        }}
        transition={{ 
          duration: 0.7,
          delay: 0.3,
          y: { 
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          },
          rotate: {
            duration: 6,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }
        }}
        className="mt-12 md:mt-0 flex-shrink-0 relative"
        style={{
          filter: `
            drop-shadow(0 30px 30px rgba(0, 0, 0, 0.2))
            drop-shadow(0 20px 15px rgba(0, 0, 0, 0.1))
            drop-shadow(0 10px 5px rgba(0, 100, 0, 0.05))
          `,
        }}
      >
        <Image 
          src="/sustainable-development.png"
          alt="Financial growth chart showing stacked coins with golden upward trend"
          width={450}
          height={450}
          priority
          className="relative z-10"
        />
      </motion.div>
    </div>
  )
}

// Export the component as default as well
export default GrowFooter;