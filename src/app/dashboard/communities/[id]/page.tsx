"use client"

import { Suspense, useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { LoadingPreloader, LoginRequired } from "@/components/wsu/home"
import { useToast } from "@/hooks/use-toast"
import { useNavigation } from "@/context/NavigationContext"
import { Skeleton } from "@/components/ui/skeleton"

// Placeholder component for lazy loading
const LazyLoadingPlaceholder = () => (
  <div className="w-full h-screen bg-white dark:bg-slate-950 px-4 py-6">
    <Skeleton className="h-10 w-28 mb-8 rounded-lg bg-slate-100 dark:bg-slate-800" />
    
    <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 w-full mb-10">
      <div className="flex flex-col md:flex-row gap-6">
        <Skeleton className="h-20 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="flex-1">
          <Skeleton className="h-8 w-3/4 mb-3 rounded-lg bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-4 w-full mb-2 rounded-lg bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-4 w-5/6 mb-2 rounded-lg bg-slate-200 dark:bg-slate-700" />
          <div className="flex gap-3 mt-4">
            <Skeleton className="h-8 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
            <Skeleton className="h-8 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>
    </div>
    
    <div className="border-b border-slate-200 dark:border-slate-800 mb-6">
      <div className="flex gap-4 mb-2">
        <Skeleton className="h-8 w-16 rounded-lg bg-slate-100 dark:bg-slate-800" />
        <Skeleton className="h-8 w-16 rounded-lg bg-slate-100 dark:bg-slate-800" />
        <Skeleton className="h-8 w-16 rounded-lg bg-slate-100 dark:bg-slate-800" />
      </div>
    </div>
    
    <div className="space-y-4">
      <Skeleton className="h-6 w-1/2 rounded-lg bg-slate-100 dark:bg-slate-800" />
      <Skeleton className="h-24 w-full rounded-lg bg-slate-100 dark:bg-slate-800" />
      <Skeleton className="h-24 w-full rounded-lg bg-slate-100 dark:bg-slate-800" />
    </div>
  </div>
)

// Dynamically import the community details component
const CommunityDetailsViewDynamic = dynamic(
  () => import("@/components/community/CommunityDetailsView"), 
  { ssr: false, loading: () => <LazyLoadingPlaceholder /> }
)

// Helper function to fetch actual community data in the future
const getCommunityData = async (id: string) => {
  // This would be a real API call in production
  return {
    id,
    isMember: false,
    description: null,
    created_at: new Date().toISOString(),
    companies: {
      id,
      name: 'Loading Community...',
      description: null,
      mission_statement: null,
      score: 0,
      image_url: null
    },
    // Add ambassadors to match Community type
    ambassadors: []
  }
}

export default function CommunityDetailsPage({ params }: { params: { id: string } }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const communityId = params.id
  const [localLoading, setLocalLoading] = useState(true)
  const { isFirstVisit, markRouteVisited, isTransitioning, setIsTransitioning } = useNavigation()
  const currentRoute = `/dashboard/communities/${communityId}`
  
  // Track whether we've shown the loading timeout toast
  const hasShownTimeoutToastRef = useRef(false)
  
  // Move these hooks to the top level - before any conditional returns
  const [community, setCommunity] = useState<any>(null)
  
  // Preload modules
  const preloadModules = [
    () => import("@/components/community/CommunityDetailsView")
  ]
  
  // Reset transitioning state when component mounts/unmounts
  useEffect(() => {
    setIsTransitioning(false)
    return () => setIsTransitioning(false)
  }, [setIsTransitioning])
  
  // Add a timeout to ensure we don't get stuck in loading state
  useEffect(() => {
    // If this is not a first visit, skip loading process
    if (!isFirstVisit(currentRoute) && !isTransitioning) {
      setLocalLoading(false)
      return
    }
    
    // Flag to track component mount state for preventing memory leaks
    let isMounted = true;
    
    // If auth loading is already complete, update local loading state immediately
    if (!loading && isMounted) {
      setLocalLoading(false);
      markRouteVisited(currentRoute)
    }
    
    // Set a timeout to force loading to false after 5 seconds
    const timeoutId = setTimeout(() => {
      if (isMounted && localLoading) {
        setLocalLoading(false);
        markRouteVisited(currentRoute)
        
        // Only show toast if we actually had to force the loading state change
        // and we haven't shown it yet
        if (loading && !hasShownTimeoutToastRef.current) {
          hasShownTimeoutToastRef.current = true;
          toast({
            title: "Loading timeout",
            description: "Some data might not be available. Please refresh if needed.",
            variant: "default"
          });
        }
      }
    }, 5000);

    // Cleanup function to prevent memory leaks and cancel timeout
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [loading, localLoading, toast, isFirstVisit, markRouteVisited, currentRoute, isTransitioning]);
  
  // Fetch community data - move this useEffect up before any conditional returns
  useEffect(() => {
    async function loadCommunity() {
      try {
        const data = await getCommunityData(communityId)
        setCommunity(data)
      } catch (error) {
        console.error("Error loading community data:", error)
        toast({
          title: "Error",
          description: "Failed to load community data",
          variant: "destructive"
        })
      }
    }
    
    loadCommunity()
  }, [communityId, toast])

  const handleNavigateBack = () => {
    setIsTransitioning(true)
    router.push('/dashboard/communities')
  }
  
  // Show loading state only for first visit or during transitions
  if (localLoading && (isFirstVisit(currentRoute) || isTransitioning)) {
    return <LoadingPreloader preloadModules={preloadModules} />
  }
  
  // If no user after loading completes, show login message
  if (!user) {
    return <LoginRequired />
  }

  return (
    <div className="w-full">
      <Suspense fallback={<LazyLoadingPlaceholder />}>
        {community ? (
          <CommunityDetailsViewDynamic
            community={community}
            onBack={handleNavigateBack}
          />
        ) : (
          <LazyLoadingPlaceholder />
        )}
      </Suspense>
    </div>
  )
} 