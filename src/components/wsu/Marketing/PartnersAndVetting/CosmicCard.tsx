"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import React from "react"

// Enhanced cosmic card component with interactive elements
export function CosmicCard({ 
  children, 
  className,
  style 
}: { 
  children: React.ReactNode; 
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0.8, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-purple-500/15 bg-black/90 p-6 shadow-[0_0_20px_rgba(139,92,246,0.1)] hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] transition-all duration-700",
        className
      )}
      style={style}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        {/* Cosmic accent elements with improved glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/15 transition-all duration-1000"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/15 transition-all duration-1000"></div>
        
        {/* Enhanced edge glow with better contrast */}
        <div className="absolute inset-0 rounded-xl border border-purple-500/20 shadow-[inset_0_0_20px_rgba(139,92,246,0.15)] group-hover:shadow-[inset_0_0_25px_rgba(139,92,246,0.25)] transition-all duration-700"></div>
        
        {/* Dynamic top edge highlight */}
        <div className="absolute top-0 left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent group-hover:via-purple-400/60 transition-all duration-700"></div>
        
        {/* Card hover glow effect with particle simulation */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-b from-purple-500/10 via-transparent to-teal-500/10"></div>
        
        {/* Cosmic particles only visible on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-1000">
          <div className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-purple-300 animate-pulse-glow"></div>
          <div className="absolute top-3/4 left-1/4 w-1 h-1 rounded-full bg-teal-300 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-0.5 h-0.5 rounded-full bg-purple-200 animate-pulse-glow" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/3 left-2/3 w-0.5 h-0.5 rounded-full bg-teal-200 animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        {/* Solid background with subtle hover transition */}
        <div className="absolute inset-0 bg-black/85 group-hover:bg-black/80 transition-colors duration-700"></div>
      </div>
      
      {/* Card content with subtle hover transition */}
      <div className="relative z-20 transition-transform duration-700 group-hover:translate-y-[-2px]">
        {children}
      </div>
    </motion.div>
  );
} 