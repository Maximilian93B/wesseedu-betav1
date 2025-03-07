import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AnimatedTitleProps {
  words?: string[];
  colors?: string[];
  text?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  className?: string;
  staggerDelay?: number;
  highlightIndex?: number;
  animationStyle?: "slide" | "fade" | "bounce" | "wave";
  letterSpacing?: string;
  delay?: number;
}

export function AnimatedTitle({ 
  words, 
  colors, 
  text,
  highlightWords = [],
  highlightClassName = "text-teal-500",
  className = "", 
  staggerDelay = 0.2,
  highlightIndex = -1,
  animationStyle = "slide",
  letterSpacing = "normal",
  delay = 0
}: AnimatedTitleProps) {
  const shouldReduceMotion = useReducedMotion();
  
  // Debug props
  console.log('AnimatedTitle props:', { 
    words, 
    text, 
    highlightWords, 
    processedWordsLength: text ? text.split(' ').length : words?.length || 0 
  });
  
  // Process text-based API if provided
  const processedWords = useMemo(() => {
    // If words array is provided, use it directly
    if (words && words.length > 0) {
      console.log('Using provided words array:', words);
      return words;
    }
    
    // If text is provided, split it into words
    if (text) {
      const splitWords = text.split(' ');
      console.log('Split text into words:', splitWords);
      return splitWords;
    }
    
    // Default empty array if neither is provided
    console.warn('No words or text provided to AnimatedTitle');
    return [];
  }, [words, text]);
  
  // Process colors for each word
  const processedColors = useMemo(() => {
    // If colors array is provided, ensure it matches the length of processedWords
    if (colors && colors.length > 0) {
      console.log('Using provided colors array:', colors);
      // Make sure colors array matches the length of words array
      return colors.length >= processedWords.length 
        ? colors.slice(0, processedWords.length) // Trim extra colors
        : [...colors, ...Array(processedWords.length - colors.length).fill('')]; // Add empty colors
    }
    
    // Create colors array based on highlightWords
    const generatedColors = processedWords.map(word => {
      // Case-insensitive comparison for better matching
      const normalizedWord = word.replace(/[.,!?;:'"()]/g, ''); // Remove punctuation
      const isHighlighted = highlightWords.some(hw => 
        hw.toLowerCase() === normalizedWord.toLowerCase()
      );
      
      return isHighlighted ? highlightClassName : '';
    });
    
    console.log('Generated colors based on highlightWords:', generatedColors);
    return generatedColors;
  }, [colors, processedWords, highlightWords, highlightClassName]);

  // Animation variants for the container - simplified for better performance
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? staggerDelay / 2 : staggerDelay,
        delayChildren: delay,
      },
    },
  }), [staggerDelay, shouldReduceMotion, delay]);

  // Simplified animation variants for better performance
  const animationVariants = useMemo(() => {
    // Simplified animations for reduced motion
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: (i: number) => ({ 
          opacity: 1,
          transition: {
            duration: 0.3,
            ease: "easeOut",
            delay: i * 0.05,
          }
        }),
      };
    }
    
    // Simplified animations for normal motion based on style
    switch (animationStyle) {
      case "bounce":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: (i: number) => ({ 
            y: 0, 
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 80,
              damping: 12,
              delay: i * 0.1,
            }
          }),
        };
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: (i: number) => ({ 
            opacity: 1,
            transition: {
              duration: 0.5,
              ease: "easeOut",
              delay: i * 0.1,
            }
          }),
        };
      case "wave":
      case "slide":
      default:
        return {
          hidden: { y: 10, opacity: 0 },
          visible: (i: number) => ({ 
            y: 0, 
            opacity: 1,
            transition: {
              duration: 0.5,
              ease: "easeOut",
              delay: i * 0.08,
            }
          }),
        };
    }
  }, [shouldReduceMotion, animationStyle]);

  // Don't render if no words
  if (processedWords.length === 0) {
    console.warn('AnimatedTitle: No words to render. Please provide either "words" or "text" prop.');
    return null;
  }

  return (
    <motion.div
      className={`inline-flex flex-wrap items-center justify-center gap-x-2 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {processedWords.map((word, index) => (
        <motion.span
          key={`word-${index}-${word}`}
          className={`
            ${processedColors[index] || ''} 
            ${processedColors[index] ? '' : 'text-white'}
            inline-block 
            ${highlightIndex === index ? 'relative after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[3px] after:bg-current after:opacity-70' : ''}
          `}
          style={{ 
            letterSpacing,
            willChange: 'transform, opacity',
          }}
          variants={animationVariants}
          custom={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}