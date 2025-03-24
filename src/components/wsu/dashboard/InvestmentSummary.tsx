import React, { useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { fetchWithAuth } from '@/lib/utils/fetchWithAuth';
import { BarChart, TrendingUp, DollarSign } from 'lucide-react';

interface InvestmentStats {
  totalInvested: number;
  investmentCount: number;
}

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
    <Card className="bg-black border-emerald-500/20 border shadow-lg overflow-hidden">
      <CardHeader className="px-4 pt-4 pb-0">
        <CardTitle className="text-lg font-semibold text-white">Investment Summary</CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3">
            <div className="text-xs text-zinc-400 flex items-center mb-1">
              <DollarSign className="h-3 w-3 mr-1 text-emerald-400/70" />
              <span>Total Invested</span>
            </div>
            {isLoading ? (
              <Skeleton className="h-7 w-20" />
            ) : (
              <div className="text-lg sm:text-xl font-bold text-white">
                ${stats?.totalInvested.toLocaleString() || "0"}
              </div>
            )}
          </div>
          
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3">
            <div className="text-xs text-zinc-400 flex items-center mb-1">
              <BarChart className="h-3 w-3 mr-1 text-emerald-400/70" />
              <span>Investments</span>
            </div>
            {isLoading ? (
              <Skeleton className="h-7 w-16" />
            ) : (
              <div className="text-lg sm:text-xl font-bold text-white">
                {stats?.investmentCount || "0"}
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3 mt-3">
          <div className="flex items-center justify-between">
            <div className="text-xs text-zinc-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-emerald-400/70" />
              <span>Average per Investment</span>
            </div>
            {isLoading ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              <div className="text-md font-medium text-emerald-400">
                {getAverageInvestment()}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentSummary; 