"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Shield, BarChart2, FileCheck, CheckCircle } from "lucide-react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { VETTING_STEPS } from "./data"
import dynamic from "next/dynamic"
import "./animations.css"

// Import just the Lottie animation
import iconAnimation from "@/../../public/Fintech.json"
import type { LottieRefCurrentProps } from "lottie-react"

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

// Animation variants - optimized for performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.14,
      duration: 0.7,
      ease: "easeOut"
    }
  }
}

const itemVariants = {
  hidden: { y: 18, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 180, damping: 20 }
  }
}

const floatingVariants = {
  initial: { y: 0 },
  animate: { 
    y: [0, -18, 0],
    transition: {
      duration: 10,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
}

const shimmerAnimation = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: [0, 0.4, 0.1, 0],
    x: [0, 100, 200, 300],
    scale: [1, 1.02, 1.01, 1],
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 3.2,
      ease: [0.43, 0.13, 0.23, 0.96], // Custom cubic bezier for sleek motion
      delay: 0.5
    }
  }
}

export function BigFourVetting() {
  // Refs and animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [isMobile, setIsMobile] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  // Simplified state - only track if animation is loaded
  const [isAnimationLoaded, setIsAnimationLoaded] = useState(false);
  
  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize with debounce
    let debounceTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(debounceTimer);
    };
  }, []);
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const xScrollMotion = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Icon mapping for the firm types
  const iconMap = {
    audit: <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />,
    finance: <BarChart2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />,
    compliance: <FileCheck className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />,
    growth: <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
  };

  return (
    <div 
      ref={sectionRef}
      className="relative overflow-hidden py-14 sm:py-18 md:py-22 lg:py-28 "
    >
      {/* Enhanced pattern background */}
      <div className="absolute inset-0 opacity-[0.04]" 
        style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, white 1px, transparent 0), 
                            radial-gradient(circle at 60px 60px, white 0.5px, transparent 0)`,
          backgroundSize: '40px 40px, 60px 60px'
        }}>
      </div>
      
      {/* Abstract decorative elements */}
      <motion.div 
        className="absolute top-20 left-[5%] w-64 h-64 rounded-full bg-white/5 blur-[120px]"
        style={{ y: y1 }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-20 right-[10%] w-80 h-80 rounded-full bg-green-300/10 blur-[150px]"
        style={{ y: y2 }}
      ></motion.div>
      
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
                  Vetted by the
                </span>
                <span className="relative inline-block text-3xl sm:text-4xl md:text-5xl font-extrabold 
                  bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-transparent">
                  Big Four
                  <motion.div 
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-lg backdrop-blur-[1px]"
                    variants={shimmerAnimation}
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                  ></motion.div>
                </span>
              </motion.h2>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-white text-base sm:text-lg leading-relaxed mb-10 max-w-lg font-medium drop-shadow-md"
            >
              Every startup on our platform is rigorously vetted by one of the Big Four accounting firms to ensure real sustainability impact.
            </motion.p>
            
            {/* Vetting Process Steps */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="space-y-5">
                {VETTING_STEPS.slice(0, 3).map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
                    className="flex items-center gap-5 group hover:translate-x-1 transition-transform duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/30 to-green-400/40 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/40 group-hover:bg-white/40 transition-colors duration-300 shadow-lg">
                      <span className="text-white font-bold text-sm drop-shadow-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-base sm:text-lg drop-shadow-md">{step.title}</h4>
                      <p className="text-white text-xs sm:text-sm mt-1 drop-shadow-sm">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Stats */}
            <motion.div variants={itemVariants} className="flex gap-6 mb-10">
              <div className="bg-gradient-to-br from-white/20 to-green-500/30 backdrop-blur-md rounded-xl px-5 py-4 text-center border border-white/30 shadow-xl hover:scale-105 transition-transform duration-300">
                <p className="text-2xl sm:text-3xl font-extrabold text-white mb-1 drop-shadow-md">13%</p>
                <p className="text-xs sm:text-sm text-white font-medium">Approval Rate</p>
              </div>
              <div className="bg-gradient-to-br from-white/20 to-green-500/30 backdrop-blur-md rounded-xl px-5 py-4 text-center border border-white/30 shadow-xl hover:scale-105 transition-transform duration-300">
                <p className="text-2xl sm:text-3xl font-extrabold text-white mb-1 drop-shadow-md">87%</p>
                <p className="text-xs sm:text-sm text-white font-medium">Positive Impact</p>
              </div>
            </motion.div>
            
            {/* CTA Button */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                asChild
                className="bg-gradient-to-r from-white to-green-50 hover:from-green-50 hover:to-white text-green-800 shadow-[0_10px_30px_rgba(0,0,0,0.2)]
                  hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out 
                  hover:translate-y-[-3px] rounded-xl px-7 py-6 text-sm font-semibold group"
              >
                <Link href="/company-vetting">
                  <span className="relative z-10 flex items-center">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300 ease-out" />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Right content - Static Lottie animation */}
          <motion.div 
            className="w-full lg:w-[60%] flex justify-center lg:justify-end"
            variants={itemVariants}
            style={{ rotate: isMobile ? 0 : rotate }}
          >
            <div className="relative w-full h-[400px] sm:h-[460px] md:h-[540px] lg:h-[600px] flex items-center justify-center">
              {/* Simplified static animation container */}
              <motion.div 
                className="relative w-[380px] h-[380px] sm:w-[450px] sm:h-[450px] md:w-[520px] md:h-[520px] lg:w-[600px] lg:h-[600px] z-10"
                initial={{ y: 0 }}
                animate={{ y: [-5, 5, -5] }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                {/* Static Lottie animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: isInView ? 1 : 0, 
                    scale: isInView ? 1 : 0.9,
                  }}
                  transition={{ 
                    duration: 0.8, 
                    ease: "easeOut"
                  }}
                  className="w-full h-full"
                  style={{
                    filter: "drop-shadow(0 30px 50px rgba(0, 200, 0, 0.25))"
                  }}
                >
                  <Lottie
                    animationData={iconAnimation}
                    loop={false}
                    autoplay={true}
                    className="w-full h-full"
                    lottieRef={lottieRef}
                    rendererSettings={{
                      preserveAspectRatio: 'xMidYMid slice'
                    }}
                    onComplete={() => setIsAnimationLoaded(true)}
                  />
                </motion.div>
                
                {/* Primary glow effect */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 0.6 : 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-green-300/50 to-green-600/50 rounded-full blur-[140px] transform"
                ></motion.div>
                
                {/* Secondary glow effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 0.4 : 0 }}
                  transition={{ duration: 1.2 }}
                  className="absolute -inset-16 -z-20 bg-gradient-radial from-green-400/30 to-transparent rounded-full blur-[80px]"
                ></motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 