"use client"

import { motion } from "framer-motion"
import { CosmicCard } from "./CosmicCard"
import { VettingStep } from "./types"

// Enhanced vetting card with improved animations
export function VettingCard({ step, index }: { step: VettingStep; index: number }) {
  return (
    <CosmicCard 
      className="h-full"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-teal-500/20 text-teal-400 shadow-[0_0_10px_rgba(139,92,246,0.2)] group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-700">
        <motion.div
          initial={{ rotate: -5 }}
          whileHover={{ rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          {step.icon}
        </motion.div>
      </div>
      <h3 className="mb-2 text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-teal-400 transition-all duration-300">
        {index + 1}. {step.title}
      </h3>
      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{step.description}</p>
    </CosmicCard>
  );
} 