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
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    }),
  }
  
  // Enhanced child variants with better performance
  const child = {
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(3px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 24,
        stiffness: 120,
        mass: 0.8,
      },
    },
  }
  
  // Determine if a word should be highlighted
  const shouldHighlight = (word: string) => {
    return highlightWords.includes(word) || highlightWords.length === 0
  }
  
  return (
    <motion.div
      className={`${className} will-change-transform`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-wrap">
        {words.map((word, index) => (
          <motion.div
            key={`word-${index}-${word}`}
            className={`mr-3 mb-3 inline-block relative ${shouldHighlight(word) ? "z-10" : ""}`}
            variants={child}
            custom={index}
            whileHover={{ 
              scale: shouldHighlight(word) ? 1.03 : 1.01,
              transition: { duration: 0.15, type: "tween" }
            }}
          >
            {shouldHighlight(word) && (
              <div 
                className="absolute -inset-1 opacity-10 rounded-full -z-10 will-change-opacity" 
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)',
                  filter: 'blur(1px)'
                }}
              ></div>
            )}
            
            <span 
              className={`text-white ${shouldHighlight(word) ? "font-bold" : "font-semibold opacity-90"}`}
            >
              {word}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
} 