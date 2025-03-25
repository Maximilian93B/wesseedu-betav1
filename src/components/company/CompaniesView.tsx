"use client"

import { useEffect, useState, useCallback } from "react"
import { Zap, Loader2, RefreshCw, Leaf, Globe, Sparkles, TrendingUp, BarChart3, Rocket, ArrowRight, DollarSign, LineChart, Users, CheckCircle, ArrowDown } from "lucide-react"
import { CompanyCard } from "@/components/wsu/marketplace/CompanyCard"
import { CompanyDetailsView } from "@/components/company/CompanyDetailsView"
import { motion, AnimatePresence } from "framer-motion"
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

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

const MarketplaceHeader = () => {
  return (
    <div className="relative w-full overflow-hidden mb-16 rounded-3xl border border-zinc-800/30">
      {/* Background effects - contained within the component */}
      <div className="absolute inset-0 bg-black/90"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/80 via-black/95 to-black"></div>
      <div className="absolute w-[800px] h-[800px] -right-40 -top-40 rounded-full bg-gradient-to-br from-emerald-900/10 via-zinc-900/5 to-orange-900/10 blur-[120px] opacity-70"></div>
      <div className="absolute w-[600px] h-[600px] -left-20 top-40 rounded-full bg-gradient-to-br from-orange-900/10 via-zinc-900/5 to-emerald-900/10 blur-[120px] opacity-70"></div>
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/50 via-orange-500/30 to-transparent"></div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 mb-8 rounded-full bg-gradient-to-r from-emerald-900/30 to-orange-900/30 border border-emerald-600/20 shadow-lg">
            <Zap className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-emerald-200 to-orange-200 bg-clip-text text-transparent">
              Discover Sustainable Investments
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-400 bg-clip-text text-transparent">
              Sustainable
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-orange-400 bg-clip-text text-transparent">
              Investment Marketplace
            </span>
          </h1>
          
          <div className="max-w-3xl mx-auto mt-8">
            <p className="text-xl text-zinc-400 leading-relaxed">
              Connect with innovative sustainable companies making real-world impact while generating competitive financial returns.
            </p>
          </div>
          
          {/* Stats bar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-x-12 gap-y-8 mt-16 pt-6 border-t border-zinc-800/30"
          >
            {[
              { label: "Verified Companies", value: "200+", icon: <CheckCircle className="h-5 w-5 text-emerald-400" /> },
              { label: "Average Return", value: "24%", icon: <BarChart3 className="h-5 w-5 text-orange-400" /> },
              { label: "Active Investors", value: "30K+", icon: <Users className="h-5 w-5 text-emerald-400" /> },
              { label: "Sustainable Impact", value: "High", icon: <Globe className="h-5 w-5 text-orange-400" /> }
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-3.5 px-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center border border-zinc-700/30">
                  {stat.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <span className="text-sm text-zinc-500">{stat.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Animated arrow indicator */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.2
            }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 mt-16"
          >
            <ArrowDown className="h-6 w-6 text-emerald-400/70" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

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
        {/* Background gradient effects */}
        <div className="absolute -left-32 -top-10 w-96 h-96 rounded-full bg-orange-900/5 blur-[180px] z-0" />
        <div className="absolute right-10 bottom-0 w-96 h-96 rounded-full bg-emerald-900/5 blur-[180px] z-0" />
        
      
        
        {/* Main showcase container */}
        <div className="rounded-2xl overflow-hidden border border-zinc-800/50 bg-gradient-to-b from-zinc-900/80 via-zinc-900/90 to-black shadow-[0_15px_50px_-12px_rgba(0,0,0,0.25)]">
          {/* Decorative top accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600/80 via-orange-500/20 to-transparent z-10" />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 relative">
            {/* Featured section column */}
            <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-orange-900/20 to-black/50 lg:min-h-[480px]">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-black opacity-70"></div>
              <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L3N2Zz4=')] mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 p-12 lg:p-14 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-2 bg-orange-900/30 px-3.5 py-1.5 rounded-full border border-orange-700/40 shadow-inner mb-8">
                    <Rocket className="h-3.5 w-3.5 text-orange-400" />
                    <span className="text-xs font-medium text-orange-300">Future of Investing</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                    Discover and Invest in<br />
                    <span className="text-orange-400">Innovative</span> <span className="text-emerald-400">Sustainable</span><br />
                    Solutions
                  </h3>
                  
                  <div className="mb-10">
                    <p className="text-zinc-300 text-lg leading-relaxed">
                      Our marketplace connects you with cutting-edge companies creating positive environmental and social impact while generating competitive financial returns.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-5 mt-8">
                    <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-zinc-800/30 p-5">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-900/30 flex items-center justify-center mr-3">
                          <TrendingUp className="h-4 w-4 text-emerald-400" />
                        </div>
                        <span className="text-emerald-300 font-medium">Growth</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Sustainable investing grew 42% from 2018-2020</p>
                    </div>
                    
                    <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-zinc-800/30 p-5">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-orange-900/30 flex items-center justify-center mr-3">
                          <DollarSign className="h-4 w-4 text-orange-400" />
                        </div>
                        <span className="text-orange-300 font-medium">Returns</span>
                      </div>
                      <p className="text-zinc-400 text-sm">ESG investments often outperform traditional markets</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <button 
                    onClick={scrollToCompanies}
                    className="bg-gradient-to-r from-orange-700 to-orange-800 hover:from-orange-600 hover:to-orange-700 text-white shadow-md shadow-black/20 px-6 py-3 rounded-lg flex items-center"
                  >
                    <span>Explore All Companies</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </div>
            
            {/* Right side stats/info */}
            <div className="lg:col-span-3 bg-black/50 backdrop-blur-sm p-10 lg:p-12">
              <div className="mb-12">
                <h4 className="text-white font-medium flex items-center text-lg mb-8">
                  <LineChart className="h-5 w-5 mr-2.5 text-orange-400" />
                  <span>Market Impact Stats</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                  {[
                    {
                      value: "$30.7T",
                      label: "Global sustainable investments",
                      growth: "+34%",
                      icon: <Globe className="h-6 w-6 text-emerald-400/70" />
                    },
                    {
                      value: "75%",
                      label: "Of investors want sustainable options",
                      growth: "+12%",
                      icon: <TrendingUp className="h-6 w-6 text-orange-400/70" />
                    },
                    {
                      value: "86%",
                      label: "Of millennials prefer impact investing",
                      growth: "+18%",
                      icon: <Users className="h-6 w-6 text-emerald-400/70" />
                    }
                  ].map((stat, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={index}
                      className="relative overflow-hidden rounded-xl border border-zinc-800/50 bg-gradient-to-b from-zinc-900/60 to-black/80 shadow-md p-6"
                    >
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-emerald-500/5 to-orange-500/5 rounded-full blur-xl"></div>
                      
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                          <div className="text-sm text-zinc-400">{stat.label}</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800/80 to-black flex items-center justify-center">
                          {stat.icon}
                        </div>
                      </div>
                      
                      <div className="mt-5 flex items-center justify-between">
                        <div className="text-xs text-emerald-400 font-medium flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>{stat.growth} growth</span>
                        </div>
                        <div className="text-xs text-zinc-500">Year over year</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="pt-8 border-t border-zinc-800/20">
                <h4 className="text-white font-medium text-lg mb-8">Why Invest in Sustainability</h4>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    {
                      title: "Environmental Impact",
                      description: "Support companies that reduce carbon emissions and promote resource efficiency",
                      dotColor: "bg-emerald-400",
                      textColor: "text-emerald-300"
                    },
                    {
                      title: "Social Responsibility",
                      description: "Invest in organizations improving communities and promoting equality",
                      dotColor: "bg-orange-400",
                      textColor: "text-orange-300"
                    },
                    {
                      title: "Governance Excellence",
                      description: "Support companies with ethical business practices and diverse leadership",
                      dotColor: "bg-emerald-400",
                      textColor: "text-emerald-300"
                    },
                    {
                      title: "Competitive Returns",
                      description: "Sustainable investments often outperform traditional investments long-term",
                      dotColor: "bg-orange-400",
                      textColor: "text-orange-300"
                    }
                  ].map((item, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                      key={index}
                      className="flex gap-4 items-start p-5 rounded-lg bg-black/30 border border-zinc-800/30"
                    >
                      <div className={`mt-1.5 w-2 h-2 rounded-full ${item.dotColor} flex-shrink-0`}></div>
                      <div>
                        <h5 className={`${item.textColor} font-medium text-sm mb-2`}>{item.title}</h5>
                        <p className="text-zinc-400 text-xs leading-relaxed">{item.description}</p>
                      </div>
                    </motion.div>
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
            {/* Background gradient effects */}
            <div className="absolute -left-32 -top-10 w-[500px] h-[500px] rounded-full bg-emerald-900/5 blur-[150px] z-0" />
            <div className="absolute right-10 bottom-0 w-[600px] h-[600px] rounded-full bg-emerald-900/5 blur-[180px] z-0" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 pb-24 relative z-10">
              {/* Add the MarketplaceHeader at the top */}
              <MarketplaceHeader />
              
              {/* Add the marketplace introduction component */}
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
                  <div className="h-12 w-1.5 bg-gradient-to-b from-orange-500 to-emerald-500 rounded-full mr-5"></div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      Featured Companies
                    </h2>
                    <p className="text-zinc-400 mt-2">
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
                    <div className="w-20 h-20 border-4 border-zinc-700/50 rounded-full animate-spin"></div>
                    <div className="w-20 h-20 border-4 border-emerald-400 rounded-full 
                      animate-spin absolute top-0 left-0 border-t-transparent"></div>
                  </div>
                  <p className="text-zinc-300 text-xl font-medium mb-2">Loading Companies</p>
                  <p className="text-zinc-500">Please wait while we retrieve sustainable opportunities</p>
                </motion.div>
              ) : companies.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-32 max-w-md mx-auto text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-emerald-400/10 flex items-center justify-center 
                    mb-8 border-2 border-emerald-400/20">
                    <Zap className="h-12 w-12 text-emerald-400/70" />
                  </div>
                  <h3 className="text-white text-2xl font-medium mb-3">No Companies Found</h3>
                  <p className="text-zinc-400 mb-10 text-lg">
                    We couldn't find any sustainable companies at the moment. Please try again later or refresh.
                  </p>
                  <Button 
                    onClick={handleRetryFetch}
                    className="bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg flex items-center gap-2
                      px-6 py-3 shadow-lg shadow-emerald-900/20 transition-all duration-300
                      hover:shadow-emerald-900/30"
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

