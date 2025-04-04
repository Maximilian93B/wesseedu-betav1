"use client"

import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, TrendingUp, BookMarked, ArrowUpRight, Clock } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Animation variants
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
    <div className="relative min-h-[800px] w-full">
      {/* Split background that stretches full height and width */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-white"></div>
        <div 
          className="absolute top-0 right-0 w-1/2 h-full" 
          style={{ 
            background: 'linear-gradient(115deg, #70f570, #49c628)'
          }}
        ></div>
      </div>
      
      {/* Divider line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-white/0 via-white/40 to-white/0"></div>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="relative z-10 py-16 md:py-24 w-full"
      >
        <div className="w-full mx-auto">
          {/* Side labels */}
          <motion.div 
            variants={itemVariants} 
            className="hidden md:block absolute left-[5%] top-[15rem] transform -rotate-90 origin-center"
          >
            <span className="text-slate-400 tracking-widest text-sm font-medium uppercase">Root Preview</span>
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            className="hidden md:block absolute right-[5%] top-[15rem] transform rotate-90 origin-center"
          >
            <span className="text-white/70 tracking-widest text-sm font-medium uppercase"> Thrive Content</span>
          </motion.div>

          {/* Marketing Header - split color text effect */}
          <motion.div 
            variants={itemVariants} 
            className="relative mx-auto mb-16 max-w-5xl z-20 px-8 sm:px-12 py-10 text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent" 
                style={{ 
                  backgroundImage: 'linear-gradient(90deg, #49c628 45%, #ffffff 55%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
              Sustainable Investing Insights
            </h2>
            <p className="text-lg max-w-2xl text-bold mx-auto bg-clip-text text-transparent" 
               style={{ 
                 backgroundImage: 'linear-gradient(90deg, rgba(73, 198, 40, 0.9) 45%, rgb(255, 255, 255) 55%, rgb(255, 255, 255) 100%)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 backgroundClip: 'text'
               }}>
              Get exclusive access to expert analysis, market trends, and investment opportunities when you join WeSeedU.
            </p>
          </motion.div>

          {/* Content Grid with precise alignment - full width layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Center dot indicator */}
     
            
            {/* Left side: Article Previews */}
            <motion.div variants={itemVariants} className="space-y-6 pr-0 md:pr-10 pt-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg md:text-xl font-bold text-slate-800">Latest Articles</h3>
                <span className="text-xs text-slate-500 px-2 py-1 bg-slate-100 rounded-md whitespace-nowrap">Free Preview</span>
              </div>
              
              {/* Featured Article Preview */}
              <div className="bg-white rounded-lg overflow-hidden border border-slate-200 group hover:shadow-md transition-shadow duration-300">
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <div className="absolute top-3 left-3 z-20">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-white bg-green-600">
                      FEATURED
                    </span>
                  </div>
                  <Image 
                    src="/pexels-artempodrez-6990448.jpg"
                    alt="Sustainable investment impact"
                    width={800}
                    height={600}
                    className="object-cover object-center h-full w-full group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 line-clamp-1">Your Money Changes Tomorrow</h3>
                  <p className="text-slate-600 mb-4 text-sm line-clamp-2">
                    In today's rapidly changing world, where climate challenges and social inequities persist, WeSeedU offers a revolutionary approach to financial investment...
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-slate-500">
                      <Clock size={14} className="mr-1 flex-shrink-0" />
                      <span>5 min read</span>
                    </div>
                    <span className="text-sm font-medium text-slate-400 whitespace-nowrap">Preview Available</span>
                  </div>
                </div>
              </div>

              {/* More Articles Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Article Preview 1 */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200 hover:shadow transition-shadow h-full flex flex-col">
                  <div className="relative h-32 sm:h-36 overflow-hidden flex-shrink-0">
                    <Image 
                      src="/images/pexels-pavel-danilyuk-8438975.jpg"
                      alt="Investment trends"
                      width={400}
                      height={250}
                      className="object-cover h-full w-full"
                    />
                    <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1 rounded-md">
                      <ArrowUpRight size={14} className="text-green-700" />
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h4 className="font-bold text-base mb-1 line-clamp-1">2024 Sustainable Investment Trends</h4>
                    <p className="text-slate-600 text-xs mb-2 line-clamp-2 flex-grow">Discover the latest trends shaping the future of sustainable finance...</p>
                    <div className="flex items-center text-xs text-slate-400 mt-auto">
                      <TrendingUp size={12} className="mr-1 flex-shrink-0" />
                      <span>Market Analysis</span>
                    </div>
                  </div>
                </div>

                {/* Article Preview 2 */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200 hover:shadow transition-shadow h-full flex flex-col">
                  <div className="relative h-32 sm:h-36 overflow-hidden flex-shrink-0">
                    <Image 
                      src="/images/pexels-googledeepmind-17485678.jpg"
                      alt="ESG Metrics"
                      width={400}
                      height={250}
                      className="object-cover h-full w-full"
                    />
                    <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1 rounded-md">
                      <ArrowUpRight size={14} className="text-green-700" />
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h4 className="font-bold text-base mb-1 line-clamp-1">Understanding ESG Metrics</h4>
                    <p className="text-slate-600 text-xs mb-2 line-clamp-2 flex-grow">How environmental, social, and governance factors are measured...</p>
                    <div className="flex items-center text-xs text-slate-400 mt-auto">
                      <BookMarked size={12} className="mr-1 flex-shrink-0" />
                      <span>Investment Guide</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side: Member Content */}
            <motion.div variants={itemVariants} className="pl-0 md:pl-10 pt-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-extrabold text-white tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">Member Library</h3>
                <span className="text-xs font-bold text-white px-3 py-1.5 bg-white/15 rounded-md border border-white/30 whitespace-nowrap shadow-sm">
                  Thrive Content
                </span>
              </div>
               
              {/* Premium Content Card */}
              <div className="rounded-xl p-5 sm:p-7 shadow-lg border border-white/25 relative overflow-hidden h-full bg-white/10 backdrop-blur-sm">
                {/* Book icon */}
                <div className="mb-7 flex items-center">
                  <div className="bg-white/20 inline-flex rounded-full p-3 mr-4 shadow-inner border border-white/10">
                    <BookOpen className="h-6 w-6 text-white filter drop-shadow-sm" />
                  </div>
                </div>
                
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] mb-4 break-words">Unlock Premium Content</h3>
                <p className="text-white font-medium mb-8 text-sm sm:text-base leading-relaxed">
                  Join WeSeedU today to access our complete library of sustainable investing articles, market analysis, and exclusive research.
                </p>

                <div className="mb-10">
                  <h4 className="text-white text-lg font-extrabold tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)] mb-5">Member Benefits:</h4>
                  <ul className="space-y-4.5">
                    <li className="flex items-start">
                      <div className="mr-2.5 mt-0.5 text-white flex-shrink-0 font-bold">•</div>
                      <span className="text-sm sm:text-base font-medium text-white leading-tight">Exclusive investment insights and analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2.5 mt-0.5 text-white flex-shrink-0 font-bold">•</div>
                      <span className="text-sm sm:text-base font-medium text-white leading-tight">Weekly market trends and opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2.5 mt-0.5 text-white flex-shrink-0 font-bold">•</div>
                      <span className="text-sm sm:text-base font-medium text-white leading-tight">Portfolio impact tracking and reports</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <Button
                    asChild
                    className="text-white font-bold shadow-[0_4px_14px_rgba(0,0,0,0.15)]
                      hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out 
                      hover:translate-y-[-3px] rounded-lg px-4 sm:px-6 py-4 sm:py-5 w-full border border-white/10"
                    style={{ background: 'linear-gradient(to right, #00b4db, #0083b0)' }}
                  >
                    <Link href="/auth/signup">
                      <span className="flex items-center text-sm sm:text-base font-bold justify-center tracking-wide">
                        Join WeSeedU
                        <ArrowRight className="ml-2.5 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 