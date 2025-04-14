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
        {/* Main showcase container - Full width with slimmer height */}
        <div className="w-screen relative left-1/2 right-1/2 mx-[-50vw] rounded-none overflow-hidden border-x-0 border-y border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.1)]
          hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow duration-500"
          style={{ 
            backgroundImage: "linear-gradient(115deg, #70f570, #49c628)" 
          }}
        >
          {/* Subtle texture pattern for depth */}
          <div className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: `radial-gradient(circle at 20px 20px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px"
            }} 
          />
          
          {/* Top edge shadow line for definition */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/30 via-white/40 to-white/30 z-10" />
          
          {/* Inner shadow effects for depth */}
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white/10 to-transparent opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white/10 to-transparent"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
            {/* Featured section column - Left side - Now spans 3 columns */}
            <motion.div 
              className="lg:col-span-3 relative overflow-hidden bg-white/10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L3N2Zz4=')] mix-blend-overlay"></div>
              
              <motion.div 
                variants={containerVariants}
                className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between"
              >
                <div>
                  <motion.div 
                    variants={itemVariants}
                    className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/30 shadow-[0_4px_12px_rgba(0,0,0,0.05)] mb-4"
                  >
                    <Rocket className="h-3 w-3 text-white" />
                    <span className="text-xs font-medium text-white font-helvetica">Future of Investing</span>
                  </motion.div>
                  
                  <motion.h3 
                    variants={itemVariants}
                    className="text-xl sm:text-2xl font-extrabold text-white mb-3 leading-tight tracking-tight font-display"
                  >
                    Discover and Invest in
                    <span className="ml-1">Innovative Sustainable</span>
                    <span className="ml-1">Solutions</span>
                  </motion.h3>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="mb-6"
                  >
                    <p className="text-white text-sm leading-relaxed font-light font-body">
                      Our marketplace connects you with cutting-edge companies creating positive environmental and social impact.
                    </p>
                  </motion.div>
                </div>
                
                <motion.div 
                  variants={itemVariants}
                >
               
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Stats section - Middle - Now spans 4 columns */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-4 bg-white/20 backdrop-blur-sm p-6 sm:p-8"
            >
              <div className="grid grid-cols-2 gap-3 h-full">
                {[
                  { 
                    label: "Growth", 
                    value: "42%", 
                    desc: "Sustainable investing growth",
                    icon: <TrendingUp className="h-4 w-4 text-white" />,
                  },
                  { 
                    label: "Returns", 
                    value: "24%", 
                    desc: "Average market returns",
                    icon: <DollarSign className="h-4 w-4 text-white" />,
                  },
                  { 
                    label: "Global Impact", 
                    value: "$30.7T", 
                    desc: "Sustainability investments",
                    icon: <Globe className="h-4 w-4 text-white" />,
                  },
                  { 
                    label: "Community", 
                    value: "30K+", 
                    desc: "Active investors",
                    icon: <Users className="h-4 w-4 text-white" />,
                  }
                ].map((stat, index) => (
                  <motion.div
                    variants={itemVariants}
                    key={index}
                    className="relative overflow-hidden rounded-lg border border-white/20 bg-white/10 
                      shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]
                      hover:border-white/30 transition-all duration-300 p-3"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center
                        border border-white/30">
                        {stat.icon}
                      </div>
                      <span className="text-xs font-medium text-white font-helvetica">{stat.label}</span>
                    </div>
                    <p className="text-lg font-extrabold text-white font-helvetica">{stat.value}</p>
                    <p className="text-white/80 text-xs font-body">{stat.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Key benefits section - Right side - Now spans 5 columns */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-5 bg-white/10 backdrop-blur-sm p-6 sm:p-8"
            >
              <motion.div 
                variants={itemVariants}
              >
                <h4 className="font-medium text-white flex items-center text-sm mb-3 font-display">
                  <Shield className="h-4 w-4 mr-2 text-white" />
                  <span>Key Benefits</span>
                </h4>
                
                <div className="flex flex-wrap gap-3">
                  {[
                    {
                      title: "Financial Performance",
                      description: "ESG-focused investments often outperform traditional markets over time",
                      icon: <LineChart className="h-4 w-4 text-white" />
                    },
                    {
                      title: "Positive Impact",
                      description: "Direct your capital toward businesses creating measurable environmental improvements",
                      icon: <Globe className="h-4 w-4 text-white" />
                    },
                    {
                      title: "Innovative Solutions",
                      description: "Support cutting-edge technologies addressing critical global challenges",
                      icon: <Sparkles className="h-4 w-4 text-white" />
                    }
                  ].map((item, index) => (
                    <motion.div 
                      variants={itemVariants}
                      key={index}
                      className="flex-1 min-w-[180px] p-3 bg-white/10 rounded-lg border border-white/20 hover:border-white/30 
                        transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                          {item.icon}
                        </div>
                        <h5 className="text-xs font-medium text-white font-helvetica">{item.title}</h5>
                      </div>
                      <p className="text-white/80 text-xs font-body">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 