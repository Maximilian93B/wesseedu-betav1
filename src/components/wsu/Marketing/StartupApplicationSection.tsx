"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, Sprout, PiggyBank, LineChart } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FundingCard } from "./FundingCard"

// Enhanced animations
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    }
  }
}

const headingAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export function StartupApplicationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  
  // Funding opportunity cards with more detailed information
  const fundingCards = [
    {
      title: "Seed Stage",
      description: "Initial capital for early-stage sustainable startups with innovative green solutions",
      amount: "$50K-$250K",
      icon: <Sprout className="h-7 w-7" />,
      highlight: "Ideal for concept validation and market entry",
      backgroundColor: "from-green-500/15 via-green-400/10 to-emerald-500/10",
      accentColor: "from-green-400 via-emerald-400 to-teal-500"
    },
    {
      title: "Growth Stage",
      description: "Expansion funding for proven sustainable business models with market traction",
      amount: "$250K-$1M",
      icon: <LineChart className="h-7 w-7" />,
      highlight: "For scaling operations and increasing market share",
      backgroundColor: "from-blue-500/15 via-blue-400/10 to-cyan-500/10",
      accentColor: "from-blue-400 via-sky-400 to-cyan-500"
    },
    {
      title: "Impact Investment",
      description: "Strategic large-scale funding for companies with measurable sustainability impact",
      amount: "$1M-$5M",
      icon: <PiggyBank className="h-7 w-7" />,
      highlight: "Supporting global expansion and ecosystem development",
      backgroundColor: "from-violet-500/15 via-purple-400/10 to-fuchsia-500/10",
      accentColor: "from-violet-400 via-purple-400 to-fuchsia-500"
    }
  ];

  // Benefits list with enhanced styling
  const benefits = [
    {
      title: "UN Sustainable Development Programs",
      description: "Access exclusive funding opportunities aligned with UN SDGs"
    },
    {
      title: "Global VC Network",
      description: "Connect with our network of sustainable venture capital partners"
    },
    {
      title: "Expert Mentorship",
      description: "Guidance from industry leaders and sustainability experts"
    },
    {
      title: "Impact Measurement",
      description: "Utilize our ESG impact measurement and reporting tools"
    }
  ];
  
  return (
    <div ref={sectionRef} className="relative w-full overflow-hidden py-24 md:py-32">      
      {/* Content container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center gap-20">
          {/* Enhanced header section with bold white text */}
          <motion.div 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={headingAnimation}
            className="w-full text-center"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none mb-6">
              <span className="inline-block text-white">
                Fund Your 
              </span>
              {" "}
              <span className="relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/20">
                  Sustainable Vision
                </span>
              </span>
            </h2>
            
            <p className="text-white/90 text-xl max-w-2xl mx-auto leading-relaxed mt-6">
              WeSeedUs connects innovative sustainable startups with impact investors and UN funding opportunities.
            </p>
          </motion.div>
          
          {/* Enhanced funding cards section */}
          <motion.div 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
          >
            {fundingCards.map((card, index) => (
              <motion.div key={index} variants={fadeIn}>
                <FundingCard
                  title={card.title}
                  description={card.description}
                  amount={card.amount}
                  icon={card.icon}
                  highlight={card.highlight}
                  index={index}
                  isInView={isInView}
                  backgroundColor={card.backgroundColor}
                  accentColor={card.accentColor}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Enhanced application section */}
          <div className="flex flex-col md:flex-row items-center gap-16 mt-4">
            {/* Enhanced image section */}
            <motion.div 
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeIn}
              className="w-full md:w-1/2 flex justify-center"
            >
              <div className="relative w-full max-w-md aspect-square">
                {/* Enhanced glow effect */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] 
                  bg-gradient-radial from-green-400/30 via-green-400/15 to-transparent rounded-full blur-3xl"
                />
                
                {/* Animated image container */}
                <motion.div 
                  initial={{ y: 10, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.3,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="relative z-10"
                >
                  {/* Enhanced 3D rocket image with dynamic shadows */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <Image
                      src="/rocket-launch-3d-illustration.png"
                      alt="Sustainable Business Funding"
                      width={440}
                      height={440}
                      className="relative z-20 drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)]"
                      priority
                    />
                    
                    {/* Dynamic shadow that follows the floating animation */}
                    <motion.div
                      animate={{ 
                        scale: [1, 0.9, 1],
                        opacity: [0.7, 0.5, 0.7]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 4, 
                        ease: "easeInOut"
                      }}
                      className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[70%] h-8 bg-black/25 blur-xl rounded-full"
                    ></motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Enhanced content section with bold white headers */}
            <motion.div 
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeIn}
              className="w-full md:w-1/2"
            >
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-8">
                <span className="relative inline-block">
                  Why Choose WeSeedUs
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={isInView ? { width: "100%" } : { width: "0%" }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                    className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-green-400 to-green-500/0"
                  />
                </span>
              </h3>
              
              {/* Enhanced feature list with bold headers */}
              <div className="space-y-5 mb-12">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ 
                      duration: 0.5,
                      delay: 0.5 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    onMouseEnter={() => setActiveFeature(index)}
                    onMouseLeave={() => setActiveFeature(null)}
                    className={`flex items-start p-4 rounded-xl transition-all duration-300 ${activeFeature === index ? 'bg-white/5' : ''}`}
                  >
                    <div className={`p-2 rounded-full bg-gradient-to-br from-green-400 to-green-500 mr-4 mt-0.5 transition-all duration-300 ${activeFeature === index ? 'scale-110' : ''}`}>
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="text-white text-lg font-bold mb-1">{benefit.title}</h4>
                      <p className="text-white/80 text-base">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Enhanced CTA button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.5,
                  delay: 1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <Button
                  asChild
                  size="lg"
                  className="relative overflow-hidden group rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ 
                    background: 'linear-gradient(115deg, #70f570, #49c628)'
                  }}
                >
                  <Link href="/apply-now" className="flex items-center justify-center text-white font-bold py-7 px-10 text-lg">
                    <span className="relative z-10">Apply for Funding</span>
                    <motion.div 
                      initial={{ x: -5 }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 ml-2"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-green-400 to-green-500 transition-opacity duration-300" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 