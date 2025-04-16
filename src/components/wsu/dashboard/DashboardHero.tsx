"use client"

import { Button } from "@/components/ui/button"
import { Leaf, Globe, Users, TrendingUp, ArrowRight, Eye, EyeOff, DollarSign, Award, BarChart, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

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

const pulseVariant = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.03, 1],
    boxShadow: [
      "0 8px 30px rgba(0,0,0,0.12)",
      "0 12px 40px rgba(0,0,0,0.15)",
      "0 8px 30px rgba(0,0,0,0.12)"
    ],
    transition: { 
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse"
    }
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
      {/* Enhanced white card on subtle green background gradient */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-green-100 shadow-[0_15px_50px_rgba(0,0,0,0.1)]">
        {/* Background with subtle gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-green-50/30"></div>
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 20px 20px, #49c628 1px, transparent 0)`,
            backgroundSize: "30px 30px"
          }} 
        />
        
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-gradient-to-br from-[#70f570]/5 to-[#49c628]/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-gradient-to-br from-[#70f570]/5 to-[#49c628]/10 blur-3xl"></div>
        
        <div className="px-6 py-8 md:px-10 md:py-10 relative z-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side - Main content */}
            <div className="lg:col-span-2">
              {/* Enhanced status indicator badge */}
              <motion.div variants={itemVariants} className="mb-5">
                <div className="inline-flex items-center px-3.5 sm:px-4.5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium rounded-full text-white border border-green-400/40 shadow-[0_5px_15px_rgba(73,198,40,0.25)]"
                  style={{ background: 'linear-gradient(115deg, rgba(112,245,112,0.95), rgba(73,198,40,0.90))' }}
                >
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse mr-2 sm:mr-2.5"></span>
                  ACTIVE INVESTOR
                </div>
              </motion.div>
              
              {/* Enhanced Heading */}
              <motion.h1 
                variants={itemVariants}
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-[1.15] mb-4 font-display relative inline-block"
              >
                Your Impact Dashboard
                <div className="absolute -bottom-1 left-0 w-1/2 h-1 bg-gradient-to-r from-[#70f570] to-[#49c628]/60 rounded-full"></div>
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-sm sm:text-base text-slate-600 mb-8 max-w-xl leading-relaxed font-body"
              >
                Track your sustainable investments and measure the positive impact you're making on our planet. Our dashboard gives you a comprehensive overview of your portfolio performance.
              </motion.p>
              
              {/* Enhanced Stats row */}
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
              >
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(73,198,40,0.2)" }}
                  className="flex flex-col text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100/70 border border-green-200 shadow-md transition-all duration-300"
                >
                  <div className="mx-auto flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-[#70f570] to-[#49c628] flex items-center justify-center mb-3 shadow-lg shadow-green-200/50">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-slate-800 font-helvetica">{impactScore}/10</span>
                  <span className="mt-1 text-slate-600 text-xs uppercase tracking-wide font-medium">impact score</span>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(73,198,40,0.2)" }}
                  className="flex flex-col text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100/70 border border-green-200 shadow-md transition-all duration-300"
                >
                  <div className="mx-auto flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-[#70f570] to-[#49c628] flex items-center justify-center mb-3 shadow-lg shadow-green-200/50">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-slate-800 font-helvetica">{communitySize}</span>
                  <span className="mt-1 text-slate-600 text-xs uppercase tracking-wide font-medium">members</span>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(73,198,40,0.2)" }}
                  className="flex flex-col text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100/70 border border-green-200 shadow-md transition-all duration-300"
                >
                  <div className="mx-auto flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-[#70f570] to-[#49c628] flex items-center justify-center mb-3 shadow-lg shadow-green-200/50">
                    <BarChart className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-slate-800 font-helvetica">{savedCompaniesCount}</span>
                  <span className="mt-1 text-slate-600 text-xs uppercase tracking-wide font-medium">companies</span>
                </motion.div>
              </motion.div>
              
              {/* Enhanced Action buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <Button 
                  className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold
                            shadow-lg hover:shadow-xl transition-all duration-300 
                            rounded-lg py-6 px-6 text-sm sm:text-base font-helvetica group hover:translate-y-[-2px]"
                  onClick={() => router.push("/companies")}
                >
                  <span className="flex items-center justify-center">
                    <Users className="h-4 w-4 mr-2" />
                    Discover Companies
                    <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300 opacity-70 group-hover:opacity-100" />
                  </span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-green-200 bg-white text-green-800 hover:bg-green-50 hover:border-green-300 font-semibold
                            shadow-md hover:shadow-lg transition-all duration-300 
                            rounded-lg py-6 px-6 text-sm sm:text-base font-helvetica hover:translate-y-[-2px]"
                  onClick={() => router.push("/investments")}
                >
                  <span className="flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Manage Portfolio
                  </span>
                </Button>
              </motion.div>
            </div>
            
            {/* Right column - Enhanced Investment summary card */}
            <motion.div
              variants={itemVariants}
              className="lg:mt-0"
            >
              <motion.div 
                initial="initial"
                animate="animate"
                variants={pulseVariant}
                className="relative overflow-hidden rounded-xl border border-green-400/30 shadow-[0_15px_40px_rgba(73,198,40,0.15)]"
                style={{ background: 'linear-gradient(135deg, #70f570, #49c628)' }}
              >
                {/* Decorative pattern overlay */}
                <div className="absolute inset-0 opacity-[0.1]" 
                  style={{ 
                    backgroundImage: `radial-gradient(circle at 30px 30px, rgba(255,255,255,0.4) 2px, transparent 0)`,
                    backgroundSize: "16px 16px"
                  }} 
                />
                
                {/* Decorative glowing orb */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/20 blur-xl"></div>
                
                {/* Card content with improved styling */}
                <div className="relative z-5 h-full p-5 sm:p-7 flex flex-col justify-between">
                  
                  {/* Header with label and visibility toggle */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs sm:text-sm text-white/90 uppercase tracking-widest font-bold font-body">TOTAL INVESTMENT</span>
                      <button 
                        onClick={() => setHideBalance(!hideBalance)}
                        className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                      >
                        {hideBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    
                    {/* Enhanced separator line */}
                    <div className="w-full h-px bg-gradient-to-r from-white/10 via-white/30 to-white/10 mb-4"></div>
                  </div>
                  
                  {/* Main balance amount with enhanced styling */}
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center mr-4 border border-white/40 shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
                        <DollarSign className="h-7 w-7 text-white" />
                      </div>
                      {hideBalance ? (
                        <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-1 font-helvetica">•••••</div>
                      ) : (
                        <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-1 font-helvetica">
                          {formatCurrency(totalInvestments)}
                        </div>
                      )}
                    </div>
                    
                    {/* Added growth indicator */}
                    <div className="ml-[4.5rem] flex items-center mt-2">
                      <div className="flex items-center bg-white/10 text-white px-2 py-1 rounded-full text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        <span>+5.2% this month</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Investment stats */}
                  <div className="mt-8 bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/30 shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
                    <div className="flex flex-col space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/90 text-xs sm:text-sm font-medium font-body">Invested Capital</span>
                        <span className="text-white font-bold font-helvetica text-base sm:text-lg">${hideBalance ? "•••••" : totalInvestments.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-px bg-gradient-to-r from-white/5 via-white/20 to-white/5"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/90 text-xs sm:text-sm font-medium font-body">Impact Rating</span>
                        <div className="flex items-center">
                          <span className="text-white font-bold font-helvetica text-base sm:text-lg mr-2">{impactScore}/10</span>
                          <Award className="h-4 w-4 text-white/90" />
                        </div>
                      </div>
                      <div className="w-full h-px bg-gradient-to-r from-white/5 via-white/20 to-white/5"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/90 text-xs sm:text-sm font-medium font-body">ESG Performance</span>
                        <div className="flex items-center">
                          <Leaf className="h-4 w-4 text-white/90 mr-1.5" />
                          <span className="text-white font-bold font-helvetica text-base sm:text-lg">Excellent</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Added projection message */}
                    <div className="mt-4 pt-4 border-t border-white/20 text-center">
                      <div className="text-white/80 text-xs">
                        Projected yearly impact: <span className="font-bold">+27%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 