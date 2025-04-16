"use client"

import { useEffect, useState } from "react"
import { Zap, RefreshCw, Globe, TrendingUp, Rocket, ArrowRight, DollarSign, LineChart, Users, Shield, Search, Filter, ChevronDown } from "lucide-react"
import { CompanyCard } from "@/components/wsu/marketplace/CompanyCard"
import { CompanyDetailsView } from "@/components/company/CompanyDetailsView"
import { motion, AnimatePresence } from "framer-motion"
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { useAuthGuard } from "@/hooks/use-auth-guard"
import { CompaniesViewHero } from "@/components/company/CompaniesViewHero"
import { MarketplaceIntroduction } from "@/components/company/MarketplaceIntroduction"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

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
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null)
  const [fetchAttempted, setFetchAttempted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const { toast } = useToast()

  const categories = ["All", "Energy", "Agriculture", "Construction", "Technology", "Water"]

  // Handle filtering and searching
  useEffect(() => {
    if (companies.length > 0) {
      let results = [...companies]
      
      // Apply category filter
      if (activeCategory !== "All") {
        results = results.filter(company => 
          company.description.toLowerCase().includes(activeCategory.toLowerCase()) ||
          (company.sustainability_data?.construction?.toString().toLowerCase() === activeCategory.toLowerCase())
        )
      }
      
      // Apply search filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase()
        results = results.filter(company => 
          company.name.toLowerCase().includes(query) ||
          company.description.toLowerCase().includes(query)
        )
      }
      
      setFilteredCompanies(results)
    }
  }, [companies, searchQuery, activeCategory])

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
          window.location.href = '/auth/signin?redirect=' + encodeURIComponent(window.location.pathname)
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
      setFilteredCompanies(formattedCompanies)
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
      className="absolute inset-0 bg-gradient-to-r from-[#70f570] to-[#49c628] overflow-y-auto"
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
            className="absolute inset-0 bg-gradient-to-r from-[#70f570] to-[#49c628] overflow-y-auto"
          >
            <div className="w-full px-4 sm:px-6 lg:px-8 py-6 pb-24 relative z-10">
              {/* Top content before the white container */}
              <div className="w-full px-4 sm:px-6 lg:px-8 py-6 pb-12 relative z-10">
                {/* Hero section */}
                <CompaniesViewHero />
                
                {/* Marketplace introduction section */}
                <MarketplaceIntroduction onScrollToCompanies={handleScrollToCompanies} />
                
                {/* Visual connector between introduction and companies section */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative flex flex-col items-center -mt-8 mb-4 z-20"
                >
                  <div className="bg-white/20 backdrop-blur-sm py-10 px-12 rounded-3xl border border-white/30 shadow-lg max-w-4xl w-full text-center mt-20">
                    <h3 className="text-white text-2xl font-bold mb-4 font-display">Ready to explore sustainable opportunities?</h3>
                    <p className="text-white/90 mb-6 font-body text-lg max-w-2xl mx-auto">Browse our curated selection of innovative companies making a positive impact on our planet and future.</p>
                  </div>
                  
                  <div className="mt-8 flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center 
                      shadow-[0_0_20px_rgba(255,255,255,0.6)] mt-3">
                      <ChevronDown className="h-7 w-7 text-green-600" />
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Main white container with rounded corners */}
              <div 
                id="companies-section"
                className="w-full bg-white min-h-screen rounded-t-[2rem] sm:rounded-t-[2.5rem] md:rounded-t-[3rem] shadow-[0_-8px_30px_rgba(0,0,0,0.15)] border-t border-white/20 overflow-hidden mt-6"
              >
                <div className="relative w-full">
                  <div className="px-3 py-4 pt-6 sm:pt-8 md:pt-10 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
                    {/* Enhanced filter and search section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-16 rounded-xl sm:rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
                    >
                      <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
                        <div className="flex-grow">
                          <h2 className="text-3xl font-bold text-gray-800 font-display mb-3 flex items-center">
                            <div className="h-6 w-1.5 bg-green-500 rounded-full mr-3"></div>
                            Featured Companies
                          </h2>
                          <p className="text-gray-600 font-body">
                            Discover and invest in sustainable innovation companies making real-world impact
                          </p>
                        </div>
                        
                        {/* Search box */}
                        <div className="relative w-full md:w-64 lg:w-80">
                          <Input
                            placeholder="Search companies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-gray-50 border-gray-200 placeholder:text-gray-400 text-gray-800 focus:border-green-500 focus:ring-green-200"
                          />
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      
                      {/* Category filters */}
                      <div className="mt-6 flex flex-wrap gap-2.5 items-center">
                        <span className="text-gray-700 font-medium mr-3 font-helvetica text-sm flex items-center">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter:
                        </span>
                        {categories.map((category) => (
                          <Badge
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`cursor-pointer px-4 py-1.5 font-helvetica text-sm transition-all duration-300 ${
                              activeCategory === category
                                ? "bg-green-500 text-white shadow-[0_0_10px_rgba(74,222,128,0.4)]"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-100"
                            }`}
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* Results stats */}
                      <div className="mt-5 flex justify-between items-center">
                        <span className="text-gray-600 text-sm font-body">
                          {filteredCompanies.length} {filteredCompanies.length === 1 ? 'company' : 'companies'} found
                        </span>
                        {searchQuery || activeCategory !== "All" ? (
                          <Button
                            onClick={() => {
                              setSearchQuery("");
                              setActiveCategory("All");
                            }}
                            className="text-xs py-1 h-auto bg-gray-100 hover:bg-gray-200 text-gray-700"
                          >
                            Clear filters
                          </Button>
                        ) : null}
                      </div>
                    </motion.div>

                    {loading ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-32"
                      >
                        <div className="relative mb-10">
                          <div className="w-20 h-20 border-4 border-gray-100 rounded-full animate-spin"></div>
                          <div className="w-20 h-20 border-4 border-green-500 rounded-full 
                            animate-spin absolute top-0 left-0 border-t-transparent"></div>
                        </div>
                        <p className="text-gray-800 text-xl font-medium mb-2 font-display">Loading Companies</p>
                        <p className="text-gray-600 font-body">Please wait while we retrieve sustainable opportunities</p>
                      </motion.div>
                    ) : filteredCompanies.length === 0 ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-20 max-w-xl mx-auto text-center"
                      >
                        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center 
                          mb-8 border-2 border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                          <Search className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-gray-800 text-2xl font-medium mb-3 font-display">No Matches Found</h3>
                        <p className="text-gray-600 mb-10 text-lg font-body">
                          {searchQuery || activeCategory !== "All" 
                            ? "We couldn't find any companies matching your search criteria. Please try different filters." 
                            : "We couldn't find any sustainable companies at the moment. Please try again later."}
                        </p>
                        <Button 
                          onClick={() => {
                            if (searchQuery || activeCategory !== "All") {
                              setSearchQuery("");
                              setActiveCategory("All");
                            } else {
                              handleRetryFetch();
                            }
                          }}
                          className="bg-green-500 text-white hover:bg-green-600 border border-green-400 shadow-lg
                          hover:shadow-lg transition-all duration-300 
                          hover:translate-y-[-2px] rounded-xl px-8 py-3 font-semibold font-helvetica"
                        >
                          {searchQuery || activeCategory !== "All" ? (
                            <>
                              <Filter className="h-5 w-5 mr-2" />
                              <span>Clear Filters</span>
                            </>
                          ) : (
                            <>
                              <RefreshCw className="h-5 w-5 mr-2" />
                              <span>Refresh Companies</span>
                            </>
                          )}
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="pb-16"
                      >
                        {/* Grid with animation sequence */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 auto-rows-fr">
                          {filteredCompanies.map((company, idx) => (
                            <motion.div 
                              key={company.id}
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                duration: 0.4, 
                                delay: 0.05 * (idx % 8), 
                                type: "spring",
                                stiffness: 120 
                              }}
                              whileHover={{ y: -5, transition: { duration: 0.2 } }}
                              className="h-full"
                            >
                              <CompanyCard 
                                company={company} 
                                onCompanySelect={onCompanySelect}
                              />
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Bottom CTA */}
                        {filteredCompanies.length > 6 && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-16 text-center"
                          >
                            <div className="w-full max-w-4xl mx-auto p-8 rounded-xl bg-green-50 border border-green-100">
                              <h3 className="text-2xl text-gray-800 font-bold mb-4 font-display">
                                Ready to make an impact?
                              </h3>
                              <p className="text-gray-600 max-w-lg mx-auto mb-6 font-body">
                                Join our community of investors funding the sustainable innovations that will shape our future.
                              </p>
                              <Button
                                onClick={() => {
                                  // Scroll back to top
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="bg-green-500 text-white hover:bg-green-600 border border-green-400 
                                shadow-lg hover:shadow-xl transition-all duration-300 
                                hover:translate-y-[-2px] rounded-xl px-8 py-4 text-lg font-semibold font-helvetica"
                              >
                                <Rocket className="h-5 w-5 mr-2" />
                                <span>Get Started</span>
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

