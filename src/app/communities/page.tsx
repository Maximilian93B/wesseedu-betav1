"use client"

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { CommunitiesView } from '@/components/community/CommunitiesView'
import { motion } from 'framer-motion'
import { Globe, Users, Award, BarChart3, TrendingUp, Shield, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CommunitiesPage() {
  const router = useRouter()
  
  const handleCommunitySelect = useCallback((id: string) => {
    router.push(`/communities/${id}`)
  }, [router])

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-7xl">
      {/* Hero Section */}
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden border border-zinc-800/70 bg-gradient-to-r from-zinc-950 to-zinc-900 relative"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-950/10 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-amber-950/10 to-transparent" />
          <div className="absolute inset-0 bg-noise opacity-30 mix-blend-soft-light" />
          
          <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-16 md:p-16 lg:p-20">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px flex-grow bg-gradient-to-r from-zinc-700/30 to-zinc-700/0"></div>
                  <span className="text-zinc-400 uppercase text-sm tracking-wider font-medium">Exclusive Networks</span>
                  <div className="h-px flex-grow bg-gradient-to-l from-zinc-700/30 to-zinc-700/0"></div>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                  Private Equity <span className="text-indigo-400">Communities</span>
                </h1>
                <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
                  Access exclusive networks of sophisticated investors and industry leaders focused on high-value opportunities in sustainable private markets and alternative investments.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                <div className="bg-black/50 backdrop-blur-sm border border-zinc-800/70 rounded-xl p-5 hover:bg-zinc-900/50 transition duration-300">
                  <Briefcase className="h-10 w-10 text-indigo-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-1">Deal Access</h3>
                  <p className="text-sm text-zinc-400">
                    Exclusive investment opportunities not available on public markets.
                  </p>
                </div>
                
                <div className="bg-black/50 backdrop-blur-sm border border-zinc-800/70 rounded-xl p-5 hover:bg-zinc-900/50 transition duration-300">
                  <Shield className="h-10 w-10 text-amber-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-1">Vetted Partners</h3>
                  <p className="text-sm text-zinc-400">
                    Connect with qualified investors and industry-leading management teams.
                  </p>
                </div>
                
                <div className="bg-black/50 backdrop-blur-sm border border-zinc-800/70 rounded-xl p-5 hover:bg-zinc-900/50 transition duration-300">
                  <TrendingUp className="h-10 w-10 text-emerald-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-1">Alpha Generation</h3>
                  <p className="text-sm text-zinc-400">
                    Strategies and insights for above-market returns across market cycles.
                  </p>
                </div>
                
                <div className="bg-black/50 backdrop-blur-sm border border-zinc-800/70 rounded-xl p-5 hover:bg-zinc-900/50 transition duration-300">
                  <BarChart3 className="h-10 w-10 text-blue-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-1">Market Intelligence</h3>
                  <p className="text-sm text-zinc-400">
                    Proprietary research and analytics on emerging market opportunities.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Button 
                  className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-medium px-6 py-5 shadow-lg shadow-indigo-900/20"
                  onClick={() => document.getElementById('communities-list')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Communities
                </Button>
                <Button 
                  variant="outline" 
                  className="border-zinc-700/60 bg-zinc-900/60 backdrop-blur-sm text-white hover:bg-zinc-800/60 px-6 py-5"
                >
                  Investment Criteria
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Communities List Section */}
      <motion.div
        id="communities-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="pt-4"
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-3">Featured Investment Communities</h2>
          <p className="text-zinc-400 max-w-3xl">
            Join exclusive investor groups focused on sustainable alpha generation across alternative asset classes and private markets.
          </p>
        </div>
        <CommunitiesView onCommunitySelect={handleCommunitySelect} />
      </motion.div>
    </div>
  )
} 