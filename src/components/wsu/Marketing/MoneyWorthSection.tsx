"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"

// Detect mobile for animation optimizations
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}

export function MoneyWorthSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isMobile = useIsMobile();
  
  // Animation variants - simplified for mobile
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: isMobile ? 0.08 : 0.12,
        duration: isMobile ? 0.5 : 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: isMobile ? 150 : 200, 
        damping: isMobile ? 25 : 22 
      }
    }
  };

  // Simplified shadow animation for mobile
  const shadowVariants = {
    initial: { opacity: 0, scale: 1 },
    animate: {
      opacity: [0.15, 0.25, 0.15],
      scale: [1, isMobile ? 0.99 : 0.98, 1],
      transition: {
        repeat: Infinity,
        duration: isMobile ? 3 : 2.5,
        ease: "easeInOut",
        repeatType: "reverse"
      }
    }
  };

  // Simplified falling animation for mobile
  const fallingBounceVariants = {
    initial: { 
      y: isMobile ? -300 : -450,
      opacity: 0,
      rotate: isMobile ? 3 : 5
    },
    animate: { 
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring", 
        stiffness: isMobile ? 120 : 150, 
        damping: isMobile ? 18 : 15,
        mass: isMobile ? 1 : 1.2
      }
    }
  };

  // Optimized hover effect
  const hoverVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, isMobile ? -6 : -10, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: isMobile ? 4 : 3,
          ease: "easeInOut",
          repeatType: "reverse"
        }
      }
    }
  };

  return (
    <div ref={sectionRef} className="relative w-full overflow-hidden py-8 sm:py-12 md:py-16">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="w-full px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-2">
          {/* Text content */}
          <div className="w-full flex flex-col items-center text-center relative mb-8 sm:mb-10">
            <motion.div variants={itemVariants} className="overflow-hidden relative mb-4">
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1]"
              >
                Grow Wealth.<br />
                <span className="relative inline-block">
                  Create Impact.
                </span>
              </motion.h2>
            </motion.div>
            
            <motion.div variants={itemVariants} className="w-20 h-0.5 bg-white/30 mb-5 rounded-full"></motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-white text-base sm:text-lg leading-relaxed mb-7 max-w-[280px] sm:max-w-md" 
            >
              Fund sustainable innovation. Create real impact.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="mb-2"
            >
              <Button
                asChild
                size={isMobile ? "default" : "default"}
                className="bg-white hover:bg-slate-50 text-black shadow-[0_4px_10px_rgba(0,0,0,0.07)]
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out
                  hover:translate-y-[-2px] rounded-lg px-5 sm:px-7 py-2.5 font-medium relative overflow-hidden group"
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
          
          {/* Coin container - adaptive height */}
          <div className="relative w-full h-[280px] sm:h-[350px] md:h-[420px] flex items-center justify-center">
            {/* Base shadow for 3D depth effect - positioned for better mobile view */}
            <motion.div
              className="absolute bottom-[-5px] left-[20%] right-[20%] sm:left-[16%] sm:right-[16%] h-20 sm:h-40 bg-gradient-to-t from-black/40 to-transparent blur-xl rounded-[50%]"
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              variants={shadowVariants}
            ></motion.div>
            
            {/* Main coin stack - adaptive sizing */}
            <motion.div 
              className="absolute bottom-[6%] w-[250px] sm:w-[340px] h-[280px] sm:h-[400px] z-10"
              variants={itemVariants}
            >
              {/* Enhanced multi-layered shadows - simplified for mobile */}
              <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 z-0">
                {/* Primary shadow - adaptive sizing */}
                <motion.div 
                  className="w-[220px] sm:w-[320px] h-[22px] sm:h-[32px] rounded-[50%] bg-slate-500/20 blur-xl"
                  initial="initial"
                  animate={isInView ? "animate" : "initial"}
                  variants={shadowVariants}
                ></motion.div>
              </div>
              
              {/* Coin image with motion optimized for mobile */}
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