"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Globe, Users, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

interface DashboardHeroProps {
  username?: string
  totalInvestments: number
  savedCompaniesCount: number
  impactScore: number
  communitySize: number
  onManageInvestments: () => void
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
  username,
  totalInvestments = 0,
  savedCompaniesCount = 0,
  impactScore = 0,
  communitySize = 0,
  onManageInvestments
}: DashboardHeroProps) {
  const router = useRouter()
  
  return (
    <>
      {/* Clean, professional hero section */}
      <div className="relative bg-black py-12 md:py-16">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-transparent opacity-60"></div>
        
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column: Welcome and CTA */}
            <div>
              <motion.div 
                className="space-y-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {username && (
                  <div className="inline-flex items-center px-3 py-1.5 bg-emerald-900/40 border border-emerald-500/30 rounded-full mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                    <span className="text-xs font-medium text-emerald-300">Welcome back</span>
                  </div>
                )}
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                  <span className="text-white block mb-1">Your Impact</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">
                    Dashboard
                  </span>
                </h1>
                <p className="text-gray-300 max-w-lg">
                  Track your sustainable investments and measure the positive impact you're making on our planet.
                </p>

                <div className="flex flex-wrap gap-4 mt-8">
                  <Button
                    onClick={() => router.push("/companies")}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-md transition-all duration-200"
                  >
                    Discover Companies <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    onClick={onManageInvestments}
                    variant="outline"
                    className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-950/50 px-5 py-2.5 rounded-md transition-all duration-200"
                  >
                    Manage Portfolio
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Right column: Key Metrics */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-br from-black to-emerald-950/30 rounded-lg border border-emerald-500/20 p-5 shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-3xl font-bold text-emerald-400 mb-1">${totalInvestments.toLocaleString()}</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Portfolio Value</p>
                  </div>
                  <div className="bg-emerald-500/10 p-2 rounded-md">
                    <Leaf className="h-6 w-6 text-emerald-500" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-br from-black to-blue-950/30 rounded-lg border border-blue-500/20 p-5 shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-3xl font-bold text-blue-400 mb-1">{savedCompaniesCount}</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Companies</p>
                  </div>
                  <div className="bg-blue-500/10 p-2 rounded-md">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-br from-black to-indigo-950/30 rounded-lg border border-indigo-500/20 p-5 shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-3xl font-bold text-indigo-400 mb-1">{impactScore}<span className="text-indigo-400/60 text-lg">/10</span></h3>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Impact Score</p>
                  </div>
                  <div className="bg-indigo-500/10 p-2 rounded-md">
                    <Globe className="h-6 w-6 text-indigo-500" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-br from-black to-amber-950/30 rounded-lg border border-amber-500/20 p-5 shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-3xl font-bold text-amber-400 mb-1">{communitySize}</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Community Size</p>
                  </div>
                  <div className="bg-amber-500/10 p-2 rounded-md">
                    <TrendingUp className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
} 