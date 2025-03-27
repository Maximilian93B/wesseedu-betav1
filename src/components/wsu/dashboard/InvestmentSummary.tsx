import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (!authLoading && user) {
      fetchStats();
      
      // Set a timeout to exit loading state after 10 seconds
      const timeoutId = setTimeout(() => {
        if (isLoading) {
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
      setIsLoading(false);
      setStats({
        totalInvested: 0,
        investmentCount: 0
      });
    }
  }, [authLoading, user]);

  const fetchStats = async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Use the fetchWithAuth helper instead of direct Supabase client
      const response = await fetchWithAuth('/api/protected/investments/stats');
      
      if (response.error) {
        throw new Error(response.error.toString());
      }
      
      // Even if there's no data, we should set default values
      setStats({
        totalInvested: response.data?.totalInvested || 0,
        investmentCount: response.data?.investmentCount || 0
      });
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
    }
  };

  // Calculate the average investment if we have stats
  const getAverageInvestment = (): string => {
    if (!stats || stats.investmentCount === 0) return "$0";
    
    const average = stats.totalInvested / stats.investmentCount;
    return `$${average.toLocaleString(undefined, {maximumFractionDigits: 2})}`;
  };

  return (
    <Card
      className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        hover:shadow-[0_10px_30px_rgb(0,0,0,0.06)] transition-all duration-500"
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
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30"></div>
      
      {/* Inner shadow effects for depth */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50/50 to-transparent"></div>
      
      <CardHeader className="px-5 pt-5 pb-0 relative z-10">
        <CardTitle className="text-lg font-medium text-slate-800 flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-slate-600" />
          Investment Summary
        </CardTitle>
      </CardHeader>
      
      <CardContent className="px-5 py-5 relative z-10">
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
            className="bg-white/80 rounded-lg border border-slate-200 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
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
            className="bg-white/80 rounded-lg border border-slate-200 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
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
          className="bg-white/90 rounded-lg border border-slate-200 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
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
    </Card>
  );
};

export default InvestmentSummary; 