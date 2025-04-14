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

// Updated animation variants to match style guide
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.08,
      duration: 0.5
    }
  }
}

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
}

const floatingVariants = {
  initial: { y: 0 },
  animate: { 
    y: [0, -10, 0],
    rotate: [0, 0.5, 0, -0.5, 0],
    transition: {
      y: {
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse", 
        ease: "easeInOut"
      },
      rotate: {
        duration: 12,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
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
        color: "from-[#70f570] to-[#49c628]",
      },
      {
        title: "Sustainable Companies",
        value: "0",
        description: "Across various sectors",
        icon: <Leaf className="h-6 w-6" />,
        color: "from-[#70f570] to-[#49c628]",
      },
      {
        title: "Impact Score",
        value: `${authProfile?.impact_score || 0}/10`,
        description: "Based on ESG criteria",
        icon: <Globe className="h-6 w-6" />,
        color: "from-[#70f570] to-[#49c628]",
      },
      {
        title: "Community Members",
        value: "0",
        description: "Active investors",
        icon: <Users className="h-6 w-6" />,
        color: "from-[#70f570] to-[#49c628]",
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
        color: "from-[#70f570] to-[#49c628]",
      },
      {
        title: "Sustainable Companies",
        value: data.stats?.companiesCount?.toString() || "0",
        description: "Across various sectors",
        icon: <Leaf className="h-6 w-6" />,
        color: "from-[#70f570] to-[#49c628]",
      },
      {
        title: "Impact Score",
        value: `${data.profile?.impact_score || 0}/10`,
        description: "Based on ESG criteria",
        icon: <Globe className="h-6 w-6" />,
        color: "from-[#70f570] to-[#49c628]",
      },
      {
        title: "Community Members",
        value: data.stats?.usersCount?.toString() || "0",
        description: "Active investors",
        icon: <Users className="h-6 w-6" />,
        color: "from-[#70f570] to-[#49c628]",
      },
    ]);
  };

  // Show a more informative loading state
  if (authLoading || loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4 min-h-[80vh]" 
        style={{ background: 'linear-gradient(115deg, #70f570, #49c628)' }}>
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
            <Leaf className="h-12 w-12 text-white" />
          </motion.div>
        </div>
        <motion.p 
          className="text-white font-medium font-display"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading your sustainable investments...
        </motion.p>
        <p className="text-white/90 text-sm font-body">Growing your impact dashboard</p>
      </div>
    );
  }

  // Show error state if there was an error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4 min-h-[60vh]"
        style={{ background: 'linear-gradient(115deg, #70f570, #49c628)' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
        >
          <p className="text-black mb-4 font-body">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold
                      shadow-sm hover:shadow transition-all duration-300 
                      rounded-lg py-3 text-sm font-helvetica"
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
      <div className="flex items-center justify-center p-8 min-h-[60vh]"
        style={{ background: 'linear-gradient(115deg, #70f570, #49c628)' }}>
        <motion.p 
          className="text-white font-medium font-body"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Redirecting to login...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ background: 'linear-gradient(115deg, #70f570, #49c628)' }}>
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, white 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      ></div>
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-white/15 rounded-full blur-[150px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[800px] h-[800px] bg-white/15 rounded-full blur-[150px] -z-10 animate-pulse" style={{ animationDelay: '-2s' }}></div>
      
      {/* Main content container */}
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
            <TabsList className="mx-auto mb-6 border border-white/30 bg-white/10 backdrop-blur-md p-1 rounded-full w-auto inline-flex shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-white data-[state=active]:text-green-900 data-[state=active]:shadow-sm rounded-full px-5 py-1.5 text-sm text-white transition-all duration-300 font-body"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="investments" 
                className="data-[state=active]:bg-white data-[state=active]:text-green-900 data-[state=active]:shadow-sm rounded-full px-5 py-1.5 text-sm text-white transition-all duration-300 font-body"
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
                {/* Investment Growth Chart */}
                <motion.div 
                  variants={itemVariants}
                  className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
                >
                  {/* Simple white background */}
                  <div className="absolute inset-0 bg-white"></div>
                  
                  {/* Card content */}
                  <div className="relative z-5 h-full p-4 sm:p-5 md:p-7 flex flex-col">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-black leading-tight tracking-tight font-display">Investment Growth</h2>
                        <p className="text-sm sm:text-base text-black mt-2 leading-relaxed font-body">Track your sustainable investment growth over time</p>
                      </div>
                      <div className="flex items-center space-x-2 mt-2 md:mt-0">
                        <span className="text-xs text-black/70 font-body">Last 7 periods</span>
                        <div className="h-3 w-3 rounded-full bg-gradient-to-br from-[#70f570] to-[#49c628] flex items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={investmentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#70f570" stopOpacity={0.4} />
                              <stop offset="100%" stopColor="#49c628" stopOpacity={0.1} />
                            </linearGradient>
                          </defs>
                          <XAxis 
                            dataKey="month" 
                            stroke="#3a6d2e"
                            tick={{ fill: '#3a6d2e' }}
                            axisLine={{ stroke: '#e2e8f0' }}
                            tickLine={{ stroke: '#e2e8f0' }}
                          />
                          <YAxis 
                            stroke="#3a6d2e"
                            tick={{ fill: '#3a6d2e' }}
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
                            stroke="#49c628"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#investmentGradient)"
                            activeDot={{ r: 6, stroke: '#49c628', strokeWidth: 2, fill: '#fff' }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>

                {/* Analytics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {/* Left: Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                      >
                        <div className="relative overflow-hidden rounded-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                          {/* Simple white background */}
                          <div className="absolute inset-0 bg-white"></div>
                          
                          {/* Card content */}
                          <div className="relative z-5 h-full p-4 flex flex-col">
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-xs text-black/70 uppercase tracking-wide font-medium font-body">{stat.title}</span>
                              <div className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-gradient-to-br from-[#70f570] to-[#49c628] flex items-center justify-center">
                                {React.cloneElement(stat.icon as React.ReactElement, { className: 'h-3 w-3 text-white' })}
                              </div>
                            </div>
                            <div className="font-extrabold text-black text-lg sm:text-xl mb-1 font-helvetica">{stat.value}</div>
                            <p className="text-xs text-black/70 font-body">{stat.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Right: Watchlist */}
                  <motion.div 
                    variants={itemVariants}
                    className="lg:col-span-2"
                  >
                    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
                      {/* Simple white background */}
                      <div className="absolute inset-0 bg-white"></div>
                      
                      {/* Card content */}
                      <div className="relative z-5 h-full flex flex-col">
                        <div className="p-4 border-b border-slate-100">
                          <div className="flex items-center justify-between">
                            <div>
                              <h2 className="text-xl font-extrabold text-black leading-tight tracking-tight font-display">Watchlist</h2>
                              <p className="text-sm text-black/70 font-body">Companies you're tracking</p>
                            </div>
                            <Button
                              onClick={() => router.push("/account/watchlist")}
                              className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold
                                      shadow-sm hover:shadow transition-all duration-300 
                                      rounded-lg py-2 px-4 text-sm font-helvetica"
                            >
                              View All
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
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
                  </motion.div>
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
                  className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
                >
                  {/* Simple white background */}
                  <div className="absolute inset-0 bg-white"></div>
                  
                  {/* Card content */}
                  <div className="relative z-5 h-full p-4 sm:p-5 md:p-7">
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
