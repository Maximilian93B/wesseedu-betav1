"use client"

import { motion } from "framer-motion"
import { Shield, TrendingUp, DollarSign, Globe, LineChart, Users, Rocket, ArrowRight, Sparkles } from "lucide-react"

interface MarketplaceIntroductionProps {
  onScrollToCompanies?: () => void
}

export function MarketplaceIntroduction({ onScrollToCompanies }: MarketplaceIntroductionProps) {
  // If no custom scroll handler is provided, use default scrolling behavior
  const scrollToCompanies = () => {
    if (onScrollToCompanies) {
      onScrollToCompanies()
    } else {
      const companiesSection = document.getElementById('companies-section')
      if (companiesSection) {
        companiesSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

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
    <div className="mb-28">
      <div className="relative">
        {/* Main showcase container */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]
          hover:shadow-[0_10px_30px_rgb(0,0,0,0.06)] transition-shadow duration-500 relative"
          style={{ 
            backgroundImage: "linear-gradient(to right top, #ffffff, #f6f6ff, #eaefff, #dae8ff, #c8e2ff)" 
          }}
        >
          {/* Subtle texture pattern for depth */}
          <div className="absolute inset-0 opacity-[0.02]" 
            style={{ 
              backgroundImage: `radial-gradient(circle at 20px 20px, black 1px, transparent 0)`,
              backgroundSize: "40px 40px"
            }} 
          />
          
          {/* Top edge shadow line for definition */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30 z-10" />
          
          {/* Inner shadow effects for depth */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50/50 to-transparent"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 relative z-10">
            {/* Featured section column - Left side */}
            <motion.div 
              className="lg:col-span-2 relative overflow-hidden bg-white/50 lg:min-h-[480px]"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L3N2Zz4=')] mix-blend-overlay"></div>
              
              <motion.div 
                variants={containerVariants}
                className="relative z-10 p-12 lg:p-14 h-full flex flex-col justify-between"
              >
                <div>
                  <motion.div 
                    variants={itemVariants}
                    className="inline-flex items-center gap-2 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] mb-8"
                  >
                    <Rocket className="h-3.5 w-3.5 text-slate-600" />
                    <span className="text-xs font-medium text-slate-700">Future of Investing</span>
                  </motion.div>
                  
                  <motion.h3 
                    variants={itemVariants}
                    className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-tight"
                  >
                    Discover and Invest in<br />
                    <span className="text-slate-700">Innovative Sustainable</span><br />
                    Solutions
                  </motion.h3>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="mb-10"
                  >
                    <p className="text-slate-600 text-lg leading-relaxed">
                      Our marketplace connects you with cutting-edge companies creating positive environmental and social impact while generating competitive financial returns.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8"
                  >
                    {/* Stats Card 1 */}
                    <div className="bg-white backdrop-blur-sm rounded-lg border border-slate-200 p-5
                      shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] 
                      transition-all duration-300 group relative overflow-hidden">
                      {/* Subtle top accent */}
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30"></div>
                      
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3
                          shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-200
                          group-hover:scale-110 transition-transform duration-200">
                          <TrendingUp className="h-4 w-4 text-slate-600" />
                        </div>
                        <span className="text-slate-700 font-medium">Growth</span>
                      </div>
                      <p className="text-slate-600 text-sm">Sustainable investing grew 42% from 2018-2020</p>
                    </div>
                    
                    {/* Stats Card 2 */}
                    <div className="bg-white backdrop-blur-sm rounded-lg border border-slate-200 p-5
                      shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] 
                      transition-all duration-300 group relative overflow-hidden">
                      {/* Subtle top accent */}
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30"></div>
                      
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3
                          shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-200
                          group-hover:scale-110 transition-transform duration-200">
                          <DollarSign className="h-4 w-4 text-slate-600" />
                        </div>
                        <span className="text-slate-700 font-medium">Returns</span>
                      </div>
                      <p className="text-slate-600 text-sm">ESG investments often outperform traditional markets</p>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div 
                  variants={itemVariants}
                  className="mt-10"
                >
                  <button 
                    onClick={scrollToCompanies}
                    className="bg-slate-900 hover:bg-slate-800 text-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]
                    hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out 
                    hover:translate-y-[-2px] px-6 py-3 rounded-lg flex items-center"
                  >
                    <span>Explore All Companies</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Right side stats/info */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-3 bg-white/60 backdrop-blur-sm p-10 lg:p-12"
            >
              <motion.div 
                variants={itemVariants}
                className="mb-12"
              >
                <h4 className="text-slate-800 font-medium flex items-center text-lg mb-8">
                  <LineChart className="h-5 w-5 mr-2.5 text-slate-600" />
                  <span>Market Impact Stats</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                  {[
                    {
                      value: "$30.7T",
                      label: "Global sustainable investments",
                      growth: "+34%",
                      icon: <Globe className="h-6 w-6 text-slate-600" />,
                      bgColor: "bg-slate-50",
                      accentGradient: "from-slate-300/30 via-slate-400/20 to-slate-300/30"
                    },
                    {
                      value: "75%",
                      label: "Of investors want sustainable options",
                      growth: "+12%",
                      icon: <TrendingUp className="h-6 w-6 text-slate-600" />,
                      bgColor: "bg-slate-50",
                      accentGradient: "from-slate-300/30 via-slate-400/20 to-slate-300/30"
                    },
                    {
                      value: "86%",
                      label: "Of millennials prefer impact investing",
                      growth: "+18%",
                      icon: <Users className="h-6 w-6 text-slate-600" />,
                      bgColor: "bg-slate-50",
                      accentGradient: "from-slate-300/30 via-slate-400/20 to-slate-300/30"
                    }
                  ].map((stat, index) => (
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.08)"
                      }}
                      key={index}
                      className="relative overflow-hidden rounded-xl border border-slate-200 bg-white 
                        shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                        hover:border-slate-300 transition-all duration-300 p-6 group"
                    >
                      {/* Subtle top accent line */}
                      <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${stat.accentGradient}`}></div>
                      
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-10 h-10 rounded-full ${stat.bgColor} 
                          flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-200
                          group-hover:scale-110 transition-transform duration-200`}>
                          {stat.icon}
                        </div>
                        <div className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                          {stat.growth}
                        </div>
                      </div>
                      
                      <h5 className="text-2xl font-bold text-slate-800 mt-4">{stat.value}</h5>
                      <p className="text-slate-600 text-sm mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Key benefits section */}
              <motion.div 
                variants={itemVariants}
                className="mt-10"
              >
                <h4 className="font-medium text-slate-800 flex items-center text-lg mb-5">
                  <Shield className="h-5 w-5 mr-2.5 text-slate-600" />
                  <span>Key Benefits</span>
                </h4>
                
                <div className="space-y-4">
                  {[
                    {
                      title: "Financial Performance",
                      description: "ESG-focused investments often outperform traditional markets over time",
                      dotColor: "bg-slate-700",
                      textColor: "text-slate-700"
                    },
                    {
                      title: "Positive Impact",
                      description: "Direct your capital toward businesses creating measurable environmental and social improvements",
                      dotColor: "bg-slate-600",
                      textColor: "text-slate-700"
                    },
                    {
                      title: "Innovative Solutions",
                      description: "Support cutting-edge technologies addressing critical global challenges",
                      dotColor: "bg-slate-500",
                      textColor: "text-slate-700"
                    }
                  ].map((item, index) => (
                    <motion.div 
                      variants={itemVariants}
                      key={index} 
                      className="flex gap-3 hover:translate-x-1 transition-transform duration-300"
                    >
                      <div className={`mt-1.5 h-2 w-2 rounded-full ${item.dotColor} flex-shrink-0`}></div>
                      <div>
                        <h5 className={`font-medium text-sm mb-1 ${item.textColor}`}>{item.title}</h5>
                        <p className="text-slate-600 text-sm">{item.description}</p>
                      </div>
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