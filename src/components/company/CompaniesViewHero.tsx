"use client"

import { useState, useEffect } from "react"
import { Zap, Globe, BarChart3, Users, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export function CompaniesViewHero() {
  // Floating animation for the image
  const [animationOffset, setAnimationOffset] = useState(0);
  
  // Create a gentle floating effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationOffset(prev => Math.sin(Date.now() / 1000) * 10);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative w-full overflow-hidden mb-16 rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]
      hover:shadow-[0_10px_30px_rgb(0,0,0,0.06)] transition-shadow duration-500 mt-8"
      style={{ 
        backgroundImage: "linear-gradient(to right top, #ffffff, #f6f6ff, #eaefff, #dae8ff, #c8e2ff)" 
      }}
    >
      {/* Subtle texture pattern for depth */}
      <div className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 20px 20px, black 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} 
      />
      
      {/* Top edge shadow line for definition */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30"></div>
      
      {/* Inner shadow effects for depth */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text content - Left side */}
          <div className="lg:max-w-[55%] text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center gap-2 px-5 py-2 mb-8 rounded-full bg-slate-50 border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <Zap className="h-4 w-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">
                  Discover Sustainable Investments
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="text-slate-800">
                  Sustainable
                </span>
                <br />
                <span className="text-slate-700">
                  Investment
                </span>
                <br />
                <span className="text-slate-700">
                  Marketplace
                </span>
              </h1>
              
              <div className="max-w-2xl mx-auto lg:mx-0 mt-8">
                <p className="text-xl text-slate-600 leading-relaxed">
                  Connect with innovative sustainable companies making real-world impact while generating competitive financial returns.
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Image - Right side */}
          <motion.div 
            className="relative flex-shrink-0 mt-4 lg:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              y: animationOffset,
            }}
          >
            {/* Blob shadow */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[220px] h-[40px] bg-slate-900/10 rounded-full blur-xl"></div>
            
            {/* Image */}
            <div className="relative">
              <Image
                src="/sustainability.png" 
                alt="Sustainable World"
                width={320}
                height={320}
                className="drop-shadow-2xl"
              />
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-green-400/10 filter blur-2xl"></div>
            </div>
          </motion.div>
        </div>
        
        {/* Stats bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-slate-200/70"
        >
          {[
            { 
              label: "Verified Companies", 
              value: "200+", 
              icon: <CheckCircle className="h-5 w-5 text-slate-600" />,
              iconBg: "bg-green-50"
            },
            { 
              label: "Average Return", 
              value: "24%", 
              icon: <BarChart3 className="h-5 w-5 text-slate-600" />,
              iconBg: "bg-blue-50"
            },
            { 
              label: "Active Investors", 
              value: "30K+", 
              icon: <Users className="h-5 w-5 text-slate-600" />,
              iconBg: "bg-purple-50"
            },
            { 
              label: "Sustainable Impact", 
              value: "High", 
              icon: <Globe className="h-5 w-5 text-slate-600" />,
              iconBg: "bg-amber-50"
            }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
              className="flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-full ${stat.iconBg} flex items-center justify-center border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]`}>
                {stat.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
                <span className="text-sm text-slate-500">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Bottom shadow effect */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50/50 to-transparent"></div>
    </div>
  );
} 