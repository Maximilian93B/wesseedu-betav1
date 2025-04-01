"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

// Animation variants - simplified for cleaner performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.12, // slightly slower for more breathing room
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
      duration: 8, // slower, more subtle animation
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
}

// Subtle shimmer with reduced intensity
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

  // Don't render animations until component is mounted
  if (!isMounted) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-7xl mx-auto px-8 py-32 lg:py-40" // Increased padding for more breathing room
    >
      <div className="flex flex-col lg:flex-row gap-20 lg:gap-28 items-center"> {/* Increased gap for more space */}
        {/* Left content - Text and CTA - Simplified */}
        <div className="w-full lg:w-1/2 flex flex-col relative">
          {/* Subtle accent line */}
          <div className="absolute left-0 top-0 w-20 h-1 bg-gradient-to-r from-slate-300 to-transparent rounded-full"></div>
          
          <motion.div variants={itemVariants} className="overflow-hidden relative mb-8">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.15]"
            >
              Your money's<br /><span className="relative inline-block">
                worth more
                <motion.span 
                  className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-slate-200/40 to-transparent rounded-lg"
                  variants={shimmerAnimation}
                ></motion.span>
              </span>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-slate-600 text-xl leading-relaxed mb-16 max-w-xl font-light" // Increased bottom margin
          >
            Get the most out of your money with smart investing products and personalized advice to build long-term wealth.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="mb-24" // Increased bottom margin substantially
          >
            <Button
              asChild
              size="lg"
              className="group bg-slate-900 hover:bg-slate-800 text-white shadow-[0_4px_10px_rgba(0,0,0,0.07)]
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out 
                hover:translate-y-[-2px] rounded-xl px-10 py-7 font-medium relative overflow-hidden"
            >
              <Link href="/auth/signup">
                <span className="relative z-10 flex items-center justify-center">
                  Get started
                  <Sparkles className="h-4 w-4 ml-1.5 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Link>
            </Button>
          </motion.div>
          
          {/* Feature points - simplified with more spacing */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12" // Increased gap
          >
            {/* Simplified divider with less visual weight */}
            <div className="col-span-full mb-12"> {/* Increased bottom margin */}
              <div className="w-full h-[1px] bg-gradient-to-r from-slate-200 via-slate-100 to-transparent"></div>
            </div>
            
            {/* Feature 1 */}
            <div className="flex flex-col group">
              <div className="w-10 h-1 bg-gradient-to-r from-slate-300 to-transparent mb-6 rounded-full transition-all duration-300 group-hover:w-16"></div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Low fees meet higher yields</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Your money's always making more with low-fee investing and high-interest savings.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-col group">
              <div className="w-10 h-1 bg-gradient-to-r from-slate-300 to-transparent mb-6 rounded-full transition-all duration-300 group-hover:w-16"></div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Unmatched access</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Get sophisticated investment opportunities traditionally reserved for industry insiders.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="flex flex-col group">
              <div className="w-10 h-1 bg-gradient-to-r from-slate-300 to-transparent mb-6 rounded-full transition-all duration-300 group-hover:w-16"></div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Smart & simple</h3>
              <p className="text-slate-600 text-sm leading-relaxed">In just a few taps, set your financial goals in motion with our easy-to-use products.</p>
            </div>
          </motion.div>
        </div>
        
        {/* Right content - Simplified floating elements with more space */}
        <motion.div 
          className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          variants={itemVariants}
        >
          <div className="relative w-full max-w-lg h-[500px] md:h-[600px]"> {/* Increased height for more space */}
            {/* Subtle backdrop gradient - lightened */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/30 rounded-full blur-3xl"></div>
            
            {/* Large Earth Globe - simplified animations */}
            <motion.div 
              className="absolute right-20 top-24 w-[320px] h-[320px] z-10 drop-shadow-xl" // Increased size, adjusted position
              initial="initial"
              animate="animate"
              variants={{
                ...floatingVariants,
                animate: { 
                  y: [0, -10, 0],
                  rotate: [0, 0.5, 0, -0.5, 0], // Reduced rotation for subtlety
                  transition: {
                    y: {
                      duration: 10, // Slower animation
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
              whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
            >
              <Image
                src="/sustainability.png"
                alt="Earth globe"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
              
              {/* Subtle glow behind globe - reduced intensity */}
              <div className="absolute inset-0 -z-10 bg-slate-200/20 rounded-full blur-xl transform scale-90"></div>
              
              {/* Coin stack on top of globe - simplified animation */}
              <motion.div 
                className="absolute -top-[60px] right-[100px] w-[70px] h-[70px]"
                animate={{ 
                  y: [0, -7, 0],
                  rotate: [0, 3, 0], // Reduced rotation
                  transition: {
                    y: {
                      duration: 6, // Slower animation
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 1
                    },
                    rotate: {
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 0.5
                    }
                  }
                }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <Image
                  src="/dollar-coins.png"
                  alt="Coin stack"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
                <div className="absolute inset-0 -z-10 bg-yellow-400/5 rounded-full blur-xl"></div>
              </motion.div>
            </motion.div>
            
            {/* Small Earth Globe - removed from this cleaner design to reduce visual clutter */}
            
            {/* W Square - refined with more subtlety */}
            <motion.div 
              className="absolute bottom-32 left-20 w-[100px] h-[100px] z-30 shadow-lg rounded-2xl overflow-hidden" // Repositioned
              animate={{ 
                y: [0, -12, 0],
                rotate: [0, 1, 0, -1, 0], // Reduced rotation
                transition: {
                  y: {
                    duration: 9,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 1.5
                  },
                  rotate: {
                    duration: 12,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }
                }
              }}
              whileHover={{ scale: 1.05, rotate: 3, transition: { duration: 0.4 } }}
            >
              <div className="relative w-full h-full bg-gradient-to-br from-[#f5e9c9] to-[#e5d5a8] rounded-2xl flex items-center justify-center overflow-hidden">
                {/* Shimmer effect - simplified */}
                <motion.div 
                  className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                  animate={{ translateX: ["120%", "-120%"] }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 2 }}
                />
                <span className="text-slate-800 font-bold text-3xl">W</span>
              </div>
            </motion.div>
            
            {/* Gold Coin - refined with more subtlety */}
            <motion.div 
              className="absolute right-20 bottom-20 w-[110px] h-[110px] z-30" // Repositioned
              animate={{ 
                y: [0, -14, 0],
                rotate: [0, 5, 0, -2, 0], // Reduced rotation
                transition: {
                  y: {
                    duration: 9,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 0.5
                  },
                  rotate: {
                    duration: 13,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 1
                  }
                }
              }}
              whileHover={{ scale: 1.08, rotate: 8, transition: { duration: 0.4 } }}
            >
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#e9d48e] to-[#c9b26d] flex items-center justify-center shadow-lg">
                {/* Subtle ring highlight */}
                <div className="absolute inset-0 rounded-full border border-white/10"></div>
                
                {/* Shimmer effect - simplified */}
                <motion.div 
                  className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full rounded-full"
                  animate={{ translateX: ["100%", "-100%"] }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 1.5 }}
                />
                
                <span className="text-slate-800 font-bold text-3xl relative z-10">$</span>
              </div>
            </motion.div>
            
            {/* Enhanced shadow/ground effect - lighter and more subtle */}
            <div className="absolute bottom-[-10px] left-20 right-20 h-[25px] rounded-[50%] bg-slate-300/5 blur-2xl z-0"></div>
          </div>
        </motion.div>
      </div>
      
      {/* Enhanced scroll indicator - more subtle and minimal */}
      <motion.div
        variants={itemVariants}
        className="absolute bottom-16 left-1/2 -translate-x-1/2" // Moved down for more space
      >
        <button 
          onClick={scrollToNextSection}
          className="flex flex-col items-center focus:outline-none group"
          aria-label="View more content"
        >
          <p className="text-slate-600 text-sm font-medium mb-4 group-hover:text-slate-800 transition-colors">
            Scroll for more
          </p>
          <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center
            group-hover:border-slate-300 group-hover:shadow-[0_4px_10px_rgba(0,0,0,0.05)]
            transition-all duration-300 relative overflow-hidden">
            <ArrowRight className="h-4 w-4 text-slate-500 transform rotate-90 group-hover:text-slate-700 transition-colors" />
            
            {/* Subtle pulse animation - more gentle */}
            <motion.div 
              className="absolute inset-0 bg-slate-50 rounded-full"
              animate={{
                scale: [0.9, 1.02, 0.9],
                opacity: [0, 0.1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </button>
      </motion.div>
    </motion.div>
  )
}

 