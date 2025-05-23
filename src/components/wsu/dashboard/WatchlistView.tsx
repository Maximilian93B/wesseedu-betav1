"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Bookmark } from "lucide-react"
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
    image_url?: string // Added for compatibility with both fields
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
  const [fetchAttempted, setFetchAttempted] = useState(false)
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const fetchInProgress = useRef(false);

  // Use useCallback to memoize the function
  const fetchWatchlistCompanies = useCallback(async () => {
    // Prevent concurrent fetch operations
    if (fetchInProgress.current) {
      console.log("useWatchlist: Fetch already in progress, skipping duplicate call");
      return;
    }
    
    if (authLoading) {
      console.log("useWatchlist: Auth is still loading, waiting...")
      return
    }
    
    if (!user?.id) {
      console.log("useWatchlist: No user ID, skipping fetch")
      setLoading(false)
      setFetchAttempted(true)
      return
    }
    
    try {
      console.log("useWatchlist: Starting fetch, setting loading to true")
      fetchInProgress.current = true;
      setLoading(true)
      setFetchAttempted(true)
      
      // Use the new unified API endpoint
      const response = await fetchWithAuth('/api/watchlist', {
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
      
      // Handle different response formats
      let watchlistData;
      if (response.data?.data) {
        // New format: data is in data property
        watchlistData = response.data.data;
      } else if (Array.isArray(response.data)) {
        // Old format: data is directly in response
        watchlistData = response.data;
      } else {
        console.error("useWatchlist: Unexpected watchlist response format", response)
        throw new Error("Failed to fetch watchlist data")
      }
      
      console.log("useWatchlist: Watchlist data fetched successfully:", watchlistData)
      
      // Process the data to normalize image_url/logo_url
      const processedData = watchlistData.map((item: WatchlistCompany) => {
        if (item.companies) {
          return {
            ...item,
            companies: {
              ...item.companies,
              // Use image_url as logo_url if logo_url doesn't exist
              logo_url: item.companies.logo_url || item.companies.image_url || null
            }
          };
        }
        return item;
      });
      
      // Set the watchlist companies
      console.log("useWatchlist: Setting watchlist companies")
      setWatchlistCompanies(processedData)
      
      // Log how many companies have valid company data
      const validCompanies = processedData.filter((item: WatchlistCompany) => item.companies !== null)
      console.log(`useWatchlist: ${validCompanies.length} of ${processedData.length} items have valid company data`)
      
      // Log the company IDs for debugging
      const companyIds = processedData.map((item: WatchlistCompany) => item.company_id)
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
      fetchInProgress.current = false;
    }
  }, [user?.id, authLoading, toast]); // Only depend on these values

  // Handle initial data loading when user is available
  useEffect(() => {
    // Only load once when the component mounts and user is available
    if (!authLoading && user && !fetchAttempted && !fetchInProgress.current) {
      console.log(`useWatchlist: User authenticated (${user.email}), fetching watchlist data`)
      setFetchAttempted(true); // Set this first to prevent multiple fetches
      fetchWatchlistCompanies();
      
      // Set a timeout to exit loading state after 10 seconds
      const timeoutId = setTimeout(() => {
        if (loading) {
          console.log("useWatchlist: Loading timeout reached, forcing exit from loading state")
          setLoading(false)
          toast({
            title: "Loading Timeout",
            description: "Could not load watchlist data in a reasonable time. Please try again later.",
            variant: "destructive"
          })
        }
      }, 10000)
      
      return () => clearTimeout(timeoutId)
    } else if (!authLoading && !user) {
      setLoading(false)
      setFetchAttempted(true)
    }
  }, [user, authLoading, fetchAttempted, fetchWatchlistCompanies, loading, toast]);

  const handleRemoveFromWatchlist = async (companyId: string) => {
    if (!user?.id) return
    
    try {
      console.log("Removing company from watchlist:", companyId)
      
      // Use the new unified API endpoint with action parameter
      const response = await fetchWithAuth('/api/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_id: companyId,
          action: 'remove'
        })
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
  const [dataFetchRequested, setDataFetchRequested] = useState(false)
  const isInitialRender = useRef(true);
  
  // Create a constant hook result
  const watchlistHook = useWatchlist();
  
  // Use the hook result conditionally
  const {
    watchlistCompanies: hookWatchlistCompanies,
    loading: hookLoading,
    fetchWatchlistCompanies,
    handleRemoveFromWatchlist
  } = externalData ? { 
    watchlistCompanies: [], 
    loading: false, 
    fetchWatchlistCompanies: () => {}, 
    handleRemoveFromWatchlist: async () => {} 
  } : watchlistHook;
  
  // Use either external data or hook data
  const watchlistCompanies = externalData || hookWatchlistCompanies
  const loading = externalLoading !== undefined ? externalLoading : hookLoading

  // Fix for issue #1: Add missing dependencies to the useEffect dependency array (around line 179)
  useEffect(() => {
    // Only run once on initial render
    if (!externalData && isInitialRender.current) {
      isInitialRender.current = false;
      console.log("WatchlistView: Initial render, setting dataFetchRequested to true");
      setDataFetchRequested(true);
      
      // Only fetch if not already loading
      if (!loading) {
        console.log("WatchlistView: Initial fetch of watchlist data");
        fetchWatchlistCompanies();
      }
    }
  }, [externalData, fetchWatchlistCompanies, loading, toast]);


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
              <Bookmark className="h-10 w-10 text-white" />
            </motion.div>
          </div>
          <p className="text-white text-sm font-medium font-body">Loading watchlist...</p>
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
        <div className="relative overflow-hidden rounded-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.1)] p-6 text-center max-w-md mx-auto">
          {/* Simple white background */}
          <div className="absolute inset-0 bg-white"></div>
          
          {/* Content */}
          <div className="relative z-5">
            <Bookmark className="h-10 w-10 text-green-500 mx-auto mb-4" />
            <p className="text-black font-extrabold text-lg mb-3 font-display">Your watchlist is empty</p>
            <p className="text-black/70 text-sm mb-6 font-body">Start tracking sustainable companies to monitor your impact</p>
            <Button 
              className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold
                        shadow-sm hover:shadow transition-all duration-300 
                        rounded-lg py-2 px-4 text-sm font-helvetica"
              onClick={() => window.location.href = '/companies'}
            >
              <span className="flex items-center justify-center">
                Browse Companies
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      {/* Simple white background */}
      <div className="absolute inset-0 bg-white"></div>
      
      {/* Card content */}
      <div className="relative z-5 p-5">
        <div className="flex items-center mb-4">
          <h3 className="text-xl font-extrabold text-black leading-tight tracking-tight font-display flex items-center">
            <Bookmark className="h-5 w-5 mr-2 text-green-600" />
            Watchlist
          </h3>
        </div>
        
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center py-6 text-black/70">
              <Bookmark className="h-5 w-5 mr-2 animate-spin" />
              <span className="font-body">Loading your watchlist...</span>
            </div>
            <Skeleton className="h-16 w-full bg-green-50" />
            <Skeleton className="h-16 w-full bg-green-50" />
            <Skeleton className="h-16 w-full bg-green-50" />
          </motion.div>
        ) : watchlistCompanies.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-12 space-y-4 text-center"
          >
            <Bookmark className="h-12 w-12 text-green-200" />
            <div>
              <p className="text-black font-display mb-2">Your watchlist is empty</p>
              <p className="text-black/70 text-sm max-w-[250px] mx-auto font-body">
                Add companies you&apos;re interested in following to your watchlist
              </p>
            </div>
            
            <Button 
              className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold
                        shadow-sm hover:shadow transition-all duration-300 
                        rounded-lg py-2 px-4 text-sm font-helvetica"
              asChild
            >
              <Link href="/companies">
                <span className="flex items-center justify-center">
                  Browse Companies
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
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
                  className="flex items-center p-3 rounded-lg border border-green-100 bg-gradient-to-br from-green-50 to-green-100/50
                    shadow-sm hover:shadow transition-all duration-200"
                >
                  {company.companies?.logo_url ? (
                    <div className="h-10 w-10 bg-white rounded-full mr-3 overflow-hidden border border-green-100 flex items-center justify-center">
                      <Image 
                        src={company.companies.logo_url} 
                        alt={company.companies?.name || "Company logo"}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-10 w-10 bg-gradient-to-br from-[#70f570] to-[#49c628] rounded-full mr-3 border border-white/20 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {company.companies?.name?.substring(0, 2).toUpperCase() || "CO"}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-black font-body truncate">{company.companies?.name || "Unknown Company"}</h3>
                      <Link 
                        href={`/companies/${company.companies?.id || ""}`}
                        className="ml-2 text-green-600 hover:text-green-700 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="text-xs text-black/70 font-body">{company.companies?.description || company.companies?.mission_statement || "No description available."}</div>
                  </div>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="ml-2 px-2 py-1 rounded-md text-xs font-medium bg-gradient-to-br from-[#70f570]/20 to-[#49c628]/20 text-green-700 font-helvetica">
                          {company.companies?.score || 0}/10
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white border border-green-100 text-black shadow-lg">
                        <div className="text-xs">
                          <div className="font-medium mb-1 font-display">ESG Impact Score</div>
                          <div className="text-black/70 font-body">Higher score indicates better environmental and social governance</div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {displayCompanies.length > 0 && (
              <div className="flex justify-end mt-4">
                <Button 
                  className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold
                            shadow-sm hover:shadow transition-all duration-300 
                            rounded-lg py-2 px-4 text-sm font-helvetica"
                  asChild
                >
                  <Link href="/account/watchlist">
                    <span className="flex items-center justify-center">
                      Manage Watchlist
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Link>
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </div>
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

