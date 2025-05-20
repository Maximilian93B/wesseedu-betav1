"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import { Check } from "lucide-react"

// Simplified animation variants with fewer properties
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

const itemVariants = {
  hidden: { y: 8, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  }
}

// Simplified icon animation variants
const iconVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.3 } 
  },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  }
}

// Optimized floating animation with fewer properties
const floatingVariants = {
  initial: { y: 0 },
  animate: { 
    y: [0, -8, 0],
    transition: {
      y: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse", 
        ease: "easeInOut"
      }
    }
  }
}

// Simplified card animation
const cardVariant = {
  initial: { y: 0 },
  animate: { 
    y: [0, 2, 0],
    transition: {
      y: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  }
}

// Features data
const features = [
  {
    icon: <BarChart3 size={20} className="text-[#6a5acd]" />,
    title: "Low fees meet higher yields",
    description: "Your money's always making more with low-fee investing and high-interest savings."
  },
  {
    icon: <ShieldCheck size={20} className="text-[#6a5acd]" />,
    title: "Unmatched access",
    description: "Get sophisticated investment opportunities traditionally reserved for industry insiders."
  },
  {
    icon: <BarChart3 size={20} className="text-[#6a5acd]" />,
    title: "Smart & simple",
    description: "In just a few taps, set your financial goals in motion with our easy-to-use products."
  }
]

export function MobileHero() {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Memoize animations handling reduced motion
  const animationVariants = useMemo(() => {
    if (prefersReducedMotion) {
      // Return no-animation variants for reduced motion preference
      return {
        container: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.3 } }
        },
        item: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.2 } }
        },
        icon: {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          hover: {}
        },
        floating: { initial: {}, animate: {} },
        card: { initial: {}, animate: {} }
      };
    }
    
    return {
      container: containerVariants,
      item: itemVariants,
      icon: iconVariants,
      floating: floatingVariants,
      card: cardVariant
    };
  }, [prefersReducedMotion]);
  
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animationVariants.container}
      className="w-full mx-auto px-6 py-10 relative"
      style={{ background: 'white' }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 z-0" 
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #6a5acd 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Reduced decorative elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-white/30 blur-3xl z-0"
      />
      
      {/* Main content */}
      <div className="flex flex-col relative z-10">
        {/* Title and description */}
        <div className="w-full flex flex-col relative">
          <motion.div 
            variants={animationVariants.item} 
            className="overflow-hidden relative mb-8"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.2] text-[#49c628] font-display"
            >
              Grow a <br className="hidden xs:block" />
              <span className="relative inline-block">
                Sustainable Future
                <motion.div 
                  className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-[#49c628]/40 via-[#49c628]/60 to-[#49c628]/40"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                />
              </span>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            variants={animationVariants.item}
            className="text-[#49c628] text-lg sm:text-xl md:text-2xl leading-relaxed mb-10 font-light font-body"
          >
            Join the movement to build a greener tomorrow through sustainable investments that benefit both your finances and our planet.
          </motion.p>
          
          <motion.div 
            variants={animationVariants.item} 
            className="mb-12"
            whileHover={{ scale: !prefersReducedMotion ? 1.01 : 1 }}
            whileTap={{ scale: !prefersReducedMotion ? 0.99 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              asChild
              className="bg-[#49c628] text-white hover:brightness-105 hover:text-white font-medium px-8 sm:px-10 py-5 sm:py-6 rounded-lg text-base sm:text-lg
                shadow-[0_4px_10px_rgba(0,0,0,0.07)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.1)]
                transition-all duration-300 ease-out hover:translate-y-[-2px)] border border-[#49c628]/20"
            >
              <Link href="/auth/signup">
                <span className="relative z-10 flex items-center justify-center">
                  Join WeSeedU
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Link>
            </Button>
          </motion.div>
        </div>
        
        {/* Image Section with optimized animation */}
        <motion.div 
          variants={animationVariants.item} 
          className="relative z-10 flex justify-center items-center mt-2 mb-0 h-[280px]" 
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center w-full max-w-[240px]">
            {/* Globe element */}
            <motion.div 
              className="relative w-[220px] h-[220px] z-20"
              initial="initial"
              animate={!prefersReducedMotion ? "animate" : "initial"}
              variants={animationVariants.floating}
              style={{ translateZ: 0 }}
            >
              <div className="relative w-full h-full filter drop-shadow-lg"> 
                <Image
                  src="/sustainability.png"
                  alt="Sustainable Earth"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <div className="absolute inset-0 -z-10 bg-white/5 rounded-full blur-lg transform scale-90"></div>
            </motion.div>
            
            {/* Card element - simplified animation */}
            <motion.div 
              className="relative mt-[-80px] w-[180px] z-10"
              initial="initial"
              animate={!prefersReducedMotion ? "animate" : "initial"}
              variants={animationVariants.card}
              style={{ translateZ: 0 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 to-transparent blur-md transform scale-105"></div>
                
              <Image
                src="/credit-card-blue-full.png"
                alt="Credit card"
                width={180}
                height={100}
                style={{ 
                objectFit: 'contain',
                height: 'auto',
                filter: 'drop-shadow(0 8px 15px rgba(0,0,0,0.1))'
                }}
                priority
                className="relative"
              />
              <div className="absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-b from-black/5 to-transparent rounded-full blur-md transform scale-x-80"></div>
            </motion.div>

            {/* Ground shadow - simplified */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-10">
              <div className="w-full h-full bg-gradient-to-b from-black/5 to-transparent rounded-[100%] blur-lg transform scale-y-40"></div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Divider */}
      <motion.div 
        variants={animationVariants.item} 
        className="w-full my-6 relative z-10 px-1"
      >
        <div className="w-10 h-2 bg-gradient-to-r from-[#6a5acd] to-transparent mb-4 rounded-full"></div>
      </motion.div>
      
      {/* Features section - simplified */}
      <motion.div variants={animationVariants.item} className="w-full relative z-10">
        <div className="space-y-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col group mb-8 sm:mb-0">
              <div className="flex items-center mb-3">
                <motion.div 
                  className="flex-shrink-0 h-10 w-10 rounded-full bg-[#6a5acd]/20 flex items-center justify-center mr-3 border border-[#6a5acd]/40"
                  variants={animationVariants.icon}
                  whileHover="hover"
                >
                  {feature.icon}
                </motion.div>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#49c628] mb-3 font-display">{feature.title}</h3>
              <p className="text-black text-base sm:text-lg leading-relaxed font-body">{feature.description}</p>
              {index < features.length - 1 && (
                <div className="w-full h-[1px] bg-[#6a5acd]/20 mt-8"></div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Trust indicators */}
      <motion.div 
        variants={animationVariants.item}
        className="w-full mt-10 relative z-10"
      >
        <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-10 gap-y-3 sm:gap-y-5 w-full">
          <span className="flex items-center text-sm sm:text-base text-black font-body">
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#6a5acd]/20 text-[#6a5acd] mr-3 border border-[#6a5acd]/40 shadow-md">
              <Check size={12} />
            </div>
            <span className="font-medium">Data-driven approach</span>
          </span>
          <span className="flex items-center text-sm sm:text-base text-black font-body">
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#6a5acd]/20 text-[#6a5acd] mr-3 border border-[#6a5acd]/40 shadow-md">
              <Check size={12} />
            </div>
            <span className="font-medium">Regular updates</span>
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
} 