"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"
import Image from "next/image"

// Simplified animation variants with better performance
const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.07,
        duration: 0.4, 
        ease: "easeOut"
      }
    }
  },
  
  item: {
    hidden: { y: 8, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.25, ease: "easeOut" }
    }
  },
  
  // Minimal animations with reduced motion
  floating: {
    initial: { y: 0 },
    animate: { 
      y: [0, -5, 0],
      transition: {
        y: {
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse", 
          ease: "easeInOut"
        }
      }
    }
  },
  
  globe: {
    initial: { y: 0 },
    animate: { 
      y: [0, -8, 0],
      transition: {
        y: {
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse", 
          ease: "easeInOut"
        }
      }
    }
  },
  
  card: {
    initial: { y: 0 },
    animate: { 
      y: [0, 3, 0],
      transition: {
        y: {
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      }
    }
  }
}

// Consolidated styling classes
const styles = {
  gradientButton: "group text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:translate-y-[-2px] rounded-xl px-7 sm:px-10 py-6 sm:py-7 font-medium relative overflow-hidden w-48 sm:w-auto",
  featureBlock: "flex flex-col group mb-8 sm:mb-0",
  featureTitle: "text-lg sm:text-xl font-semibold text-black mb-3 font-display",
  featureBar: "w-32 h-1 bg-gradient-to-r from-[#6a5acd] to-transparent mb-4 rounded-full transition-all duration-300 group-hover:w-16",
  mobileDivider: "sm:hidden w-full h-[1px] bg-white/30 mt-8"
}

export function HeroSection() {
  // Detect if reduced motion is preferred
  const prefersReducedMotion = useReducedMotion();
  // Track if component is mounted
  const [isMounted, setIsMounted] = useState(false);
  
  // Memoize animations to prevent recreation on each render
  const animationVariants = useMemo(() => {
    // Disable animations when reduced motion is preferred
    if (prefersReducedMotion) {
      return {
        container: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.3 } }
        },
        item: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.2 } }
        },
        floating: {
          initial: {},
          animate: {}
        },
        globe: {
          initial: {},
          animate: {}
        },
        card: {
          initial: {},
          animate: {}
        }
      };
    }
    return animations;
  }, [prefersReducedMotion]);
  
  // Only run animations after component is mounted
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Don't render animations until component is mounted
  if (!isMounted) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animationVariants.container}
      className="w-full max-w-7xl mx-auto px-5 sm:px-10 py-4 sm:py-8 lg:py-16" 
    >
      <div className="flex flex-col lg:flex-row lg:gap-32 items-center">
        {/* Left column: Text and CTA */}
        <div className="w-full lg:w-1/2 flex flex-col relative">
          
          <motion.div variants={animationVariants.item} className="overflow-hidden relative mb-5 sm:mb-10">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.2] text-[#49c628] font-display"
            >
              Grow a<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Sustainable Future
            </motion.h1>
          </motion.div>
          
          <motion.p 
            variants={animationVariants.item}
            className="text-black text-sm sm:text-base md:text-xl leading-relaxed mb-8 sm:mb-18 max-w-xl font-light font-body"
          >
            A Platform to build a greener tomorrow through funding sustainable projects that benefit both your finances and our planet.
          </motion.p>
          
          <motion.div variants={animationVariants.item} className="mb-10 sm:mb-0">
            <Button
              asChild
              size="lg"
              className="bg-[#49c628] text-white hover:brightness-105 border border-[#49c628]/20 shadow-lg rounded-xl px-8 py-6 font-semibold transition-all duration-300 font-helvetica"
            >
              <Link href="/auth/signup">
                <span className="relative z-10 flex items-center justify-center">
                  Join WeSeedU today
                  <span className="relative z-10 ml-3 transform group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </span>
              </Link>
            </Button>
          </motion.div>
        </div>
        
        {/* Image Container - HIDDEN on mobile */}
        <motion.div 
          className="hidden sm:flex w-full lg:w-1/2 justify-center lg:justify-center lg:mt-0"
          variants={animationVariants.item}
        >
          <div className="relative w-full max-w-sm md:max-w-lg h-[420px] md:h-[520px]">
            {/* Simplified ambient lighting */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-400/5 to-transparent rounded-full blur-[80px]"></div>
            
            {/* Separated globe and card container */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center">
              {/* Globe element with simpler animation */}
              <motion.div 
                className="relative w-[280px] md:w-[380px] h-[280px] md:h-[380px] z-20"
                initial="initial"
                animate={!prefersReducedMotion ? "animate" : "initial"}
                variants={animationVariants.globe}
                style={{ willChange: 'transform' }}
              >
                {/* Globe image container with enhanced shadow */}
                <div className="relative w-full h-full">
                  <Image
                    src="/sustainability.png"
                    alt="Earth globe with sustainability theme"
                    fill
                    style={{ 
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.2))'
                    }}
                    priority
                  />
                </div>
                
                {/* Simplified lighting effects */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/5 via-transparent to-blue-400/10 rounded-full blur-lg mix-blend-screen"></div>
              </motion.div>
              
              {/* Card element with simpler animation */}
              <motion.div 
                className="relative mt-[-160px] md:mt-[-190px] w-[220px] md:w-[280px] z-10"
                initial="initial"
                animate={!prefersReducedMotion ? "animate" : "initial"}
                variants={animationVariants.card}
                style={{ willChange: 'transform' }}
              >
                {/* Simplified card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent blur-lg transform scale-110"></div>
                
                <Image
                  src="/credit-card-blue-full.png"
                  alt="3D credit card"
                  width={280}
                  height={120}
                  style={{ 
                    objectFit: 'contain',
                    height: 'auto',
                    filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.15))'
                  }}
                  priority
                  className="relative"
                />
                
                {/* Simplified card shadow */}
                <div className="absolute -bottom-6 left-0 right-0 h-12 bg-gradient-to-b from-slate-900/15 to-transparent rounded-full blur-xl transform scale-x-90"></div>
              </motion.div>
            </div>
            
            {/* Ground reflection and shadow - simplified */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-20">
              <div className="w-full h-full bg-gradient-to-b from-slate-900/10 to-transparent rounded-[100%] blur-xl transform scale-y-50"></div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Divider - simplified for better performance */}
      <motion.div variants={animationVariants.item} className="w-full my-8 sm:my-0 sm:mb-12 sm:mt-10">
        <div className="relative w-full">
      
          
          {/* Desktop: Simplified gradient divider (hidden on mobile) */}
          <div className="hidden sm:block w-full h-[2px] bg-gradient-to-r from-white via-white/80 to-transparent rounded-full"></div>
        </div>
      </motion.div>
      
      {/* Feature section - with improved spacing */}
      <motion.div variants={animationVariants.item} className="w-full mt-3">
        <div className="sm:grid sm:grid-cols-3 sm:gap-x-8 sm:gap-y-2">
          {/* Feature 1 */}
          <div className={styles.featureBlock}>
            <div className={styles.featureBar}></div>
            <h3 className={styles.featureTitle}>Exclusive access</h3>
            <p className="text-black text-sm leading-relaxed font-body">Get sophisticated investment opportunities traditionally reserved for industry insiders.</p>
            <div className={styles.mobileDivider}></div>
          </div>
          
          {/* Feature 2 */}
          <div className={styles.featureBlock}>
            <div className={styles.featureBar}></div>
            <h3 className={styles.featureTitle}>Vetted projects by the UN and GSF</h3>
            <p className="text-black text-sm leading-relaxed font-body">We only fund projects that are verified by the UN and GSF.</p>
            <div className={styles.mobileDivider}></div>
          </div>
          
          {/* Feature 3 */}
          <div className={styles.featureBlock}>
            <div className={styles.featureBar}></div>
            <h3 className={styles.featureTitle}>Community-driven</h3>
            <p className="text-black text-sm leading-relaxed font-body">WeSeedU is a community-driven platform that allows you to invest with transparency and trust.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

 