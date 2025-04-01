"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
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
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div ref={sectionRef} className="relative w-full overflow-hidden">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="w-full max-w-7xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
          {/* Left content - Text and CTA */}
          <div className="w-full lg:w-1/2 flex flex-col relative">
            {/* Subtle accent line */}
            <div className="absolute left-0 top-0 w-20 h-1 bg-gradient-to-r from-slate-300 to-transparent rounded-full"></div>
            
            <motion.div variants={itemVariants} className="overflow-hidden relative mb-8">
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]"
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
              className="text-white/90 text-lg leading-relaxed mb-12 max-w-xl" 
            >
              Join the 3 million Canadians choosing Wealthsimple as a trusted place to invest, trade, save, and more.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="mb-16"
            >
              <Button
                asChild
                size="lg"
                className="bg-white hover:bg-slate-50 text-green-700 shadow-[0_4px_10px_rgba(0,0,0,0.07)]
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out 
                  hover:translate-y-[-2px] rounded-xl px-8 py-6 font-medium relative overflow-hidden group"
              >
                <Link href="/get-started">
                  <span className="relative z-10 flex items-center justify-center">
                    Get started
                    <span className="relative z-10 ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </span>
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Right content - Coins animation */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative w-full max-w-lg h-[500px]">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/30 rounded-full blur-3xl"></div>
              
              {/* Main coin - W logo */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] z-30"
                initial="initial"
                animate="animate"
                variants={{
                  ...floatingVariants,
                  animate: { 
                    y: [0, -10, 0],
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
                whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
              >
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#e9d48e] to-[#c9b26d] flex items-center justify-center shadow-xl">
                  {/* Subtle ring highlight */}
                  <div className="absolute inset-0 rounded-full border border-white/10"></div>
                  
                  {/* Shimmer effect */}
                  <motion.div 
                    className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full rounded-full"
                    animate={{ translateX: ["100%", "-100%"] }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 1.5 }}
                  />
                  
                  <span className="text-white font-bold text-6xl">W</span>
                </div>
              </motion.div>
              
              {/* Ethereum coin */}
              <motion.div 
                className="absolute top-[15%] left-[10%] w-[100px] h-[100px] z-20"
                animate={{ 
                  y: [0, -12, 0],
                  rotate: [0, 5, 0, -2, 0],
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
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#a891d9] to-[#7f67a9] flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-3xl">Ξ</span>
                </div>
              </motion.div>
              
              {/* Bitcoin coin */}
              <motion.div 
                className="absolute top-[30%] right-[5%] w-[120px] h-[120px] z-20"
                animate={{ 
                  y: [0, -14, 0],
                  rotate: [0, -3, 0, 1, 0],
                  transition: {
                    y: {
                      duration: 11,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 1.5
                    },
                    rotate: {
                      duration: 15,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 0.5
                    }
                  }
                }}
                whileHover={{ scale: 1.08, rotate: -8, transition: { duration: 0.4 } }}
              >
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#f7a741] to-[#e89421] flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-3xl">₿</span>
                </div>
              </motion.div>
              
              {/* Dollar coin */}
              <motion.div 
                className="absolute bottom-[15%] left-[15%] w-[110px] h-[110px] z-20"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 2, 0, -1, 0],
                  transition: {
                    y: {
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 1
                    },
                    rotate: {
                      duration: 12,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 1.2
                    }
                  }
                }}
                whileHover={{ scale: 1.08, rotate: 5, transition: { duration: 0.4 } }}
              >
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#8fc27b] to-[#5fa049] flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-3xl">$</span>
                </div>
              </motion.div>
              
              {/* Euro coin */}
              <motion.div 
                className="absolute bottom-[25%] right-[15%] w-[90px] h-[90px] z-20"
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, -2, 0, 1, 0],
                  transition: {
                    y: {
                      duration: 7,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 0.7
                    },
                    rotate: {
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 1.8
                    }
                  }
                }}
                whileHover={{ scale: 1.08, rotate: -4, transition: { duration: 0.4 } }}
              >
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#78a9d1] to-[#5485b0] flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-3xl">€</span>
                </div>
              </motion.div>
              
              {/* Enhanced shadow/ground effect */}
              <div className="absolute bottom-[5%] left-[10%] right-[10%] h-[25px] rounded-[50%] bg-slate-300/10 blur-2xl z-0"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
} 