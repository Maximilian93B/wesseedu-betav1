"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

// Animation variants
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

export function MoneyWorthSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  return (
    <div ref={sectionRef} className="relative w-full overflow-hidden py-12 md:py-16">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="w-full px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          {/* Text content - more compact */}
          <div className="w-full max-w-md flex flex-col items-center text-center relative">
            <motion.div variants={itemVariants} className="overflow-hidden relative mb-4">
              <motion.h2 
                className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.15]"
              >
                Show your<br /><span className="relative inline-block">
                  money its worth
                  <motion.span 
                    className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-slate-200/40 to-transparent rounded-lg"
                    variants={shimmerAnimation}
                  ></motion.span>
                </span>
              </motion.h2>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-white/90 text-lg leading-relaxed mb-6 max-w-md" 
            >
              Join the 3 million Canadians choosing Wealthsimple as a trusted place to invest, trade, save, and more.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="mb-8"
            >
              <Button
                asChild
                size="default"
                className="bg-white hover:bg-slate-50 text-green-700 shadow-[0_4px_10px_rgba(0,0,0,0.07)]
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out
                  hover:translate-y-[-2px] rounded-lg px-6 py-2 font-medium relative overflow-hidden group"
              >
                <Link href="/get-started" className="relative z-10 flex items-center justify-center">
                  Get started
                  <span className="relative z-10 ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Coins animation - smaller and more compact */}
          <motion.div 
            className="w-full max-w-sm flex justify-center"
            variants={itemVariants}
          >
            <div className="relative w-full h-[300px]">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/20 rounded-full blur-3xl opacity-50"></div>
              
              {/* Main coin - W logo */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] z-30"
                initial="initial"
                animate="animate"
                variants={floatingVariants}
              >
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#e9d48e] to-[#c9b26d] flex items-center justify-center shadow-xl">
                  <div className="absolute inset-0 rounded-full border border-white/10"></div>
                  <motion.div 
                    className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full rounded-full"
                    animate={{ translateX: ["100%", "-100%"] }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 1.5 }}
                  />
                  <span className="text-white font-bold text-5xl">W</span>
                </div>
              </motion.div>
              
              {/* Ethereum coin */}
              <motion.div 
                className="absolute top-[15%] left-[10%] w-[80px] h-[80px] z-20"
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 5, 0, -2, 0],
                }}
                transition={{
                  y: { duration: 9, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 },
                  rotate: { duration: 13, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }
                }}
              >
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#a891d9] to-[#7f67a9] flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">Ξ</span>
                </div>
              </motion.div>
              
              {/* Bitcoin coin */}
              <motion.div 
                className="absolute top-[30%] right-[5%] w-[90px] h-[90px] z-20"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, -3, 0, 1, 0],
                }}
                transition={{
                  y: { duration: 11, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1.5 },
                  rotate: { duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }
                }}
              >
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#f7a741] to-[#e89421] flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">₿</span>
                </div>
              </motion.div>
              
              {/* Dollar coin */}
              <motion.div 
                className="absolute bottom-[15%] left-[15%] w-[85px] h-[85px] z-20"
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 2, 0, -1, 0],
                }}
                transition={{
                  y: { duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 },
                  rotate: { duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1.2 }
                }}
              >
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#8fc27b] to-[#5fa049] flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">$</span>
                </div>
              </motion.div>
              
              {/* Euro coin */}
              <motion.div 
                className="absolute bottom-[25%] right-[15%] w-[70px] h-[70px] z-20"
                animate={{ 
                  y: [0, -6, 0],
                  rotate: [0, -2, 0, 1, 0],
                }}
                transition={{
                  y: { duration: 7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.7 },
                  rotate: { duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1.8 }
                }}
              >
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#78a9d1] to-[#5485b0] flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">€</span>
                </div>
              </motion.div>
              
              {/* Enhanced shadow/ground effect */}
              <div className="absolute bottom-[5%] left-[10%] right-[10%] h-[15px] rounded-[50%] bg-slate-300/10 blur-xl z-0"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
} 