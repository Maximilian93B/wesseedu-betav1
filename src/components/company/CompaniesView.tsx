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



function MarketplaceIntroduction() {
  const scrollToCompanies = () => {
    const companiesSection = document.getElementById('companies-section');
    if (companiesSection) {
      companiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-28">
      <div className="relative">
        {/* Main showcase container */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]
          hover:shadow-[0_10px_30px_rgb(0,0,0,0.06)] transition-shadow duration-500 relative"
          style={{ 
            backgroundImage: "linear-gradient(to right top, #ffffff, #f6f6ff, #eaefff, #dae8ff, #c8e2ff)" 
          }}
        >
          {/* Subtle texture pattern for depth */}
          <div className="absolute inset-0 opacity-[0.02]" 
            style={{ 
              backgroundImage: `radial-gradient(circle at 20px 20px, black 1px, transparent 0)`,
              backgroundSize: "40px 40px"
            }} 
          />
          
          {/* Top edge shadow line for definition */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30 z-10" />
          
          {/* Inner shadow effects for depth */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50/50 to-transparent"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 relative z-10">
            {/* Featured section column */}
            <div className="lg:col-span-2 relative overflow-hidden bg-white/50 lg:min-h-[480px]">
              <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L3N2Zz4=')] mix-blend-overlay"></div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 p-12 lg:p-14 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-2 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] mb-8">
                    <Rocket className="h-3.5 w-3.5 text-slate-600" />
                    <span className="text-xs font-medium text-slate-700">Future of Investing</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-tight">
                    Discover and Invest in<br />
                    <span className="text-slate-700">Innovative Sustainable</span><br />
                    Solutions
                  </h3>
                  
                  <div className="mb-10">
                    <p className="text-slate-600 text-lg leading-relaxed">
                      Our marketplace connects you with cutting-edge companies creating positive environmental and social impact while generating competitive financial returns.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-5 mt-8">
                    <div className="bg-white backdrop-blur-sm rounded-lg border border-slate-200 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                          <TrendingUp className="h-4 w-4 text-slate-600" />
                        </div>
                        <span className="text-slate-700 font-medium">Growth</span>
                      </div>
                      <p className="text-slate-600 text-sm">Sustainable investing grew 42% from 2018-2020</p>
                    </div>
                    
                    <div className="bg-white backdrop-blur-sm rounded-lg border border-slate-200 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                          <DollarSign className="h-4 w-4 text-slate-600" />
                        </div>
                        <span className="text-slate-700 font-medium">Returns</span>
                      </div>
                      <p className="text-slate-600 text-sm">ESG investments often outperform traditional markets</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <button 
                    onClick={scrollToCompanies}
                    className="bg-slate-900 hover:bg-slate-800 text-white shadow-[0_4px_10px_rgba(0,0,0,0.1)]
                    hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out 
                    hover:translate-y-[-2px] px-6 py-3 rounded-lg flex items-center"
                  >
                    <span>Explore All Companies</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </div>
            
            {/* Right side stats/info */}
            <div className="lg:col-span-3 bg-white/60 backdrop-blur-sm p-10 lg:p-12">
              <div className="mb-12">
                <h4 className="text-slate-800 font-medium flex items-center text-lg mb-8">
                  <LineChart className="h-5 w-5 mr-2.5 text-slate-600" />
                  <span>Market Impact Stats</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                  {[
                    {
                      value: "$30.7T",
                      label: "Global sustainable investments",
                      growth: "+34%",
                      icon: <Globe className="h-6 w-6 text-slate-600" />
                    },
                    {
                      value: "75%",
                      label: "Of investors want sustainable options",
                      growth: "+12%",
                      icon: <TrendingUp className="h-6 w-6 text-slate-600" />
                    },
                    {
                      value: "86%",
                      label: "Of millennials prefer impact investing",
                      growth: "+18%",
                      icon: <Users className="h-6 w-6 text-slate-600" />
                    }
                  ].map((stat, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={index}
                      className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6"
                    >
                      {/* Subtle top accent line */}
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30"></div>
                      
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-full bg-slate-50 
                          flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-200">
                          {stat.icon}
                        </div>
                        <div className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                          {stat.growth}
                        </div>
                      </div>
                      
                      <h5 className="text-2xl font-bold text-slate-800 mt-4">{stat.value}</h5>
                      <p className="text-slate-600 text-sm mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Key benefits section */}
              <div className="mt-10">
                <h4 className="font-medium text-slate-800 flex items-center text-lg mb-5">
                  <Shield className="h-5 w-5 mr-2.5 text-slate-600" />
                  <span>Key Benefits</span>
                </h4>
                
                <div className="space-y-4">
                  {[
                    {
                      title: "Financial Performance",
                      description: "ESG-focused investments often outperform traditional markets over time",
                      dotColor: "bg-slate-700",
                      textColor: "text-slate-700"
                    },
                    {
                      title: "Positive Impact",
                      description: "Direct your capital toward businesses creating measurable environmental and social improvements",
                      dotColor: "bg-slate-600",
                      textColor: "text-slate-700"
                    },
                    {
                      title: "Innovative Solutions",
                      description: "Support cutting-edge technologies addressing critical global challenges",
                      dotColor: "bg-slate-500",
                      textColor: "text-slate-700"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className={`mt-1.5 h-2 w-2 rounded-full ${item.dotColor} flex-shrink-0`}></div>
                      <div>
                        <h5 className={`font-medium text-sm mb-1 ${item.textColor}`}>{item.title}</h5>
                        <p className="text-slate-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 pb-24 relative z-10">
              {/* Replace MarketplaceHeader with CompaniesViewHero */}
              <CompaniesViewHero />
              <MarketplaceIntroduction />
              
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

