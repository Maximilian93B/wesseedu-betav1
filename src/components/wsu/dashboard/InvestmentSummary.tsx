import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { fetchWithAuth } from '@/lib/utils/fetchWithAuth';
import { BarChart, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from "framer-motion";

interface InvestmentStats {
  totalInvested: number;
  investmentCount: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const InvestmentSummary = () => {
  const [stats, setStats] = useState<InvestmentStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const fetchInProgress = useRef(false);

  const fetchStats = useCallback(async () => {
    // Prevent concurrent fetch operations
    if (fetchInProgress.current) {
      console.log("InvestmentSummary: Fetch already in progress, skipping duplicate call");
      return;
    }

    if (!user?.id) {
      setIsLoading(false);
      return;
    }
    
    try {
      console.log("InvestmentSummary: Starting fetchStats call");
      fetchInProgress.current = true;
      setIsLoading(true);
      
      // Use the fetchWithAuth helper instead of direct Supabase client
      const response = await fetchWithAuth('/api/protected/investments/stats');
      
      if (response.error) {
        throw new Error(response.error.toString());
      }
      
      // Handle both response formats for backward compatibility
      const statsData = response.data?.data || response.data || {};
      console.log("InvestmentSummary: Got stats data:", statsData);
      
      // Even if there's no data, we should set default values
      setStats({
        totalInvested: statsData?.totalInvested || 0,
        investmentCount: statsData?.investmentCount || 0
      });
      console.log("InvestmentSummary: Finished fetchStats call");
    } catch (error) {
      console.error('Error fetching investment stats:', error);
      toast({
        title: "Error",
        description: "Failed to load investment statistics. Please try again.",
        variant: "destructive"
      });
      
      // Set default values on error
      setStats({
        totalInvested: 0,
        investmentCount: 0
      });
    } finally {
      setIsLoading(false);
      fetchInProgress.current = false;
    }
  }, [user?.id, toast]);

  useEffect(() => {
    // Add a guard to prevent useEffect from running more than once
    const effectRan = useRef(false);
    
    if (effectRan.current) {
      return; // Only run once
    }
    
    if (!authLoading && user) {
      console.log("InvestmentSummary: Auth loaded and user found, fetching stats");
      effectRan.current = true;
      fetchStats();
      
      // Set a timeout to exit loading state after 5 seconds
      const timeoutId = setTimeout(() => {
        if (isLoading) {
          console.log("InvestmentSummary: Loading timeout reached");
          setIsLoading(false);
          setStats({
            totalInvested: 0,
            investmentCount: 0
          });
          toast({
            title: "Loading Timeout",
            description: "Could not load investment data in a reasonable time. Using default values.",
            variant: "destructive"
          });
        }
      }, 5000);
      
      return () => clearTimeout(timeoutId);
    } else if (!authLoading && !user) {
      // Handle case when authentication is complete but no user is found
      effectRan.current = true;
      setIsLoading(false);
      setStats({
        totalInvested: 0,
        investmentCount: 0
      });
    }
    
    return () => {
      effectRan.current = true; // Mark as run on cleanup
    };
  }, [authLoading, user, fetchStats, toast]);

  // Calculate the average investment if we have stats
  const getAverageInvestment = (): string => {
    if (!stats || stats.investmentCount === 0) return "$0";
    
    const average = stats.totalInvested / stats.investmentCount;
    return `$${average.toLocaleString(undefined, {maximumFractionDigits: 2})}`;
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
      hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-shadow duration-500 relative overflow-hidden">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-500 via-slate-400 to-transparent" />
      
      {/* Subtle texture pattern for depth - minimal */}
      <div className="absolute inset-0 opacity-[0.01]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 30px 30px, #94a3b8 0.5px, transparent 0)`,
          backgroundSize: "60px 60px"
        }} 
      />
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50/50 opacity-90" />
      
      {/* Background glow effect */}
      <div className="absolute bottom-0 right-[10%] w-[200px] h-[200px] bg-slate-100/30 rounded-full blur-[80px] pointer-events-none"></div>
      
      <CardHeader className="px-6 pt-6 pb-0 relative z-10">
        <CardTitle className="text-base font-medium text-slate-800 flex items-center">
          <DollarSign className="h-4 w-4 mr-2.5 text-slate-600" />
          Investment Summary
        </CardTitle>
      </CardHeader>
      
      <CardContent className="px-6 py-6 relative z-10">
        <motion.div 
          className="grid grid-cols-2 gap-4 mb-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg border border-slate-100 p-4 shadow-[0_4px_15px_rgba(0,0,0,0.02)]
              hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300"
          >
            <div className="text-xs text-slate-500 flex items-center mb-2">
              <DollarSign className="h-3 w-3 mr-1 text-slate-600" />
              <span>Total Invested</span>
            </div>
            {isLoading ? (
              <Skeleton className="h-7 w-24 bg-slate-100" />
            ) : (
              <div className="text-xl font-bold text-slate-800">
                ${stats?.totalInvested.toLocaleString() || "0"}
              </div>
            )}
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg border border-slate-100 p-4 shadow-[0_4px_15px_rgba(0,0,0,0.02)]
              hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300"
          >
            <div className="text-xs text-slate-500 flex items-center mb-2">
              <BarChart className="h-3 w-3 mr-1 text-slate-600" />
              <span>Investments</span>
            </div>
            {isLoading ? (
              <Skeleton className="h-7 w-16 bg-slate-100" />
            ) : (
              <div className="text-xl font-bold text-slate-800">
                {stats?.investmentCount || "0"}
              </div>
            )}
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-lg border border-slate-100 p-4 shadow-[0_4px_15px_rgba(0,0,0,0.02)]
            hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-slate-600" />
              <span>Average Investment</span>
            </div>
            {isLoading ? (
              <Skeleton className="h-6 w-16 bg-slate-100" />
            ) : (
              <div className="text-md font-medium text-slate-700">
                {getAverageInvestment()}
              </div>
            )}
          </div>
        </motion.div>
      </CardContent>
    </div>
  );
};

export default InvestmentSummary; 