"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import React from "react"

// Card component using Green Apple styling
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
        "group relative overflow-hidden rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.1)] p-6 flex flex-col h-full",
        className
      )}
      style={{
        backgroundImage: "linear-gradient(to right top, rgba(255,255,255,0.95), rgba(255,255,255,0.85))",
        ...style
      }}
    >
      {/* Subtle texture pattern for depth */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 20px 20px, black 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} 
      />
      
      {/* Top edge highlight for definition */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/40 via-white/60 to-white/40"></div>
      
      {/* Inner shadow effects for depth */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"></div>
      
      {/* Card content */}
      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
} 