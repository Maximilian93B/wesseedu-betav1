"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Users, TrendingUp, Leaf, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { WatchlistView, useWatchlist } from "./WatchlistView"
import UserInvestments from "./UserInvestments"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth"

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

interface DashboardViewProps {
  user: any  // You can make this more specific based on your user type
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
  const [profileData, setProfileData] = useState<any>(null)
  
  // Use the shared watchlist hook to avoid duplicate data fetching
  const { 
    watchlistCompanies, 
    loading: watchlistLoading,
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
    // Don't try to load data if auth is still loading
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
    console.log("DashboardView: Fetching profile data from API");
    try {
      const { data, error } = await fetchWithAuth('/api/auth/profile', {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
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
        
        console.log("DashboardView: Transformed saved companies data", transformedCompanies);
        setSavedCompanies(transformedCompanies);
        
        // Also refresh the watchlist data to ensure consistency
        fetchWatchlistCompanies();
      } else {
        console.log("DashboardView: No saved companies found");
        setSavedCompanies([]);
      }
      
      // Process investments to create chart data
      if (data.investments && data.investments.length > 0) {
        // Group investments by month
        const investmentsByMonth = data.investments.reduce((acc: Record<string, number>, inv: any) => {
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
      
      // Update stats
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
    } catch (error) {
      console.error("Error in fetchProfileData:", error);
      // Don't rethrow - we want to continue even if this fails
    }
  };

  // Show a more informative loading state
  if (authLoading || loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="h-10 w-10 animate-spin">
          <BarChart className="h-10 w-10 text-emerald-400/50" />
        </div>
        <p className="text-emerald-400 animate-pulse">Loading dashboard data...</p>
        <p className="text-zinc-500 text-sm">This may take a few moments</p>
      </div>
    );
  }

  // Show error state if there was an error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <p className="text-red-400">{error}</p>
        <Button 
          onClick={() => window.location.reload()}
          className="bg-emerald-500 hover:bg-emerald-400 text-white"
        >
          Retry
        </Button>
      </div>
    );
  }

  // Redirect if no user
  if (!user) {
    router.push("/auth/signin");
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-zinc-400">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-black text-white min-h-screen p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-4xl font-bold tracking-tight text-white mb-2">Welcome Back, {user?.email}</h2>
        <p className="text-gray-400">Here's an overview of your sustainable investments and impact.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-black border-emerald-500/20 border-2 shadow-lg hover:border-emerald-400/40 transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium text-white">{stat.title}</CardTitle>
                <div className="text-emerald-400">{stat.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-400">{stat.value}</div>
                <p className="text-sm text-gray-400">{stat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-black border-emerald-500/20 border-2 shadow-lg hover:border-emerald-400/40 transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">Investment Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={investmentData}>
                <defs>
                  <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis 
                  stroke="#6b7280"
                  tick={{ fill: '#6b7280' }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#000',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#fff' }}
                  itemStyle={{ color: '#10b981' }}
                  formatter={(value: number) => [`$${value}`, 'Investment']}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#investmentGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-black border-emerald-500/20 border-2 shadow-lg hover:border-emerald-400/40 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-white">Watchlist</CardTitle>
              <p className="text-sm text-gray-400">Your saved companies</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/auth/home")}
              className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/50"
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <WatchlistView 
              externalData={savedCompanies.length > 0 ? savedCompanies : watchlistCompanies}
              externalLoading={loading}
              isPreview={true}
              maxItems={3}
              onViewAll={() => router.push("/auth/home")}
            />
          </CardContent>
        </Card>
      </div>

      {/* New Investments and Watchlist Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <UserInvestments />
        </motion.div>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={() => router.push("/companies")}
          className="bg-emerald-500 text-white hover:bg-emerald-400 transition-colors duration-200"
        >
          Explore Sustainable Companies
        </Button>
      </div>
    </div>
  );
}

