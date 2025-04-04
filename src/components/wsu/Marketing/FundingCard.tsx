"use client"

import { ReactNode, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

// Card container animation only - content remains fixed
export const cardVariants = {
  initial: { 
    y: 0,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
  },
  hover: {
    y: -12,
    scale: 1.04,
    rotateX: "3deg",
    rotateY: "-3deg",
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 15,
    }
  },
  tap: {
    scale: 0.98,
    rotateX: "0deg",
    rotateY: "0deg",
    transition: { duration: 0.15 }
  }
}

// Simple fade-in for initial appear only
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4 }
  }
}

interface FundingCardProps {
  title: string;
  description: string;
  amount: string;
  icon: ReactNode;
  highlight: string;
  index: number;
  isInView: boolean;
  backgroundColor?: string;
  accentColor?: string;
}

export function FundingCard({ 
  title, 
  description, 
  amount, 
  icon, 
  highlight, 
  index, 
  isInView,
  backgroundColor = "from-cyan-500/15 via-blue-500/10 to-blue-600/15",
  accentColor = "from-cyan-400 via-blue-500 to-indigo-500"
}: FundingCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative h-full">
      {/* Outer container with appearance animation */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: index * 0.1 }}
        className="absolute inset-0"
      >
        {/* Inner container with hover animation */}
        <motion.div
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          variants={cardVariants}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className={cn(
            "absolute inset-0 rounded-2xl overflow-hidden cursor-pointer transform-gpu perspective-1000",
            "flex flex-col shadow-lg isolate"
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Static background */}
          <div className="absolute inset-0 z-0">
            <div className={`absolute inset-0 bg-gradient-to-br ${backgroundColor} opacity-90`}></div>
            
            {/* Subtle pattern overlay for texture */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 30px 30px, currentColor 1px, transparent 1px)`,
                backgroundSize: "50px 50px"
              }}
            ></div>
          </div>
          
          {/* Static glass effect */}
          <div className="absolute inset-0 backdrop-blur-xl"></div>
          
          {/* Static borders and accents */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/40"></div>
          <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${accentColor} opacity-70`}></div>
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-400/30 via-blue-500/30 to-indigo-500/30"></div>
          
          {/* Hover-only effects */}
          {hovered && (
            <>
              {/* Gradient overlay - only shown on hover */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6, transition: { duration: 0.3 } }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-tr from-white/50 via-white/30 to-transparent"
              ></motion.div>
              
              {/* Background glow - only shown on hover */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 0.8, 
                  scale: 1.1, 
                  transition: { duration: 0.5 } 
                }}
                className="absolute -inset-[100px] bg-gradient-to-br from-blue-400/20 via-cyan-300/20 to-indigo-400/20 blur-3xl"
              ></motion.div>
              
              {/* Enhanced border - only on hover */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3 } }}
                className="absolute inset-0 rounded-2xl pointer-events-none border border-white/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6),0_0_0_1px_rgba(255,255,255,0.3)]"
              ></motion.div>
              
              {/* Enhanced shadows - only on hover */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3 } }}
                className="absolute inset-0 rounded-2xl pointer-events-none shadow-[0_25px_50px_rgba(0,0,0,0.15),0_20px_30px_rgba(59,130,246,0.15),0_0_50px_rgba(59,130,246,0.08)]"
              ></motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
          
      {/* Content container - fixed position, doesn't animate */}
      <div className="relative z-10 h-full p-8 rounded-2xl">
        {/* Card header with icon */}
        <div className="flex items-start space-x-5 mb-6">
          {/* Icon container */}
          <div className="flex-shrink-0 relative">
            <div className="relative p-3.5 rounded-xl overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-15 backdrop-blur-md`}></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/50 via-white/30 to-transparent opacity-50"></div>
              
              {/* Icon */}
              <div className="relative z-10 text-white text-2xl">
                {icon}
              </div>
              
              {/* Icon glow - only shown on hover */}
              {hovered && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 0.8,
                    transition: { duration: 0.4 } 
                  }}
                  className="absolute -inset-2 bg-blue-400/30 rounded-full blur-xl"
                ></motion.div>
              )}
            </div>
          </div>
          
          {/* Text content */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2.5">
              {title}
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        
        {/* Quote panel */}
        <div className="mt-3 mb-auto">
          <div className="relative py-4 px-5 rounded-lg bg-gradient-to-br from-blue-50/20 to-white/10 backdrop-blur-sm">
            <div className={`absolute left-0 top-4 bottom-4 w-1.5 bg-gradient-to-b ${accentColor} opacity-60`}></div>
            
            {/* Quote icon */}
            <div className="absolute -top-2 -left-1 text-white/30 text-4xl font-serif">❝</div>
            
            <p className="text-sm font-medium text-white italic pl-3">{highlight}</p>
            
            {/* Light reflection - only on hover */}
            {hovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 0.7,
                  transition: { duration: 0.4 } 
                }}
                className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-lg"
              ></motion.div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-7 flex items-center justify-between">
          {/* Amount badge */}
          <div className="relative overflow-hidden rounded-full">
            <div className="px-5 py-2 rounded-full relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${accentColor} opacity-15 backdrop-blur-sm`}></div>
              
              {/* Badge glow - only on hover */}
              {hovered && (
                <motion.div 
                  initial={{ opacity: 0, x: "-100%" }}
                  animate={{ 
                    opacity: 1, 
                    x: "100%", 
                    transition: { duration: 1.5, repeat: Infinity, ease: "linear" } 
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-white/50 to-white/30"
                ></motion.div>
              )}
              
              <span className="relative z-10 text-base font-bold text-white">{amount}</span>
            </div>
            
            {/* Badge outer glow - only on hover */}
            {hovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 0.7,
                  transition: { duration: 0.4 } 
                }}
                className="absolute -inset-1 bg-blue-400/20 rounded-full blur-lg"
              ></motion.div>
            )}
          </div>
          
          {/* Learn more button - only on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
              >
                <div className={`px-4 py-2 bg-gradient-to-r ${accentColor} text-white text-sm font-medium rounded-full flex items-center space-x-2 shadow-md`}>
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
} 