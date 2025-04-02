"use client"

import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Animation variants for subtle entry animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
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

export function SustainableImpactSection() {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="relative z-10"
    >
      <div className="flex flex-col lg:flex-row min-h-[80vh] mx-auto max-w-screen-2xl">
        {/* Left content - Text */}
        <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-8 lg:p-10 xl:p-12">
          {/* Subtle accent line */}
          <motion.div variants={itemVariants} className="w-20 h-1 bg-gradient-to-r from-white to-transparent rounded-full mb-6"></motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Your Money <span className="relative">
              <span className="relative z-10">Changes</span>
              <span className="absolute bottom-1 left-0 w-full h-[6px] bg-gradient-to-r from-[#70f570]/70 to-[#49c628]/50 rounded-full"></span>
            </span>
            <br /> 
            Tomorrow
          </motion.h2>
          
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-white text-lg leading-relaxed mb-4">
              In today's rapidly changing world, where climate challenges and social inequities persist, WeSeedU offers a revolutionary approach to financial investment. We've reimagined what it means to grow your wealth—creating a platform where financial returns and positive global impact aren't competing goals, but complementary outcomes of thoughtful investing.
            </p>
            
            <p className="text-white text-lg leading-relaxed">
              Through our carefully curated portfolio of sustainable projects, we direct capital toward innovative solutions addressing our planet's most pressing challenges. From renewable energy infrastructure and conservation initiatives to community development programs, every investment you make contributes to measurable, transparent change that benefits both current and future generations.
            </p>
          </motion.div>
      
          <motion.div variants={itemVariants} className="mt-auto">
            <Button
              asChild
              size="lg"
              className="bg-white hover:bg-slate-50 text-green-700 shadow-md hover:shadow-lg 
                transition-all duration-300 ease-out hover:translate-y-[-2px] rounded-lg w-full 
                sm:w-auto px-6 py-5"
            >
              <Link href="/sustainable-investments">
                <span className="flex items-center text-base font-medium">
                  Learn more about our impact
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </Button>
          </motion.div>
        </div>
        
        {/* Right content - Image (repositioned) */}
        <motion.div 
          variants={itemVariants}
          className="w-full lg:w-1/2 h-[400px] md:h-[500px] lg:h-auto flex items-center justify-center p-4 lg:p-8"
        >
          <div className="h-full w-full relative overflow-hidden shadow-lg rounded-lg">
            {/* Main image */}
            <Image
              src="/pexels-artempodrez-6990448.jpg" 
              alt="Sustainable Earth"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            
            {/* Overlay gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent mix-blend-overlay"></div>
            
            {/* Left side gradient for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-800/50 to-transparent w-1/3 lg:block hidden"></div>
            
            {/* Bottom content accent */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-900/90 via-green-900/50 to-transparent h-36 flex items-end p-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg mr-4">
                  <span className="text-green-700 font-bold text-lg">W</span>
                </div>
                <div>
                  <div className="text-white/90 text-sm font-medium">Environmental Impact Score</div>
                  <div className="text-white font-bold text-2xl tracking-tight">94.7%</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
