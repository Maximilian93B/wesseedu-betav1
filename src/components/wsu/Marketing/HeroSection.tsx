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
          
          <motion.div variants={itemVariants} className="overflow-hidden relative mb-8">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text tracking-tight leading-[1.15]"
              style={{ 
                backgroundImage: 'linear-gradient(135deg, #ffffff, #f0f8ff, #ffffff)',
                WebkitBackgroundClip: 'text',
                textShadow: '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)',

              }}
            >
              Grow a<br />
              Sustainable Future
            </motion.h1>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className=" text-white text-xl leading-relaxed mb-16 max-w-xl font-light"
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
            {/* Enhanced backdrop gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/5 via-transparent to-slate-100/40 rounded-full blur-3xl"></div>
            
            {/* Large Earth Globe - enhanced with better 3D effects */}
            <motion.div 
              className="absolute right-20 top-24 w-[400px] h-[400px] z-10"
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
              {/* Radiant outer glow */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/20 to-cyan-400/20 rounded-full blur-3xl transform scale-110"></div>
              
              {/* Atmospheric glow - bright side */}
              <div className="absolute -right-5 top-5 w-20 h-20 bg-blue-400/30 rounded-full blur-xl"></div>
              
              {/* Image with enhanced drop shadow */}
              <div className="relative w-full h-full drop-shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
                <Image
                  src="/sustainability.png"
                  alt="Earth globe"
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
            
            {/* Enhanced 3D shadow effect */}
            <div className="absolute bottom-0 left-20 right-20 h-6 bg-gradient-to-b from-slate-900/5 to-slate-900/15 rounded-[50%] blur-xl z-0 transform scale-x-90"></div>
            
            {/* Secondary subtle shadow for more depth */}
            <div className="absolute bottom-[-5px] left-24 right-24 h-4 bg-slate-900/10 rounded-[60%] blur-md z-0"></div>
          </div>
        </motion.div>
      </div>
      
      {/* Middle section: Minimal divider with almost no spacing */}
      <motion.div variants={itemVariants} className="w-full my-0 mb-10">
        <div className="relative w-full">
          {/* Main line with shadow for 3D effect */}
          <div className="w-full h-[2px] bg-gradient-to-r from-white via-white/80 to-transparent rounded-full shadow-[0_1px_2px_rgba(255,255,255,0.7)]"></div>
          
          {/* Subtle highlight line above */}
          <div className="absolute -top-[1px] w-full h-[1px] bg-gradient-to-r from-white/20 via-white/10 to-transparent rounded-full"></div>
          
          {/* Shadow line below */}
          <div className="absolute top-[2px] w-3/4 h-[1px] bg-gradient-to-r from-slate-400/30 via-slate-400/10 to-transparent rounded-full"></div>
        </div>
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

 