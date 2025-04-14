"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

// Enhanced animation variants with smoother transitions
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 170, damping: 22 }
  }
}

// Icon animation variants
const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 260, damping: 20 } 
  },
  hover: { 
    scale: 1.1,
    transition: { duration: 0.2 }
  }
}

// 3D image animation variants
const imageVariants = {
  hidden: { scale: 0.7, opacity: 0, y: 10 },
  visible: { 
    scale: 1, 
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 20,
      delay: 0.2
    } 
  },
  floating: {
    y: [0, -8, 0],
    rotate: [0, 2, 0, -2, 0],
    transition: {
      y: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      },
      rotate: {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  }
}

// Features data for cleaner rendering
const features = [
  {
    icon: <BarChart3 size={16} className="text-white" />,
    title: "Low fees meet higher yields",
    description: "Your money's always making more with low-fee investing and high-interest savings."
  },
  {
    icon: <ShieldCheck size={16} className="text-white" />,
    title: "Unmatched access",
    description: "Get sophisticated investment opportunities traditionally reserved for industry insiders."
  },
  {
    icon: <BarChart3 size={16} className="text-white" />,
    title: "Smart & simple",
    description: "In just a few taps, set your financial goals in motion with our easy-to-use products."
  }
]

export function MobileHero() {
  // Track if component is mounted
  const [isMounted, setIsMounted] = useState(false);
  
  // Only run animations after component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render animations until component is mounted
  if (!isMounted) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full mx-auto px-6 py-8 relative"
    >

      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 z-0" 
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Decorative circles - positioned absolutely */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 0.5, duration: 1.2 }}
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-white/30 blur-3xl z-0"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.07 }}
        transition={{ delay: 0.7, duration: 1.2 }}
        className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/20 blur-2xl z-0"
      />
      
      {/* Main content with relative positioning */}
      <div className="flex flex-col relative z-10">
        {/* Title and description */}
        <div className="w-full flex flex-col relative">
          <motion.div 
            variants={itemVariants} 
            className="overflow-hidden relative mb-5"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] text-white font-display"
              style={{
                textShadow: '0 2px 10px rgba(255,255,255,0.2)',
                letterSpacing: '-0.02em'
              }}
            >
              Grow a <br className="hidden xs:block" />
              <span className="relative inline-block">
                Sustainable Future
                <motion.div 
                  className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-[#00b4db] to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                />
              </span>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-white/90 text-base leading-relaxed mb-8 font-light max-w-[95%] font-body"
          >
            Join the movement to build a greener tomorrow through sustainable investments that benefit both your finances and our planet.
          </motion.p>
          
          <motion.div 
            variants={itemVariants} 
            className="mb-10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              asChild
              className="group bg-[#00b4db] text-white shadow-[0_4px_12px_rgba(0,150,200,0.3)]
                hover:shadow-[0_6px_20px_rgba(0,150,200,0.4)] transition-all duration-300 ease-out 
                rounded-xl px-7 py-3 font-medium relative overflow-hidden w-auto font-helvetica"
              style={{ 
                background: 'linear-gradient(135deg, #00b4db 0%, #0083b0 100%)',
              }}
            >
              <Link href="/auth/signup">
                <span className="relative z-10 flex items-center justify-center text-sm">
                  Plant your seed
                  <motion.span 
                    className="relative z-10 ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </span>
                {/* Button shine effect */}
                <span className="absolute top-0 -left-[100%] h-full w-[60%] bg-gradient-to-r from-transparent via-white/20 to-transparent 
                  group-hover:left-[100%] transition-all duration-1000 ease-in-out z-0" />
              </Link>
            </Button>
          </motion.div>
        </div>
        
        {/* 3D PNG Image Section - reduce height */}
        <motion.div 
          variants={imageVariants}
          animate="floating"
          className="relative z-10 flex justify-center items-center my-6 h-[140px]"
        >
          <div className="relative w-[160px] h-[160px]">
            {/* Subtle shadow below the image */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-28 h-4 bg-black/10 rounded-full blur-md"></div>
            
            {/* 3D Image with drop shadow and glow effect */}
            <div className="relative w-full h-full filter drop-shadow-xl">
              <Image
                src="/sustainability.png"
                alt="Sustainable Earth"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            
            {/* Subtle glow effect behind the image */}
            <div className="absolute inset-0 -z-10 bg-white/10 rounded-full blur-2xl transform scale-75"></div>
          </div>
        </motion.div>
      </div>
      
      {/* Reduce spacing */}
      <motion.div 
        variants={itemVariants} 
        className="w-full my-6 relative z-10 px-1"
      >
        <div className="relative w-full flex items-center justify-center h-6">
          {/* Left side line with gradient */}
          <div className="absolute left-0 w-[42%] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-white/70"></div>
          
          {/* Right side line with gradient */}
          <div className="absolute right-0 w-[42%] h-[1px] bg-gradient-to-l from-transparent via-white/40 to-white/70"></div>
          
          {/* Center dot */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Subtle dots around the center */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/40"
                style={{ 
                  left: `${50 + 25 * Math.cos(i * (Math.PI / 3))}%`,
                  top: `${50 + 25 * Math.sin(i * (Math.PI / 3))}%`
                }}
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Features section - reduce spacing */}
      <motion.div variants={itemVariants} className="w-full relative z-10">
        <div className="space-y-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-center mb-3">
                <motion.div 
                  className="mr-3 bg-white/20 rounded-full p-2"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  {feature.icon}
                </motion.div>
                <div className="w-8 h-0.5 bg-white/60 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 font-display">{feature.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed pr-2 font-body">{feature.description}</p>
              {index < features.length - 1 && (
                <div className="w-full h-[1px] bg-white/20 mt-6"></div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
} 