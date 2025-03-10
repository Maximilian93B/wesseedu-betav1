"use client"
import { AnimatedTitle } from "@/components/ui/AnimatedTitle"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
// Import global animations
import { GlobalAnimations } from "@/styles/globalAnimations"

export function HeroSection() {
  const scrollToNextSection = () => {
    // Smooth scroll to the next section
    const cardSection = document.getElementById('card-section');
    if (cardSection) {
      cardSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <GlobalAnimations />
      
      {/* Optimized hero container with strategic spacing */}
      <div className="relative w-full h-screen flex flex-col justify-center items-center">
        {/* Content container with optimal positioning */}
        <div 
          className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10 flex flex-col items-center"
          style={{ 
            marginTop: 'min(calc(-10vh), -60px)',  // Shift up slightly for better visual balance
          }}
        >
          {/* Main content with proper visual hierarchy */}
          <div className="text-center">
            {/* Title with enhanced prominence */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.1,
                ease: [0.23, 1, 0.32, 1] // Custom ease for smoother appearance
              }}
              className="mb-6 sm:mb-8 relative px-4 py-4"
            >
              {/* Enhanced glow effect */}
              <div 
                className="absolute inset-0 -z-10 bg-gradient-radial from-purple-500/20 via-purple-500/5 to-transparent rounded-full opacity-90"
                style={{
                  width: '140%',
                  height: '140%',
                  left: '-20%',
                  top: '-20%',
                  filter: 'blur(25px)',
                  boxShadow: 'inset 0 0 35px 5px rgba(168, 85, 247, 0.07)'
                }}
              ></div>
              
              <AnimatedTitle 
                text="WeSeedU"
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                delay={0.05}
                revealType="blur-glow"
                color="blur-glow"
              />
            </motion.div>
            
            {/* Description with improved visual weight and alignment */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: 0.3,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="mb-10 sm:mb-12 md:mb-14 max-w-2xl lg:max-w-3xl mx-auto px-4"
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
            
            {/* Call to action buttons with strategic positioning */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: 0.5,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 max-w-md sm:max-w-lg mx-auto justify-center mb-8"
            >
              {/* Primary CTA - visually enhanced */}
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white border-none shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transition-all duration-200 text-base sm:text-lg px-6 sm:px-8 py-6 sm:py-7 relative overflow-hidden group flex-1"
              >
                <Link href="/auth/signup">
                  <span className="relative z-10">Start Investing</span>
                  <span className="relative z-10 ml-2 sm:ml-3 transform group-hover:translate-x-1 transition-transform duration-200">
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>
                </Link>
              </Button>

              {/* Secondary CTA - balanced design */}
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent hover:bg-black/20 text-white border border-purple-500/30 hover:border-purple-500/50 shadow-lg shadow-purple-900/10 hover:shadow-purple-900/20 transition-all duration-200 text-base sm:text-lg px-6 sm:px-8 py-6 sm:py-7 relative overflow-hidden group flex-1"
              >
                <Link href="/auth/login">
                  <span className="relative z-10">Login</span>
                  <span className="relative z-10 ml-2 sm:ml-3 transform group-hover:translate-x-1 transition-transform duration-200">
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Strategically positioned scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 z-10"
        >
          <button 
            onClick={scrollToNextSection}
            className="group flex flex-col items-center focus:outline-none transition-all duration-300"
            aria-label="View more content"
          >
            {/* Professional chevron indicator */}
            <div className="flex flex-col items-center">
              <motion.div 
                animate={{ y: [0, 4, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex flex-col items-center space-y-1"
              >
                <div className="h-px w-5 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60 group-hover:via-teal-400 transition-colors duration-300"></div>
                <div className="flex">
                  <div className="w-4 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent rotate-45 translate-x-[1px] opacity-70 group-hover:via-teal-400 transition-colors duration-300"></div>
                  <div className="w-4 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent -rotate-45 -translate-x-[1px] opacity-70 group-hover:via-teal-400 transition-colors duration-300"></div>
                </div>
                <div className="flex">
                  <div className="w-5 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent rotate-45 translate-x-[2px] opacity-80 group-hover:via-teal-400 transition-colors duration-300"></div>
                  <div className="w-5 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent -rotate-45 -translate-x-[2px] opacity-80 group-hover:via-teal-400 transition-colors duration-300"></div>
                </div>
                <div className="flex">
                  <div className="w-6 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent rotate-45 translate-x-[3px] opacity-90 group-hover:via-teal-400 transition-colors duration-300"></div>
                  <div className="w-6 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent -rotate-45 -translate-x-[3px] opacity-90 group-hover:via-teal-400 transition-colors duration-300"></div>
                </div>
              </motion.div>
            </div>
          </button>
        </motion.div>
      </div>
    </>
  )
}

 