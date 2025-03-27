"use client"

import { Button } from "@/components/ui/button"
import { Leaf, Globe, Users, TrendingUp, ArrowRight, Eye, EyeOff, DollarSign, Award, BarChart } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useState } from "react"

interface DashboardHeroProps {
  user?: any
  profile?: any
  loading?: boolean
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.09,
      duration: 0.5
    }
  }
}

const itemVariants = {
  hidden: { y: 12, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 250, damping: 20 }
  }
}

export function DashboardHero({
  user,
  profile,
  loading
}: DashboardHeroProps) {
  const router = useRouter()
  const [hideBalance, setHideBalance] = useState(false)
  
  const totalInvestments = profile?.total_investments || 0
  const savedCompaniesCount = profile?.saved_companies_count || 0
  const impactScore = profile?.impact_score || 0
  const communitySize = profile?.community_size || 0
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(amount);
  }
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative mb-12"
    >
      {/* Monochromatic card with depth */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
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
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30"></div>
        
        {/* Inner shadow effects for depth */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50/50 to-transparent"></div>
        
        <div className="px-8 py-12 md:px-12 md:py-14 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">
            {/* Left side - Main content */}
            <div className="lg:col-span-2">
              {/* Status indicator - high contrast */}
              <motion.div variants={itemVariants} className="mb-5">
                <div className="inline-flex items-center bg-slate-900 px-3 py-1 rounded-full text-xs font-medium
                  text-white tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5 animate-pulse"></span>
                  ACTIVE INVESTOR
                </div>
              </motion.div>
              
              {/* Heading - enhanced typography */}
              <motion.h1 
                variants={itemVariants}
                className="text-2xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight"
              >
                Your Impact Dashboard
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-slate-600 text-sm md:text-base mb-8 max-w-xl leading-relaxed"
              >
                Track your sustainable investments and measure the positive impact you're making on our planet.
              </motion.p>
              
              {/* Stats row - monochromatic badges with depth */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4 mb-10"
              >
                <div className="inline-flex items-center px-4 py-2 rounded-lg text-sm 
                  border border-slate-200 text-slate-900 bg-white/80
                  shadow-[0_4px_20px_rgba(0,0,0,0.03)] 
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                  transition-all duration-300 hover:border-slate-300 group">
                  <Award className="h-4 w-4 mr-2.5 text-slate-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-semibold">{impactScore}/10</span>
                  <span className="ml-1.5 text-slate-500 text-xs uppercase tracking-wide">impact score</span>
                </div>
                
                <div className="inline-flex items-center px-4 py-2 rounded-lg text-sm 
                  border border-slate-200 text-slate-900 bg-white/80
                  shadow-[0_4px_20px_rgba(0,0,0,0.03)] 
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                  transition-all duration-300 hover:border-slate-300 group">
                  <Users className="h-4 w-4 mr-2.5 text-slate-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-semibold">{communitySize}</span>
                  <span className="ml-1.5 text-slate-500 text-xs uppercase tracking-wide">members</span>
                </div>
                
                <div className="inline-flex items-center px-4 py-2 rounded-lg text-sm 
                  border border-slate-200 text-slate-900 bg-white/80
                  shadow-[0_4px_20px_rgba(0,0,0,0.03)] 
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                  transition-all duration-300 hover:border-slate-300 group">
                  <BarChart className="h-4 w-4 mr-2.5 text-slate-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-semibold">{savedCompaniesCount}</span>
                  <span className="ml-1.5 text-slate-500 text-xs uppercase tracking-wide">companies</span>
                </div>
              </motion.div>
              
              {/* Action buttons - high contrast */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <Button 
                  className="bg-slate-900 text-white font-medium px-6 py-3 rounded-lg
                    shadow-[0_4px_10px_rgba(0,0,0,0.1)] 
                    hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] 
                    transition-all duration-300 ease-out
                    hover:translate-y-[-2px)]"
                  onClick={() => router.push("/companies")}
                >
                  <Users className="h-4 w-4 mr-2 opacity-80" />
                  Discover Companies
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium px-6 py-3 rounded-lg
                    shadow-[0_2px_10px_rgba(0,0,0,0.02)] 
                    hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] 
                    transition-all duration-300 ease-out
                    hover:translate-y-[-2px)] hover:border-slate-300"
                  onClick={() => router.push("/investments")}
                >
                  <TrendingUp className="h-4 w-4 mr-2 text-slate-600" />
                  Manage Portfolio
                </Button>
              </motion.div>
            </div>
            
            {/* Right column - Investment summary with dramatic styling */}
            <motion.div
              variants={itemVariants}
              className="lg:mt-0"
            >
              <div className="rounded-xl overflow-hidden 
                shadow-[0_8px_30px_rgba(0,0,0,0.1)] 
                p-7 h-full flex flex-col justify-between relative"
                style={{ 
                  backgroundImage: "linear-gradient(to right top, #b79b35, #c7b462, #d7cc8d, #e9e4b9, #fdfce5)" 
                }}
              >
                
                {/* Diagonal light streak for visual interest */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-slate-900/5 rotate-45 blur-sm"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-slate-900/5 rotate-45 blur-sm"></div>
                
                {/* Header with label and visibility toggle */}
                <div className="mb-5 relative z-10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-800 uppercase tracking-widest font-medium">TOTAL INVESTMENT</span>
                    <button 
                      onClick={() => setHideBalance(!hideBalance)}
                      className="text-slate-700 hover:text-slate-900 transition-colors"
                    >
                      {hideBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  
                  {/* Thin separator line */}
                  <div className="w-full h-px bg-slate-700/30 mb-4"></div>
                </div>
                
                {/* Main balance amount - dramatic sizing */}
                <div className="flex-1 relative z-10">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-slate-900/10 flex items-center justify-center mr-3">
                      <DollarSign className="h-5 w-5 text-slate-800" />
                    </div>
                    {hideBalance ? (
                      <div className="text-3xl md:text-5xl font-bold text-slate-900 mb-1">•••••</div>
                    ) : (
                      <div className="text-3xl md:text-5xl font-bold text-slate-900 mb-1">
                        {formatCurrency(totalInvestments)}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Investment stats - with subtle pattern */}
                <div className="mt-6 bg-slate-900/10 rounded-lg p-4 backdrop-blur-sm relative z-10">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 text-xs">Invested Capital</span>
                      <span className="text-slate-900 font-medium">${hideBalance ? "•••••" : totalInvestments.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-px bg-slate-700/20"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 text-xs">Impact Rating</span>
                      <div className="flex items-center">
                        <span className="text-slate-900 font-medium mr-1">{impactScore}/10</span>
                        <Award className="h-3.5 w-3.5 text-slate-700" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 