"use client"

import { motion } from "framer-motion"
import { Shield, TrendingUp, DollarSign, Globe, LineChart, Users, Rocket, ArrowRight, Sparkles } from "lucide-react"

interface MarketplaceIntroductionProps {
  onScrollToCompanies?: () => void
}

export function MarketplaceIntroduction({ onScrollToCompanies }: MarketplaceIntroductionProps) {
  // If no custom scroll handler is provided, use default scrolling behavior
 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  }

  return (
    <div className="mb-16">
      <div className="relative">
        {/* Main showcase container with full width */}
        <motion.div 
          className="w-screen relative left-1/2 right-1/2 mx-[-50vw] rounded-none overflow-hidden border-4 border-white bg-white shadow-[0_8px_30px_rgba(0,0,0,0.15)]
          transition-shadow duration-500 min-h-[550px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Background subtle pattern */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-green-50 via-transparent to-transparent opacity-70"></div>
          
          {/* Green accent bar */}
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#70f570] to-[#49c628]"></div>

          {/* Main content grid */}
          <div className="grid grid-cols-12 h-full relative z-10">
            {/* Left column - featured section */}
            <motion.div 
              className="col-span-12 lg:col-span-4 relative overflow-hidden p-8 md:p-10"
              variants={containerVariants}
            >
              <motion.div 
                variants={containerVariants}
                className="relative z-10 h-full flex flex-col justify-between"
              >
                <div>
                  <motion.div 
                    variants={itemVariants}
                    className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 shadow-[0_2px_10px_rgba(0,0,0,0.1)] mb-5"
                  >
                    <Rocket className="h-3.5 w-3.5 text-green-700" />
                    <span className="text-xs font-medium text-green-700 font-helvetica">Future of Investing</span>
                  </motion.div>
                  
                  <motion.h3 
                    variants={itemVariants}
                    className="text-2xl sm:text-3xl md:text-4xl font-black text-green-800 mb-5 leading-tight tracking-tight font-display"
                  >
                    Discover and Invest
                    <br />in <span className="text-green-700">Innovative</span>
                    <br />Sustainable Solutions
                  </motion.h3>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="mb-6"
                  >
                    <p className="text-green-700 text-sm sm:text-base leading-relaxed font-body">
                      Our marketplace connects you with cutting-edge companies creating positive environmental and social impact. We carefully vet sustainable businesses focusing on renewable energy, circular economy, and regenerative agriculture to ensure both meaningful impact and strong financial performance. Explore opportunities aligned with your values and investment goals.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Middle section - Stats (4 column) */}
            <motion.div 
              variants={containerVariants}
              className="col-span-12 lg:col-span-4 p-8 md:p-10 border-l border-green-100"
            >
              <div className="grid grid-cols-2 gap-5 h-full">
                {[
                  { 
                    label: "Growth", 
                    value: "42%", 
                    desc: "Sustainable investing growth",
                    icon: <TrendingUp className="h-4 w-4 text-green-700" />,
                  },
                  { 
                    label: "Returns", 
                    value: "24%", 
                    desc: "Average market returns",
                    icon: <DollarSign className="h-4 w-4 text-green-700" />,
                  },
                  { 
                    label: "Global Impact", 
                    value: "$30.7T", 
                    desc: "Sustainability investments",
                    icon: <Globe className="h-4 w-4 text-green-700" />,
                  },
                  { 
                    label: "Community", 
                    value: "30K+", 
                    desc: "Active investors",
                    icon: <Users className="h-4 w-4 text-green-700" />,
                  }
                ].map((stat, index) => (
                  <motion.div
                    variants={itemVariants}
                    key={index}
                    className="relative overflow-hidden rounded-lg border border-green-200 bg-green-50/40 
                      shadow-sm p-5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center
                        border border-green-200">
                        {stat.icon}
                      </div>
                      <span className="text-xs font-medium text-green-700 font-helvetica">{stat.label}</span>
                    </div>
                    <p className="text-lg font-bold text-green-700 font-helvetica">{stat.value}</p>
                    <p className="text-green-600 text-xs font-body">{stat.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Right section - Key benefits */}
            <motion.div 
              variants={containerVariants}
              className="col-span-12 lg:col-span-4 p-8 md:p-10 border-l border-green-100"
            >
              <motion.div 
                variants={itemVariants}
                className="h-full flex flex-col"
              >
                <h4 className="font-medium text-green-800 flex items-center text-base mb-5 font-display">
                  <Shield className="h-4 w-4 mr-2 text-green-700" />
                  <span>Key Benefits</span>
                </h4>
                
                <div className="flex flex-col gap-4 flex-grow">
                  {[
                    {
                      title: "Financial Performance",
                      description: "ESG-focused investments often outperform traditional markets over time",
                      icon: <LineChart className="h-4 w-4 text-green-700" />
                    },
                    {
                      title: "Positive Impact",
                      description: "Direct your capital toward businesses creating measurable environmental improvements",
                      icon: <Globe className="h-4 w-4 text-green-700" />
                    },
                    {
                      title: "Innovative Solutions",
                      description: "Support cutting-edge technologies addressing critical global challenges",
                      icon: <Sparkles className="h-4 w-4 text-green-700" />
                    }
                  ].map((item, index) => (
                    <motion.div 
                      variants={itemVariants}
                      key={index}
                      className="bg-green-50/60 rounded-lg border border-green-200 p-5"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-green-200">
                          {item.icon}
                        </div>
                        <h5 className="text-xs font-medium text-green-700 font-helvetica">{item.title}</h5>
                      </div>
                      <p className="text-green-600 text-xs sm:text-sm leading-relaxed font-body">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
                
                {onScrollToCompanies && (
                  <motion.div variants={itemVariants} className="mt-7">
                    <button 
                      onClick={onScrollToCompanies}
                      className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold px-5 py-2.5 text-sm font-helvetica shadow-md hover:shadow-lg transition-all duration-300 rounded-lg flex items-center"
                    >
                      <span className="mr-2">View Companies</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 