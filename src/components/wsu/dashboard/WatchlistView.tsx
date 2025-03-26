"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Bookmark, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth"
import { Skeleton } from "@/components/ui/skeleton"
import Link from 'next/link'
import Image from 'next/image'

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="flex flex-col items-center gap-2">
          <div className="relative h-5 w-5">
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
              <Bookmark className="h-5 w-5 text-amber-400" />
            </motion.div>
          </div>
          <p className="text-slate-500 text-xs">Loading watchlist...</p>
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
      <div className="flex flex-col items-center justify-center py-6">
        <Bookmark className="h-8 w-8 text-slate-300 mb-2" />
        <p className="text-slate-700 text-sm font-medium mb-1">Your watchlist is empty</p>
        <p className="text-slate-500 text-xs mb-3">Start tracking sustainable companies</p>
        <Button 
          variant="outline" 
          onClick={() => window.location.href = '/companies'}
          className="bg-white border-amber-200 text-amber-600 hover:bg-amber-50 text-xs"
          size="sm"
        >
          Browse Companies
        </Button>
      </div>
    )
  }

  return (
    <div className="h-full">
      {!isPreview && (
        <CardHeader className="px-4 pt-4 pb-2">
          <CardTitle className="text-base font-semibold text-slate-800 flex items-center">
            <Bookmark className="h-4 w-4 mr-2 text-amber-500" />
            Watchlist
          </CardTitle>
        </CardHeader>
      )}
      
      <CardContent className={`px-0 ${isPreview ? 'pt-0' : 'pt-2'} pb-0`}>
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3 px-4"
          >
            <Skeleton className="h-12 w-full bg-slate-100" />
            <Skeleton className="h-12 w-full bg-slate-100" />
            <Skeleton className="h-12 w-full bg-slate-100" />
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-2 mb-2 px-4"
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
                  className="flex items-center p-2 rounded-md border border-slate-200 bg-white transition-all duration-200 hover:border-slate-300 hover:shadow-sm"
                >
                  {company.companies?.logo_url ? (
                    <div className="h-7 w-7 bg-slate-100 rounded-full mr-2 overflow-hidden border border-slate-200 flex items-center justify-center">
                      <Image 
                        src={company.companies.logo_url} 
                        alt={company.companies?.name || "Company logo"}
                        width={28}
                        height={28}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-7 w-7 bg-slate-100 rounded-full mr-2 border border-slate-200 flex items-center justify-center">
                      <span className="text-slate-500 text-xs font-medium">
                        {company.companies?.name?.substring(0, 2).toUpperCase() || "CO"}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-medium text-slate-800 truncate">{company.companies?.name || "Unknown Company"}</h3>
                      <Link 
                        href={`/companies/${company.companies?.id || ""}`}
                        className="ml-2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">{company.companies?.description || company.companies?.mission_statement || "No description available."}</div>
                  </div>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-medium ${getScoreBg(company.companies?.score || 0)} ${getScoreColor(company.companies?.score || 0)}`}>
                          {company.companies?.score || 0}/10
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white border border-slate-200 text-slate-700 shadow-sm p-2 text-xs">
                        <div className="font-medium mb-1">ESG Impact Score</div>
                        <div className="text-slate-500 text-[10px]">Higher score indicates better ESG performance</div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {displayCompanies.length > 0 && isPreview && (
              <div className="flex justify-end mt-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs h-6 px-2"
                >
                  <Link href="/account/watchlist">
                    View All
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </CardContent>
    </div>
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
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-green-600";
  if (score >= 40) return "text-amber-600";
  if (score >= 20) return "text-orange-600";
  return "text-red-600";
};

const getScoreBg = (score: number) => {
  if (score >= 80) return "bg-emerald-50";
  if (score >= 60) return "bg-green-50";
  if (score >= 40) return "bg-amber-50";
  if (score >= 20) return "bg-orange-50";
  return "bg-red-50";
};