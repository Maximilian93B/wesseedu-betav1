"use client"

import { motion } from "framer-motion"
import { CosmicCard } from "./CosmicCard"
import { VettingStep } from "./types"

// Modern simplified vetting card with clean design
export function VettingCard({ step, index }: { step: VettingStep; index: number }) {
  return (
    <CosmicCard 
      className="h-full"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col space-y-4">
        {/* Icon section with improved gradient styling */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full 
            bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 
            text-purple-400 ring-1 ring-purple-500/20 shadow-md relative">
          {/* Subtle backdrop glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/10 via-transparent to-teal-500/10 opacity-40"></div>
          
          <motion.div
            whileHover={{ rotate: 5 }}
            transition={{ duration: 0.2 }}
            className="relative z-10"
          >
            {step.icon}
          </motion.div>
        </div>
        
        {/* Content section with enhanced typography */}
        <div>
          <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-teal-400 transition-all duration-300">
            {index + 1}. {step.title}
          </h3>
          <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
            {step.description}
          </p>
        </div>
      </div>
    </CosmicCard>
  );
} 