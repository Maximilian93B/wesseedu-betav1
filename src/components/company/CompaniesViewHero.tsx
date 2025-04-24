"use client"

import { useState, useEffect } from "react"
import { Zap, Globe, BarChart3, Users, CheckCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      duration: 0.5
    }
  }
}

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
}

export function CompaniesViewHero() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-full overflow-hidden mb-16 rounded-xl sm:rounded-2xl border-4 border-white bg-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-shadow duration-500 mt-8"
    >
      {/* Background subtle pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-green-50 via-transparent to-transparent opacity-70"></div>
      
      {/* Green accent bar */}
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#70f570] to-[#49c628]"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16 sm:px-10 sm:py-20">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          {/* Text content - Left side */}
          <div className="lg:max-w-[50%] text-left">
            <motion.div variants={itemVariants} className="mb-5">
              <span className="text-green-700 text-sm tracking-wide font-medium px-4 py-1.5 rounded-full border border-green-200 shadow-[0_2px_10px_rgba(0,0,0,0.1)] bg-green-50 font-helvetica inline-flex items-center">
                <Zap className="h-4 w-4 text-green-700 mr-2" />
                Sustainable Investing
              </span>
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-600 leading-tight"
            >
              Money Grows Greener Here
            </motion.h1>
            
            <motion.h2 
              variants={itemVariants} 
              className="mt-5 text-green-700 text-lg sm:text-xl md:text-2xl leading-relaxed font-medium"
            >
              Connect with innovative sustainable companies making real-world impact
              while generating competitive financial returns.
            </motion.h2>
            
            <motion.div variants={itemVariants} className="mt-8">
              <button 
                className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold px-6 py-3 text-sm font-helvetica shadow-md hover:shadow-lg transition-all duration-300 rounded-lg flex items-center"
              >
                <span className="mr-2">Explore Companies</span>
                <ArrowRight className="h-4 w-4 inline" />
              </button>
            </motion.div>
          </div>
          
          {/* Image - Right side */}
          <motion.div 
            variants={itemVariants}
            className="hidden md:block md:w-[50%] mt-4 md:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -8, 0]
            }}
            transition={{ 
              duration: 0.6,
              y: {
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          >
            <div className="relative max-w-md mx-auto">
              {/* Shadow effect */}
              <div className="absolute -bottom-12 w-[85%] h-16 mx-auto left-0 right-0 
                             bg-slate-900/20 blur-xl rounded-full"></div>
              
              {/* The image */}
              <Image
                src="/financial-target.png" 
                alt="Sustainable World"
                width={420}
                height={420}
                className="drop-shadow-2xl transform hover:rotate-3 transition-all duration-700"
                priority
              />
            </div>
          </motion.div>
        </div>
        
        {/* Stats bar */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 p-6 bg-white rounded-xl shadow-md border border-green-100"
        >
          <div className="grid grid-cols-4 gap-6 md:gap-10">
            {[
              { 
                label: "Verified Companies", 
                value: "200+", 
              },
              { 
                label: "Average Return", 
                value: "24%", 
              },
              { 
                label: "Active Investors", 
                value: "30K+", 
              },
              { 
                label: "Sustainable Impact", 
                value: "High", 
              }
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <p className="text-green-700 font-extrabold text-2xl font-helvetica">{stat.value}</p>
                <p className="text-green-600 text-sm font-body mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 