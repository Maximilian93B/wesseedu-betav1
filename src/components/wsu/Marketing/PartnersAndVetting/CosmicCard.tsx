"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import React from "react"

// Simplified cosmic card component with a cleaner, more modern design
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
      initial={{ opacity: 0.9, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-purple-500/10 bg-gradient-to-bl from-slate-900/95 via-slate-900/95 to-slate-800/95 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full",
        className
      )}
      style={style}
    >
      {/* Enhanced background with subtle gradient */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        {/* Multi-layered background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-teal-500/5 opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
        
        {/* Subtle mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/5 via-transparent to-teal-900/5 opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
        
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-b from-purple-500/10 via-transparent to-teal-500/10"></div>
        
        {/* Subtle top highlight */}
        <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent group-hover:via-purple-400/40 transition-all duration-300"></div>
        
        {/* Subtle left border highlight for horizontal layout */}
        <div className="absolute left-0 top-[10%] bottom-[10%] w-[1px] bg-gradient-to-b from-transparent via-teal-400/30 to-transparent group-hover:via-teal-400/40 transition-all duration-300"></div>
      </div>
      
      {/* Card content */}
      <div className="relative z-20 flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
} 