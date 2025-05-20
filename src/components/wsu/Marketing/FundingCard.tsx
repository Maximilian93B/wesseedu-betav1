"use client"

import { ReactNode, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const cardVariants = {
  initial: { y: 0 },
  hover: {
    y: -8,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } }
}

interface FundingCardProps {
  title: string;
  description: string;
  amount: string;
  icon: ReactNode;
  highlight: string;
  index: number;
  isInView: boolean;
}

export function FundingCard({ 
  title, 
  description, 
  amount, 
  icon, 
  highlight, 
  index, 
  isInView
}: FundingCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      <motion.div
        initial="initial"
        whileHover="hover"
        variants={cardVariants}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="h-full rounded-xl bg-gradient-to-r from-[#70f570] to-[#49c628] shadow-lg overflow-hidden"
      >
        {/* Subtle top accent */}
        <div className="h-1 bg-white/30" />
        
        <div className="h-full p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-start gap-4 mb-5">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/20 text-white flex items-center justify-center shadow-sm backdrop-blur-sm">
              {icon}
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-1 line-clamp-2">
                {title}
              </h3>
              <p className="text-sm text-white/90 line-clamp-2">
                {description}
              </p>
            </div>
          </div>
          
          {/* Quote panel */}
          <div className="mt-2 mb-auto">
            <div className="relative py-4 px-5 rounded-lg bg-white/20 backdrop-blur-sm border-l-3 border-white/30">
              <p className="text-sm text-white italic line-clamp-3">{highlight}</p>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-6 flex items-center justify-between">
            <div className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="text-sm font-medium text-white">{amount}</span>
            </div>
            
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center"
              >
                <div className="px-4 py-1.5 bg-white text-[#49c628] text-sm font-medium rounded-full flex items-center gap-2 shadow-sm">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 