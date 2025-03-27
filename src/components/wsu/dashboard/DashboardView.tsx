"use client"

import React, { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart, Users, TrendingUp, Leaf, Globe, ChevronRight, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WatchlistView, useWatchlist } from "./WatchlistView"
import UserInvestments from "./UserInvestments"
import { DashboardHero } from "./DashboardHero"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth"
import { CACHE_KEYS, CACHE_EXPIRY, getCachedData, setCachedData } from "@/lib/utils/cacheUtils"

export const dynamic = "force-dynamic"

interface DashboardStat {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  color: string
}

interface InvestmentData {
  month: string
  amount: number
}

interface ProfileData {
  profile: any;
  investments: any[];
  savedCompanies: Array<{
    id: string;
    company_id: string;
    companies: any;
  }>;
  stats: {
    companiesCount: number;
    usersCount: number;
  };
}

interface DashboardViewProps {
  user: any  // You can make this more specific based on your user type
}

// Variants for animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
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

export function DashboardView({ user }: DashboardViewProps) {
  const router = useRouter()
  const { profile: authProfile, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [stats, setStats] = useState<DashboardStat[]>([])
  const [investmentData, setInvestmentData] = useState<InvestmentData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [savedCompanies, setSavedCompanies] = useState<any[]>([])
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [watchlistCompanies, setWatchlistCompanies] = useState<any[]>([])
  const [watchlistLoading, setWatchlistLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("overview")
  
  // Use the shared watchlist hook to avoid duplicate data fetching
  const { 
    fetchWatchlistCompanies
  } = useWatchlist()

  // Set default stats even before loading
  useEffect(() => {
    setStats([
      {
        title: "Total Investments",
        value: `$${authProfile?.total_investments?.toLocaleString() || '0'}`,
        description: "Your total investment",
        icon: <BarChart className="h-6 w-6" />,
        color: "from-green-400 to-blue-500",
      },
      {
        title: "Sustainable Companies",
        value: "0",
        description: "Across various sectors",
        icon: <Leaf className="h-6 w-6" />,
        color: "from-green-500 to-emerald-600",
      },
      {
        title: "Impact Score",
        value: `${authProfile?.impact_score || 0}/10`,
        description: "Based on ESG criteria",
        icon: <Globe className="h-6 w-6" />,
        color: "from-blue-400 to-indigo-600",
      },
      {
        title: "Community Members",
        value: "0",
        description: "Active investors",
        icon: <Users className="h-6 w-6" />,
        color: "from-purple-400 to-pink-500",
      },
    ]);
  }, [authProfile]);

  useEffect(() => {
    if (authLoading) {
      console.log("DashboardView: Auth is still loading, waiting...");
      return;
    }
    
    if (user) {
      console.log("DashboardView: User detected, loading data");
      const loadData = async () => {
        try {
          setLoading(true);
          setError(null);
          
          // Set a timeout to force loading to end after 5 seconds
          const timeoutId = setTimeout(() => {
            if (loading) {
              console.log("DashboardView: Loading timeout reached");
              setLoading(false);
              setError("Loading took too long. Some data may be incomplete.");
              toast({
                title: "Warning",
                description: "Loading took too long. Some data may be incomplete.",
                variant: "destructive"
              });
            }
          }, 5000);
          
          await fetchProfileData();
          
          // Clear timeout if data loaded successfully
          clearTimeout(timeoutId);
          setLoading(false);
        } catch (error) {
          console.error("Error loading dashboard data:", error);
          setError("Failed to load dashboard data");
          setLoading(false);
        }
      };
      
      loadData();
    } else {
      console.log("DashboardView: No user, skipping data load");
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchProfileData = async () => {
    console.log("DashboardView: Checking for cached profile data");
    
    // Check if we have cached data using the utility function with proper typing
    const cachedData = getCachedData<ProfileData>(CACHE_KEYS.PROFILE_DATA, CACHE_EXPIRY.PROFILE_DATA);
    
    if (cachedData) {
      console.log("DashboardView: Using cached profile data");
      setProfileData(cachedData);
      
      // Process saved companies data from cache
      if (cachedData.savedCompanies && cachedData.savedCompanies.length > 0) {
        console.log(`DashboardView: Using ${cachedData.savedCompanies.length} saved companies from cache`);
        
        // Transform the data to match the WatchlistCompany interface
        const transformedCompanies = cachedData.savedCompanies.map((item: any) => ({
          id: item.id,
          company_id: item.company_id,
          companies: item.companies
        }));
        
        setSavedCompanies(transformedCompanies);
        
        // Also refresh the watchlist data to ensure consistency
        fetchWatchlistCompanies();
      } else {
        console.log("DashboardView: No saved companies in cache");
        setSavedCompanies([]);
      }
      
      // Process cached investment data
      processInvestmentsData(cachedData.investments);
      
      // Update stats
      updateStatistics(cachedData);
      
      return;
    }
    
    // If no valid cache exists, fetch fresh data
    console.log("DashboardView: Fetching profile data from API");
    try {
      const { data, error } = await fetchWithAuth('/api/auth/profile', {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (error) {
        console.error("Error fetching profile data:", error);
        throw error;
      }
      
      if (!data) {
        throw new Error("No data returned from API");
      }
      
      console.log("DashboardView: Profile data fetched successfully", data);
      
      // Cache the fresh data using the utility function
      setCachedData(CACHE_KEYS.PROFILE_DATA, data);
      
      setProfileData(data);
      
      // Process saved companies data
      if (data.savedCompanies && data.savedCompanies.length > 0) {
        console.log(`DashboardView: Found ${data.savedCompanies.length} saved companies`);
        
        // Transform the data to match the WatchlistCompany interface
        const transformedCompanies = data.savedCompanies.map((item: any) => ({
          id: item.id,
          company_id: item.company_id,
          companies: item.companies
        }));
        
        setSavedCompanies(transformedCompanies);
        
        // Also refresh the watchlist data to ensure consistency
        fetchWatchlistCompanies();
      } else {
        console.log("DashboardView: No saved companies found");
        setSavedCompanies([]);
      }
      
      // Process investments to create chart data
      processInvestmentsData(data.investments);
      
      // Update stats
      updateStatistics(data);
      
    } catch (error) {
      console.error("Error in fetchProfileData:", error);
      throw error;
    }
  };
  
  const processInvestmentsData = (investments: any[] = []) => {
    if (investments && investments.length > 0) {
      // Group investments by month
      const investmentsByMonth = investments.reduce((acc: Record<string, number>, inv: any) => {
        const date = new Date(inv.investment_date);
        const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
        
        if (!acc[monthYear]) {
          acc[monthYear] = 0;
        }
        
        acc[monthYear] += parseFloat(inv.amount) || 0;
        return acc;
      }, {});
      
      // Convert to array format for chart
      const chartData = Object.entries(investmentsByMonth).map(([month, amount]) => ({
        month,
        amount: Number(amount)
      }));
      
      // Sort by date
      chartData.sort((a, b) => {
        const dateA = new Date(a.month);
        const dateB = new Date(b.month);
        return dateA.getTime() - dateB.getTime();
      });
      
      // Take last 7 months or fill with sample data if less
      const finalChartData = chartData.length >= 7 
        ? chartData.slice(-7) 
        : [...Array(7 - chartData.length).fill(null).map((_, i) => ({
            month: `Month ${i+1}`,
            amount: 0
          })), ...chartData];
          
      setInvestmentData(finalChartData);
    } else {
      // Use sample data if no investments
      setInvestmentData([
        { month: "Jan", amount: 1000 },
        { month: "Feb", amount: 2200 },
        { month: "Mar", amount: 1800 },
        { month: "Apr", amount: 2400 },
        { month: "May", amount: 3200 },
        { month: "Jun", amount: 2800 },
        { month: "Jul", amount: 3600 },
      ]);
    }
  };
  
  const updateStatistics = (data: any) => {
    setStats([
      {
        title: "Total Investments",
        value: `$${data.profile?.total_investments?.toLocaleString() || '0'}`,
        description: "Your total investment",
        icon: <BarChart className="h-6 w-6" />,
        color: "from-green-400 to-blue-500",
      },
      {
        title: "Sustainable Companies",
        value: data.stats?.companiesCount?.toString() || "0",
        description: "Across various sectors",
        icon: <Leaf className="h-6 w-6" />,
        color: "from-green-500 to-emerald-600",
      },
      {
        title: "Impact Score",
        value: `${data.profile?.impact_score || 0}/10`,
        description: "Based on ESG criteria",
        icon: <Globe className="h-6 w-6" />,
        color: "from-blue-400 to-indigo-600",
      },
      {
        title: "Community Members",
        value: data.stats?.usersCount?.toString() || "0",
        description: "Active investors",
        icon: <Users className="h-6 w-6" />,
        color: "from-purple-400 to-pink-500",
      },
    ]);
  };

  // Show a more informative loading state
  if (authLoading || loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4 min-h-[80vh] bg-white">
        <div className="relative h-12 w-12">
          <motion.div 
            className="absolute inset-0"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }} 
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Leaf className="h-12 w-12 text-slate-600" />
          </motion.div>
        </div>
        <motion.p 
          className="text-slate-700 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading your sustainable investments...
        </motion.p>
        <p className="text-slate-500 text-sm">Growing your impact dashboard</p>
      </div>
    );
  }

  // Show error state if there was an error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4 min-h-[60vh] bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-slate-700 mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-slate-800 hover:bg-slate-700 text-white"
          >
            Retry
          </Button>
        </motion.div>
      </div>
    );
  }

  // Redirect if no user
  if (!user) {
    router.push("/auth/signin");
    return (
      <div className="flex items-center justify-center p-8 min-h-[60vh] bg-white">
        <motion.p 
          className="text-slate-500"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Redirecting to login...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Simplified outer container with minimal styling */}
      <div className="relative">
        <div className="px-5 py-6 md:px-8 md:py-8">
          <DashboardHero 
            user={user} 
            profile={authProfile}
            loading={loading}
          />
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} 
            className="mt-8"
          >
            <TabsList className="mx-auto mb-6 border border-slate-200 bg-white/80 p-1 rounded-full w-auto inline-flex shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)]">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-800 data-[state=active]:shadow-sm rounded-full px-5 py-1.5 text-sm transition-all duration-200"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="investments" 
                className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-800 data-[state=active]:shadow-sm rounded-full px-5 py-1.5 text-sm transition-all duration-200"
              >
                Investments
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Investment Growth Chart - Modern styling */}
                <div className="rounded-xl border border-slate-200 p-6 bg-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
                  hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-shadow duration-500 relative overflow-hidden">
                  {/* Subtle accent line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-400 to-slate-200/20" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 relative z-10">
                    <div>
                      <h2 className="text-lg font-medium text-slate-800">Investment Growth</h2>
                      <p className="text-slate-500 text-xs">Track your sustainable investment growth over time</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 md:mt-0">
                      <span className="text-xs text-slate-500">Last 7 periods</span>
                      <div className="h-3 w-3 rounded-full bg-slate-100 flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-500"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[250px] relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={investmentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#64748b" stopOpacity={0.5} />
                            <stop offset="100%" stopColor="#64748b" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="month" 
                          stroke="#64748b"
                          tick={{ fill: '#64748b' }}
                          axisLine={{ stroke: '#e2e8f0' }}
                          tickLine={{ stroke: '#e2e8f0' }}
                        />
                        <YAxis 
                          stroke="#64748b"
                          tick={{ fill: '#64748b' }}
                          axisLine={{ stroke: '#e2e8f0' }}
                          tickLine={{ stroke: '#e2e8f0' }}
                          tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                          labelStyle={{ color: '#334155', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}
                          itemStyle={{ color: '#334155', fontSize: '12px', padding: '2px 0' }}
                          formatter={(value: number) => [`$${value.toLocaleString()}`, 'Investment']}
                        />
                        <Area
                          type="monotone"
                          dataKey="amount"
                          stroke="#64748b"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#investmentGradient)"
                          activeDot={{ r: 6, stroke: '#64748b', strokeWidth: 2, fill: '#fff' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Background glow effect */}
                  <div className="absolute bottom-0 right-[10%] w-[200px] h-[200px] bg-slate-100/30 rounded-full blur-[80px] pointer-events-none"></div>
                </div>

                {/* Analytics Grid - Modern styling */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {/* Left: Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="h-full"
                      >
                        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] 
                          hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden group">
                          {/* Subtle top accent */}
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-400 to-slate-300/20" />
                          
                          <div className="flex items-start justify-between mb-2 relative z-10">
                            <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">{stat.title}</span>
                            <div className="p-1.5 rounded-lg bg-slate-50 shadow-sm 
                              group-hover:scale-110 transition-transform duration-200">
                              {React.cloneElement(stat.icon as React.ReactElement, { className: 'h-3.5 w-3.5 text-slate-600' })}
                            </div>
                          </div>
                          <div className="text-lg font-bold text-slate-800">{stat.value}</div>
                          <p className="text-xs text-slate-500 mt-0.5">{stat.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Right: Watchlist - Modern styling */}
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl border border-slate-200 h-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
                      hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-shadow duration-500 relative overflow-hidden">
                      {/* Decorative top accent */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-500 via-slate-400 to-transparent" />
                      
                      <div className="p-3 border-b border-slate-200 relative z-10">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-base font-medium text-slate-800">Watchlist</h2>
                            <p className="text-xs text-slate-500">Companies you're tracking</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push("/account/watchlist")}
                            className="text-slate-600 hover:text-slate-800 hover:bg-slate-100 text-xs rounded-lg"
                          >
                            View All
                            <ArrowRight className="ml-1 h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-3 relative z-10">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key="watchlist"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <WatchlistView 
                              externalData={savedCompanies.length > 0 ? savedCompanies : watchlistCompanies}
                              externalLoading={loading}
                              isPreview={true}
                              maxItems={3}
                              onViewAll={() => router.push("/account/watchlist")}
                            />
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="investments">
              <AnimatePresence mode="wait">
                <motion.div
                  key="investments"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
                  hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] p-6 relative overflow-hidden"
                >
                  {/* Decorative top accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-500 via-slate-400 to-transparent" />
                  
                  <div className="relative z-10">
                    <UserInvestments />
                  </div>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
