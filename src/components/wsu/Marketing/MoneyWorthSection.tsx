"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.12,
      duration: 0.6
    }
  }
}

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 22 }
  }
}

// Shadow animation that follows the hover effect with enhanced realism
const shadowVariants = {
  initial: { opacity: 0, scale: 1 },
  animate: {
    opacity: [0.15, 0.25, 0.15],
    scale: [1, 0.98, 1],
    transition: {
      repeat: Infinity,
      duration: 2.5,
      ease: "easeInOut",
      repeatType: "reverse"
    }
  }
}

// Base shadow animation with improved realism
const baseShadowVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 0.35,
    transition: {
      duration: 1.2
    }
  }
}

// Enhanced falling animation with better physics
const fallingBounceVariants = {
  initial: { 
    y: -450,
    opacity: 0,
    rotate: 5
  },
  animate: { 
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring", 
      stiffness: 150, 
      damping: 15,
      mass: 1.2
    }
  }
}

// Optimized hover effect for more natural movement
const hoverVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      y: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut",
        repeatType: "reverse"
      }
    }
  }
}

// Coin shine effect animation
const shineEffectVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0, 0.7, 0],
    transition: {
      repeat: Infinity,
      duration: 3.5,
      ease: "easeInOut",
      repeatDelay: 1.5
    }
  }
}

const shimmerAnimation = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: [0, 0.5, 0],
    x: [0, 100, 200],
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 3.5,
      ease: "easeInOut",
      delay: 1.5
    }
  }
}

export function MoneyWorthSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  return (
    <div ref={sectionRef} className="relative w-full overflow-hidden py-12 md:py-16">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="w-full px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-2">
          {/* Text content */}
          <div className="w-full flex flex-col items-center text-center relative mb-10">
            <motion.div variants={itemVariants} className="overflow-hidden relative mb-4">
              <motion.h2 
                className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.15]"
              >
                Show your<br /><span className="relative inline-block">
                  money its worth
                  <motion.span 
                    className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-slate-200/40 to-transparent rounded-lg"
                    variants={shimmerAnimation}
                  ></motion.span>
                </span>
              </motion.h2>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-white/90 text-lg leading-relaxed mb-6 max-w-md" 
            >
              Join the 3 million Canadians choosing Wealthsimple as a trusted place to invest, trade, save, and more.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="mb-2"
            >
              <Button
                asChild
                size="default"
                className="bg-white hover:bg-slate-50 text-green-700 shadow-[0_4px_10px_rgba(0,0,0,0.07)]
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out
                  hover:translate-y-[-2px] rounded-lg px-6 py-2 font-medium relative overflow-hidden group"
              >
                <Link href="/get-started" className="relative z-10 flex items-center justify-center">
                  Get started
                  <span className="relative z-10 ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Coin container - increased image size */}
          <div className="relative w-full h-[420px] flex items-center justify-center">
            {/* Base large shadow for 3D depth effect - positioned lower */}
            <motion.div
              className="absolute bottom-[-5px] left-[16%] right-[16%] h-40 bg-gradient-to-t from-black/40 to-transparent blur-xl rounded-[50%]"
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              variants={baseShadowVariants}
            ></motion.div>
            
            {/* Additional middle shadow layer - positioned lower */}
            <motion.div
              className="absolute bottom-[-2px] left-[22%] right-[22%] h-24 bg-black/30 blur-lg rounded-[50%]"
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              variants={baseShadowVariants}
            ></motion.div>
            
            {/* Main coin stack - increased size */}
            <motion.div 
              className="absolute bottom-[6%] w-[340px] h-[400px] z-10"
              variants={itemVariants}
            >
              {/* Enhanced multi-layered shadows - positioned lower */}
              <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 z-0">
                {/* Primary shadow - larger and more diffused */}
                <motion.div 
                  className="w-[320px] h-[32px] rounded-[50%] bg-slate-500/20 blur-xl"
                  initial="initial"
                  animate={isInView ? "animate" : "initial"}
                  variants={shadowVariants}
                ></motion.div>
                
                {/* Secondary shadow - smaller and darker */}
                <motion.div 
                  className="w-[230px] h-[22px] rounded-[50%] bg-slate-700/25 blur-md mt-[-8px] mx-auto"
                  initial="initial"
                  animate={isInView ? "animate" : "initial"}
                  variants={shadowVariants}
                ></motion.div>
              </div>
              
              {/* Coin image with enhanced animation */}
              <motion.div
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                variants={fallingBounceVariants}
                className="w-full h-full relative z-10"
              >
                <motion.div 
                  className="w-full h-full"
                  variants={hoverVariants}
                  animate={isInView ? "animate" : "initial"}
                >
                  <Image
                    src="/falling-gold-coins.png"
                    alt="Gold coins"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 