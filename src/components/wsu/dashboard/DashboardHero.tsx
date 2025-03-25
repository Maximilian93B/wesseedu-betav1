"use client"

import { Button } from "@/components/ui/button"
import {  Leaf, Globe, Users, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

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
      staggerChildren: 0.1,
      duration: 0.4
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

export function DashboardHero({
  user,
  profile,
  loading
}: DashboardHeroProps) {
  const router = useRouter()
  
  const totalInvestments = profile?.total_investments || 0
  const savedCompaniesCount = profile?.saved_companies_count || 0
  const impactScore = profile?.impact_score || 0
  const communitySize = profile?.community_size || 0
  
  return (
    <div className="relative overflow-hidden mb-6">
      {/* Banner section with light gradient overlay */}
      <div className="relative h-48 md:h-64 w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-emerald-100" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-blue-50/40 to-white/90" />
      </div>
        
      <div className="relative z-10 p-6 sm:p-8 -mt-36">
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* Logo/avatar section with light styling */}
          <div className="relative h-32 w-32 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-white border border-slate-200/80 shadow-lg ring-2 ring-white/80">
            <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-blue-50 to-white">
              <Users className="h-16 w-16 text-blue-400 drop-shadow-[0_1px_2px_rgba(59,130,246,0.4)]" />
            </div>
          </div>
          
          <div className="flex-1 mt-8 sm:mt-2">
            {/* Main content header with enhanced typography */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-full text-xs font-medium mr-3 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                  <span>Active Investor</span>
                </div>
                <div className="h-px flex-grow bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3 tracking-tight">
                Your Impact Dashboard
              </h1>
              
              <p className="text-slate-600 text-lg max-w-2xl mb-2">
                Track your sustainable investments and measure the positive impact you're making on our planet.
              </p>
            </div>

            {/* Stats row with modern badges */}
            <div className="flex flex-wrap gap-3 mb-5">
              <div className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-sm py-1.5 pl-1.5 pr-2.5 rounded-full shadow-sm">
                <div className="bg-emerald-100 rounded-full p-1 mr-1.5 inline-flex">
                  <Leaf className="h-3.5 w-3.5 drop-shadow-sm" />
                </div>
                ${totalInvestments.toLocaleString()} Invested
              </div>
              
              <div className="bg-amber-50 text-amber-600 border border-amber-200 text-sm py-1.5 pl-1.5 pr-2.5 rounded-full shadow-sm">
                <div className="bg-amber-100 rounded-full p-1 mr-1.5 inline-flex">
                  <Globe className="h-3.5 w-3.5 drop-shadow-sm" />
                </div>
                {impactScore}/10 Impact Score
              </div>
              
              <div className="bg-slate-50 text-slate-600 border border-slate-200 text-sm py-1.5 pl-1.5 pr-2.5 rounded-full shadow-sm">
                <div className="bg-slate-100 rounded-full p-1 mr-1.5 inline-flex">
                  <Users className="h-3.5 w-3.5 drop-shadow-sm" />
                </div>
                {communitySize} community members
              </div>
              
              <div className="bg-blue-50 text-blue-600 border border-blue-200 text-sm py-1.5 pl-1.5 pr-2.5 rounded-full shadow-sm">
                <div className="bg-blue-100 rounded-full p-1 mr-1.5 inline-flex">
                  <TrendingUp className="h-3.5 w-3.5 drop-shadow-sm" />
                </div>
                {savedCompaniesCount} Companies
              </div>
            </div>
            
            {/* Action buttons with premium design */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Button 
                className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-400 hover:to-emerald-400 text-white font-medium py-5 px-6 shadow-md"
                onClick={() => router.push("/companies")}
              >
                <Users className="h-5 w-5 mr-2" />
                Discover Companies
              </Button>
              
              <Button 
                variant="outline" 
                className="border-slate-200 bg-white backdrop-blur-sm text-slate-700 py-5 px-6 hover:bg-slate-50 hover:text-emerald-600 shadow-sm"
                onClick={() => router.push("/investments")}
              >
                <TrendingUp className="h-5 w-5 mr-2 text-emerald-500" />
                Manage Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 