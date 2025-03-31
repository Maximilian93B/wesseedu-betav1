"use client"

import { useEffect, useState } from "react"
import { Zap, RefreshCw, Globe, TrendingUp, Rocket, ArrowRight, DollarSign, LineChart, Users, Shield } from "lucide-react"
import { CompanyCard } from "@/components/wsu/marketplace/CompanyCard"
import { CompanyDetailsView } from "@/components/company/CompanyDetailsView"
import { motion, AnimatePresence } from "framer-motion"
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { useAuthGuard } from "@/hooks/use-auth-guard"
import { CompaniesViewHero } from "@/components/company/CompaniesViewHero"
import { MarketplaceIntroduction } from "@/components/company/MarketplaceIntroduction"

interface Company {
  id: string
  name: string
  description: string
  mission_statement: string
  image_url: string | null
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
  // This will redirect to login if not authenticated
  useAuthGuard()
  
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
        
        // Handle 401 error by redirecting to login
        if (response.status === 401) {
          window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
          return
        }
        
        throw new Error(response.error.toString())
      }
      
      // Handle different possible response formats
      let companiesData;
      if (response.data?.data && Array.isArray(response.data.data)) {
        // New format: data is nested in response.data.data
        companiesData = response.data.data;
      } else if (Array.isArray(response.data)) {
        // Old format: data is directly in response.data
        companiesData = response.data;
      } else {
        console.warn("No companies data returned from API or unexpected format:", response)
        setCompanies([])
        return
      }
      
      console.log(`CompaniesView: Successfully fetched ${companiesData.length} companies`)
      
      const formattedCompanies = companiesData.map((company: any) => ({
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

  const handleScrollToCompanies = () => {
    const companiesSection = document.getElementById('companies-section')
    if (companiesSection) {
      companiesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "spring", stiffness: 80, damping: 17 }}
      className="absolute inset-0 bg-white overflow-y-auto"
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
            className="absolute inset-0 bg-white overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 relative z-10">
              {/* Hero section */}
              <CompaniesViewHero />
              
              {/* Marketplace introduction section */}
              <MarketplaceIntroduction onScrollToCompanies={handleScrollToCompanies} />
              
              {/* Title for companies section */}
              {!loading && companies.length > 0 && (
                <motion.div 
                  id="companies-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-16 flex items-center"
                >
                  <div className="h-12 w-1.5 bg-slate-600 rounded-full mr-5"></div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">
                      Featured Companies
                    </h2>
                    <p className="text-slate-600 mt-2">
                      Explore our curated selection of sustainable innovation companies
                    </p>
                  </div>
                </motion.div>
              )}

              {loading ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-32"
                >
                  <div className="relative mb-10">
                    <div className="w-20 h-20 border-4 border-slate-200 rounded-full animate-spin"></div>
                    <div className="w-20 h-20 border-4 border-slate-600 rounded-full 
                      animate-spin absolute top-0 left-0 border-t-transparent"></div>
                  </div>
                  <p className="text-slate-800 text-xl font-medium mb-2">Loading Companies</p>
                  <p className="text-slate-500">Please wait while we retrieve sustainable opportunities</p>
                </motion.div>
              ) : companies.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-32 max-w-md mx-auto text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center 
                    mb-8 border-2 border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                    <Zap className="h-12 w-12 text-slate-600" />
                  </div>
                  <h3 className="text-slate-800 text-2xl font-medium mb-3">No Companies Found</h3>
                  <p className="text-slate-600 mb-10 text-lg">
                    We couldn't find any sustainable companies at the moment. Please try again later or refresh.
                  </p>
                  <Button 
                    onClick={handleRetryFetch}
                    className="bg-slate-900 hover:bg-slate-800 text-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]
                    hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out
                    hover:translate-y-[-2px] rounded-lg flex items-center gap-2 px-6 py-3"
                  >
                    <RefreshCw className="h-5 w-5" />
                    <span className="text-base">Refresh Companies</span>
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="pb-16"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {companies.map((company, idx) => (
                      <motion.div 
                        key={company.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * (idx % 6) }}
                        className="cursor-pointer"
                      >
                        <CompanyCard 
                          company={company} 
                          onCompanySelect={onCompanySelect}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

