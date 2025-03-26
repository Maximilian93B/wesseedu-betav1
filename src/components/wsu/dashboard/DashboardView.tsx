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
import InvestmentOverviewChart from "./InvestmentOverviewChart"

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
  user: any
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.07,
      duration: 0.3
    }
  }
}

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 350, damping: 25 }
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
        <div className="relative h-10 w-10">
          <motion.div 
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Leaf className="h-10 w-10 text-emerald-500" />
          </motion.div>
        </div>
        <p className="text-emerald-600 font-medium text-sm">Loading your dashboard...</p>
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-6">
        <DashboardHero 
          user={user} 
          profile={authProfile}
          loading={loading}
        />
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="bg-white border border-slate-200 p-1 mb-6 rounded-lg shadow-sm">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md px-4 py-1.5 text-sm"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="investments" 
              className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md px-4 py-1.5 text-sm"
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
              {/* Investment Overview */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left side: Total investment */}
                  <div className="p-6 flex flex-col justify-center">
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Total Investment</h3>
                    <div className="mb-4">
                      <span className="text-4xl md:text-5xl font-bold text-emerald-600">
                        {stats[0]?.value || '$0'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-slate-500">Companies</div>
                        <div className="text-xl font-bold text-slate-800">{stats[1]?.value || '0'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Impact Score</div>
                        <div className="text-xl font-bold text-slate-800">{stats[2]?.value || '0/10'}</div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => router.push("/investments")}
                      size="sm"
                      className="w-fit text-sm"
                    >
                      Manage Investments
                    </Button>
                  </div>
                  
                  {/* Right side: Investment chart */}
                  <div className="border-t md:border-t-0 md:border-l border-slate-100">
                    <InvestmentOverviewChart />
                  </div>
                </div>
              </motion.div>

              {/* Investment Growth Chart */}
              <motion.div variants={itemVariants} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">Investment Growth</h2>
                      <p className="text-slate-500 text-xs">Track your sustainable investment growth over time</p>
                    </div>
                    <div className="flex items-center mt-2 md:mt-0">
                      <span className="text-xs text-slate-500">Last 7 periods</span>
                    </div>
                  </div>
                  
                  <div className="h-[250px]">
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
                          stroke="#94a3b8"
                          tick={{ fill: '#64748b' }}
                          axisLine={{ stroke: '#e2e8f0' }}
                          tickLine={{ stroke: '#e2e8f0' }}
                        />
                        <YAxis 
                          stroke="#94a3b8"
                          tick={{ fill: '#64748b' }}
                          axisLine={{ stroke: '#e2e8f0' }}
                          tickLine={{ stroke: '#e2e8f0' }}
                          tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.98)',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            borderRadius: '6px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                          }}
                          labelStyle={{ color: '#334155', fontWeight: 'bold', marginBottom: '5px', fontSize: '13px' }}
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
                </div>
              </motion.div>

              {/* Secondary Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Stats grid - simplified */}
                <motion.div variants={itemVariants} className="lg:col-span-1">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <h3 className="text-base font-semibold text-slate-800 mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                      {stats.slice(1, 4).map((stat, index) => (
                        <div 
                          key={index}
                          className="flex items-center p-3 rounded-lg border border-slate-100 bg-slate-50"
                        >
                          <div className={`p-2 rounded-md mr-3 text-white bg-gradient-to-br ${stat.color}`}>
                            {React.cloneElement(stat.icon as React.ReactElement, { className: 'h-4 w-4' })}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-800">{stat.value}</div>
                            <div className="text-xs text-slate-500">{stat.title}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Watchlist - simplified */}
                <motion.div variants={itemVariants} className="lg:col-span-2">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full">
                    <div className="p-4 border-b border-slate-100">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold text-slate-800">Watchlist</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push("/account/watchlist")}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs h-8"
                        >
                          View All <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <WatchlistView 
                        externalData={savedCompanies.length > 0 ? savedCompanies : watchlistCompanies}
                        externalLoading={loading}
                        isPreview={true}
                        maxItems={3}
                        onViewAll={() => router.push("/account/watchlist")}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="investments">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <UserInvestments />
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
