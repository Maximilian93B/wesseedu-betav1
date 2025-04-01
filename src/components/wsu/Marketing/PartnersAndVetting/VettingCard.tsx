"use client"

import { motion } from "framer-motion"
import { VettingStep } from "./types"

// Vetting card component using Green Apple styling
export function VettingCard({ step, index }: { step: VettingStep; index: number }) {
  return (
    <div className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-xl p-5 border border-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300 h-full">
      <div className="flex flex-col">
        {/* Number and icon */}
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0 mr-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
              {index + 1}
            </div>
          </div>
          
          <div className="text-green-600 mt-1">
            {step.icon}
          </div>
        </div>
        
        {/* Content */}
        <div>
          <h3 className="text-green-800 font-medium mb-2">
            {step.title}
          </h3>
          
          <p className="text-sm text-green-700/80">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
} 