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

export function HeroSection() {
  // Detect if reduced motion is preferred
  const prefersReducedMotion = useReducedMotion();
  // Track if component is mounted
  const [isMounted, setIsMounted] = useState(false);
  
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
      variants={containerVariants}
      className="w-full max-w-7xl mx-auto px-8 py-32 lg:py-40" 
    >
      {/* Top section: Two-column layout with main content */}
      <div className="flex flex-col lg:flex-row gap-20 lg:gap-28 items-center">
        {/* Left column: Text and CTA */}
        <div className="w-full lg:w-1/2 flex flex-col relative">
          {/* Subtle accent line */}
          <div className="absolute left-0 top-0 w-20 h-1 bg-gradient-to-r from-slate-300 to-transparent rounded-full"></div>
          
          <motion.div variants={itemVariants} className="overflow-hidden relative mb-8">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.15]"
            >
              Grow a<br /><span className="relative inline-block">
                 Sustainable Future
                <motion.span 
                  className="absolute inset-0 w-full  rounded-lg"
                ></motion.span>
              </span>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-white text-xl leading-relaxed mb-16 max-w-xl font-light"
          >
            Join the movement to build a greener tomorrow through sustainable investments that benefit both your finances and our planet.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
          >
          <Button
              asChild
              size="lg"
              className="group text-white shadow-[0_4px_10px_rgba(0,0,0,0.07)]
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out 
                hover:translate-y-[-2px] rounded-xl px-10 py-7 font-medium relative overflow-hidden"
              style={{ background: 'linear-gradient(to top, #00b4db, #0083b0)' }}
            >
              <Link href="/auth/signup">
                <span className="relative z-10 flex items-center justify-center">
                  Plant your seed
                  <span className="relative z-10 ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </span>
              </Link>
            </Button>
          </motion.div>
        </div>
        {/* Right column: Illustrations */}
             {/* Right column: Illustrations */}
             <motion.div 
          className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          variants={itemVariants}
        >
          <div className="relative w-full max-w-lg h-[500px] md:h-[600px]">
            {/* Subtle backdrop gradient - lightened */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/30 rounded-full blur-3xl"></div>
            
            {/* Large Earth Globe - simplified animations */}
            <motion.div 
              className="absolute right-20 top-24 w-[400px] h-[400px] z-10 drop-shadow-xl"
              initial="initial"
              animate="animate"
              variants={{
                ...floatingVariants,
                animate: { 
                  y: [0, -10, 0],
                  rotate: [0, 0.5, 0, -0.5, 0],
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
            
            </motion.div>
            
            {/* Enhanced shadow/ground effect - lighter and more subtle */}
            <div className="absolute bottom-[-10px] left-20 right-20 h-[25px] rounded-[50%] bg-slate-300/5 blur-2xl z-0"></div>
          </div>
        </motion.div>
      </div>
      
      {/* Middle section: Minimal divider with almost no spacing */}
      <motion.div variants={itemVariants} className="w-full my-0">
        <div className="w-full h-[1px] bg-gradient-to-r from-slate-200 via-slate-100/50 to-transparent"></div>
      </motion.div>
      
      {/* Bottom section: Ultra-tight feature layout */}
      <motion.div variants={itemVariants} className="w-full mt-1">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-2 gap-y-1">
          {/* Feature 1 */}
          <div className="flex flex-col group">
            <div className="w-10 h-1 bg-gradient-to-r from-slate-300 to-transparent mb-3 rounded-full transition-all duration-300 group-hover:w-16"></div>
            <h3 className="text-xl font-semibold text-white mb-1">Low fees meet higher yields</h3>
            <p className="text-white text-sm leading-relaxed">Your money's always making more with low-fee investing and high-interest savings.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col group">
            <div className="w-10 h-1 bg-gradient-to-r from-slate-300 to-transparent mb-3 rounded-full transition-all duration-300 group-hover:w-16"></div>
            <h3 className="text-xl font-semibold text-white mb-1">Unmatched access</h3>
            <p className="text-white text-sm leading-relaxed">Get sophisticated investment opportunities traditionally reserved for industry insiders.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="flex flex-col group">
            <div className="w-10 h-1 bg-gradient-to-r from-slate-300 to-transparent mb-3 rounded-full transition-all duration-300 group-hover:w-16"></div>
            <h3 className="text-xl font-semibold text-white mb-1">Smart & simple</h3>
            <p className="text-white text-sm leading-relaxed">In just a few taps, set your financial goals in motion with our easy-to-use products.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

 