"use client"

import { useEffect, useState } from "react"
import { Zap, RefreshCw, Globe, TrendingUp, BarChart3, Rocket, ArrowRight, DollarSign, LineChart, Users, CheckCircle, ArrowDown } from "lucide-react"
import { CompanyCard } from "@/components/wsu/marketplace/CompanyCard"
import { CompanyDetailsView } from "@/components/company/CompanyDetailsView"
import { motion, AnimatePresence } from "framer-motion"
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { useAuthGuard } from "@/hooks/use-auth-guard"

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
    <div className="relative w-full overflow-hidden mb-16 rounded-3xl border border-slate-200 shadow-md">
      {/* Background effects - contained within the component */}
      <div className="absolute inset-0 bg-white"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white"></div>
      <div className="absolute w-[800px] h-[800px] -right-40 -top-40 rounded-full bg-gradient-to-br from-emerald-100/30 via-blue-100/20 to-amber-100/30 blur-[120px] opacity-70"></div>
      <div className="absolute w-[600px] h-[600px] -left-20 top-40 rounded-full bg-gradient-to-br from-amber-100/30 via-slate-100/20 to-emerald-100/30 blur-[120px] opacity-70"></div>
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/50 via-blue-500/30 to-transparent"></div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 mb-8 rounded-full bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 shadow-sm">
            <Zap className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Discover Sustainable Investments
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 bg-clip-text text-transparent">
              Sustainable
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Investment Marketplace
            </span>
          </h1>
          
          <div className="max-w-3xl mx-auto mt-8">
            <p className="text-xl text-slate-600 leading-relaxed">
              Connect with innovative sustainable companies making real-world impact while generating competitive financial returns.
            </p>
          </div>
          
          {/* Stats bar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-x-12 gap-y-8 mt-16 pt-6 border-t border-slate-200"
          >
            {[
              { label: "Verified Companies", value: "200+", icon: <CheckCircle className="h-5 w-5 text-emerald-500" /> },
              { label: "Average Return", value: "24%", icon: <BarChart3 className="h-5 w-5 text-blue-500" /> },
              { label: "Active Investors", value: "30K+", icon: <Users className="h-5 w-5 text-emerald-500" /> },
              { label: "Sustainable Impact", value: "High", icon: <Globe className="h-5 w-5 text-blue-500" /> }
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-3.5 px-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-50 to-white flex items-center justify-center border border-slate-200 shadow-sm">
                  {stat.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
                  <span className="text-sm text-slate-500">{stat.label}</span>
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
            <ArrowDown className="h-6 w-6 text-emerald-500/70" />
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
        <div className="absolute -left-32 -top-10 w-96 h-96 rounded-full bg-blue-100/30 blur-[180px] z-0" />
        <div className="absolute right-10 bottom-0 w-96 h-96 rounded-full bg-emerald-100/30 blur-[180px] z-0" />
        
      
        
        {/* Main showcase container */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md">
          {/* Decorative top accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/80 via-blue-400/20 to-transparent z-10" />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 relative">
            {/* Featured section column */}
            <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-blue-50 to-white lg:min-h-[480px]">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-white opacity-70"></div>
              <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L3N2Zz4=')] mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent" />
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 p-12 lg:p-14 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-2 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 shadow-sm mb-8">
                    <Rocket className="h-3.5 w-3.5 text-blue-500" />
                    <span className="text-xs font-medium text-blue-600">Future of Investing</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-tight">
                    Discover and Invest in<br />
                    <span className="text-blue-600">Innovative</span> <span className="text-emerald-600">Sustainable</span><br />
                    Solutions
                  </h3>
                  
                  <div className="mb-10">
                    <p className="text-slate-600 text-lg leading-relaxed">
                      Our marketplace connects you with cutting-edge companies creating positive environmental and social impact while generating competitive financial returns.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-5 mt-8">
                    <div className="bg-white backdrop-blur-sm rounded-lg border border-slate-200 p-5 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mr-3">
                          <TrendingUp className="h-4 w-4 text-emerald-500" />
                        </div>
                        <span className="text-emerald-600 font-medium">Growth</span>
                      </div>
                      <p className="text-slate-600 text-sm">Sustainable investing grew 42% from 2018-2020</p>
                    </div>
                    
                    <div className="bg-white backdrop-blur-sm rounded-lg border border-slate-200 p-5 shadow-sm">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                          <DollarSign className="h-4 w-4 text-blue-500" />
                        </div>
                        <span className="text-blue-600 font-medium">Returns</span>
                      </div>
                      <p className="text-slate-600 text-sm">ESG investments often outperform traditional markets</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <button 
                    onClick={scrollToCompanies}
                    className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white shadow-md px-6 py-3 rounded-lg flex items-center"
                  >
                    <span>Explore All Companies</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </div>
            
            {/* Right side stats/info */}
            <div className="lg:col-span-3 bg-slate-50 backdrop-blur-sm p-10 lg:p-12">
              <div className="mb-12">
                <h4 className="text-slate-800 font-medium flex items-center text-lg mb-8">
                  <LineChart className="h-5 w-5 mr-2.5 text-blue-500" />
                  <span>Market Impact Stats</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                  {[
                    {
                      value: "$30.7T",
                      label: "Global sustainable investments",
                      growth: "+34%",
                      icon: <Globe className="h-6 w-6 text-emerald-500" />
                    },
                    {
                      value: "75%",
                      label: "Of investors want sustainable options",
                      growth: "+12%",
                      icon: <TrendingUp className="h-6 w-6 text-blue-500" />
                    },
                    {
                      value: "86%",
                      label: "Of millennials prefer impact investing",
                      growth: "+18%",
                      icon: <Users className="h-6 w-6 text-emerald-500" />
                    }
                  ].map((stat, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={index}
                      className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm p-6"
                    >
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-emerald-500/5 to-orange-500/5 rounded-full blur-xl"></div>
                      
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-2xl font-bold text-slate-800 mb-2">{stat.value}</div>
                          <div className="text-sm text-slate-500">{stat.label}</div>
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
              
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-slate-800 dark:text-slate-200 font-medium text-lg mb-8">Why Invest in Sustainability</h4>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    {
                      title: "Environmental Impact",
                      description: "Support companies that reduce carbon emissions and promote resource efficiency",
                      dotColor: "bg-emerald-500",
                      textColor: "text-emerald-600 dark:text-emerald-400"
                    },
                    {
                      title: "Social Responsibility",
                      description: "Invest in businesses with fair labor practices and community engagement",
                      dotColor: "bg-blue-500",
                      textColor: "text-blue-600 dark:text-blue-400"
                    },
                    {
                      title: "Future Growth",
                      description: "Position your portfolio for long-term success in a changing economy",
                      dotColor: "bg-emerald-500",
                      textColor: "text-emerald-600 dark:text-emerald-400"
                    },
                    {
                      title: "Innovative Solutions",
                      description: "Support cutting-edge technologies addressing critical global challenges",
                      dotColor: "bg-blue-500",
                      textColor: "text-blue-600 dark:text-blue-400"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className={`mt-1.5 h-2 w-2 rounded-full ${item.dotColor} flex-shrink-0`}></div>
                      <div>
                        <h5 className={`font-medium text-sm mb-1 ${item.textColor}`}>{item.title}</h5>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{item.description}</p>
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
            {/* Background gradient effects */}
            <div className="absolute -left-32 -top-10 w-[500px] h-[500px] rounded-full bg-emerald-100/30 blur-[150px] z-0" />
            <div className="absolute right-10 bottom-0 w-[600px] h-[600px] rounded-full bg-blue-100/30 blur-[180px] z-0" />
            
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
                  <div className="h-12 w-1.5 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full mr-5"></div>
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
                    <div className="w-20 h-20 border-4 border-emerald-500 rounded-full 
                      animate-spin absolute top-0 left-0 border-t-transparent"></div>
                  </div>
                  <p className="text-slate-700 text-xl font-medium mb-2">Loading Companies</p>
                  <p className="text-slate-500">Please wait while we retrieve sustainable opportunities</p>
                </motion.div>
              ) : companies.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-32 max-w-md mx-auto text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center 
                    mb-8 border-2 border-emerald-200 shadow-sm">
                    <Zap className="h-12 w-12 text-emerald-500" />
                  </div>
                  <h3 className="text-slate-800 text-2xl font-medium mb-3">No Companies Found</h3>
                  <p className="text-slate-600 mb-10 text-lg">
                    We couldn't find any sustainable companies at the moment. Please try again later or refresh.
                  </p>
                  <Button 
                    onClick={handleRetryFetch}
                    className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white rounded-lg flex items-center gap-2
                      px-6 py-3 shadow-md transition-all duration-300
                      hover:shadow-lg"
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

