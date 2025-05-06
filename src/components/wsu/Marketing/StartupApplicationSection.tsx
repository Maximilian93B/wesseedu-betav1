"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sprout, PiggyBank, LineChart, Award, Globe, Users } from "lucide-react"
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
      description: "Fast-track your innovation with capital for early-stage startups. 70% of our seed investments reach Series A.",
      amount: "$50K-$250K",
      icon: <Sprout className="h-7 w-7" />,
      highlight: "Accelerate your growth with purpose-built funding designed to minimize equity dilution.",
      accentColor: "from-green-400 via-emerald-400 to-teal-500"
    },
    {
      title: "Growth Stage",
      description: "Scale your proven model with strategic funding. Our growth investments average 3.5x ROI within 18 months.",
      amount: "$250K-$1M",
      icon: <LineChart className="h-7 w-7" />,
      highlight: "Unlock new markets and scale operations with smart capital backed by industry expertise.",
      accentColor: "from-blue-400 via-sky-400 to-cyan-500"
    },
    {
      title: "Impact Stage",
      description: "Dominate your category with category-defining capital. Our portfolio companies lead in 12+ markets.",
      amount: "$1M-$5M",
      icon: <PiggyBank className="h-7 w-7" />,
      highlight: "Leverage our global network to drive transformative growth and industry leadership.",
      accentColor: "from-violet-400 via-purple-400 to-fuchsia-500"
    }
  ];

  // Market advantages list with enhanced styling
  const marketAdvantages = [
    {
      title: "85% Success Rate",
      description: "Our startups boast an industry-leading success rate for securing follow-on funding",
      icon: <Award className="h-5 w-5" />
    },
    {
      title: "Global Market Access",
      description: "Immediate connections to markets across 30+ countries and 100+ distribution channels",
      icon: <Globe className="h-5 w-5" />
    },
    {
      title: "Expert Growth Team",
      description: "Dedicated team of 20+ industry veterans who've scaled billion-dollar ventures",
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "3x Revenue Acceleration",
      description: "Our portfolio companies average 200% revenue growth within 12 months of funding",
      icon: <LineChart className="h-5 w-5" />
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
                Accelerate Your 
              </span>
              {" "}
              <span className="relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 drop-shadow-lg">
                  Market Dominance
                </span>
              </span>
            </h2>
            
            <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mt-4 sm:mt-5">
              WeSeedU delivers strategic capital, market access, and growth expertise to startups ready to scale their impact and profitability.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">30+ Markets</span>
              <span className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">$150M+ Deployed</span>
              <span className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">85% Success Rate</span>
            </div>
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
                  Market Advantages
                  <div className="absolute -bottom-2 left-0 h-[2px] w-full bg-gradient-to-r from-green-400 to-green-500/0" />
                </span>
              </h3>
              
              {/* Market advantages list */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {marketAdvantages.map((advantage, index) => (
                  <div 
                    key={index} 
                    onMouseEnter={() => setActiveFeature(index)}
                    onMouseLeave={() => setActiveFeature(null)}
                    className={`flex items-start p-2 sm:p-3 rounded-xl transition-all duration-300 ${activeFeature === index ? 'bg-white/5' : ''}`}
                  >
                    <div className={`p-2 sm:p-2.5 rounded-full bg-gradient-to-br from-green-400 to-green-500 mr-3 sm:mr-4 transition-all duration-300 ${activeFeature === index ? 'scale-110' : ''}`}>
                      {advantage.icon}
                    </div>
                    <div>
                      <h4 className="text-white text-base font-bold mb-0.5 sm:mb-1">{advantage.title}</h4>
                      <p className="text-white/80 text-sm sm:text-base">{advantage.description}</p>
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
                  <span className="relative z-10">Fast-Track Your Application</span>
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