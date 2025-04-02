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
    opacity: [0, 0.6, 0],
    x: [0, 140, 280],
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 4,
      ease: "easeInOut",
      delay: 1
    }
  }
}

export function BigFourVetting() {
  // Refs and animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [isMobile, setIsMobile] = useState(false);
  const lottieRef = useRef(null);
  const [animationVisible, setAnimationVisible] = useState(false);
  
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
  
  // Effect to handle animation visibility when scrolled into view
  useEffect(() => {
    if (isInView) {
      // Delay the animation start for a smoother sequence
      const timer = setTimeout(() => {
        setAnimationVisible(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isInView]);
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

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
            {/* Enhanced accent elements */}
            <div className="absolute left-0 top-0 w-40 h-1.5 bg-gradient-to-r from-white via-green-200 to-transparent rounded-full"></div>
            <div className="absolute left-0 top-3 w-24 h-0.5 bg-gradient-to-r from-white/60 to-transparent rounded-full"></div>
            <div className="absolute -left-8 top-6 w-12 h-12 bg-white/10 rounded-full blur-[30px]"></div>
            
            <motion.div variants={itemVariants} className="overflow-hidden relative mb-8">
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.15]"
              >
                Vetted by the<br />
                <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-green-100">
                  Big Four
                  <motion.span 
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-lg"
                    variants={shimmerAnimation}
                  ></motion.span>
                </span>
              </motion.h2>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-white/95 text-base sm:text-lg leading-relaxed mb-10 max-w-lg"
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
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-green-400/30 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/30 group-hover:bg-white/30 transition-colors duration-300 shadow-lg">
                      <span className="text-white font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-base sm:text-lg">{step.title}</h4>
                      <p className="text-white/80 text-xs sm:text-sm mt-1">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Stats */}
            <motion.div variants={itemVariants} className="flex gap-6 mb-10">
              <div className="bg-gradient-to-br from-white/15 to-green-500/20 backdrop-blur-md rounded-xl px-5 py-4 text-center border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300">
                <p className="text-2xl sm:text-3xl font-bold text-white mb-1">13%</p>
                <p className="text-xs sm:text-sm text-white/90">Approval Rate</p>
              </div>
              <div className="bg-gradient-to-br from-white/15 to-green-500/20 backdrop-blur-md rounded-xl px-5 py-4 text-center border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300">
                <p className="text-2xl sm:text-3xl font-bold text-white mb-1">87%</p>
                <p className="text-xs sm:text-sm text-white/90">Positive Impact</p>
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
                className="bg-gradient-to-r from-white to-green-50 hover:from-green-50 hover:to-white text-green-700 shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                  hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out 
                  hover:translate-y-[-3px] rounded-xl px-7 py-6 text-sm font-medium group"
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
          
          {/* Right content - Enhanced Lottie animation */}
          <motion.div 
            className="w-full lg:w-[60%] flex justify-center lg:justify-end"
            variants={itemVariants}
            style={{ rotate: isMobile ? 0 : rotate }}
          >
            <div className="relative w-full h-[400px] sm:h-[460px] md:h-[540px] lg:h-[600px] flex items-center justify-center">
              {/* Main animation container with enhanced size */}
              <motion.div 
                className="relative w-[380px] h-[380px] sm:w-[450px] sm:h-[450px] md:w-[520px] md:h-[520px] lg:w-[600px] lg:h-[600px] z-10"
                initial="initial"
                animate="animate"
                variants={{
                  ...floatingVariants,
                  animate: { 
                    y: [0, -20, 0],
                    rotate: [0, 2, 0, -2, 0],
                    transition: {
                      y: {
                        duration: 12,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      },
                      rotate: {
                        duration: 16,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }
                    }
                  }
                }}
              >
                {/* Enhanced Lottie animation with 3D effects */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: animationVisible ? 1 : 0, 
                    scale: animationVisible ? 1.05 : 0.9,
                    y: animationVisible ? 0 : 20 
                  }}
                  transition={{ 
                    duration: 1, 
                    ease: "easeOut", 
                    delay: 0.2
                  }}
                  className="w-full h-full transform perspective-[2000px] hover:rotate-y-8 hover:scale-105 transition-all duration-700"
                  style={{
                    filter: "drop-shadow(0 30px 50px rgba(0, 200, 0, 0.25))",
                    transformStyle: "preserve-3d"
                  }}
                >
                  <Lottie
                    animationData={iconAnimation}
                    loop={true}
                    autoplay={true}
                    className="w-full h-full"
                    lottieRef={lottieRef}
                    rendererSettings={{
                      preserveAspectRatio: 'xMidYMid slice'
                    }}
                  />
                </motion.div>
                
                {/* Primary glow effect - brighter for green theme */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: animationVisible ? 0.75 : 0, 
                    scale: animationVisible ? 1.6 : 0.8 
                  }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-green-300/50 to-green-600/50 rounded-full blur-[140px] transform"
                ></motion.div>
                
                {/* Secondary depth layer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: animationVisible ? 0.4 : 0 }}
                  transition={{ duration: 1.5, delay: 0.4 }}
                  className="absolute -inset-16 -z-20 bg-gradient-radial from-green-400/30 to-transparent rounded-full blur-[80px]"
                ></motion.div>
                
                {/* Additional accent highlight */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: animationVisible ? 0.65 : 0 }}
                  transition={{ duration: 1.8, delay: 0.5 }}
                  className="absolute -top-20 -right-20 w-40 h-40 bg-blue-300/30 rounded-full blur-[60px] z-[-15]"
                ></motion.div>
                
                {/* Subtle motion tracking element */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: animationVisible ? 0.5 : 0 }}
                  transition={{ duration: 2, delay: 0.6 }}
                  className="absolute bottom-0 left-[20%] w-20 h-20 bg-white/20 rounded-full blur-[40px] z-[-10]"
                  style={{
                    x: isMobile ? 0 : useTransform(scrollYProgress, [0, 1], [0, -50])
                  }}
                ></motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 