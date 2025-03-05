"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Bookmark, TrendingUp, BarChart } from "lucide-react"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth"

export const dynamic = "force-dynamic"

interface WatchlistCompany {
  id: string
  company_id: string
  companies: {
    id: string
    name: string
    description: string
    mission_statement: string
    score: number
    pitch_deck_url: string
    sustainability_data: any
  } | null
}

export function WatchlistView() {
  const [watchlistCompanies, setWatchlistCompanies] = useState<WatchlistCompany[]>([])
  const [loading, setLoading] = useState(true)
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (!authLoading) {
      console.log("WatchlistView: Auth loading complete, user:", user ? "logged in" : "not logged in");
      if (user) {
        fetchWatchlistCompanies();
        
        // Set a timeout to exit loading state after 10 seconds
        const timeoutId = setTimeout(() => {
          if (loading) {
            console.log("WatchlistView: Loading timeout reached, forcing exit from loading state");
            setLoading(false);
            setWatchlistCompanies([]);
            toast({
              title: "Loading Timeout",
              description: "Could not load watchlist data in a reasonable time. Please try again later.",
              variant: "destructive"
            });
          }
        }, 10000);
        
        return () => clearTimeout(timeoutId);
      } else {
        console.log("WatchlistView: No user, setting loading to false");
        setLoading(false);
      }
    }
  }, [authLoading, user]);

  const fetchWatchlistCompanies = async () => {
    if (!user?.id) {
      console.log("WatchlistView: No user ID, skipping fetch");
      setLoading(false);
      return;
    }
    
    try {
      console.log("WatchlistView: Starting fetch, setting loading to true");
      setLoading(true);
      console.log("WatchlistView: Fetching watchlist data from API");
      
      // Use a dedicated watchlist endpoint instead of profile
      const response = await fetchWithAuth('/api/protected/watchlist');
      
      console.log("WatchlistView: API response received:", response);
      
      if (response.error) {
        console.error("WatchlistView: Error in watchlist response:", response.error);
        throw new Error(response.error.toString());
      }
      
      if (!response.data) {
        console.error("WatchlistView: No data returned from watchlist API");
        throw new Error("Failed to fetch watchlist data");
      }
      
      console.log("WatchlistView: Watchlist data fetched successfully:", response.data);
      
      // Set the watchlist companies
      console.log("WatchlistView: Setting watchlist companies");
      setWatchlistCompanies(response.data);
      
      // Log how many companies have valid company data
      const validCompanies = response.data.filter((item: WatchlistCompany) => item.companies !== null);
      console.log(`WatchlistView: ${validCompanies.length} of ${response.data.length} items have valid company data`);
    } catch (error) {
      console.error("WatchlistView: Error fetching watchlist companies:", error);
      toast({
        title: "Error",
        description: "Failed to load your watchlist. Please try again.",
        variant: "destructive"
      });
      
      // Set empty array on error to exit loading state
      console.log("WatchlistView: Setting empty watchlist due to error");
      setWatchlistCompanies([]);
    } finally {
      console.log("WatchlistView: Setting loading to false");
      setLoading(false);
    }
  };

  // Test function to check if API routes are working
  const testApiConnection = async () => {
    try {
      console.log("Testing API connection...");
      const response = await fetch('/api/test');
      const data = await response.json();
      console.log("Test API response:", data);
      toast({
        title: "API Test",
        description: `API is ${data.success ? 'working' : 'not working'}: ${data.message}`,
      });
    } catch (error) {
      console.error("Error testing API:", error);
      toast({
        title: "API Test Failed",
        description: "Could not connect to API. Check console for details.",
        variant: "destructive"
      });
    }
  };

  const handleRemoveFromWatchlist = async (companyId: string) => {
    if (!user?.id) return
    
    try {
      console.log("Removing company from watchlist:", companyId)
      
      // Call the API to remove the company from watchlist
      const response = await fetchWithAuth('/api/protected/watchlist/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyId }),
      })
      
      console.log("Remove response:", response)
      
      if (response.error) {
        throw new Error(response.error.toString())
      }
      
      toast({
        title: "Success",
        description: "Company removed from watchlist",
      })
      
      // Refresh the watchlist
      fetchWatchlistCompanies()
    } catch (error) {
      console.error("Error removing company from watchlist:", error)
      toast({
        title: "Error",
        description: "Failed to remove company from watchlist. Please try again.",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin">
            <Bookmark className="h-10 w-10 text-emerald-400/50" />
          </div>
          <p className="text-zinc-400 animate-pulse">Loading watchlist companies...</p>
          
          {/* Debug buttons */}
          <div className="flex gap-2 mt-4">
            <button 
              onClick={fetchWatchlistCompanies}
              className="text-xs text-zinc-500 hover:text-zinc-400 p-1"
            >
              Retry loading
            </button>
            <button 
              onClick={testApiConnection}
              className="text-xs text-zinc-500 hover:text-zinc-400 p-1"
            >
              Test API
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {watchlistCompanies.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-60 p-8">
          <Bookmark className="h-12 w-12 text-zinc-700 mb-4" />
          <p className="text-zinc-400 text-center text-lg mb-4">Your watchlist is empty.</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/companies'}
            className="border-emerald-500/20 text-emerald-400 
              hover:bg-emerald-500/10 hover:border-emerald-500/30 mt-2"
          >
            Explore Companies
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {watchlistCompanies.map((company, index) => {
            // Skip companies with null company data
            if (!company.companies) return null;
            
            return (
              <div
                key={company.id}
                className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-emerald-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {company.companies.name || "Unknown Company"}
                        </h3>
                        <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
                          {company.companies.description || company.companies.mission_statement || "No description available."}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <BarChart className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-medium text-emerald-400">
                        {company.companies.score || 0}/10
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => window.open(`/companies/${company.companies!.id}`, "_blank")}
                        className="h-8 w-8 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveFromWatchlist(company.company_id)}
                              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                              <Bookmark className="h-4 w-4 fill-current" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="top" 
                            className="bg-slate-800 text-white border-slate-700 px-3 py-1.5 text-sm"
                          >
                            Remove from watchlist
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
} 