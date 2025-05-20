"use client"

import { Button } from "@/components/ui/button"
import { Leaf, Users, TrendingUp, Eye, EyeOff, DollarSign, Award, BarChart, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"


interface DashboardHeroProps {
  user?: any
  profile?: any
  loading?: boolean
}

export function DashboardHero({
  user,
  profile,
  loading
}: DashboardHeroProps) {
  const router = useRouter()
  const [hideBalance, setHideBalance] = useState(false)
  
  const totalInvestments = profile?.total_investments || 0
  const previousMonthInvestments = profile?.previous_month_investments || 0
  const savedCompaniesCount = profile?.saved_companies_count || 0
  const impactScore = profile?.impact_score || 0
  const communitySize = profile?.community_size || 0
  
  // Calculate actual growth percentage
  const calculateGrowthPercentage = () => {
    if (!previousMonthInvestments || previousMonthInvestments === 0) {
      return totalInvestments > 0 ? "New" : "0%";
    }
    
    const growthPercentage = ((totalInvestments - previousMonthInvestments) / previousMonthInvestments) * 100;
    const formattedGrowth = growthPercentage.toFixed(1);
    
    if (growthPercentage > 0) {
      return `+${formattedGrowth}%`;
    } else if (growthPercentage < 0) {
      return `${formattedGrowth}%`;
    } else {
      return "0%";
    }
  };
  
  // Calculate yearly projected impact based on current growth
  const calculateYearlyProjection = () => {
    if (!previousMonthInvestments || previousMonthInvestments === 0) {
      return totalInvestments > 0 ? "+100%" : "0%";
    }
    
    // Simplified projection based on current month-to-month growth
    // Annualized by applying the growth rate over 12 months
    const growthRate = (totalInvestments - previousMonthInvestments) / previousMonthInvestments;
    if (growthRate <= 0) return "0%";
    
    // Project forward for a year (simplified) - capped at 100% for reasonability
    const projectedGrowth = Math.min(growthRate * 12 * 100, 100);
    return `+${projectedGrowth.toFixed(0)}%`;
  };
  
  const growthIndicator = calculateGrowthPercentage();
  const yearlyProjection = calculateYearlyProjection();
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(amount);
  }
  
  return (
    <div className="relative mb-8">
      {/* Card with Green Apple styling */}
      <div className="relative overflow-hidden rounded-xl border border-green-100 shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-green-50/30"></div>
        
        <div className="px-4 py-5 md:px-6 md:py-6 relative z-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Left side - Main content */}
            <div className="lg:col-span-2">
              {/* Status indicator badge with Green Apple styling */}
              <div className="mb-3">
                <div className="inline-flex items-center px-3 py-1 text-[10px] font-medium rounded-full text-white border border-green-400/40 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                  style={{ background: 'linear-gradient(115deg, #70f570, #49c628)' }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse mr-1.5"></span>
                  ACTIVE INVESTOR
                </div>
              </div>
              
              {/* Heading with Green Apple typography */}
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight leading-tight mb-3 font-display">
                Your Impact Dashboard
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-600 mb-4 max-w-lg leading-relaxed font-body">
                Track your sustainable investments and measure the positive impact you&apos;re making on our planet.
              </p>
              
              {/* Stats row with Green Apple styling */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="flex flex-col text-center p-3 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 shadow-sm hover:shadow transition-all duration-300 group hover:translate-y-[-2px]">
                  <div className="mx-auto flex-shrink-0 h-7 w-7 rounded-full bg-gradient-to-r from-[#70f570] to-[#49c628] flex items-center justify-center mb-2 shadow-sm group-hover:shadow">
                    <Award className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-base font-extrabold text-slate-800 font-helvetica">{impactScore}/10</span>
                  <span className="mt-1 text-slate-600 text-[10px] uppercase tracking-wide font-medium">impact score</span>
                </div>
                
                <div className="flex flex-col text-center p-3 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 shadow-sm hover:shadow transition-all duration-300 group hover:translate-y-[-2px]">
                  <div className="mx-auto flex-shrink-0 h-7 w-7 rounded-full bg-gradient-to-r from-[#70f570] to-[#49c628] flex items-center justify-center mb-2 shadow-sm group-hover:shadow">
                    <Users className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-base font-extrabold text-slate-800 font-helvetica">{communitySize}</span>
                  <span className="mt-1 text-slate-600 text-[10px] uppercase tracking-wide font-medium">members</span>
                </div>
                
                <div className="flex flex-col text-center p-3 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 shadow-sm hover:shadow transition-all duration-300 group hover:translate-y-[-2px]">
                  <div className="mx-auto flex-shrink-0 h-7 w-7 rounded-full bg-gradient-to-r from-[#70f570] to-[#49c628] flex items-center justify-center mb-2 shadow-sm group-hover:shadow">
                    <BarChart className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-base font-extrabold text-slate-800 font-helvetica">{savedCompaniesCount}</span>
                  <span className="mt-1 text-slate-600 text-[10px] uppercase tracking-wide font-medium">companies</span>
                </div>
              </div>
              
              {/* Action buttons with Green Apple styling */}
              <div className="flex flex-wrap gap-2">
                <Button 
                  className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold
                            shadow-sm hover:shadow transition-all duration-300 
                            rounded-lg py-2 h-9 px-4 text-xs font-helvetica"
                  onClick={() => router.push("/companies")}
                >
                  <span className="flex items-center justify-center">
                    <Users className="h-3.5 w-3.5 mr-1.5" />
                    Discover Companies
                    <ChevronRight className="ml-1.5 h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-green-200 bg-white text-green-800 hover:bg-green-50 hover:border-green-300 font-semibold
                            shadow-sm hover:shadow transition-all duration-300 
                            rounded-lg py-2 h-9 px-4 text-xs font-helvetica"
                  onClick={() => router.push("/investments")}
                >
                  <span className="flex items-center justify-center">
                    <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
                    Manage Portfolio
                  </span>
                </Button>
              </div>
            </div>
            
            {/* Right column - Investment summary card with Green Apple styling */}
            <div className="lg:mt-0">
              <div 
                className="relative overflow-hidden rounded-xl border border-green-400/30 shadow-[0_15px_40px_rgba(73,198,40,0.15)]"
                style={{ background: 'linear-gradient(135deg, #70f570, #49c628)' }}
              >
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-[0.05]" 
                  style={{ 
                    backgroundImage: `radial-gradient(circle at 30px 30px, rgba(255,255,255,0.4) 2px, transparent 0)`,
                    backgroundSize: "16px 16px"
                  }} 
                />
                
                {/* Card content */}
                <div className="relative z-5 h-full p-4 flex flex-col justify-between">
                  
                  {/* Header with label and visibility toggle */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-white/90 uppercase tracking-widest font-bold font-body">TOTAL INVESTMENT</span>
                      <button 
                        onClick={() => setHideBalance(!hideBalance)}
                        className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
                      >
                        {hideBalance ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                    
                    {/* Separator line */}
                    <div className="w-full h-px bg-gradient-to-r from-white/10 via-white/30 to-white/10 mb-3"></div>
                  </div>
                  
                  {/* Main balance amount */}
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3 border border-white/40 shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
                        <DollarSign className="h-5 w-5 text-white" />
                      </div>
                      {hideBalance ? (
                        <div className="text-xl sm:text-2xl font-extrabold text-white mb-1 font-helvetica">•••••</div>
                      ) : (
                        <div className="text-xl sm:text-2xl font-extrabold text-white mb-1 font-helvetica">
                          {formatCurrency(totalInvestments)}
                        </div>
                      )}
                    </div>
                    
                    {/* Growth indicator */}
                    <div className="ml-[3.25rem] flex items-center mt-1">
                      <div className="flex items-center bg-white/10 text-white px-2 py-0.5 rounded-full text-[10px]">
                        <TrendingUp className="h-2.5 w-2.5 mr-1" />
                        <span>{growthIndicator === "New" ? "New investment" : `${growthIndicator} this month`}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Investment stats */}
                  <div className="mt-4 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/30 shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white/90 text-xs font-medium font-body">Invested Capital</span>
                        <span className="text-white font-bold font-helvetica text-sm">${hideBalance ? "•••••" : totalInvestments.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-px bg-gradient-to-r from-white/5 via-white/20 to-white/5"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/90 text-xs font-medium font-body">Impact Rating</span>
                        <div className="flex items-center">
                          <span className="text-white font-bold font-helvetica text-sm mr-1">{impactScore}/10</span>
                          <Award className="h-3.5 w-3.5 text-white/90" />
                        </div>
                      </div>
                      <div className="w-full h-px bg-gradient-to-r from-white/5 via-white/20 to-white/5"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/90 text-xs font-medium font-body">ESG Performance</span>
                        <div className="flex items-center">
                          <Leaf className="h-3.5 w-3.5 text-white/90 mr-1" />
                          <span className="text-white font-bold font-helvetica text-sm">Excellent</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Projection message */}
                    <div className="mt-3 pt-2 border-t border-white/20 text-center">
                      <div className="text-white/80 text-[10px]">
                        Projected yearly impact: <span className="font-bold">{yearlyProjection}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 