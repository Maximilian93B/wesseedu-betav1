"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, TrendingUp, BookMarked, ArrowUpRight, Clock, Star, CheckCircle, Users, LineChart } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Animation variants with mobile optimizations
function useAnimationVariants() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return {
    containerVariants: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          staggerChildren: isMobile ? 0.1 : 0.15,
          duration: isMobile ? 0.4 : 0.6
        }
      }
    },
    itemVariants: {
      hidden: { y: 15, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: { 
          type: "spring", 
          stiffness: isMobile ? 150 : 200, 
          damping: isMobile ? 25 : 22 
        }
      }
    },
    isMobile
  };
}

export function SustainableImpactSection() {
  const { containerVariants, itemVariants, isMobile } = useAnimationVariants();

  return (
    <section 
      className="relative w-full bg-transparent my-4 sm:my-6"
      aria-labelledby="sustainable-impact-heading"
    >
     
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="relative z-10 py-10 sm:py-12 px-4 sm:px-6"
      >
        {/* Side labels - hidden on mobile */}
        <motion.div 
          variants={itemVariants} 
          className="hidden lg:block absolute left-4 top-[10rem] transform -rotate-90 origin-left"
        >
          <span className="text-white/80 tracking-widest text-xs font-medium uppercase">Insights</span>
        </motion.div>
        
        <motion.div 
          variants={itemVariants} 
          className="hidden lg:block absolute right-4 top-[10rem] transform rotate-90 origin-right"
        >
          <span className="text-white/80 tracking-widest text-xs font-medium uppercase">Analysis</span>
        </motion.div>

        {/* Simplified Header */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-12 text-center">
          {/* Top badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center px-3 py-1 bg-blue-600/30 rounded-full border border-blue-400/30 mb-5"
          >
            <LineChart size={14} className="text-blue-200 mr-2" />
            <span className="text-xs font-medium text-blue-100">MARKET INSIGHTS</span>
          </motion.div>
          
          {/* Main heading */}
          <motion.h2 
            variants={itemVariants}
            id="sustainable-impact-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white leading-tight"
          >
            Sustainable Investing Insights
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-base max-w-2xl mx-auto text-white/90 leading-relaxed"
          >
            Get exclusive access to expert analysis, market trends, and investment opportunities when you join WeSeedU.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Left side: Article Previews */}
          <motion.div variants={itemVariants} className="space-y-6">
     
            {/* Featured Article Preview */}
            <div className="bg-white rounded-xl overflow-hidden border border-white/20 group hover:shadow-lg transition-all duration-300">
              <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden">
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full text-white bg-blue-600/90 backdrop-blur-sm">
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
              <div className="p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2.5 line-clamp-1">Your Money Changes Tomorrow</h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-4 line-clamp-2">
                  In today's rapidly changing world, where climate challenges and social inequities persist, WeSeedU offers a revolutionary approach to financial investment...
                </p>
                <div className="flex justify-between items-center pt-1">
                  <div className="flex items-center text-xs text-slate-500">
                    <Clock size={12} className="mr-2 flex-shrink-0" />
                    <span>5 min read</span>
                  </div>
                  <span className="text-xs font-medium text-blue-600 whitespace-nowrap">Preview Available</span>
                </div>
              </div>
            </div>

            {/* More Articles Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Article Previews */}
              {[
                {
                  image: "/images/pexels-pavel-danilyuk-8438975.jpg",
                  title: "2024 Sustainable Investment Trends",
                  desc: "Discover the latest trends shaping the future of sustainable finance...",
                  icon: <TrendingUp size={12} className="mr-2 flex-shrink-0" />,
                  label: "Market Analysis"
                },
                {
                  image: "/images/pexels-googledeepmind-17485678.jpg",
                  title: "Understanding ESG Metrics",
                  desc: "How environmental, social, and governance factors are measured...",
                  icon: <BookMarked size={12} className="mr-2 flex-shrink-0" />,
                  label: "Investment Guide"
                }
              ].map((article, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden border border-white/20 hover:shadow-lg transition-all duration-300 flex flex-col">
                  <div className="relative h-28 sm:h-32 overflow-hidden flex-shrink-0">
                    <Image 
                      src={article.image}
                      alt={article.title}
                      width={400}
                      height={250}
                      className="object-cover h-full w-full"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full">
                      <ArrowUpRight size={12} className="text-blue-700" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-grow">
                    <h4 className="font-bold text-sm sm:text-base mb-2 line-clamp-1">{article.title}</h4>
                    <p className="text-xs text-slate-600 mb-3 line-clamp-2 flex-grow">{article.desc}</p>
                    <div className="flex items-center text-xs text-slate-500 mt-1">
                      {article.icon}
                      <span>{article.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right side: Member Content */}
          <motion.div variants={itemVariants}>
             
            {/* Premium Content Card */}
            <div className="rounded-xl p-6 sm:p-7 shadow-md border border-white/30 relative overflow-hidden bg-gradient-to-br from-blue-600/20 to-blue-800/40 backdrop-blur-md">
              {/* Book icon */}
              <div className="mb-5 sm:mb-6 flex items-center">
                <div className="bg-white/20 inline-flex rounded-full p-2.5 shadow-inner border border-white/20">
                  <BookOpen className="h-5 w-5 text-white filter drop-shadow-sm" />
                </div>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] mb-4 break-words">Unlock Premium Content</h3>
              <p className="text-sm sm:text-base text-white/90 font-medium mb-5 sm:mb-6 leading-relaxed">
                Join WeSeedU today to access our complete library of sustainable investing articles, market analysis, and exclusive research.
              </p>

              <div className="mb-6 sm:mb-7">
                <h4 className="text-base sm:text-lg font-extrabold text-white tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)] mb-4">Member Benefits:</h4>
                <ul className="space-y-3">
                  {/* Benefits list */}
                  {[
                    "Exclusive investment insights and analysis",
                    "Weekly market trends and opportunities",
                    "Portfolio impact tracking and reports",
                    "Sustainable investment community access"
                  ].map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="mr-2.5 mt-0.5 text-blue-300 flex-shrink-0">•</div>
                      <span className="text-sm sm:text-base font-medium text-white leading-tight">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-7">
                <Button
                  asChild
                  className="text-white font-bold shadow-md hover:shadow-lg transition-all duration-300 ease-out 
                    hover:translate-y-[-2px] rounded-lg px-5 py-3.5 sm:py-4 w-full border border-white/20"
                  style={{ background: 'linear-gradient(to right, #00b4db, #0083b0)' }}
                >
                  <Link href="/auth/signup">
                    <span className="flex items-center text-sm sm:text-base font-bold justify-center tracking-wide">
                      Join WeSeedU
                      <ArrowRight className="ml-3 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Link>
                </Button>
              </div>
              
              {/* Social Proof Section - Added to utilize empty space */}
              <div className="pt-4 mt-6 border-t border-white/10">
                <div className="flex flex-col space-y-4">
                  {/* Member stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Users size={16} className="text-blue-300" />
                      <div>
                        <p className="text-white text-sm font-semibold">Members</p>
                        <p className="text-white/70 text-xs">in our investing community</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={14} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Testimonial */}
                  <div className="bg-white/10 rounded-lg p-3.5 border border-white/10">
                    <p className="text-white/90 text-xs italic mb-2 leading-relaxed">
                      "WeSeedU has transformed how I approach sustainable investing. The insights and community have been invaluable to my portfolio growth."
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-white text-xs font-semibold">Maxwell.B</p>
                      <div className="flex items-center text-xs text-blue-300">
                        <CheckCircle size={12} className="mr-1" />
                        <span>Verified Member</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
} 