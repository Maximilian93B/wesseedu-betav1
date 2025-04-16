"use client"

import { Suspense, useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { LoadingPreloader, LoginRequired } from "@/components/wsu/home"
import { useToast } from "@/hooks/use-toast"
import { useNavigation } from "@/context/NavigationContext"
import { Skeleton } from "@/components/ui/skeleton"

// Placeholder component for lazy loading
const LazyLoadingPlaceholder = () => (
  <div className="flex flex-col w-full h-screen">
    <div className="flex-1 bg-gradient-to-r from-[#70f570] to-[#49c628] p-6">
      <div className="flex justify-between mb-8">
        <Skeleton className="h-9 w-32 bg-white/20 rounded-xl" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 bg-white/20 rounded-xl" />
          <Skeleton className="h-9 w-9 bg-white/20 rounded-xl" />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 mt-10">
        <Skeleton className="w-40 h-40 md:w-56 md:h-56 rounded-xl bg-white/20" />
        <div className="flex-1">
          <div className="flex gap-2 mb-6">
            <Skeleton className="h-8 w-24 rounded-full bg-white/20" />
            <Skeleton className="h-8 w-24 rounded-full bg-white/20" />
          </div>
          <Skeleton className="h-12 w-3/4 mb-6 rounded-lg bg-white/20" />
          <Skeleton className="h-6 w-full mb-2 rounded-lg bg-white/20" />
          <Skeleton className="h-6 w-5/6 mb-2 rounded-lg bg-white/20" />
        </div>
      </div>
    </div>
    <div className="h-32 bg-white rounded-t-3xl"></div>
  </div>
)

// Dynamically import the company details component
const CompanyDetailsViewDynamic = dynamic(
  () => import("@/components/company/CompanyDetailsView").then(mod => mod.CompanyDetailsView), 
  { ssr: false, loading: () => <LazyLoadingPlaceholder /> }
)

export default function CompanyDetailsPage({ params }: { params: { id: string } }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const companyId = params.id
  const { toast } = useToast()
  const [localLoading, setLocalLoading] = useState(true)
  const { isFirstVisit, markRouteVisited, isTransitioning, setIsTransitioning } = useNavigation()
  const currentRoute = `/dashboard/companies/${companyId}`
  
  // Track whether we've shown the loading timeout toast
  const hasShownTimeoutToastRef = useRef(false)
  
  // Preload modules
  const preloadModules = [
    () => import("@/components/company/CompanyDetailsView")
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
  
  // Show loading state only for first visit or during transitions
  if (localLoading && (isFirstVisit(currentRoute) || isTransitioning)) {
    return <LoadingPreloader preloadModules={preloadModules} />
  }
  
  // If no user after loading completes, show login message
  if (!user) {
    return <LoginRequired />
  }

  const handleNavigateBack = () => {
    setIsTransitioning(true)
    router.push('/dashboard/companies')
  }

  return (
    <div className="w-full">
      <Suspense fallback={<LazyLoadingPlaceholder />}>
        <CompanyDetailsViewDynamic 
          companyId={companyId}
          onClose={handleNavigateBack}
        />
      </Suspense>
    </div>
  )
} 