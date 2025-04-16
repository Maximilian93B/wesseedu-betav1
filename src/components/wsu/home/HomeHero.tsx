"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      duration: 0.3
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
}

interface HomeHeroProps {
  profile?: any;
  onNavigate?: (view: 'home' | 'dashboard' | 'companies' | 'saved' | 'communities') => void;
}

export function HomeHero({ profile, onNavigate }: HomeHeroProps) {
  return (
    <div className="relative overflow-hidden pb-12 sm:pb-16 md:pb-20 rounded-lg sm:rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mx-0 sm:mx-4"
      style={{ 
        backgroundImage: "linear-gradient(to right top, #ffffff, #f6f6ff, #eaefff, #dae8ff, #c8e2ff)" 
      }}
    >
      {/* Background subtle dot texture */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 20px 20px, #64748b 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} 
      />
      
      {/* Top edge highlight */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30"></div>
      
      {/* Inner shadow effects for depth */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50/50 to-transparent"></div>
      
      <motion.div 
        className="container max-w-5xl mx-auto px-4 pt-10 sm:pt-12 md:pt-16 lg:pt-24 text-center md:text-left relative z-10 
                  flex flex-col md:flex-row items-center justify-between"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="md:max-w-[60%]">
          {/* Highlight badge */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
            <span className="inline-flex items-center bg-slate-800 px-2 sm:px-3 py-1 rounded-full text-xs font-medium
              text-white tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5"></span>
              SUSTAINABLE INVESTING
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-800 leading-tight mb-4 sm:mb-6"
          >
            Invest in a <span className="relative">
              brighter future
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-slate-600"></span>
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-slate-600 mx-auto md:mx-0 mb-8 sm:mb-10 leading-relaxed"
          >
            Join a community of investors dedicated to making positive change through sustainable and impactful investment opportunities.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start"
          >
            <Button 
              className="bg-slate-900 text-white font-medium px-6 sm:px-8 py-5 sm:py-6 rounded-lg text-base sm:text-lg
                shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)]
                hover:bg-slate-800 transition-all duration-300 ease-out hover:translate-y-[-2px)] w-full sm:w-auto"
              asChild
            >
              <Link href="/auth/signup">Get Started</Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-800 
                font-medium px-6 sm:px-8 py-5 sm:py-6 rounded-lg text-base sm:text-lg mt-3 sm:mt-0
                shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)]
                transition-all duration-300 ease-out hover:translate-y-[-2px] hover:border-slate-300 w-full sm:w-auto"
              asChild
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </motion.div>
        </div>
        
        {/* Dollar Coins Image - mobile optimized */}
        <motion.div 
          variants={itemVariants}
          className="mt-10 sm:mt-12 md:mt-0 md:ml-8 flex-shrink-0 w-[220px] sm:w-[280px]"
        >
          <Image
            src="/rocket.png"
            alt="Stack of dollar coins"
            width={280}
            height={280}
            className="drop-shadow-2xl w-full h-auto"
          />
        </motion.div>
      </motion.div>
    </div>
  )
} 