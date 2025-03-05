import React, { useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { fetchWithAuth } from '@/lib/utils/fetchWithAuth';

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
          console.log("InvestmentSummary: Loading timeout reached, forcing exit from loading state");
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
      }, 10000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [authLoading, user]);

  const fetchStats = async () => {
    if (!user?.id) {
      console.log("InvestmentSummary: No user ID, skipping fetch");
      setIsLoading(false);
      return;
    }
    
    try {
      console.log("InvestmentSummary: Starting fetch, setting loading to true");
      setIsLoading(true);
      
      console.log("InvestmentSummary: Fetching investment stats from API");
      
      // Use the fetchWithAuth helper instead of direct Supabase client
      const response = await fetchWithAuth('/api/protected/investments/stats');
      
      console.log("InvestmentSummary: API response received:", response);
      
      if (response.error) {
        console.error("InvestmentSummary: Error in response:", response.error);
        throw new Error(response.error.toString());
      }
      
      // Even if there's no data, we should set default values
      console.log("InvestmentSummary: Setting stats with data:", response.data || { totalInvested: 0, investmentCount: 0 });
      setStats({
        totalInvested: response.data?.totalInvested || 0,
        investmentCount: response.data?.investmentCount || 0
      });
      
      console.log("InvestmentSummary: Stats set successfully");
    } catch (error) {
      console.error('InvestmentSummary: Error fetching investment stats:', error);
      toast({
        title: "Error",
        description: "Failed to load investment statistics. Please try again.",
        variant: "destructive"
      });
      
      // Set default values on error
      console.log("InvestmentSummary: Setting default stats due to error");
      setStats({
        totalInvested: 0,
        investmentCount: 0
      });
    } finally {
      console.log("InvestmentSummary: Setting loading to false");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Total Invested</div>
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-xl font-bold text-white">
              ${stats?.totalInvested.toLocaleString() || "0"}
            </div>
          )}
        </div>
        
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Investments</div>
          {isLoading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <div className="text-xl font-bold text-white">
              {stats?.investmentCount || "0"}
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">Average per Investment</div>
          {isLoading ? (
            <Skeleton className="h-6 w-20" />
          ) : (
            <div className="text-lg font-semibold text-emerald-400">
              ${stats && stats.investmentCount > 0 
                ? (stats.totalInvested / stats.investmentCount).toLocaleString(undefined, {maximumFractionDigits: 2}) 
                : "0"}
            </div>
          )}
        </div>
      </div>
      
      {/* Debug button */}
      <button 
        onClick={fetchStats}
        className="text-xs text-zinc-500 hover:text-zinc-400 mt-2 p-1"
      >
        Retry loading
      </button>
    </div>
  );
};

export default InvestmentSummary; 