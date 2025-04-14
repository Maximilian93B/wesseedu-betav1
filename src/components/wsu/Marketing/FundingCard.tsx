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
            {/* White solid background replacing gradient */}
            <div className="absolute inset-0 bg-white"></div>
            
            {/* Subtle pattern overlay for texture */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 30px 30px, #000 1px, transparent 1px)`,
                backgroundSize: "50px 50px"
              }}
            ></div>
          </div>
          
          {/* Static glass effect - reduced for white background */}
          <div className="absolute inset-0 backdrop-blur-sm"></div>
          
          {/* Static borders and accents */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none border border-gray-200"></div>
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
      <div className="relative z-10 h-full p-6 sm:p-7 md:p-8 rounded-2xl flex flex-col">
        {/* Card header with icon - fixed height */}
        <div className="flex items-start gap-4 mb-5 sm:mb-6">
          {/* Icon container - fixed size */}
          <div className="flex-shrink-0 relative">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden flex items-center justify-center">
              {/* Solid background instead of semi-transparent gradient */}
              <div className="absolute inset-0 bg-blue-500"></div>
              
              {/* Icon - changed to white for contrast with blue background */}
              <div className="relative z-10 text-white text-xl sm:text-2xl flex items-center justify-center">
                {icon}
              </div>
              
              {/* Icon glow - only shown on hover */}
              {hovered && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8, transition: { duration: 0.4 } }}
                  className="absolute -inset-2 bg-blue-400/30 rounded-full blur-xl"
                ></motion.div>
              )}
            </div>
          </div>
          
          {/* Text content with truncation */}
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 line-clamp-2">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-700 line-clamp-3">
              {description}
            </p>
          </div>
        </div>
        
        {/* Quote panel with fixed height */}
        <div className="mt-2 mb-auto flex-grow">
          <div className="relative py-4 px-4 sm:px-5 rounded-lg bg-gray-50 shadow-sm min-h-[90px] flex flex-col justify-center">
            <div className={`absolute left-0 top-4 bottom-4 w-1 sm:w-1.5 bg-gradient-to-b ${accentColor} opacity-60`}></div>
            
            {/* Quote icon */}
            <div className="absolute -top-2 -left-1 text-gray-300 text-3xl sm:text-4xl font-serif">❝</div>
            
            <p className="text-sm font-medium text-black italic pl-3 line-clamp-3">{highlight}</p>
            
            {/* Light reflection - only on hover */}
            {hovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7, transition: { duration: 0.4 } }}
                className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-lg"
              ></motion.div>
            )}
          </div>
        </div>
        
        {/* Footer with improved spacing and alignment */}
        <div className="mt-5 sm:mt-6 flex items-center justify-between">
          {/* Amount badge */}
          <div className="relative overflow-hidden rounded-full">
            <div className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full relative">
              <div className="absolute inset-0 bg-gray-100"></div>
              
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
              
              <span className="relative z-10 text-sm sm:text-base font-bold text-black">{amount}</span>
            </div>
            
            {/* Badge outer glow - only on hover */}
            {hovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7, transition: { duration: 0.4 } }}
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
                <div className={`px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r ${accentColor} text-white text-xs sm:text-sm font-medium rounded-full flex items-center gap-1.5 sm:gap-2 shadow-md`}>
                  <span>Learn More</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
} 