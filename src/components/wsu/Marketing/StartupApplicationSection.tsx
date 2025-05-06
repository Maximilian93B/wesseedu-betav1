"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sprout, PiggyBank, LineChart } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FundingCard } from "./FundingCard"
import { useScrollContext } from "@/context/ScrollContext"

// Simple fade animation that works well with scroll
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
}

export function StartupApplicationSection() {
  const { prefersReducedMotion, isMobileDevice } = useScrollContext();
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
      title: "Impact Stage",
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
    <div className="relative w-full overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Content container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center gap-12 md:gap-16 lg:gap-20">
          {/* Simplified header section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: prefersReducedMotion ? 0.3 : 0.2 }}
            variants={fadeIn}
            className="w-full text-center"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight sm:leading-none mb-4 sm:mb-5 text-shadow-sm">
              <span className="inline-block text-white">
                Fund Your 
              </span>
              {" "}
              <span className="relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 drop-shadow-lg">
                  Sustainable Vision
                </span>
              </span>
            </h2>
            
            <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mt-4 sm:mt-5">
              WeSeedU connects innovative sustainable startups with impact investors and UN funding opportunities.
            </p>
          </motion.div>
          
          {/* Funding cards section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full">
            {fundingCards.map((card, index) => (
              <div key={index} className="h-full">
                <FundingCard
                  title={card.title}
                  description={card.description}
                  amount={card.amount}
                  icon={card.icon}
                  highlight={card.highlight}
                  index={index}
                  isInView={true}
                  backgroundColor={card.backgroundColor}
                  accentColor={card.accentColor}
                />
              </div>
            ))}
          </div>
          
          {/* Application section */}
          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-16 w-full">
            {/* Image section */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="w-full md:w-1/2 flex justify-center"
            >
              <div className="relative w-full max-w-md lg:max-w-lg aspect-square">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] 
                  bg-gradient-radial from-green-400/20 via-green-400/10 to-transparent rounded-full blur-3xl" />
                
                <div className="relative z-10 scale-90 sm:scale-100">
                  <Image
                    src="/funding.png"
                    alt="Sustainable Business Funding"
                    width={600}
                    height={600}
                    className="relative z-20 drop-shadow-[0_25px_40px_rgba(0,0,0,0.35)] hover:scale-105 transition-transform duration-300"
                    priority
                  />
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[60%] h-6 bg-black/20 blur-xl rounded-full"></div>
                </div>
              </div>
            </motion.div>
            
            {/* Content section */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="w-full md:w-1/2"
            >
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-5 sm:mb-6">
                <span className="relative inline-block">
                  Why Choose WeSeedU
                  <div className="absolute -bottom-2 left-0 h-[2px] w-full bg-gradient-to-r from-green-400 to-green-500/0" />
                </span>
              </h3>
              
              {/* Benefits list */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    onMouseEnter={() => setActiveFeature(index)}
                    onMouseLeave={() => setActiveFeature(null)}
                    className={`flex items-start p-2 sm:p-3 rounded-xl transition-all duration-300 ${activeFeature === index ? 'bg-white/5' : ''}`}
                  >
                    <div className={`p-1.5 sm:p-2 rounded-full bg-gradient-to-br from-green-400 to-green-500 mr-2.5 sm:mr-3 mt-1 sm:mt-0.5 transition-all duration-300 ${activeFeature === index ? 'scale-110' : ''}`}>
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="text-white text-base font-bold mb-0.5 sm:mb-1">{benefit.title}</h4>
                      <p className="text-white/80 text-sm sm:text-base">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* CTA button */}
              <Button
                asChild
                size="lg"
                className="relative overflow-hidden group bg-white text-black hover:bg-white/90 hover:text-green-900 shadow-lg rounded-xl transition-all duration-300 w-full sm:w-auto"
              >
                <Link href="/apply-now" className="flex items-center justify-center font-bold py-4 sm:py-5 px-6 sm:px-10 text-base">
                  <span className="relative z-10">Apply for Funding</span>
                  <span className="relative z-10 ml-2 group-hover:translate-x-1 transition-transform duration-200">
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gray-50 transition-opacity duration-300" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 