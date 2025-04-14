"use client"

import { Button } from "@/components/ui/button"
import { Leaf, Globe, Users, TrendingUp, ArrowRight, Eye, EyeOff, DollarSign, Award, BarChart } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"

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
      staggerChildren: 0.08,
      duration: 0.5
    }
  }
}

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
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
      {/* White card on green background */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
        {/* Simple white background */}
        <div className="absolute inset-0 bg-white"></div>
        
        <div className="px-6 py-8 md:px-10 md:py-10 relative z-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side - Main content */}
            <div className="lg:col-span-2">
              {/* Status indicator badge */}
              <motion.div variants={itemVariants} className="mb-5">
                <div className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-full text-white border border-white/30 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                  style={{ background: 'linear-gradient(115deg, rgba(112,245,112,0.9), rgba(73,198,40,0.8))' }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse mr-1.5 sm:mr-2"></span>
                  ACTIVE INVESTOR
                </div>
              </motion.div>
              
              {/* Heading */}
              <motion.h1 
                variants={itemVariants}
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight leading-[1.15] mb-4 font-display"
              >
                Your Impact Dashboard
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-sm sm:text-base text-black/80 mb-6 max-w-xl leading-relaxed font-body"
              >
                Track your sustainable investments and measure the positive impact you're making on our planet.
              </motion.p>
              
              {/* Stats row */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4 mb-8"
              >
                <div className="flex items-center text-xs sm:text-sm md:text-base text-black font-body bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg px-4 py-2 border border-green-100">
                  <div className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-gradient-to-br from-[#70f570] to-[#49c628] flex items-center justify-center mr-2 sm:mr-3">
                    <Award className="h-2.5 w-2.5 text-white" />
                  </div>
                  <span className="font-medium">{impactScore}/10</span>
                  <span className="ml-1.5 text-black/60 text-xs uppercase tracking-wide">impact score</span>
                </div>
                
                <div className="flex items-center text-xs sm:text-sm md:text-base text-black font-body bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg px-4 py-2 border border-green-100">
                  <div className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-gradient-to-br from-[#70f570] to-[#49c628] flex items-center justify-center mr-2 sm:mr-3">
                    <Users className="h-2.5 w-2.5 text-white" />
                  </div>
                  <span className="font-medium">{communitySize}</span>
                  <span className="ml-1.5 text-black/60 text-xs uppercase tracking-wide">members</span>
                </div>
                
                <div className="flex items-center text-xs sm:text-sm md:text-base text-black font-body bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg px-4 py-2 border border-green-100">
                  <div className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-gradient-to-br from-[#70f570] to-[#49c628] flex items-center justify-center mr-2 sm:mr-3">
                    <BarChart className="h-2.5 w-2.5 text-white" />
                  </div>
                  <span className="font-medium">{savedCompaniesCount}</span>
                  <span className="ml-1.5 text-black/60 text-xs uppercase tracking-wide">companies</span>
                </div>
              </motion.div>
              
              {/* Action buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <Button 
                  className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold
                            shadow-sm hover:shadow transition-all duration-300 
                            rounded-lg py-3 sm:py-5 text-sm sm:text-base font-helvetica"
                  onClick={() => router.push("/companies")}
                >
                  <span className="flex items-center justify-center">
                    <Users className="h-4 w-4 mr-2" />
                    Discover Companies
                  </span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-green-200 bg-white text-green-800 hover:bg-green-50 hover:border-green-300 font-semibold
                            shadow-sm hover:shadow transition-all duration-300 
                            rounded-lg py-3 sm:py-5 text-sm sm:text-base font-helvetica"
                  onClick={() => router.push("/investments")}
                >
                  <span className="flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Manage Portfolio
                  </span>
                </Button>
              </motion.div>
            </div>
            
            {/* Right column - Investment summary */}
            <motion.div
              variants={itemVariants}
              className="lg:mt-0"
            >
              <div className="relative overflow-hidden rounded-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                style={{ background: 'linear-gradient(115deg, #70f570, #49c628)' }}
              >
                {/* Card content */}
                <div className="relative z-5 h-full p-4 sm:p-6 flex flex-col justify-between">
                  
                  {/* Header with label and visibility toggle */}
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-white uppercase tracking-widest font-medium font-body">TOTAL INVESTMENT</span>
                      <button 
                        onClick={() => setHideBalance(!hideBalance)}
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        {hideBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    
                    {/* Thin separator line */}
                    <div className="w-full h-px bg-white/30 mb-4"></div>
                  </div>
                  
                  {/* Main balance amount */}
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3 border border-white/40 shadow-md">
                        <DollarSign className="h-5 w-5 text-white" />
                      </div>
                      {hideBalance ? (
                        <div className="text-3xl md:text-4xl font-extrabold text-white mb-1 font-helvetica">•••••</div>
                      ) : (
                        <div className="text-3xl md:text-4xl font-extrabold text-white mb-1 font-helvetica">
                          {formatCurrency(totalInvestments)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Investment stats */}
                  <div className="mt-6 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/30">
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white/90 text-xs font-body">Invested Capital</span>
                        <span className="text-white font-medium font-helvetica">${hideBalance ? "•••••" : totalInvestments.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-px bg-white/20"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/90 text-xs font-body">Impact Rating</span>
                        <div className="flex items-center">
                          <span className="text-white font-medium font-helvetica mr-1">{impactScore}/10</span>
                          <Award className="h-3.5 w-3.5 text-white/80" />
                        </div>
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