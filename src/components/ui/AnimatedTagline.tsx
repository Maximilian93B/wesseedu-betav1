"use client"
import { motion } from "framer-motion"
import { useMemo } from "react"

interface AnimatedTaglineProps {
  text: string
  className?: string
  delay?: number
  highlightWords?: string[]
  phrases?: string[]
  usePhrases?: boolean
}

export function AnimatedTagline({ 
  text, 
  className = "", 
  delay = 0,
  highlightWords = [],
  phrases = [],
  usePhrases = false
}: AnimatedTaglineProps) {
  // Use useMemo instead of useState + useEffect to avoid the infinite loop
  const words = useMemo(() => {
    // If using phrases, use the provided phrases array
    // Otherwise split the text into words
    if (usePhrases && phrases.length > 0) {
      return phrases;
    } else {
      return text.split(' ');
    }
  }, [text, phrases, usePhrases]);
  
  // Container variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.12,
        delayChildren: delay,
      },
    }),
  }
  
  // Child variants (for each word) - Removed all filter properties to avoid negative blur values
  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 150,
        mass: 0.7,
      },
    },
  }
  
  // Determine if a word should be highlighted
  const shouldHighlight = (word: string) => {
    return highlightWords.includes(word) || highlightWords.length === 0
  }
  
  // Get gradient class based on word position
  const getGradientClass = (index: number, total: number) => {
    // Create a gradient that shifts across the phrase
    if (index < total / 3) {
      return "bg-gradient-to-r from-teal-400 to-purple-400"
    } else if (index < (total * 2) / 3) {
      return "bg-gradient-to-r from-purple-400 via-white to-teal-400"
    } else {
      return "bg-gradient-to-r from-purple-400 to-teal-400"
    }
  }
  
  return (
    <motion.div
      className={`flex flex-col ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ position: 'relative', zIndex: 10 }}
    >
      <div className="flex flex-wrap relative">
        {/* Subtle glow effect behind text - using opacity instead of blur */}
        <div className="absolute -inset-4 bg-purple-500/10 rounded-full opacity-50 z-0"></div>
        
        {words.map((word, index) => (
          <motion.div
            key={`word-${index}-${word}`}
            className="mr-3 mb-3 inline-block relative z-10"
            variants={child}
            custom={index}
            style={{ position: 'relative', zIndex: 10 }}
          >
            <span 
              className={`
                ${shouldHighlight(word) ? getGradientClass(index, words.length) : 'text-white'} 
                bg-clip-text text-transparent font-semibold relative z-10
              `}
            >
              {word}
            </span>
          </motion.div>
        ))}
      </div>
      
      {/* Decorative line */}
      <motion.div 
        className="h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-4 opacity-70"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 0.7 }}
        transition={{ delay: delay + 0.5, duration: 0.8, ease: "easeOut" }}
      />
    </motion.div>
  )
} 