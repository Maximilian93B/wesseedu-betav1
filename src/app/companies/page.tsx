"use client"

import { useEffect, useState, useCallback } from "react"
import { Zap } from "lucide-react"
import { CompanyCard } from "@/components/wsu/marketplace/CompanyCard"

interface Company {
  id: string
  name: string
  description: string
  mission_statement: string
  financials: {
    annual_revenue: number
    funding_raised: number
    burn_rate: number
  }
  pitch_deck_url: string
  sustainability_data: {
    [key: string]: number
  }
  score: number
  community_members: number
}

export default function MarketplacePage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCompanies = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/companies')
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      setCompanies(data.companies || [])
    } catch (error) {
      console.error("Error fetching companies:", error)
      setCompanies([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCompanies()
  }, [fetchCompanies])

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8 mb-16">
          <div className="flex justify-center">
            <div className="inline-flex items-center space-x-2 bg-zinc-800/50 
              backdrop-blur-sm border border-zinc-700/50 px-6 py-2 rounded-full 
              shadow-[0_2px_10px_-3px_rgba(0,0,0,0.3)]">
              <Zap className="w-5 h-5 text-emerald-400" />
              <span className="text-base font-medium bg-gradient-to-r from-white to-zinc-300 
                bg-clip-text text-transparent">
                Sustainable Innovation Marketplace
              </span>
            </div>
          </div>
          
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <span className="inline-block text-emerald-400 text-sm font-medium tracking-wider uppercase 
                bg-emerald-400/10 px-4 py-1 rounded-full border border-emerald-400/20">
                Marketplace
              </span>
              
              <h2 className="relative">
                <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-emerald-400/20 
                  via-white/5 to-emerald-400/20 animate-pulse"></span>
                <span className="relative text-4xl md:text-5xl lg:text-6xl font-bold 
                  bg-gradient-to-r from-zinc-200 via-white to-zinc-300 bg-clip-text 
                  text-transparent tracking-tight leading-tight">
                  Invest in Tomorrow's <br className="hidden sm:block" />
                  <span className="text-emerald-400">Sustainable</span> Solutions
                </span>
              </h2>
            </div>
            
            <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed 
              font-light">
              Discover and support innovative companies that are pioneering the future of 
              <span className="text-emerald-400 font-normal"> sustainable technology</span> and 
              making real impact.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span>Verified Companies</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span>Impact Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span>Sustainable Growth</span>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-zinc-700 rounded-full animate-spin"></div>
              <div className="w-12 h-12 border-4 border-emerald-400 rounded-full 
                animate-spin absolute top-0 left-0 border-t-transparent"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company) => (
              <div key={company.id} className="transform hover:-translate-y-1 transition-transform 
                duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                <CompanyCard company={company} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

