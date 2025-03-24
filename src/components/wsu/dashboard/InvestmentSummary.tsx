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
    <Card className="bg-black/60 backdrop-blur-sm border border-zinc-800/50 shadow-lg overflow-hidden rounded-xl hover:border-zinc-700/50 transition-all duration-200">
      <CardHeader className="px-5 pt-5 pb-0">
        <CardTitle className="text-lg font-semibold text-white flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-emerald-400" />
          Investment Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 py-5">
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
            className="bg-gradient-to-br from-black to-emerald-950/20 rounded-lg border border-emerald-500/20 p-4"
          >
            <div className="text-xs text-zinc-400 flex items-center mb-2">
              <DollarSign className="h-3 w-3 mr-1 text-emerald-400" />
              <span>Total Invested</span>
            </div>
            {isLoading ? (
              <Skeleton className="h-7 w-24 bg-emerald-950/30" />
            ) : (
              <div className="text-xl font-bold text-emerald-400">
                ${stats?.totalInvested.toLocaleString() || "0"}
              </div>
            )}
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-br from-black to-blue-950/20 rounded-lg border border-blue-500/20 p-4"
          >
            <div className="text-xs text-zinc-400 flex items-center mb-2">
              <BarChart className="h-3 w-3 mr-1 text-blue-400" />
              <span>Investments</span>
            </div>
            {isLoading ? (
              <Skeleton className="h-7 w-16 bg-blue-950/30" />
            ) : (
              <div className="text-xl font-bold text-blue-400">
                {stats?.investmentCount || "0"}
              </div>
            )}
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-br from-black to-purple-950/20 rounded-lg border border-purple-500/20 p-4"
        >
          <div className="flex items-center justify-between">
            <div className="text-xs text-zinc-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-purple-400" />
              <span>Average Investment</span>
            </div>
            {isLoading ? (
              <Skeleton className="h-6 w-16 bg-purple-950/30" />
            ) : (
              <div className="text-md font-medium text-purple-400">
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