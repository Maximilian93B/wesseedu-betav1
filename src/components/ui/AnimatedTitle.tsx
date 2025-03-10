import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface AnimatedTitleProps {
  text: string;
  className?: string;
  delay?: number;
  color?: string;
  revealType?: "fade" | "slide" | "scale" | "blur" | "stagger" | "wave" | "3d" | "bright" | "glow" | "weseedu-vibrant" | "weseedu-clear" | "crystal" | "bottom-glow" | "blur-glow";
}

export function AnimatedTitle({
  text,
  className = "",
  delay = 0,
  color = "white",
  revealType = "stagger"
}: AnimatedTitleProps) {
  // Memoize characters to prevent unnecessary re-renders
  const characters = useMemo(() => text.split(""), [text]);
  
  // Memoize container animation for better performance
  const container = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: revealType === "stagger" || revealType === "wave" || revealType === "3d" ? 0.015 : 0.005,
        delayChildren: delay,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }), [delay, revealType]);
  
  // Memoize character animation variants for better performance
  const characterVariant = useMemo(() => {
    switch (revealType) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1, 
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
          }
        };
      case "slide":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
          }
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.6 },
          visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
          }
        };
      case "blur":
        return {
          hidden: { opacity: 0, filter: "blur(8px)" },
          visible: { 
            opacity: 1, 
            filter: "blur(0px)",
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
          }
        };
      case "wave":
        return {
          hidden: { opacity: 0, y: 15 },
          visible: (i: number) => ({ 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.02 
            }
          })
        };
      case "3d":
        return {
          hidden: { opacity: 0, y: 15, rotateX: -10 },
          visible: (i: number) => ({ 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            transition: { 
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.015 
            }
          })
        };
      case "bright":
        return {
          hidden: { opacity: 0, scale: 1.2 },
          visible: (i: number) => ({ 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration: 0.35, 
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.02 
            }
          })
        };
      case "glow":
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: (i: number) => ({ 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration: 0.35, 
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.02 
            }
          })
        };
      case "weseedu-vibrant":
      case "weseedu-clear":
        return {
          hidden: { opacity: 0, y: 15 },
          visible: (i: number) => ({ 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.3, 
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.02 
            }
          })
        };
      case "crystal":
        return {
          hidden: { opacity: 0, y: 15 },
          visible: (i: number) => ({ 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.35, 
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.02 
            }
          })
        };
      case "bottom-glow":
        return {
          hidden: { opacity: 0, y: 10 },
          visible: (i: number) => ({ 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.35, 
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.02 
            }
          })
        };
      case "blur-glow":
        return {
          hidden: { opacity: 0, filter: "blur(8px)" },
          visible: (i: number) => ({ 
            opacity: 1, 
            filter: "blur(0px)",
            transition: { 
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.015 
            }
          })
        };
      case "stagger":
      default:
        return {
          hidden: { opacity: 0, y: 10 },
          visible: (i: number) => ({ 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.015 
            }
          })
        };
    }
  }, [revealType]);
  
  // Memoize title style for better performance
  const titleStyle = useMemo(() => {
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
      case 'blur-glow':
        return {
          color: '#ffffff',
          fontWeight: 'bold',
          letterSpacing: '0.03em',
          textShadow: '0 5px 20px rgba(255,255,255,0.35)',
          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
        };
      case 'bottom-glow':
        return {
          color: '#ffffff',
          fontWeight: 'bold',
          letterSpacing: '0.02em',
          textShadow: '0 5px 15px rgba(255,255,255,0.3)',
          fontFamily: 'Helvetica, Arial, sans-serif'
        };
      default:
        return {
          color: color,
          fontFamily: 'Helvetica, Arial, sans-serif'
        };
    }
  }, [color]);
  
  return (
    <motion.h1
      className={`${className} relative`}
      initial="hidden"
      animate="visible"
      variants={container}
      key={`${text}-${revealType}-${color}`}
      aria-label={text}
      style={{
        position: 'relative',
        zIndex: 10,
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
            position: 'relative'
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}