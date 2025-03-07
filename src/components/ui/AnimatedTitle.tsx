import React from "react";
import { motion } from "framer-motion";

interface AnimatedTitleProps {
  words: string[];
  colors: string[];
  className?: string;
  staggerDelay?: number;
  highlightIndex?: number;
  animationStyle?: "slide" | "fade" | "bounce" | "wave";
  letterSpacing?: string;
}

export function AnimatedTitle({ 
  words, 
  colors, 
  className = "", 
  staggerDelay = 0.2,
  highlightIndex = -1,
  animationStyle = "slide",
  letterSpacing = "normal"
}: AnimatedTitleProps) {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  };

  // Different animation styles for words - optimized for performance
  const animationVariants = {
    slide: {
      hidden: { y: 20, opacity: 0 },
      visible: (i: number) => ({ 
        y: 0, 
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
          delay: i * 0.08,
        }
      }),
      hover: (i: number) => ({
        y: -2,
        transition: {
          duration: 0.3,
          ease: "easeOut",
          delay: i * 0.02,
        },
      }),
    },
    fade: {
      hidden: { opacity: 0, scale: 0.98 },
      visible: (i: number) => ({ 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
          delay: i * 0.1,
        }
      }),
      hover: (i: number) => ({
        scale: 1.03,
        transition: {
          duration: 0.3,
          ease: "easeOut",
          delay: i * 0.02,
        },
      }),
    },
    bounce: {
      hidden: { y: 20, opacity: 0 },
      visible: (i: number) => ({ 
        y: 0, 
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 70,
          damping: 15,
          delay: i * 0.08,
        }
      }),
      hover: (i: number) => ({
        y: -5,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: i * 0.03,
        },
      }),
    },
    wave: {
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
      hover: (i: number) => ({
        y: [0, -4, 0],
        transition: {
          duration: 0.8,
          ease: "easeInOut",
          delay: i * 0.04,
        },
      }),
    },
  };

  // Select the appropriate animation variant based on the style prop
  const selectedVariant = animationVariants[animationStyle];

  return (
    <motion.div
      className={`inline-flex items-center justify-center gap-x-2 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className={`
            ${colors[index]} 
            text-transparent 
            bg-clip-text 
            bg-[length:200%_auto] 
            inline-block 
            will-change-transform
            ${highlightIndex === index ? 'relative after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[3px] after:bg-current after:opacity-70' : ''}
          `}
          style={{ 
            letterSpacing,
            transform: "translateZ(0)"
          }}
          variants={selectedVariant}
          custom={index}
          initial="hidden"
          animate="visible"
          whileHover={selectedVariant.hover}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}