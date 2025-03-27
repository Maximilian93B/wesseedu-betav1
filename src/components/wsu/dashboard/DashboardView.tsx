"use client"

import React, { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Users, TrendingUp, Leaf, Globe, ChevronRight } from "lucide-react"
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
            <Leaf className="h-12 w-12 text-emerald-500" />
          </motion.div>
        </div>
        <motion.p 
          className="text-emerald-600 font-medium"
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
          <p className="text-red-500 mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-emerald-500 hover:bg-emerald-400 text-white"
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
      <div className="rounded-xl overflow-hidden mb-6 relative border border-slate-200 bg-white shadow-md">
        {/* Decorative top accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-blue-400/50 to-transparent z-10" />
        <div className="absolute top-1 right-0 w-[40%] h-px bg-gradient-to-l from-slate-300/40 to-transparent" />
        
        <div className="px-4 py-5 sm:p-6">
          <DashboardHero 
            user={user} 
            profile={authProfile}
            loading={loading}
          />
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="bg-slate-50 border border-slate-200 p-1 mb-5 rounded-lg">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-md px-4 py-1.5 text-sm"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="investments" 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-md px-4 py-1.5 text-sm"
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
                <div className="rounded-xl border border-slate-200 p-5 shadow-md bg-white relative overflow-hidden">
                  {/* Subtle accent line */}
                  <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-emerald-500/30 via-emerald-400/10 to-transparent" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 relative z-10">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">Investment Growth</h2>
                      <p className="text-slate-500 text-xs">Track your sustainable investment growth over time</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 md:mt-0">
                      <span className="text-xs text-slate-500">Last 7 periods</span>
                      <div className="h-3 w-3 rounded-full bg-emerald-100 flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[250px] relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={investmentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity={0.6} />
                            <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="month" 
                          stroke="#52525b"
                          tick={{ fill: '#a1a1aa' }}
                          axisLine={{ stroke: '#3f3f46' }}
                          tickLine={{ stroke: '#3f3f46' }}
                        />
                        <YAxis 
                          stroke="#52525b"
                          tick={{ fill: '#a1a1aa' }}
                          axisLine={{ stroke: '#3f3f46' }}
                          tickLine={{ stroke: '#3f3f46' }}
                          tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(24, 24, 27, 0.95)',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            borderRadius: '6px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
                          }}
                          labelStyle={{ color: '#f4f4f5', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}
                          itemStyle={{ color: '#10b981', fontSize: '12px', padding: '2px 0' }}
                          formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                        />
                        <Area
                          type="monotone"
                          dataKey="amount"
                          stroke="#10b981"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#investmentGradient)"
                          activeDot={{ r: 5, stroke: '#10b981', strokeWidth: 2, fill: '#fff' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Background glow effect */}
                  <div className="absolute bottom-0 right-[10%] w-[200px] h-[200px] bg-emerald-100 rounded-full blur-[80px] pointer-events-none"></div>
                </div>

                {/* Analytics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Left: Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="h-full"
                      >
                        <div className="bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 rounded-lg border border-zinc-800/50 p-3 shadow-md hover:border-zinc-700/50 transition-all duration-200 hover:shadow-lg relative overflow-hidden">
                          {/* Subtle top accent */}
                          <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r ${stat.color} opacity-30`} />
                          
                          <div className="flex items-start justify-between mb-2 relative z-10">
                            <span className="text-xs text-zinc-400 uppercase tracking-wide">{stat.title}</span>
                            <div className={`p-1 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10 shadow-sm`}>
                              {React.cloneElement(stat.icon as React.ReactElement, { className: 'h-4 w-4' })}
                            </div>
                          </div>
                          <div className="text-lg font-bold text-white">{stat.value}</div>
                          <p className="text-xs text-zinc-500 mt-0.5">{stat.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Right: Watchlist */}
                  <div className="lg:col-span-2">
                    <div className="bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 rounded-xl border border-zinc-800/50 h-full shadow-lg overflow-hidden hover:border-zinc-700/50 transition-all duration-200 relative">
                      {/* Decorative top accent */}
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-indigo-600/50 via-indigo-500/10 to-transparent" />
                      {/* Subtle glow */}
                      <div className="absolute top-[20%] right-[10%] w-[150px] h-[150px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none"></div>
                      
                      <div className="p-3 border-b border-zinc-800/50 relative z-10">
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-base font-bold text-white">Watchlist</h2>
                            <p className="text-xs text-zinc-400">Companies you're tracking</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push("/auth/home")}
                            className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/50 px-2 py-1 text-xs rounded-md"
                          >
                            View All
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
                              onViewAll={() => router.push("/auth/home")}
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
                  className="bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 rounded-xl border border-zinc-800/50 shadow-lg p-5 relative overflow-hidden"
                >
                  {/* Decorative top accent */}
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-blue-600/50 via-blue-500/10 to-transparent" />
                  {/* Subtle glow */}
                  <div className="absolute bottom-[10%] left-[10%] w-[200px] h-[200px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>
                  
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
