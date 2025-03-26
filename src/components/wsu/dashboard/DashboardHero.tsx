"use client"

import { Button } from "@/components/ui/button"
import { Leaf, Globe, Users, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
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
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative overflow-hidden mb-6 rounded-lg shadow-sm bg-white"
    >
      {/* Simple, clean background */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-50/50 to-slate-50">
        {/* Minimal background styling */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(240,249,255,0.4)_70%)]" />
      </div>
        
      <div className="relative z-10 p-6 sm:p-8 -mt-32">
        <motion.div 
          variants={containerVariants}
          className="flex flex-col sm:flex-row gap-6 items-start"
        >
          {/* Clean, simple avatar */}
          <motion.div 
            variants={itemVariants}
            className="relative h-24 w-24 rounded-lg overflow-hidden bg-blue-100 border border-blue-200/50 shadow-sm"
          >
            <div className="flex items-center justify-center h-full w-full">
              <Users className="h-14 w-14 text-blue-500" />
            </div>
          </motion.div>
          
          <div className="flex-1 mt-6 sm:mt-0">
            {/* Clean header */}
            <motion.div variants={itemVariants} className="mb-5">
              <div className="flex items-center mb-2">
                <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full text-xs font-medium mr-3 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                  <span>Active Investor</span>
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                Your Impact Dashboard
              </h1>
              
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
                Track your sustainable investments and measure the positive impact you're making on our planet.
              </p>
            </motion.div>

            {/* Clean, consistent stats badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-6">
              <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs py-1 pl-1 pr-2 rounded-full flex items-center">
                <div className="bg-emerald-100 rounded-full p-1 mr-1 inline-flex">
                  <Leaf className="h-3 w-3" />
                </div>
                ${totalInvestments.toLocaleString()} Invested
              </div>
              
              <div className="bg-amber-50 text-amber-600 border border-amber-100 text-xs py-1 pl-1 pr-2 rounded-full flex items-center">
                <div className="bg-amber-100 rounded-full p-1 mr-1 inline-flex">
                  <Globe className="h-3 w-3" />
                </div>
                {impactScore}/10 Impact Score
              </div>
              
              <div className="bg-slate-50 text-slate-600 border border-slate-200 text-xs py-1 pl-1 pr-2 rounded-full flex items-center">
                <div className="bg-slate-100 rounded-full p-1 mr-1 inline-flex">
                  <Users className="h-3 w-3" />
                </div>
                {communitySize} community members
              </div>
              
              <div className="bg-blue-50 text-blue-600 border border-blue-100 text-xs py-1 pl-1 pr-2 rounded-full flex items-center">
                <div className="bg-blue-100 rounded-full p-1 mr-1 inline-flex">
                  <TrendingUp className="h-3 w-3" />
                </div>
                {savedCompaniesCount} Companies
              </div>
            </motion.div>
            
            {/* Clean, consistent buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mt-4">
              <Button 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium text-sm py-2 px-4 rounded-md shadow-sm"
                onClick={() => router.push("/companies")}
              >
                <Users className="h-4 w-4 mr-2" />
                Discover Companies
              </Button>
              
              <Button 
                variant="outline" 
                className="border-slate-200 bg-white text-slate-700 text-sm py-2 px-4 hover:bg-slate-50 rounded-md shadow-sm"
                onClick={() => router.push("/investments")}
              >
                <TrendingUp className="h-4 w-4 mr-2 text-emerald-500" />
                Manage Portfolio
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}