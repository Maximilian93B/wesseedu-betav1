"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"
import Image from "next/image"

// Extracted animation variants for better maintainability
const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.12,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },
  
  item: {
    hidden: { y: 15, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 170, damping: 20 }
    }
  },
  
  floating: {
    initial: { y: 0 },
    animate: { 
      y: [0, -10, 0],
      rotate: [0, 0.5, 0, -0.5, 0],
      transition: {
        y: {
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse", 
          ease: "easeInOut"
        },
        rotate: {
          duration: 12,
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
  gradientButton: "group text-white shadow-[0_4px_10px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:translate-y-[-2px] rounded-xl px-7 sm:px-10 py-6 sm:py-7 font-medium relative overflow-hidden w-48 sm:w-auto",
  featureBlock: "flex flex-col group mb-8 sm:mb-0",
  featureTitle: "text-lg sm:text-xl font-semibold text-white mb-3",
  featureBar: "w-10 h-1 bg-gradient-to-r from-slate-300 to-transparent mb-4 rounded-full transition-all duration-300 group-hover:w-16",
  mobileDivider: "sm:hidden w-full h-[1px] bg-white/30 mt-8"
}

export function HeroSection() {
  // Detect if reduced motion is preferred
  const prefersReducedMotion = useReducedMotion();
  // Track if component is mounted
  const [isMounted, setIsMounted] = useState(false);
  
  // Memoize animations to prevent recreation on each render
  const animationVariants = useMemo(() => {
    // Simplify animations when reduced motion is preferred
    if (prefersReducedMotion) {
      return {
        container: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.4 } }
        },
        item: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.3 } }
        },
        floating: {
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
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.2] text-white"
            >
              Grow a<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Sustainable Future
            </motion.h1>
          </motion.div>
          
          <motion.p 
            variants={animationVariants.item}
            className="text-white text-sm sm:text-base md:text-xl leading-relaxed mb-8 sm:mb-18 max-w-xl font-light"
          >
            Join the movement to build a greener tomorrow through sustainable investments that benefit both your finances and our planet.
          </motion.p>
          
          <motion.div variants={animationVariants.item} className="mb-10 sm:mb-0">
            <Button
              asChild
              size="lg"
              className={styles.gradientButton}
              style={{ background: 'linear-gradient(to top, #00b4db, #0083b0)' }}
            >
              <Link href="/auth/signup">
                <span className="relative z-10 flex items-center justify-center">
                  Plant your seed
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
            {/* Enhanced backdrop gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/5 via-transparent to-slate-100/40 rounded-full blur-3xl"></div>
            
            {/* Combined globe and podium container */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center">
              {/* Globe element */}
              <motion.div 
                className="relative w-[320px] md:w-[420px] h-[320px] md:h-[420px] z-[10]"
                initial="initial"
                animate="animate"
                variants={animationVariants.floating}
              >
                {/* Radiant outer glow */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/20 to-cyan-400/20 rounded-full blur-3xl transform scale-110"></div>
                
                {/* Atmospheric glow - bright side */}
                <div className="absolute -right-5 top-5 w-20 h-20 bg-blue-400/30 rounded-full blur-xl"></div>
                
                {/* Image with enhanced drop shadow */}
                <div className="relative w-full h-full drop-shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
                  <Image
                    src="/sustainability.png"
                    alt="Earth globe with sustainability theme"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
                
                {/* Inner glow effect */}
                <div className="absolute inset-0 -z-5 bg-gradient-to-tr from-emerald-400/10 via-transparent to-blue-400/20 rounded-full blur-lg transform scale-95 mix-blend-screen"></div>
                
                {/* Highlight reflection on top side */}
                <div className="absolute top-10 right-24 w-32 h-10 bg-cyan-300/20 rounded-full blur-xl transform rotate-[30deg] mix-blend-screen"></div>
              </motion.div>
              
              {/* Podium element positioned directly below globe */}
              <div className="relative mt-[-150px] md:mt-[-220px] w-[220px] md:w-[280px] z-[5]">
                <Image
                  src="/blue-product-presentation.png"
                  alt="3D podium supporting the globe"
                  width={280}
                  height={120}
                  style={{ objectFit: 'contain' }}
                  priority
                  className="relative"
                />
              </div>
            </div>
            
            {/* Shadow effects */}
            <div className="absolute bottom-0 left-20 right-20 h-6 bg-gradient-to-b from-slate-900/5 to-slate-900/15 rounded-[50%] blur-xl z-0 transform scale-x-90"></div>
            <div className="absolute bottom-[-5px] left-24 right-24 h-4 bg-slate-900/10 rounded-[60%] blur-md z-0"></div>
          </div>
        </motion.div>
      </div>
      
      {/* Divider - styled differently for mobile */}
      <motion.div variants={animationVariants.item} className="w-full my-8 sm:my-0 sm:mb-12 sm:mt-10">
        <div className="relative w-full">
          {/* Mobile: Full width white line */}
          <div className="sm:hidden w-full h-[1px] bg-white/80"></div>
          
          {/* Desktop: Gradient divider (hidden on mobile) */}
          <div className="hidden sm:block w-full h-[2px] bg-gradient-to-r from-white via-white/80 to-transparent rounded-full shadow-[0_1px_2px_rgba(255,255,255,0.7)]"></div>
          <div className="hidden sm:block absolute -top-[1px] w-full h-[1px] bg-gradient-to-r from-white/20 via-white/10 to-transparent rounded-full"></div>
          <div className="hidden sm:block absolute top-[2px] w-3/4 h-[1px] bg-gradient-to-r from-slate-400/30 via-slate-400/10 to-transparent rounded-full"></div>
        </div>
      </motion.div>
      
      {/* Feature section - with improved spacing */}
      <motion.div variants={animationVariants.item} className="w-full mt-3">
        <div className="sm:grid sm:grid-cols-3 sm:gap-x-8 sm:gap-y-2">
          {/* Feature 1 */}
          <div className={styles.featureBlock}>
            <div className={styles.featureBar}></div>
            <h3 className={styles.featureTitle}>Low fees meet higher yields</h3>
            <p className="text-white text-sm leading-relaxed">Your money's always making more with low-fee investing and high-interest savings.</p>
            <div className={styles.mobileDivider}></div>
          </div>
          
          {/* Feature 2 */}
          <div className={styles.featureBlock}>
            <div className={styles.featureBar}></div>
            <h3 className={styles.featureTitle}>Unmatched access</h3>
            <p className="text-white text-sm leading-relaxed">Get sophisticated investment opportunities traditionally reserved for industry insiders.</p>
            <div className={styles.mobileDivider}></div>
          </div>
          
          {/* Feature 3 */}
          <div className={styles.featureBlock}>
            <div className={styles.featureBar}></div>
            <h3 className={styles.featureTitle}>Smart & simple</h3>
            <p className="text-white text-sm leading-relaxed">In just a few taps, set your financial goals in motion with our easy-to-use products.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

 