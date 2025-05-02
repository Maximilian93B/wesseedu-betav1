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
      className="relative w-full overflow-hidden mb-16 mt-8"
    >
      {/* Green accent bar */}
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#70f570] to-[#49c628]"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16 sm:px-10 sm:py-24">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          {/* Text content - Left side */}
          <div className="lg:max-w-[45%] text-left">
            <motion.div variants={itemVariants} className="mb-6">
              <span className="text-white text-sm tracking-wide font-medium px-4 py-1.5 rounded-full border border-green-200/30 shadow-[0_2px_10px_rgba(0,0,0,0.1)] bg-green-800/20 font-helvetica inline-flex items-center">
                <Zap className="h-4 w-4 text-white mr-2" />
                Sustainable Investing
              </span>
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
            >
              Money Grows Greener Here
            </motion.h1>
            
            <motion.h2 
              variants={itemVariants} 
              className="mt-6 text-white text-lg sm:text-xl md:text-2xl leading-relaxed font-medium"
            >
              Connect with innovative sustainable companies making real-world impact
              while generating competitive financial returns.
            </motion.h2>
            
            <motion.div variants={itemVariants} className="mt-10">
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
            className="hidden md:block md:w-[55%] mt-4 md:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative max-w-xl mx-auto p-4">
              {/* Enhanced shadow effect */}
              <div className="absolute -bottom-12 w-[90%] h-16 mx-auto left-0 right-0 
                             bg-slate-900/30 blur-2xl rounded-full"></div>
              
              {/* Beautiful white container for the image */}
              <div className="bg-white rounded-2xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.12)] 
                           border-4 border-white overflow-hidden relative">
           
                {/* The image */}
                <Image
                  src="/businessman-investing-in-stock-market.png" 
                  alt="Sustainable World"
                  width={960}
                  height={960}
                  className="drop-shadow-xl transition-all duration-700"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Stats bar - floating glass effect */}
        <motion.div 
          variants={itemVariants}
          className="relative mt-16 mx-auto max-w-6xl backdrop-blur-sm 
                    shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/20 p-6 rounded-2xl
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-50/10 
                    before:to-transparent before:rounded-2xl before:z-[-1]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {[
              { 
                label: "Verified Companies", 
                value: "200+", 
                icon: <CheckCircle className="h-5 w-5 text-white mb-2" />
              },
              { 
                label: "Average Return", 
                value: "24%", 
                icon: <BarChart3 className="h-5 w-5 text-white mb-2" />
              },
              { 
                label: "Active Investors", 
                value: "30K+", 
                icon: <Users className="h-5 w-5 text-white mb-2" />
              },
              { 
                label: "Sustainable Impact", 
                value: "High", 
                icon: <Globe className="h-5 w-5 text-white mb-2" />
              }
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center p-2 hover:bg-white/10 transition-colors duration-300 rounded-xl">
                {stat.icon}
                <p className="text-white font-extrabold text-2xl font-helvetica">{stat.value}</p>
                <p className="text-white/80 text-sm font-body mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 