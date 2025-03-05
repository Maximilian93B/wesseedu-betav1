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

interface WatchlistViewProps {
  // Optional props to allow the component to be used with or without external data
  externalData?: WatchlistCompany[]
  externalLoading?: boolean
  isPreview?: boolean
  maxItems?: number
  onViewAll?: () => void
}

export function useWatchlist() {
  const [watchlistCompanies, setWatchlistCompanies] = useState<WatchlistCompany[]>([])
  const [loading, setLoading] = useState(true)
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()

  const fetchWatchlistCompanies = async () => {
    if (authLoading) {
      console.log("useWatchlist: Auth is still loading, waiting...")
      return
    }
    
    if (!user?.id) {
      console.log("useWatchlist: No user ID, skipping fetch")
      setLoading(false)
      return
    }
    
    try {
      console.log("useWatchlist: Starting fetch, setting loading to true")
      setLoading(true)
      console.log(`useWatchlist: Fetching watchlist data from API for user ${user.id}`)
      
      // First try to get data from the profile API which includes saved companies
      console.log("useWatchlist: Trying to fetch from profile API first")
      const profileResponse = await fetchWithAuth('/api/auth/profile', {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      
      if (profileResponse.data && profileResponse.data.savedCompanies) {
        console.log(`useWatchlist: Found ${profileResponse.data.savedCompanies.length} saved companies in profile data`)
        
        // Transform the data to match the WatchlistCompany interface
        const transformedCompanies = profileResponse.data.savedCompanies.map((item: any) => ({
          id: item.id,
          company_id: item.company_id,
          companies: item.companies
        }))
        
        console.log("useWatchlist: Setting watchlist companies from profile data")
        setWatchlistCompanies(transformedCompanies)
        setLoading(false)
        
        // Log how many companies have valid company data
        const validCompanies = transformedCompanies.filter((item: WatchlistCompany) => item.companies !== null)
        console.log(`useWatchlist: ${validCompanies.length} of ${transformedCompanies.length} items have valid company data`)
        
        // Log the company IDs for debugging
        const companyIds = transformedCompanies.map((item: WatchlistCompany) => item.company_id)
        console.log(`useWatchlist: Company IDs in watchlist: ${JSON.stringify(companyIds)}`)
        
        return
      }
      
      // Fallback to the watchlist API
      console.log("useWatchlist: No saved companies in profile data, falling back to watchlist API")
      
      // Use a dedicated watchlist endpoint instead of profile
      const response = await fetchWithAuth('/api/protected/watchlist', {
        // Add cache-busting query parameter to prevent caching
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      
      console.log("useWatchlist: API response received:", response)
      
      if (response.error) {
        console.error("useWatchlist: Error in watchlist response:", response.error)
        throw new Error(response.error.toString())
      }
      
      if (!response.data) {
        console.error("useWatchlist: No data returned from watchlist API")
        throw new Error("Failed to fetch watchlist data")
      }
      
      console.log("useWatchlist: Watchlist data fetched successfully:", response.data)
      
      // Set the watchlist companies
      console.log("useWatchlist: Setting watchlist companies")
      setWatchlistCompanies(response.data)
      
      // Log how many companies have valid company data
      const validCompanies = response.data.filter((item: WatchlistCompany) => item.companies !== null)
      console.log(`useWatchlist: ${validCompanies.length} of ${response.data.length} items have valid company data`)
      
      // Log the company IDs for debugging
      const companyIds = response.data.map((item: WatchlistCompany) => item.company_id)
      console.log(`useWatchlist: Company IDs in watchlist: ${JSON.stringify(companyIds)}`)
    } catch (error) {
      console.error("useWatchlist: Error fetching watchlist companies:", error)
      toast({
        title: "Error",
        description: "Failed to load your watchlist. Please try again.",
        variant: "destructive"
      })
      
      // Set empty array on error to exit loading state
      console.log("useWatchlist: Setting empty watchlist due to error")
      setWatchlistCompanies([])
    } finally {
      console.log("useWatchlist: Setting loading to false")
      setLoading(false)
    }
  }

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

  useEffect(() => {
    if (!authLoading) {
      console.log("useWatchlist: Auth loading complete, user:", user ? "logged in" : "not logged in")
      if (user) {
        console.log(`useWatchlist: User authenticated (${user.email}), fetching watchlist data`)
        fetchWatchlistCompanies()
        
        // Set a timeout to exit loading state after 10 seconds
        const timeoutId = setTimeout(() => {
          if (loading) {
            console.log("useWatchlist: Loading timeout reached, forcing exit from loading state")
            setLoading(false)
            setWatchlistCompanies([])
            toast({
              title: "Loading Timeout",
              description: "Could not load watchlist data in a reasonable time. Please try again later.",
              variant: "destructive"
            })
          }
        }, 10000)
        
        return () => clearTimeout(timeoutId)
      } else {
        console.log("useWatchlist: No user, setting loading to false")
        setLoading(false)
      }
    } else {
      console.log("useWatchlist: Auth is still loading, waiting for authentication to complete")
    }
  }, [authLoading, user])

  return {
    watchlistCompanies,
    loading,
    fetchWatchlistCompanies,
    handleRemoveFromWatchlist
  }
}

export function WatchlistView({
  externalData,
  externalLoading,
  isPreview = false,
  maxItems = 5,
  onViewAll
}: WatchlistViewProps) {
  const { toast } = useToast()
  
  // Use the hook if external data is not provided
  const {
    watchlistCompanies: hookWatchlistCompanies,
    loading: hookLoading,
    fetchWatchlistCompanies,
    handleRemoveFromWatchlist
  } = !externalData ? useWatchlist() : { 
    watchlistCompanies: [], 
    loading: false, 
    fetchWatchlistCompanies: () => {}, 
    handleRemoveFromWatchlist: async () => {} 
  }
  
  // Use either external data or hook data
  const watchlistCompanies = externalData || hookWatchlistCompanies
  const loading = externalLoading !== undefined ? externalLoading : hookLoading

  // Force a refresh of the data when the component mounts
  useEffect(() => {
    if (!externalData) {
      console.log("WatchlistView: No external data provided, fetching data from hook");
      fetchWatchlistCompanies();
    } else {
      console.log(`WatchlistView: Using external data (${externalData.length} items)`);
    }
  }, [externalData, fetchWatchlistCompanies]);

  // Test function to check if API routes are working
  const testApiConnection = async () => {
    try {
      console.log("Testing API connection...")
      const response = await fetch('/api/test')
      const data = await response.json()
      console.log("Test API response:", data)
      toast({
        title: "API Test",
        description: `API is ${data.success ? 'working' : 'not working'}: ${data.message}`,
      })
    } catch (error) {
      console.error("Error testing API:", error)
      toast({
        title: "API Test Failed",
        description: "Could not connect to API. Check console for details.",
        variant: "destructive"
      })
    }
  }
  
  // Debug function to log the current state
  const debugState = () => {
    console.log("WatchlistView Debug:");
    console.log("- isPreview:", isPreview);
    console.log("- maxItems:", maxItems);
    console.log("- loading:", loading);
    console.log("- watchlistCompanies:", watchlistCompanies);
    console.log("- externalData provided:", !!externalData);
    
    // Check if we have any companies with null company data
    const nullCompanies = watchlistCompanies.filter(company => company.companies === null);
    console.log(`- Companies with null data: ${nullCompanies.length} of ${watchlistCompanies.length}`);
    
    if (nullCompanies.length > 0) {
      console.log("- Example null company:", nullCompanies[0]);
    }
    
    toast({
      title: "Debug Info",
      description: `Check console for debug info. Found ${watchlistCompanies.length} companies.`,
    });
    
    // Force a refresh of the data
    if (!externalData) {
      console.log("WatchlistView Debug: Forcing data refresh");
      fetchWatchlistCompanies();
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
            <button 
              onClick={debugState}
              className="text-xs text-zinc-500 hover:text-zinc-400 p-1"
            >
              Debug State
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Filter out companies with null company data
  const validCompanies = watchlistCompanies.filter(company => company.companies !== null)
  console.log(`WatchlistView: Found ${validCompanies.length} valid companies out of ${watchlistCompanies.length} total`);
  
  // Limit the number of companies shown if in preview mode
  const displayCompanies = isPreview ? validCompanies.slice(0, maxItems) : validCompanies
  console.log(`WatchlistView: Displaying ${displayCompanies.length} companies`);

  if (displayCompanies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-60 p-8">
        <Bookmark className="h-12 w-12 text-zinc-700 mb-4" />
        <p className="text-zinc-400 text-center text-lg mb-4">Your watchlist is empty.</p>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/companies'}
            className="border-emerald-500/20 text-emerald-400 
              hover:bg-emerald-500/10 hover:border-emerald-500/30 mt-2"
          >
            Explore Companies
          </Button>
          <Button 
            variant="outline" 
            onClick={debugState}
            className="border-zinc-500/20 text-zinc-400 
              hover:bg-zinc-500/10 hover:border-zinc-500/30 mt-2"
          >
            Debug
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {isPreview && validCompanies.length > maxItems && (
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-white">Watchlist</h3>
          {onViewAll && (
            <Button 
              variant="ghost" 
              onClick={onViewAll}
              className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/50"
            >
              View All
            </Button>
          )}
        </div>
      )}
      
      <div className="space-y-4">
        {displayCompanies.map((company) => (
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
                      {company.companies?.name || "Unknown Company"}
                    </h3>
                    <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
                      {company.companies?.description || company.companies?.mission_statement || "No description available."}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded">
                          <BarChart className="w-3 h-3 text-emerald-400" />
                          <span className="text-xs font-medium text-emerald-400">
                            {company.companies?.score || 0}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Impact Score</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.location.href = `/companies/${company.companies?.id}`}
                    className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/50 h-8 w-8 p-0"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFromWatchlist(company.company_id)}
                    className="text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50 h-8 w-8 p-0"
                  >
                    <Bookmark className="h-4 w-4 fill-current" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 