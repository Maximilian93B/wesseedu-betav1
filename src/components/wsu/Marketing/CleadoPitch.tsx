"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Home, Clock, Shield, Sparkles } from "lucide-react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.14,
      duration: 0.7,
      ease: "easeOut"
    }
  }
}

const itemVariants = {
  hidden: { y: 18, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 180, damping: 20 }
  }
}

const floatingVariants = {
  initial: { y: 0 },
  animate: { 
    y: [0, -15, 0],
    transition: {
      duration: 10,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
}

// Dome house benefits
const DOME_BENEFITS = [
  {
    title: "Cost-Effective Construction",
    description: "Homeowners can build their own dome houses, potentially saving up to 80% on costs.",
    icon: <Home className="h-5 w-5 text-green-700" />
  },
  {
    title: "Rapid Assembly",
    description: "Homes can be constructed in just 4 to 6 days.",
    icon: <Clock className="h-5 w-5 text-green-700" />
  },
  {
    title: "Foundation-Free Design",
    description: "No extensive foundation work is required.",
    icon: <Shield className="h-5 w-5 text-green-700" />
  }
];

export function CleadoSection() {
  // Refs and animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [animationVisible, setAnimationVisible] = useState(false);
  
  // Effect to handle animation visibility
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setAnimationVisible(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isInView]);
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <div 
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: 'linear-gradient(115deg, #70f570, #49c628)' }}
    >
      {/* Pattern background */}
      <div className="absolute inset-0 opacity-[0.04]" 
        style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-20 left-[5%] w-64 h-64 rounded-full bg-white/5 blur-[120px]"
        style={{ y: y1 }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-20 right-[10%] w-80 h-80 rounded-full bg-green-300/10 blur-[150px]"
        style={{ y: y2 }}
      ></motion.div>
      
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10"
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">
          {/* Left content - Text and benefits */}
          <div className="w-full lg:w-[45%] flex flex-col relative">
            <motion.div variants={itemVariants} className="overflow-hidden relative mb-8">
              <motion.h2 className="relative">
                <span className="block text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-1">
                  Understanding
                </span>
                <span className="block text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                  SUSTAINABLE LIVING
                </span>
              </motion.h2>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-white text-base sm:text-lg leading-relaxed mb-10 max-w-lg"
            >
              Sustainable living is a concept that emphasizes the importance of creating homes and lifestyles that are environmentally friendly and resource-efficient. Cleado specializes in developing land and constructing dome houses equipped with solar panels, making these domes adaptable for various land and construction needs.
            </motion.p>
            
            {/* Benefits */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="space-y-5">
                {DOME_BENEFITS.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
                    className="flex items-center gap-5 group hover:translate-x-1 transition-transform duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/90 to-white/70 flex items-center justify-center flex-shrink-0 border border-white/40 group-hover:bg-white transition-colors duration-300 shadow-lg">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-base sm:text-lg">{benefit.title}</h4>
                      <p className="text-white/90 text-xs sm:text-sm mt-1">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* CTA Button */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                asChild
                className="bg-white hover:bg-slate-50 text-green-700 shadow-[0_8px_30px_rgba(0,0,0,0.1)]
                  hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out 
                  hover:translate-y-[-3px] rounded-xl px-7 py-6 text-sm font-semibold group"
              >
                <Link href="/dome-housing">
                  <span className="relative z-10 flex items-center">
                    Explore Dome Houses
                    <Sparkles className="ml-2 h-4 w-4 text-green-600 group-hover:rotate-12 transition-transform duration-300" />
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300 ease-out" />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Right content - Dome house showcase */}
          <motion.div 
            className="w-full lg:w-[55%] flex justify-center lg:justify-end"
            variants={itemVariants}
            style={{ rotate: rotate }}
          >
            <div className="relative w-full h-[500px] sm:h-[550px] flex items-center justify-center">
              {/* Dome house main image */}
              <motion.div 
                className="relative w-[420px] h-[320px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-20"
                initial="initial"
                animate="animate"
                variants={floatingVariants}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/dome-house-main.jpg"
                    alt="Dome house exterior"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-white text-xs font-semibold bg-green-600/80 px-3 py-1 rounded-full">
                          Energy Efficient
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-white/90 text-sm">Built in 6 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Secondary image - interior */}
              <motion.div 
                className="absolute top-10 -right-5 w-[220px] h-[160px] rounded-xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.15)] z-10"
                animate={{ 
                  y: [0, -12, 0],
                  rotate: [0, 2, 0, -1, 0],
                  transition: {
                    y: {
                      duration: 12, 
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 0.5
                    },
                    rotate: {
                      duration: 16,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 0.8
                    }
                  }
                }}
              >
                <Image
                  src="/dome-house-interior.jpg"
                  alt="Dome house interior"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
              </motion.div>
              
              {/* Tertiary image - construction */}
              <motion.div 
                className="absolute bottom-20 -left-5 w-[220px] h-[160px] rounded-xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.15)] z-10"
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -2, 0, 1, 0],
                  transition: {
                    y: {
                      duration: 14, 
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 1
                    },
                    rotate: {
                      duration: 18,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 1.2
                    }
                  }
                }}
              >
                <Image
                  src="/dome-house-construction.jpg"
                  alt="Dome house construction"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/40"></div>
              </motion.div>
              
              {/* Stats card */}
              <motion.div 
                className="absolute -bottom-10 right-20 bg-white/90 rounded-xl p-4 shadow-[0_15px_40px_rgba(0,0,0,0.2)] z-30"
                animate={{ 
                  y: [0, -10, 0],
                  x: [0, 5, 0, -5, 0],
                  transition: {
                    y: {
                      duration: 10, 
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    },
                    x: {
                      duration: 14,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }
                  }
                }}
              >
                <div className="text-center">
                  <p className="text-green-700 text-xs font-medium uppercase tracking-wider mb-1">Energy Savings</p>
                  <p className="text-green-800 text-2xl font-bold">30%+</p>
                  <div className="mt-2 h-1 w-full bg-green-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 w-[75%] rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

