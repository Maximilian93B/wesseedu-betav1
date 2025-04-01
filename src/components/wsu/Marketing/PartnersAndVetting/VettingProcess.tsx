"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { VETTING_STEPS } from "./data"
import "./animations.css"

export function VettingProcess() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="py-10"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-green-800 font-bold text-2xl mb-4">Our Vetting Process</h3>
          <p className="text-green-700/80 text-base max-w-2xl mx-auto">
            We partner with the Big Four accounting firms to ensure each company on our platform
            goes through a comprehensive vetting process before being available for investment.
          </p>
        </div>

        {/* Steps flowchart */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-green-100 hidden md:block -mt-px z-0"></div>
          
          {/* Process steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {VETTING_STEPS.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                {/* Circle step number */}
                <div className="w-16 h-16 rounded-full bg-white shadow-[0_8px_20px_rgba(0,0,0,0.1)] 
                  flex items-center justify-center text-green-600 border-4 border-green-100 mb-4 
                  relative z-10 vetting-step-icon-container">
                  <motion.div 
                    className="w-full h-full rounded-full bg-white absolute"
                    animate={{ 
                      boxShadow: ['0 0 0 0 rgba(74, 222, 128, 0)', '0 0 0 10px rgba(74, 222, 128, 0)'],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 2,
                      delay: index * 0.5,
                    }}
                  />
                  {step.icon}
                </div>
                
                {/* Arrow */}
                {index < VETTING_STEPS.length - 1 && (
                  <div className="absolute top-8 right-0 transform translate-x-1/2 -translate-y-1/2 hidden md:block">
                    <ArrowRight className="h-6 w-6 text-green-400" />
                  </div>
                )}
                
                {/* Step content */}
                <h4 className="text-green-800 font-medium text-lg mb-2">
                  {step.title}
                </h4>
                <p className="text-green-700/70 text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 