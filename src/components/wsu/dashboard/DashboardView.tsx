"use client"

import React, { useEffect, useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart, Users, Leaf, Globe, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts"
import { WatchlistView, useWatchlist } from "./WatchlistView"
import UserInvestments from "./UserInvestments"
import { DashboardHero } from "./DashboardHero"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth"
import { CACHE_KEYS, CACHE_EXPIRY, getCachedData, setCachedData } from "@/lib/utils/cacheUtils"
import CommunityIntegration from "./community/CommunityIntegration"
import GoalTracker from "./goals/GoalTracker"
import InvestmentOverviewChart from "./InvestmentOverviewChart"
import { Skeleton } from "@/components/ui/skeleton"

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
  quickActionsComponent?: React.ReactNode
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

export function DashboardView({ user, quickActionsComponent }: DashboardViewProps) {
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
  const isInitialMount = useRef(true);
  const fetchInProgress = useRef(false);
  const localUserRef = useRef(user);
  
  // Update local user ref when prop changes
  useEffect(() => {
    localUserRef.current = user;
  }, [user]);
  
  // Use the shared watchlist hook to avoid duplicate data fetching
  const { 
    fetchWatchlistCompanies
  } = useWatchlist()

  // Add a global timeout to forcibly exit loading state after 10 seconds
  useEffect(() => {
    // Only set the timeout once when loading becomes true
    const loadingStartTime = Date.now();
    const loadingTimeoutId = setTimeout(() => {
      // Only force exit if still loading after timeout
      if (loading && Date.now() - loadingStartTime >= 10000) {
        console.log("DashboardView: Global loading timeout reached, forcing exit from loading state");
        setLoading(false);
        toast({
          title: "Loading Timeout",
          description: "Dashboard took too long to load. Some elements may be missing.",
          variant: "destructive"
        });
      }
    }, 10000);
    
    return () => clearTimeout(loadingTimeoutId);
    
    // Run this effect only once on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const processInvestmentsData = useCallback((investments: any[] = []) => {
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
  }, []);
  
  const updateStatistics = useCallback((data: any) => {
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
  }, []);

  const fetchProfileData = useCallback(async () => {
    // Prevent concurrent fetch operations
    if (fetchInProgress.current) {
      console.log("DashboardView: Profile data fetch already in progress, skipping duplicate call");
      return;
    }

    console.log("DashboardView: Checking for cached profile data");
    fetchInProgress.current = true;
    
    try {
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
        } else {
          console.log("DashboardView: No saved companies in cache");
          setSavedCompanies([]);
        }
        
        // Process cached investment data
        processInvestmentsData(cachedData.investments);
        
        // Update stats
        updateStatistics(cachedData);
        
        // Make sure to exit loading state even when using cached data
        setLoading(false);
        return;
      }
      
      // If no valid cache exists, fetch fresh data
      console.log("DashboardView: Fetching profile data from API");
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
      } else {
        console.log("DashboardView: No saved companies found");
        setSavedCompanies([]);
      }
      
      // Process investments to create chart data
      processInvestmentsData(data.investments);
      
      // Update stats
      updateStatistics(data);
      
      // Set loading to false after successful fetch
      setLoading(false);
    } catch (error) {
      console.error("Error in fetchProfileData:", error);
      // Set loading to false even when there's an error
      setLoading(false);
      throw error;
    } finally {
      fetchInProgress.current = false;
    }
  }, [processInvestmentsData, updateStatistics]);

  useEffect(() => {
    // Improved logging to track what's happening
    console.log("DashboardView: Effect triggered with authLoading:", authLoading, 
               "user:", user?.id || "not set", 
               "isInitialMount:", isInitialMount.current, 
               "profileData exists:", !!profileData);
    
    // Don't do anything if explicitly transitioning to not loading
    if (!loading && !isInitialMount.current) {
      console.log("DashboardView: Already not loading and not initial mount, skipping fetch");
      return;
    }
    
    // Still loading auth, wait for it to complete
    if (authLoading) {
      console.log("DashboardView: Auth still loading, waiting...");
      return;
    }
    
    // Valid user check using both the prop user and auth state
    const effectiveUser = user || localUserRef.current;
    
    // If we have a user and this is the initial mount, proceed with data fetching
    if (effectiveUser && isInitialMount.current) {
      console.log("DashboardView: User is authenticated, proceeding with data fetch");
      isInitialMount.current = false;
      
      let mounted = true;
      
      const loadData = async () => {
        if (!mounted) return;
        
        try {
          setLoading(true);
          setError(null);
          
          console.log("DashboardView: Starting profile data fetch");
          // Set a more reasonable timeout that's shorter than the global one
          const timeoutId = setTimeout(() => {
            if (mounted && loading) {
              console.log("DashboardView: Local timeout reached, setting error state");
              setLoading(false);
              setError("Loading took too long. Some data may be incomplete.");
              toast({
                title: "Warning",
                description: "Loading took too long. Some data may be incomplete.",
                variant: "destructive"
              });
            }
          }, 7000);
          
          await fetchProfileData();
          
          if (mounted) {
            console.log("DashboardView: Data fetch completed successfully");
            clearTimeout(timeoutId);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error loading dashboard data:", error);
          if (mounted) {
            setError("Failed to load dashboard data");
            setLoading(false);
          }
        }
      };
      
      loadData();
      
      return () => {
        mounted = false;
      };
    } else {
      // No valid user or not initial mount
      if (!effectiveUser) {
        console.log("DashboardView: No valid user, not fetching data");
      } else {
        console.log("DashboardView: Not initial mount or data already fetched");
      }
      
      // Ensure loading is turned off in all cases
      if (loading) {
        console.log("DashboardView: Turning off loading state as no data fetch is needed");
        setLoading(false);
      }
    }
  }, [user, authLoading, fetchProfileData, loading, profileData, toast]);

  // Show a more informative loading state
  if (authLoading || loading) {
    console.log("DashboardView: Rendering loading state, authLoading:", authLoading, "loading:", loading);
    return (
      <div className="w-full bg-white min-h-screen rounded-t-[2rem] sm:rounded-t-[2.5rem] md:rounded-t-[3rem] shadow-[0_-8px_30px_rgba(0,0,0,0.15)] border-t border-white/20 overflow-hidden">
        {/* Decorative top accent following Green Apple style */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#70f570] via-[#49c628] to-transparent" />
        
        <div className="px-3 py-4 pt-6 sm:pt-8 md:pt-10 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          {/* Skeleton for DashboardHero */}
          <div className="mb-6 sm:mb-8">
            <Skeleton className="h-16 sm:h-20 w-3/4 mb-3 rounded-lg" />
            <Skeleton className="h-6 w-1/2 rounded-lg" />
          </div>
          
          {/* Skeleton for charts */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 mt-6 sm:mt-8 md:mt-10">
            {/* Investment Growth Chart skeleton */}
            <div className="rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-3 sm:p-4 md:p-5 lg:p-6">
              <Skeleton className="h-6 w-1/3 mb-2 rounded-lg" />
              <Skeleton className="h-4 w-1/2 mb-4 rounded-lg" />
              <Skeleton className="h-[250px] sm:h-[280px] md:h-[320px] lg:h-[380px] w-full rounded-lg" />
            </div>
            
            {/* 2 column section skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              {/* Left Column */}
              <div className="rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-3 sm:p-4 md:p-5 lg:p-6">
                <Skeleton className="h-6 w-1/2 mb-3 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full rounded-lg" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
              </div>
              
              {/* Right Column */}
              <div className="rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-3 sm:p-4 md:p-5 lg:p-6">
                <Skeleton className="h-6 w-1/2 mb-3 rounded-lg" />
                <Skeleton className="h-[180px] w-full rounded-lg" />
              </div>
            </div>
            
            {/* Goals Section skeleton */}
            <div className="rounded-lg sm:rounded-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-3 sm:p-4 md:p-5 lg:p-6">
              <Skeleton className="h-6 w-1/4 mb-3 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-full rounded-lg" />
                <Skeleton className="h-8 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show error state if there was an error
  if (error) {
    console.log("DashboardView: Rendering error state:", error);
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4 min-h-[60vh]"
        style={{ background: 'linear-gradient(115deg, #70f570, #49c628)' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
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

  // Check for authenticated user - use BOTH the prop user and auth context user
  const effectiveUser = user || localUserRef.current;
  
  // Redirect if no user
  if (!effectiveUser) {
    console.log("DashboardView: No user found");
    // Don't redirect automatically - this causes auth token loss
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[60vh]"
        style={{ background: 'linear-gradient(115deg, #70f570, #49c628)' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        >
          <p className="text-black mb-4 font-body">Authentication required to view dashboard</p>
          <Button 
            onClick={() => {
              const returnPath = encodeURIComponent("/dashboard/overview");
              window.location.href = `/auth/signin?returnTo=${returnPath}`;
            }}
            className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold
                      shadow-sm hover:shadow transition-all duration-300 
                      rounded-lg py-3 text-sm font-helvetica"
          >
            Go to Login
          </Button>
        </motion.div>
      </div>
    );
  }

  console.log("DashboardView: Rendering main dashboard for user:", effectiveUser.id);
  return (
    <div className="w-full bg-white min-h-screen rounded-t-[2rem] sm:rounded-t-[2.5rem] md:rounded-t-[3rem] shadow-[0_-8px_30px_rgba(0,0,0,0.15)] border-t border-white/20 overflow-hidden">
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
      
      {/* Main content container - full width */}
      <div className="relative w-full">
        <div className="px-3 py-4 pt-6 sm:pt-8 md:pt-10 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          {/* Hero Section */}
          <DashboardHero 
            user={user} 
            profile={authProfile}
            loading={loading}
          />
          
          {/* Insert QuickActions component here, between hero and charts */}
          {quickActionsComponent && (
            <div className="relative py-8 -mx-3 sm:-mx-6 md:-mx-8 lg:-mx-10 xl:-mx-12 2xl:-mx-16">
              {/* Break out of the white background */}
              <div className="absolute inset-0 bg-transparent"></div>
              {quickActionsComponent}
            </div>
          )}
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 mt-6 sm:mt-8 md:mt-10"
          >
            {/* Investment Growth Chart */}
            <motion.div 
              variants={itemVariants}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(0,0,0,0.12)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Simple white background */}
              <div className="absolute inset-0 bg-white"></div>
              
              {/* Decorative top accent following Green Apple style */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#70f570] via-[#49c628] to-transparent" />
              
              {/* Card content */}
              <div className="relative z-5 h-full p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 md:mb-4">
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-black leading-tight tracking-tight font-display">Investment Growth</h2>
                    <p className="text-xs sm:text-sm md:text-base text-black mt-1 md:mt-2 leading-relaxed font-body">Track your sustainable investment growth over time</p>
                  </div>
                  <div className="flex items-center space-x-2 mt-2 md:mt-0">
                    <span className="text-xs text-black/70 font-body">Last 7 periods</span>
                    <div className="h-3 w-3 rounded-full bg-gradient-to-br from-[#70f570] to-[#49c628] flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>
                
                <div className="h-[250px] sm:h-[280px] md:h-[320px] lg:h-[380px]">
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
                        tick={{ fill: '#3a6d2e', fontSize: '10px', dy: 5 }}
                        axisLine={{ stroke: '#e2e8f0' }}
                        tickLine={{ stroke: '#e2e8f0' }}
                      />
                      <YAxis 
                        stroke="#3a6d2e"
                        tick={{ fill: '#3a6d2e', fontSize: '10px' }}
                        axisLine={{ stroke: '#e2e8f0' }}
                        tickLine={{ stroke: '#e2e8f0' }}
                        tickFormatter={(value) => `$${value}`}
                        width={45}
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
            
            {/* Investments Section - 2 columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              {/* Left Column: User Investments */}
              <motion.div variants={itemVariants} className="h-full">
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] h-full">
                  <div className="absolute inset-0 bg-white"></div>
                  {/* Decorative top accent following Green Apple style */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#70f570] via-[#49c628] to-transparent" />
                  <div className="relative z-5 h-full p-3 sm:p-4 md:p-5 lg:p-6">
                    <UserInvestments />
                  </div>
                </div>
              </motion.div>
              
              {/* Right Column: Investment Chart */}
              <motion.div variants={itemVariants} className="h-full">
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] h-full">
                  <div className="absolute inset-0 bg-white"></div>
                  {/* Decorative top accent following Green Apple style */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#70f570] via-[#49c628] to-transparent" />
                  <div className="relative z-5 h-full p-3 sm:p-4 md:p-5 lg:p-6">
                    <InvestmentOverviewChart />
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Goals Section */}
            <motion.div variants={itemVariants}>
              <div className="relative overflow-hidden rounded-lg sm:rounded-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <div className="absolute inset-0 bg-white"></div>
                {/* Decorative top accent following Green Apple style */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#70f570] via-[#49c628] to-transparent" />
                <div className="relative z-5 h-full p-3 sm:p-4 md:p-5 lg:p-6">
                  <GoalTracker userId={user?.id} />
                </div>
              </div>
            </motion.div>
            
            {/* Bottom Row - Community and Watchlist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              {/* Left: Community Integration */}
              <motion.div variants={itemVariants} className="h-full">
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] h-full">
                  <div className="absolute inset-0 bg-white"></div>
                  {/* Decorative top accent following Green Apple style */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#70f570] via-[#49c628] to-transparent" />
                  <div className="relative z-5 h-full p-3 sm:p-4 md:p-5 lg:p-6">
                    <h2 className="text-lg sm:text-xl font-extrabold text-black leading-tight tracking-tight font-display mb-3 md:mb-4">Community</h2>
                    <CommunityIntegration userId={user?.id} />
                  </div>
                </div>
              </motion.div>
              
              {/* Right: Watchlist */}
              <motion.div variants={itemVariants} className="h-full">
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] h-full">
                  <div className="absolute inset-0 bg-white"></div>
                  {/* Decorative top accent following Green Apple style */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#70f570] via-[#49c628] to-transparent" />
                  <div className="relative z-5 h-full p-3 sm:p-4 md:p-5 lg:p-6">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <h2 className="text-lg sm:text-xl font-extrabold text-black leading-tight tracking-tight font-display">Watchlist</h2>
                      <Button
                        onClick={() => router.push("/account/watchlist")}
                        className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold
                                  shadow-sm hover:shadow transition-all duration-300 
                                  rounded-lg py-1.5 px-3 text-xs sm:text-sm font-helvetica"
                      >
                        View All
                        <ArrowRight className="ml-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
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
        </div>
      </div>
    </div>
  );
}
