"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { VETTING_STEPS } from "./data"
import dynamic from "next/dynamic"
import { useScrollContext } from "@/context/ScrollContext"

// Import just the Lottie animation
import iconAnimation from "@/../../public/Fintech.json"
import type { LottieRefCurrentProps } from "lottie-react"

// Dynamically import Lottie with SSR disabled and preload control
const Lottie = dynamic(() => import("lottie-react"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-white/10 to-green-400/20 rounded-full animate-pulse"></div>
})

// Simplified animation variants for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      duration: 0.4
    }
  }
}

const itemVariants = {
  hidden: { y: 8, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.25 }
  }
}

export function BigFourVetting() {
  // Refs and animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isAnimationLoaded, setIsAnimationLoaded] = useState(false);
  const [isLottieVisible, setIsLottieVisible] = useState(false);
  
  // Use ScrollContext
  const { prefersReducedMotion, isMobileDevice } = useScrollContext();

  // Only load Lottie when in view for better performance
  useEffect(() => {
    if (isInView && !isLottieVisible) {
      // Delay loading Lottie slightly to prioritize other content
      const timer = setTimeout(() => {
        setIsLottieVisible(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, isLottieVisible]);

  return (
    <div 
      ref={sectionRef}
      className="relative overflow-hidden py-14 sm:py-18 md:py-22 lg:py-28"
    >
      {/* Simplified pattern background with reduced opacity */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}>
      </div>
      
      {/* Reduced decorative elements */}
      <div className="absolute top-20 left-[5%] w-64 h-64 rounded-full bg-white/5 blur-[80px]"></div>
      <div className="absolute bottom-20 right-[10%] w-80 h-80 rounded-full bg-green-300/10 blur-[80px]"></div>
      
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">
          {/* Left content - Text and process info */}
          <div className="w-full lg:w-[40%] flex flex-col relative">
          
          <motion.div variants={itemVariants} className="overflow-hidden relative mb-8">
              <motion.h2 className="relative">
                <span className="block text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-1">
                  Vetted & Funded by
                </span>
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold 
                  bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-transparent">
                  Global Partners
                </span>
              </motion.h2>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-white text-base sm:text-lg leading-relaxed mb-10 max-w-lg font-medium"
            >
              Every startup on our platform undergoes a rigorous triple validation process: Big Four accounting firms handle compliance vetting, the UN verifies sustainability impact alignment, and the Global Sustainability Fund (GSF) provides funding access.
            </motion.p>
            
            {/* Vetting Process Steps - Simplified animation */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="space-y-5">
                {VETTING_STEPS.slice(0, 3).map((step, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-5 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/30 to-green-400/40 flex items-center justify-center flex-shrink-0 border border-white/40 shadow-md">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-base sm:text-lg">{step.title}</h4>
                      <p className="text-white text-xs sm:text-sm mt-1">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Stats - Simplified */}
            <motion.div variants={itemVariants} className="flex gap-6 mb-10">
              <div className="bg-gradient-to-br from-white/20 to-green-500/30 rounded-xl px-5 py-4 text-center border border-white/30 shadow-md">
                <p className="text-2xl sm:text-3xl font-extrabold text-white mb-1">13%</p>
                <p className="text-xs sm:text-sm text-white font-medium">Approval Rate</p>
              </div>
              <div className="bg-gradient-to-br from-white/20 to-green-500/30 rounded-xl px-5 py-4 text-center border border-white/30 shadow-md">
                <p className="text-2xl sm:text-3xl font-extrabold text-white mb-1">100%</p>
                <p className="text-xs sm:text-sm text-white font-medium">UN SDG Aligned</p>
              </div>
            </motion.div>
            
            {/* CTA Button - Simplified */}
            <motion.div variants={itemVariants}>
              <Button
                asChild
                className="bg-gradient-to-r from-white to-green-50 hover:from-green-50 hover:to-white text-green-800 shadow-md
                  rounded-xl px-7 py-6 text-sm font-semibold group"
              >
                <Link href="/company-vetting">
                  <span className="relative z-10 flex items-center">
                    Our partnership process
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300 ease-out" />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Right content - Lottie animation with conditional rendering for performance */}
          <motion.div 
            className="w-full lg:w-[60%] flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            <div className="relative w-full h-[400px] sm:h-[460px] md:h-[540px] lg:h-[600px] flex items-center justify-center">
              <motion.div 
                className="relative w-[380px] h-[380px] sm:w-[450px] sm:h-[450px] md:w-[520px] md:h-[520px] lg:w-[600px] lg:h-[600px] z-10"
              >
                {/* Lottie animation - only loaded when in view */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  {isLottieVisible && (
                    <Lottie
                      animationData={iconAnimation}
                      loop={!prefersReducedMotion}
                      autoplay={!prefersReducedMotion}
                      className="w-full h-full"
                      lottieRef={lottieRef}
                      rendererSettings={{
                        preserveAspectRatio: 'xMidYMid slice',
                        progressiveLoad: true
                      }}
                      onComplete={() => setIsAnimationLoaded(true)}
                    />
                  )}
                </motion.div>
                
                {/* Single simplified glow effect */}
                <div 
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-green-300/20 to-green-600/20 rounded-full blur-[100px]"
                ></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 