"use client"

import { motion } from "framer-motion"
import { PartnerCard } from "./PartnerCard"
import { PARTNERS } from "./data"

// Modern simplified partners showcase with horizontal card alignment
export function PartnersShowcase({ isMobile }: { isMobile: boolean }) {
  // For desktop, create a clean horizontal layout
  if (!isMobile) {
    return (
      <div className="relative w-full py-8">
        {/* Enhanced background gradient */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-purple-500/5 to-teal-500/5 opacity-40 blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.5, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        
        {/* Position cards in a horizontal row with improved spacing */}
        <div className="flex justify-center">
          <div className="relative flex flex-row justify-between w-full gap-6">
            {PARTNERS.map((partner, index) => (
              <motion.div 
                key={partner.name || index}
                className="w-[240px] transition-all duration-300 hover:z-50"
                style={{ zIndex: 10 - index }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
              >
                <PartnerCard 
                  partner={partner} 
                  index={0} // All cards same size in horizontal layout
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // For mobile, stacked layout with improved spacing
  return (
    <div className="space-y-6">
      {PARTNERS.map((partner, index) => (
        <motion.div
          key={partner.name || index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <PartnerCard 
            partner={partner} 
            index={0} // All cards same size on mobile
          />
        </motion.div>
      ))}
    </div>
  );
} 