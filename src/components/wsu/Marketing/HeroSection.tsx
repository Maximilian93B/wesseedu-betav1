"use client"
import { AnimatedTitle } from "@/components/ui/AnimatedTitle"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
// Import global animations
import { GlobalAnimations } from "@/styles/globalAnimations"
import { useEffect, useState } from "react"

export function HeroSection() {
  // Detect if reduced motion is preferred
  const prefersReducedMotion = useReducedMotion();
  // Track if component is mounted
  const [isMounted, setIsMounted] = useState(false);
  
  // Only run animations after component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToNextSection = () => {
    // Smooth scroll to the next section
    const cardSection = document.getElementById('card-section');
    if (cardSection) {
      cardSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  // Define variants outside of render for better performance
  const titleContainerVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, // Increased duration for smoother animation
        delay: 0.1,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  const buttonsContainerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        delay: 0.7 
      }
    }
  };

  // Don't render animations until component is mounted
  if (!isMounted) return null;

  return (
    <>
      <GlobalAnimations />
      
      {/* Optimized hero container with strategic spacing */}
      <div className="relative w-full h-screen flex flex-col justify-center items-center">
        {/* Content container with optimal positioning - adjusted for planet effect */}
        <div 
          className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10 flex flex-col items-center"
          style={{ 
            marginTop: 'min(calc(-5vh), -40px)',
          }}
        >
          {/* Main content with proper visual hierarchy */}
          <div className="text-center">
            {/* Title with enhanced prominence - optimized animation */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={titleContainerVariants}
              className="mb-6 sm:mb-8 relative px-4 py-4"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Enhanced glow effect - simplified for performance */}
              <div 
                className="absolute inset-0 -z-10 bg-gradient-radial from-purple-500/15 via-purple-500/5 to-transparent rounded-full opacity-80"
                style={{
                  width: '140%',
                  height: '140%',
                  left: '-20%',
                  top: '-20%',
                  filter: 'blur(15px)', // Reduced blur for better performance
                  transform: 'translateZ(0)', // Hardware acceleration
                }}
              ></div>
              
              <AnimatedTitle 
                text="WeSeedU"
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                delay={prefersReducedMotion ? 0 : 0.07} // Slightly slower for smoother effect, skip if reduced motion
                revealType={prefersReducedMotion ? "fade" : "blur-glow"} // Use "fade" instead of "simple" to match the allowed types
                color="blur-glow"
              />
            </motion.div>
            
            {/* Description with improved visual weight and alignment - restored */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.7, 
                    delay: 0.2,
                    ease: [0.23, 1, 0.32, 1]
                  }
                }
              }}
              className="mb-8 sm:mb-10 md:mb-12 max-w-2xl lg:max-w-3xl mx-auto px-4"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="flex flex-wrap items-baseline justify-center gap-x-2">
                <p 
                  className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed text-gray-200"
                >
                  The world's first dedicated platform for
                </p>
                <span className="text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-purple-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent font-semibold">
                  sustainable startups
                </span>
              </div>
            </motion.div>
            
            {/* Buttons with optimized animations */}
            <motion.div 
              className="flex flex-wrap gap-4 justify-center px-4 pt-4 sm:pt-6 max-w-3xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={buttonsContainerVariants}
              style={{ willChange: "transform, opacity" }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white border-none shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-6 sm:py-7 relative overflow-hidden group flex-1"
              >
                <Link href="/auth/signup">
                  <span className="relative z-10">Start Investing</span>
                  <span className="relative z-10 ml-2 sm:ml-3 transform group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent hover:bg-black/20 text-white border border-purple-500/30 hover:border-purple-500/50 shadow-lg shadow-purple-900/10 hover:shadow-purple-900/20 transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-6 sm:py-7 relative overflow-hidden group flex-1"
              >
                <Link href="/auth/login">
                  <span className="relative z-10">Login</span>
                  <span className="relative z-10 ml-2 sm:ml-3 transform group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Strategically positioned scroll indicator - optimized animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={scrollIndicatorVariants}
          className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 z-10"
        >
          <button 
            onClick={scrollToNextSection}
            className="group flex flex-col items-center focus:outline-none transition-all duration-300"
            aria-label="View more content"
          >
            {/* Professional chevron indicator with optimized animations */}
            <div className="flex flex-col items-center">
              <p className="text-white text-xs sm:text-sm font-medium opacity-75 mb-2">
                Explore More
              </p>
              <motion.div 
                animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
                transition={{
                  duration: 3.5, // Slower animation for better performance
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex flex-col items-center space-y-1"
              >
                <div className="h-px w-5 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60 group-hover:via-teal-400 transition-colors duration-300"></div>
                <div className="h-px w-4 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60 group-hover:via-teal-400 transition-colors duration-300"></div>
                <div className="h-px w-3 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60 group-hover:via-teal-400 transition-colors duration-300"></div>
              </motion.div>
            </div>
          </button>
        </motion.div>
      </div>
    </>
  )
}

 