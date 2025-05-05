"use client"

import { Suspense, useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { LoadingPreloader, LoginRequired } from "@/components/wsu/home"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { useNavigation } from "@/context/NavigationContext" 
import { CurvedTransition } from "@/components/ui/CurvedTransition"

// Placeholder component for lazy loading - enhanced for mobile
const LazyLoadingPlaceholder = () => (
  <div className="w-full py-4 sm:py-8">
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <Skeleton className="h-10 sm:h-16 w-4/5 sm:w-3/4 mb-2 sm:mb-4 rounded-lg" />
      <Skeleton className="h-5 sm:h-6 w-2/3 sm:w-1/2 mb-6 sm:mb-8 rounded-lg" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-white">
            <Skeleton className="w-full h-32 sm:h-48 rounded-t-xl" />
            <div className="p-3 sm:p-4">
              <Skeleton className="h-5 sm:h-6 w-3/4 mb-2 rounded-lg" />
              <Skeleton className="h-3 sm:h-4 w-full mb-3 sm:mb-4 rounded-lg" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-7 sm:h-8 w-20 sm:w-24 rounded-lg" />
                <Skeleton className="h-7 sm:h-8 w-7 sm:w-8 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

// Dynamically import the companies view component
const CompaniesViewDynamic = dynamic(
  () => import("@/components/company/CompaniesView"), 
  { ssr: false, loading: () => <LazyLoadingPlaceholder /> }
)

export default function CompaniesPage() {
  // Improve auth reliability by enabling checkOnMount
  const { user, loading, isAuthenticated } = useAuth({
    requireAuth: true, // Require auth at page level
    checkOnMount: true
  })
  const router = useRouter()
  const { toast } = useToast()
  const [localLoading, setLocalLoading] = useState(true)
  const { isFirstVisit, markRouteVisited, isTransitioning, setIsTransitioning } = useNavigation()
  const currentRoute = '/dashboard/companies'
  
  // Track whether we've shown the loading timeout toast
  const hasShownTimeoutToastRef = useRef(false)
  
  // Define modules to preload for better performance
  const preloadModules = [
    () => import("@/components/company/CompaniesView")
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
  }, [loading, localLoading, toast, isFirstVisit, currentRoute, markRouteVisited, isTransitioning]);
  
  // Check for authentication state and redirect if needed
  useEffect(() => {
    if (!loading && !user) {
      // If auth check is complete and no user, redirect to login
      const redirectPath = encodeURIComponent(currentRoute);
      router.push(`/auth/login?redirect=${redirectPath}`);
    }
  }, [loading, user, router, currentRoute]);
  
  // Only show loading for first visit or transition
  if (localLoading && (isFirstVisit(currentRoute) || isTransitioning)) {
    return <LoadingPreloader preloadModules={preloadModules} />
  }

  // If no user after loading completes, show login message
  if (!user) {
    return <LoginRequired />
  }
  
  return (
    <div className="w-full">
      <CurvedTransition fillColor="#ffffff" curveType="arc" size="sm" />
      <Suspense fallback={<LazyLoadingPlaceholder />}>
        <CompaniesViewDynamic 
          onCompanySelect={(id) => {
            setIsTransitioning(true)
            router.push(`/dashboard/companies/${id}`)
          }}
        />
      </Suspense>
    </div>
  )
} 