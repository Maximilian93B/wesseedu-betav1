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
  const characters = useMemo(() => text.split(""), [text]);
  
  // Add a console log to verify the prop is changing
  console.log("AnimatedTitle rendering with revealType:", revealType);
  
  // Container animation - modified to be more responsive to revealType
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: revealType === "stagger" || revealType === "wave" || revealType === "3d" ? 0.015 : 0.005,
        delayChildren: delay,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  
  // Character animation variants - make differences more dramatic but faster
  const getCharacterVariant = () => {
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
          hidden: { opacity: 0, y: 30 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
          }
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.5 },
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
          hidden: { opacity: 0, y: 25, rotateZ: 5 },
          visible: (i: number) => ({ 
            opacity: 1, 
            y: 0,
            rotateZ: 0,
            transition: { 
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.02 
            }
          })
        };
      case "3d":
        return {
          hidden: { 
            opacity: 0, 
            y: 20, 
            rotateX: -20,
            scale: 0.9
          },
          visible: (i: number) => ({ 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            scale: 1,
            transition: { 
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.015 
            }
          })
        };
      // Make other reveal types more distinctive
      case "bright":
        return {
          hidden: { opacity: 0, scale: 1.5, filter: "brightness(2)" },
          visible: (i: number) => ({ 
            opacity: 1, 
            scale: 1,
            filter: "brightness(1)",
            transition: { 
              duration: 0.4, 
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.02 
            }
          })
        };
      case "glow":
        return {
          hidden: { opacity: 0, scale: 0.9, textShadow: "0 0 20px rgba(255,255,255,1)" },
          visible: (i: number) => ({ 
            opacity: 1, 
            scale: 1,
            textShadow: "0 0 0px rgba(255,255,255,0)",
            transition: { 
              duration: 0.4, 
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.025 
            }
          })
        };
      case "weseedu-vibrant":
      case "weseedu-clear":
        return {
          hidden: { opacity: 0, x: -20, y: 20 },
          visible: (i: number) => ({ 
            opacity: 1, 
            x: 0,
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
          hidden: { opacity: 0, rotateY: 90 },
          visible: (i: number) => ({ 
            opacity: 1, 
            rotateY: 0,
            transition: { 
              duration: 0.4, 
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.025 
            }
          })
        };
      case "bottom-glow":
        return {
          hidden: { 
            opacity: 0, 
            y: 10, 
            filter: "drop-shadow(0 10px 8px rgba(255,255,255,0))" 
          },
          visible: (i: number) => ({ 
            opacity: 1, 
            y: 0,
            filter: "drop-shadow(0 10px 8px rgba(255,255,255,0.7))",
            transition: { 
              duration: 0.4, 
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.025 
            }
          })
        };
      case "blur-glow":
        return {
          hidden: { 
            opacity: 0, 
            filter: "blur(8px) drop-shadow(0 8px 6px rgba(255,255,255,0))" 
          },
          visible: (i: number) => ({ 
            opacity: 1, 
            filter: "blur(0px) drop-shadow(0 8px 10px rgba(255,255,255,0.7))",
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
          hidden: { opacity: 0, y: 15, scale: 0.95 },
          visible: (i: number) => ({ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.015 
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
  };
  
  const characterVariant = getCharacterVariant();
  const titleStyle = getStyleByColor();
  
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
        zIndex: 9999,
        display: 'inline-block',
        ...titleStyle
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}-${revealType}`}
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