"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Bookmark, TrendingUp, BarChart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth"
import { Skeleton } from "@/components/ui/skeleton"
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from "lucide-react"

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
    logo_url?: string
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

  // Use useCallback to memoize the function
  const fetchWatchlistCompanies = useCallback(async () => {
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
      
      // Use the correct API endpoint that matches your route
      const response = await fetchWithAuth('/api/user/watchlist', {
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
  }, [user?.id, authLoading, toast]); // Only depend on these values

  const handleRemoveFromWatchlist = async (companyId: string) => {
    if (!user?.id) return
    
    try {
      console.log("Removing company from watchlist:", companyId)
      
      // Call the correct API endpoint
      const response = await fetchWithAuth(`/api/user/watchlist/${companyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
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
    if (!authLoading && user) {
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
      setLoading(false)
    }
  }, [authLoading, user]); // Remove fetchWatchlistCompanies from dependencies

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

  // Fix the useEffect to prevent infinite loops
  useEffect(() => {
    if (!externalData && !loading) {
      console.log("WatchlistView: No external data provided, fetching data from hook");
      fetchWatchlistCompanies();
    } else {
      console.log(`WatchlistView: Using external data or already loading`);
    }
  }, [externalData, loading]); // Remove fetchWatchlistCompanies from dependencies

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
      <div className="flex items-center justify-center py-8">
        <div className="flex flex-col items-center gap-3">
          <div className="relative h-10 w-10">
            <motion.div 
              className="absolute inset-0"
              animate={{ 
                rotate: 360,
                opacity: [0.5, 1, 0.5]
              }} 
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Bookmark className="h-10 w-10 text-emerald-400" />
            </motion.div>
          </div>
          <p className="text-emerald-400/80 text-sm font-medium">Loading watchlist...</p>
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
      <div className="flex flex-col items-center justify-center h-60 py-8">
        <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-zinc-800/50 text-center max-w-md mx-auto">
          <Bookmark className="h-10 w-10 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-300 text-center text-lg mb-4">Your watchlist is empty</p>
          <p className="text-zinc-500 text-sm mb-6">Start tracking sustainable companies to monitor your impact</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/companies'}
            className="bg-black/60 border-emerald-500/30 text-emerald-400 
              hover:bg-emerald-500/10 hover:border-emerald-500/40"
          >
            Browse Companies
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Card className="bg-black/60 backdrop-blur-sm border border-zinc-800/50 shadow-lg overflow-hidden rounded-xl hover:border-zinc-700/50 transition-all duration-200">
      <CardHeader className="px-5 pt-5 pb-0">
        <CardTitle className="text-lg font-semibold text-white flex items-center">
          <Bookmark className="h-5 w-5 mr-2 text-amber-400" />
          Watchlist
        </CardTitle>
      </CardHeader>
      
      <CardContent className="px-5 py-5">
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center py-6 text-zinc-500">
              <Bookmark className="h-5 w-5 mr-2 animate-spin" />
              <span>Loading your watchlist...</span>
            </div>
            <Skeleton className="h-16 w-full bg-zinc-900/40" />
            <Skeleton className="h-16 w-full bg-zinc-900/40" />
            <Skeleton className="h-16 w-full bg-zinc-900/40" />
          </motion.div>
        ) : watchlistCompanies.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-12 space-y-4 text-center"
          >
            <Bookmark className="h-12 w-12 text-zinc-700" />
            <div>
              <p className="text-zinc-400 mb-2">Your watchlist is empty</p>
              <p className="text-zinc-500 text-sm max-w-[250px] mx-auto">
                Add companies you're interested in following to your watchlist
              </p>
            </div>
            
            <Button 
              variant="outline" 
              asChild
              className="mt-4 border-amber-500/20 hover:bg-amber-950/20 text-amber-400"
            >
              <Link href="/companies">
                Browse Companies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {displayCompanies.map((company) => (
                <motion.div
                  key={company.id}
                  variants={itemVariants}
                  exit={{ opacity: 0, y: -10 }}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center p-3 rounded-lg border border-zinc-800/50 bg-black/50 backdrop-blur-sm transition-all duration-200 hover:border-zinc-700/80 hover:bg-zinc-900/10"
                >
                  {company.companies?.logo_url ? (
                    <div className="h-10 w-10 bg-zinc-800 rounded-full mr-3 overflow-hidden border border-zinc-700/50 flex items-center justify-center">
                      <Image 
                        src={company.companies.logo_url} 
                        alt={company.companies?.name || "Company logo"}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-10 w-10 bg-zinc-900 rounded-full mr-3 border border-zinc-800 flex items-center justify-center">
                      <span className="text-zinc-400 text-sm font-medium">
                        {company.companies?.name?.substring(0, 2).toUpperCase() || "CO"}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-white truncate">{company.companies?.name || "Unknown Company"}</h3>
                      <Link 
                        href={`/companies/${company.companies?.id || ""}`}
                        className="ml-2 text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="text-xs text-zinc-500">{company.companies?.description || company.companies?.mission_statement || "No description available."}</div>
                  </div>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className={`ml-2 px-2 py-1 rounded-md text-xs font-medium ${getScoreBg(company.companies?.score || 0)} ${getScoreColor(company.companies?.score || 0)}`}>
                          {company.companies?.score || 0}/10
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black/90 border border-zinc-700 text-white">
                        <div className="text-xs">
                          <div className="font-medium mb-1">ESG Impact Score</div>
                          <div className="text-zinc-400">Higher score indicates better environmental and social governance</div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {displayCompanies.length > 0 && (
              <div className="flex justify-end mt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild
                  className="text-amber-400 hover:text-amber-300 hover:bg-amber-950/30"
                >
                  <Link href="/account/watchlist">
                    Manage Watchlist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-green-400";
  if (score >= 40) return "text-yellow-400";
  if (score >= 20) return "text-orange-400";
  return "text-red-400";
};

const getScoreBg = (score: number) => {
  if (score >= 80) return "bg-emerald-500/10";
  if (score >= 60) return "bg-green-500/10";
  if (score >= 40) return "bg-yellow-500/10";
  if (score >= 20) return "bg-orange-500/10";
  return "bg-red-500/10";
}; 