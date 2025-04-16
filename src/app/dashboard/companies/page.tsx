"use client"

import { Suspense, useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { LoadingPreloader, LoginRequired } from "@/components/wsu/home"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { useNavigation } from "@/context/NavigationContext" 
import { CurvedTransition } from "@/components/ui/CurvedTransition"

// Placeholder component for lazy loading
const LazyLoadingPlaceholder = () => (
  <div className="w-full py-8">
    <div className="mx-auto max-w-5xl">
      <Skeleton className="h-16 w-3/4 mb-4 rounded-lg" />
      <Skeleton className="h-6 w-1/2 mb-8 rounded-lg" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
            <Skeleton className="w-full h-48 rounded-t-xl" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2 rounded-lg" />
              <Skeleton className="h-4 w-full mb-4 rounded-lg" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-24 rounded-lg" />
                <Skeleton className="h-8 w-8 rounded-full" />
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
  const { user, loading } = useAuth()
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