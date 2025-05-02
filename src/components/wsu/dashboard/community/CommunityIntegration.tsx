"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Users, Clock, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { CACHE_KEYS, CACHE_EXPIRY, getCachedData, setCachedData, invalidateCache } from "@/lib/utils/cacheUtils"
import Image from "next/image"

interface CommunityActivity {
  id: string
  title: string
  content: string
  created_at: string
  community_id: string
  community_name: string
  author_id: string
  author_name: string
  avatar_url: string
}

interface CommunityStats {
  communities_joined: number
  posts_created: number
  comments_made: number
}

interface CommunityFeedData {
  recentActivity: CommunityActivity[]
  stats: CommunityStats
  communities: any[]
}

interface CommunityIntegrationProps {
  userId?: string  // Make userId optional
}

const CommunityIntegration: React.FC<CommunityIntegrationProps> = ({ userId }) => {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [communityActivity, setCommunityActivity] = useState<CommunityActivity[]>([])
  const [communityStats, setCommunityStats] = useState<CommunityStats | null>(null)
  const [authError, setAuthError] = useState(false)
  
  // Get the actual userId to use, either from props or from auth context
  const actualUserId = userId || user?.id
  
  useEffect(() => {
    console.log("CommunityIntegration: Component mounted with userId:", actualUserId)
    
    const fetchCommunityData = async () => {
      try {
        console.log("CommunityIntegration: Starting data fetch")
        setLoading(true)
        setError(null)
        setAuthError(false)
        
        if (!actualUserId && !authError) {
          console.log("CommunityIntegration: No user ID available, triggering auth error")
          setAuthError(true)
          setLoading(false)
          
          // Wait a moment before redirecting to avoid immediate redirect loop
          setTimeout(() => {
            router.push("/auth/signin?next=/dashboard")
          }, 500)
          return
        }
        
        // Re-enable caching now that the API is fixed
        const cachedData = getCachedData<CommunityFeedData>(CACHE_KEYS.COMMUNITY_FEED, CACHE_EXPIRY.COMMUNITY_FEED)
        
        if (cachedData) {
          console.log("CommunityIntegration: Using cached data")
          setCommunityActivity(cachedData.recentActivity || [])
          setCommunityStats(cachedData.stats || { communities_joined: 0, posts_created: 0, comments_made: 0 })
          setLoading(false)
          return
        }
        
        // Get token from localStorage for logging purposes
        let hasToken = false
        if (typeof window !== 'undefined') {
          const supabaseAuthData = localStorage.getItem('supabase.auth.token')
          hasToken = !!supabaseAuthData
          console.log("CommunityIntegration: Auth token exists:", hasToken)
        }
        
        // Simple fetch with error handling
        console.log("CommunityIntegration: Fetching from API")
        const response = await fetchWithAuth('/api/dashboard/community-feed')
        
        console.log("CommunityIntegration: API response status:", response.status)
        
        if (response.error) {
          console.error("CommunityIntegration: API error:", response.error)
          
          if (response.status === 401) {
            console.log("CommunityIntegration: Auth error, redirecting to login")
            
            // Force token refresh by clearing cache
            if (typeof window !== 'undefined') {
              console.log("CommunityIntegration: Clearing auth cache to force refresh")
              // This is a temporary measure to test if cache is the issue
              localStorage.removeItem('supabase.auth.refreshToken')
              invalidateCache(CACHE_KEYS.COMMUNITY_FEED)
            }
            
            setAuthError(true)
            setLoading(false)
            
            // Wait a moment before redirecting to avoid immediate redirect loop
            setTimeout(() => {
              router.push("/auth/signin?next=/dashboard")
            }, 300)
            return
          }
          
          // Improved error handling - display a more user-friendly message for database errors
          if (response.error.code === '42703' || response.error.code === 'PGRST200') {
            console.log("CommunityIntegration: Database error - contact admin", response.error);
            
            // Show more helpful error message for debugging during development
            const errorMessage = process.env.NODE_ENV === 'development' 
              ? `Database structure error: ${response.error.message}`
              : "Database structure error - our team has been notified";
            
            setError(errorMessage);
            
            // Fallback to empty data to prevent UI breaking
            setCommunityActivity([])
            setCommunityStats({ communities_joined: 0, posts_created: 0, comments_made: 0 })
            setLoading(false)
            return
          }
          
          setError(`API error: ${response.error.message || response.error}`)
          setLoading(false)
          return
        }
        
        // Validate response data structure
        if (!response.data || !response.data.recentActivity || !Array.isArray(response.data.recentActivity)) {
          console.error("CommunityIntegration: Invalid API response format:", response.data)
          setError("Invalid data format received from server")
          setLoading(false)
          return
        }
        
        console.log("CommunityIntegration: Data fetched successfully")
        
        // Cache the data
        setCachedData(CACHE_KEYS.COMMUNITY_FEED, response.data)
        
        // Update state with the fetched data
        setCommunityActivity(response.data.recentActivity || [])
        setCommunityStats(response.data.stats || { communities_joined: 0, posts_created: 0, comments_made: 0 })
        setLoading(false)
      } catch (err) {
        console.error("CommunityIntegration: Error in fetch:", err)
        setError("An unexpected error occurred")
        setLoading(false)
      }
    }
    
    // Only fetch if we have a userId and are not redirecting
    if (actualUserId && !authError) {
      fetchCommunityData()
    } else {
      console.log("CommunityIntegration: Skipping fetch, no userId or auth error")
      setLoading(false)
    }
    
    // Set a safety timeout to prevent infinite loading
    const safetyTimeout = setTimeout(() => {
      if (loading) {
        console.log("CommunityIntegration: Safety timeout triggered, ending loading state")
        setLoading(false)
        setError("Loading timeout - please try refreshing the page")
      }
    }, 5000)
    
    return () => {
      clearTimeout(safetyTimeout)
      console.log("CommunityIntegration: Component unmounted")
    }
  }, [actualUserId, router, authError, loading])
  
  console.log("CommunityIntegration: Rendering with loading:", loading, "error:", error, "authError:", authError)
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined
      })
    }
  }
  
  // Loading state
  if (loading) {
    return (
      <div className="animate-pulse space-y-4 p-4">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    )
  }
  
  // Auth error state
  if (authError) {
    return (
      <div className="p-4 text-center">
        <p className="text-amber-600 mb-2">Session expired. Redirecting to login...</p>
      </div>
    )
  }
  
  // Error state
  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-2">{error}</p>
        <Button 
          onClick={() => {
            // Invalidate the cache to force a fresh fetch
            invalidateCache(CACHE_KEYS.COMMUNITY_FEED);
            window.location.reload();
          }}
          className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold
                  shadow-sm hover:shadow transition-all duration-300 
                  rounded-lg py-3 text-sm font-helvetica"
        >
          Retry
        </Button>
      </div>
    )
  }
  
  // Empty state
  if (!communityActivity.length && communityStats?.communities_joined === 0) {
    return (
      <div className="p-6 text-center">
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#70f570]/20 to-[#49c628]/20">
            <Users className="h-6 w-6 text-[#49c628]" />
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2 font-display">Join Communities</h3>
        <p className="text-sm text-gray-600 mb-4 font-body">
          Connect with like-minded sustainable investors by joining communities.
        </p>
        <Button 
          onClick={() => router.push("/communities")}
          className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold
                    shadow-sm hover:shadow transition-all duration-300 
                    rounded-lg py-3 text-sm font-helvetica"
        >
          Explore Communities
        </Button>
      </div>
    )
  }
  
  return (
    <div className="space-y-5">
      {/* Community Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-white/20">
          <div className="flex items-center space-x-2 mb-1">
            <Users className="h-4 w-4 text-[#49c628]" />
            <span className="text-sm font-medium font-helvetica">Communities</span>
          </div>
          <p className="text-xl font-bold font-helvetica">{communityStats?.communities_joined || 0}</p>
          <p className="text-xs text-gray-500 font-body">Communities joined</p>
        </div>
        
        <div className="bg-white rounded-lg p-3 shadow-sm border border-white/20">
          <div className="flex items-center space-x-2 mb-1">
            <MessageSquare className="h-4 w-4 text-[#49c628]" />
            <span className="text-sm font-medium font-helvetica">Posts</span>
          </div>
          <p className="text-xl font-bold font-helvetica">{communityStats?.posts_created || 0}</p>
          <p className="text-xs text-gray-500 font-body">Posts created</p>
        </div>
        
        <div className="bg-white rounded-lg p-3 shadow-sm border border-white/20">
          <div className="flex items-center space-x-2 mb-1">
            <MessageSquare className="h-4 w-4 text-[#49c628]" />
            <span className="text-sm font-medium font-helvetica">Comments</span>
          </div>
          <p className="text-xl font-bold font-helvetica">{communityStats?.comments_made || 0}</p>
          <p className="text-xs text-gray-500 font-body">Comments made</p>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold font-display">Recent Activity</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push("/communities")}
            className="text-[#49c628] p-0 hover:bg-transparent hover:text-[#3ab319] font-helvetica"
          >
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          <AnimatePresence>
            {communityActivity.slice(0, 3).map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-3 shadow-sm border border-white/20 relative overflow-hidden"
              >
                {/* Decorative top accent following Green Apple style */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#70f570] via-[#49c628] to-transparent" />
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {activity.avatar_url ? (
                      <Image 
                        src={activity.avatar_url} 
                        alt={activity.author_name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#70f570]/20 to-[#49c628]/20 flex items-center justify-center">
                        <Users className="h-4 w-4 text-[#49c628]" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate font-helvetica">{activity.title}</p>
                    <p className="text-xs text-gray-500 font-body">
                      <span className="font-medium">{activity.author_name}</span> in <span className="font-medium">{activity.community_name}</span>
                    </p>
                    <p className="text-xs text-gray-400 flex items-center mt-1 font-body">
                      <Clock className="inline h-3 w-3 mr-1" />
                      {formatDate(activity.created_at)}
                    </p>
                  </div>
                </div>
                <div 
                  className="text-sm mt-2 text-gray-700 line-clamp-2 font-body"
                  dangerouslySetInnerHTML={{ __html: activity.content.substring(0, 120) + (activity.content.length > 120 ? '...' : '') }}
                />
                <div className="mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => router.push(`/communities/${activity.community_id}/posts/${activity.id}`)}
                    className="text-[#49c628] p-0 text-xs hover:bg-transparent hover:text-[#3ab319] font-helvetica"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default CommunityIntegration 