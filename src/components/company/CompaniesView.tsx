"use client"

import { useEffect, useState, useCallback } from "react"
import { Zap } from "lucide-react"
import { CompanyCard } from "@/components/wsu/marketplace/CompanyCard"
import { CompanyDetailsView } from "@/components/company/CompanyDetailsView"
import { motion, AnimatePresence } from "framer-motion"
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth"
import { useToast } from "@/hooks/use-toast"

interface Company {
  id: string
  name: string
  description: string
  mission_statement: string
  financials?: {
    annual_revenue: number
    funding_raised: number
    burn_rate: number
  }
  pitch_deck_url?: string
  sustainability_data?: {
    [key: string]: number
  }
  score: number
  community_members?: number
}

interface CompaniesViewProps {
  onCompanySelect: (id: string) => void
}

export default function CompaniesView({ onCompanySelect }: CompaniesViewProps) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null)
  const [fetchAttempted, setFetchAttempted] = useState(false)
  const { toast } = useToast()

  const fetchCompanies = async () => {
    if (fetchAttempted) return;
    
    setLoading(true);
    setFetchAttempted(true);
    
    try {
      console.log("CompaniesView: Fetching companies data")
      const response = await fetchWithAuth('/api/companies')
      
      if (response.error) {
        console.error("Error in companies response:", response.error)
        throw new Error(response.error.toString())
      }
      
      if (!response.data) {
        console.warn("No companies data returned from API")
        setCompanies([])
        return
      }
      
      console.log(`CompaniesView: Successfully fetched ${response.data.length} companies`)
      
      const formattedCompanies = response.data.map((company: any) => ({
        id: company.id,
        name: company.name,
        description: company.description || "",
        mission_statement: company.mission_statement || "",
        score: company.score || 0,
        image_url: company.image_url || null,
        financials: company.financials || {
          annual_revenue: 0,
          funding_raised: 0,
          burn_rate: 0
        },
        sustainability_data: company.sustainability_data || {},
        community_members: company.community_members || 0
      }))
      
      setCompanies(formattedCompanies)
    } catch (error) {
      console.error("Error fetching companies:", error)
      toast({
        title: "Error",
        description: "Failed to load companies. Please try again.",
        variant: "destructive"
      })
      setCompanies([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCompanies()
  }, [])

  const handleRetryFetch = () => {
    setFetchAttempted(false)
    fetchCompanies()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "spring", stiffness: 80, damping: 17 }}
      className="absolute inset-0 bg-black overflow-y-auto"
    >
      <AnimatePresence mode="wait">
        {selectedCompanyId ? (
          <CompanyDetailsView 
            key="company-details"
            companyId={selectedCompanyId} 
            onClose={() => setSelectedCompanyId(null)} 
          />
        ) : (
          <motion.div
            key="companies-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black overflow-y-auto"
          >
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
              ) : companies.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96">
                  <p className="text-zinc-400 text-xl mb-4">No companies found</p>
                  <button 
                    onClick={handleRetryFetch}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {companies.map((company) => (
                    <div 
                      key={company.id} 
                      className="cursor-pointer transform hover:-translate-y-1 transition-transform 
                        duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                    >
                      <CompanyCard 
                        company={company} 
                        onCompanySelect={onCompanySelect}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

