import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface AnimatedTitleProps {
  text: string;
  className?: string;
  delay?: number;
  color?: string;
  revealType?: "fade" | "slide" | "scale" | "blur" | "stagger" | "wave" | "3d" | "bright" | "glow" | "weseedu-vibrant" | "weseedu-clear" | "crystal";
}

export function AnimatedTitle({
  text,
  className = "",
  delay = 0,
  color = "white",
  revealType = "stagger"
}: AnimatedTitleProps) {
  const characters = useMemo(() => text.split(""), [text]);
  
  // Container animation - simplified
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: delay,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  // Character animation variants - simplified to avoid filter issues
  const getCharacterVariant = () => {
    switch (revealType) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1, 
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }
        };
      case "slide":
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.5 },
          visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }
        };
      case "blur":
        // Replaced blur with opacity for safer animation
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1, 
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }
        };
      case "wave":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: (i: number) => ({ 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.5, 
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.05 
            }
          })
        };
      case "3d":
        return {
          hidden: { 
            opacity: 0, 
            y: 20, 
            rotateX: -10,
            scale: 0.95
          },
          visible: (i: number) => ({ 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            scale: 1,
            transition: { 
              duration: 0.6, 
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.04 
            }
          })
        };
      case "stagger":
      default:
        return {
          hidden: { opacity: 0, y: 20, scale: 0.9 },
          visible: (i: number) => ({ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
              duration: 0.5, 
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.04 
            }
          })
        };
    }
  };
  
  // Get style based on color prop - simplified
  const getStyleByColor = () => {
    switch (color) {
      case 'modern':
        return {
          background: 'linear-gradient(135deg, #8b5cf6, #4f46e5, #06b6d4)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          fontWeight: 'bold',
        };
      case 'clean':
        return {
          color: 'white',
          fontWeight: 'bold',
          letterSpacing: '0.02em',
        };
      case '3d':
        return {
          color: 'white',
          fontWeight: 'bold',
          letterSpacing: '0.05em',
        };
      case 'bright':
        return {
          color: 'white',
          fontWeight: 'bold',
          letterSpacing: '0.03em',
        };
      case 'glow':
        return {
          background: 'linear-gradient(to bottom, #ffffff, #88e1ff)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          fontWeight: 'bold',
          letterSpacing: '0.02em',
        };
      case 'crystal':
        return {
          color: '#ffffff',
          fontWeight: 'bold',
          letterSpacing: '0.02em',
        };
      case 'weseedu-clear':
        return {
          background: 'linear-gradient(to right, #c084fc, #34d399)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          fontWeight: 'bold',
          letterSpacing: '0.02em',
        };
      case 'weseedu-vibrant':
        return {
          background: 'linear-gradient(to right, #a855f7, #14b8a6, #22c55e)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          fontWeight: 'bold',
          letterSpacing: '0.02em',
        };
      default:
        return {
          color: color,
        };
    }
  };
  
  const characterVariant = getCharacterVariant();
  const titleStyle = getStyleByColor();
  
  return (
    <motion.h1
      className={`${className} relative`}
      initial="hidden"
      animate="visible"
      variants={container}
      aria-label={text}
      style={{
        position: 'relative',
        zIndex: 9999,
        display: 'inline-block',
        ...titleStyle
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={characterVariant}
          custom={index}
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity',
            transformOrigin: 'center bottom',
            position: 'relative',
            zIndex: 9999 - index
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}