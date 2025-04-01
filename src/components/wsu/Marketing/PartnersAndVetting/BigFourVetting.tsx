"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Shield, BarChart2, FileCheck, CheckCircle } from "lucide-react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ACCOUNTING_FIRMS, VETTING_STEPS } from "./data"
import dynamic from "next/dynamic"
import "./animations.css"

// You'll need to import your IconScout JSON file
// Replace '/path/to/your/iconscout-animation.json' with the actual path to your JSON file
import iconAnimation from "@/../../public/pie-chart.json"
// Import the new accounting icon
import accountingIcon from "@/../../public/accounting-details.png"

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

// Animation variants - simplified for cleaner performance
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

const floatingVariants = {
  initial: { y: 0 },
  animate: { 
    y: [0, -8, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
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

export function BigFourVetting() {
  // Refs and animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
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
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Effect to handle animation visibility when scrolled into view
  useEffect(() => {
    if (isInView) {
      // Delay the animation start for a smoother sequence
      const timer = setTimeout(() => {
        setAnimationVisible(true);
      }, 400);
      
      return () => clearTimeout(timer);
    }
  }, [isInView]);
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 20]);

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
      className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24"
    >
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}>
      </div>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
      >
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-between">
          {/* Left content - Text and process info */}
          <div className="w-full lg:w-[40%] flex flex-col relative">
            {/* Enhanced accent element */}
            <div className="absolute left-0 top-0 w-32 h-1.5 bg-gradient-to-r from-green-400 via-green-300 to-transparent rounded-full"></div>
            <div className="absolute left-0 top-3 w-16 h-0.5 bg-gradient-to-r from-green-400/50 to-transparent rounded-full"></div>
            
            <motion.div variants={itemVariants} className="overflow-hidden relative mb-7">
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.15]"
              >
                Vetted by the<br />
                <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-green-100">
                  Big Four
                  <motion.span 
                    className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-lg"
                    variants={shimmerAnimation}
                  ></motion.span>
                </span>
              </motion.h2>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-white/90 text-base sm:text-lg leading-relaxed mb-8 max-w-md"
            >
              Every startup on our platform is rigorously vetted by one of the Big Four accounting firms to ensure real sustainability impact.
            </motion.p>
            
            {/* Vetting Process Steps - Enhanced */}
            <motion.div variants={itemVariants} className="mb-9">
              <div className="space-y-4">
                {VETTING_STEPS.slice(0, 3).map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400/20 to-green-500/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/20 group-hover:bg-white/20 transition-colors duration-300 shadow-sm">
                      <span className="text-white font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-base sm:text-lg">{step.title}</h4>
                      <p className="text-white/70 text-xs sm:text-sm mt-0.5">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Stats - Enhanced with better styling */}
            <motion.div variants={itemVariants} className="flex gap-5 mb-9">
              <div className="bg-gradient-to-br from-green-400/10 to-green-500/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center border border-white/10 shadow-lg">
                <p className="text-2xl font-bold text-white mb-1">13%</p>
                <p className="text-xs text-white/80">Approval Rate</p>
              </div>
              <div className="bg-gradient-to-br from-green-400/10 to-green-500/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center border border-white/10 shadow-lg">
                <p className="text-2xl font-bold text-white mb-1">87%</p>
                <p className="text-xs text-white/80">Positive Impact</p>
              </div>
            </motion.div>
            
            {/* CTA Button - Enhanced */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                asChild
                className="bg-gradient-to-r from-white to-green-50 hover:from-green-50 hover:to-white text-green-700 shadow-[0_6px_20px_rgba(0,0,0,0.1)]
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out 
                  hover:translate-y-[-2px] rounded-xl px-6 py-6 text-sm font-medium group"
              >
                <Link href="/company-vetting">
                  <span className="relative z-10 flex items-center">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Right content - IconScout Lottie Animation */}
          <motion.div 
            className="w-full lg:w-[60%] flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            {/* Apply transform to move container up and right - reduced overall size */}
            <div className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] lg:h-[540px] transform translate-y-[-45px] translate-x-[50px] sm:translate-y-[-55px] sm:translate-x-[70px] md:translate-y-[-60px] md:translate-x-[90px]">
              {/* Card background for animation - keep this original white container */}
              <div className="absolute inset-0 w-full h-full mx-auto my-auto bg-white/95 backdrop-blur-sm rounded-3xl border border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.15)]">
                {/* Subtle texture pattern for depth */}
                <div className="absolute inset-0 opacity-[0.02]" 
                  style={{ 
                    backgroundImage: `radial-gradient(circle at 20px 20px, black 1px, transparent 0)`,
                    backgroundSize: "40px 40px"
                  }} 
                />
                
                {/* Top edge highlight for definition */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/40 via-white/60 to-white/40"></div>
              </div>
              
              {/* Accounting icon - using same positioning as the white container */}
              <motion.div
                className="absolute inset-0 w-full h-full mx-auto my-auto z-[8] flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: animationVisible ? 0.95 : 0,
                  scale: animationVisible ? 1 : 0.9,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 0.1
                  }
                }}
              >
                <div className="relative w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px]">
                  <Image
                    src={accountingIcon}
                    alt="Accounting Details"
                    fill
                    className="object-contain drop-shadow-xl"
                    sizes="(max-width: 640px) 360px, (max-width: 768px) 420px, 480px"
                  />
                </div>
              </motion.div>
              
              {/* Main Lottie Animation - moved lower and further left */}
              <motion.div 
                className="absolute right-[70%] translate-x-[30%] top-[55%] translate-y-[-50%] w-[250px] h-[250px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] z-10"
                initial="initial"
                animate="animate"
                variants={{
                  ...floatingVariants,
                  animate: { 
                    y: [0, -8, 0],
                    rotate: [0, 0.5, 0, -0.5, 0],
                    transition: {
                      y: {
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      },
                      rotate: {
                        duration: 14,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }
                    }
                  }
                }}
              >
                {/* Lottie animation container */}
                <div className="w-full h-full relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: animationVisible ? 1 : 0, 
                      scale: animationVisible ? 1 : 0.9,
                      y: animationVisible ? 0 : 20 
                    }}
                    transition={{ 
                      duration: 0.8, 
                      ease: "easeOut", 
                      delay: 0.1
                    }}
                    className="w-full h-full"
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
                </div>
                
                {/* Subtle glow effect behind animation */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: animationVisible ? 0.3 : 0, 
                    scale: animationVisible ? 0.95 : 0.8 
                  }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="absolute inset-0 -z-10 bg-white/20 rounded-full blur-xl transform"
                ></motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 