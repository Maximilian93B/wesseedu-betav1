"use client"

import { useEffect, useState, useCallback } from "react"
import {  Zap } from "lucide-react"

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-8 mb-16">
        <div className="flex justify-center">
          <div className="inline-flex items-center space-x-2 bg-primary/5 border border-primary/10 px-6 py-2 rounded-full">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-base font-medium text-primary">Sustainable Innovation Marketplace</span>
          </div>
        </div>
        
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-gradient-primary lg:text-5xl">
            Invest in Tomorrow's Solutions
          </h2>
          
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed">
            Discover and support innovative companies that are shaping a sustainable future through technology and impact-driven solutions.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground text-lg">Loading sustainable innovations...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </div>
  )
}

