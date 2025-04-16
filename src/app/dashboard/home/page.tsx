"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import dynamic from "next/dynamic"

// Import modularized components
import { LoadingPreloader, LoginRequired } from "@/components/wsu/home"
import { Skeleton } from "@/components/ui/skeleton"
import { useNavigation } from "@/context/NavigationContext"

// Dynamically import dashboard home page components
const DashboardIntroHeroDynamic = dynamic(
  () => import("@/components/wsu/dashboard/DashboardIntroHero").then(mod => ({ default: mod.DashboardIntroHero })), 
  { ssr: true }
)

const DashboardExplainerDynamic = dynamic(
  () => import("@/components/wsu/dashboard/DashboardExplainer").then(mod => ({ default: mod.DashboardExplainer })), 
  { ssr: true }
)

const AIInsightsDynamic = dynamic(
  () => import("@/components/wsu/dashboard/AIInsights").then(mod => ({ default: mod.AIInsights })), 
  { ssr: true }
)

// Component loading placeholder with responsive design
const ComponentLoadingPlaceholder = ({ type = "default" }: { type?: "hero" | "explainer" | "ai" | "default" }) => {
  switch(type) {
    case "hero":
      return (
        <div className="bg-gradient-to-r from-[#70f570]/40 to-[#49c628]/40 py-10 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Skeleton className="h-6 w-40 mb-4 rounded-full" />
                <Skeleton className="h-8 sm:h-10 w-4/5 mb-3 rounded-lg" />
                <Skeleton className="h-8 sm:h-10 w-3/5 mb-6 rounded-lg" />
                <Skeleton className="h-4 w-full mb-2 rounded-lg" />
                <Skeleton className="h-4 w-5/6 mb-6 rounded-lg" />
                <div className="flex gap-3 flex-wrap">
                  <Skeleton className="h-10 w-36 rounded-lg" />
                  <Skeleton className="h-10 w-36 rounded-lg" />
                </div>
              </div>
              <div className="hidden sm:block">
                <Skeleton className="h-64 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      );
    case "explainer":
      return (
        <div className="py-8 sm:py-12 px-4 sm:px-6 bg-white">
          <Skeleton className="h-8 w-60 mx-auto mb-4 rounded-lg" />
          <Skeleton className="h-4 w-full max-w-md mx-auto mb-8 rounded-lg" />
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <Skeleton className="h-6 w-40 mb-3 rounded-lg" />
                  <Skeleton className="h-4 w-full mb-2 rounded-lg" />
                  <Skeleton className="h-4 w-5/6 mb-4 rounded-lg" />
                  <div className="space-y-2">
                    {[1, 2, 3].map(j => (
                      <div key={j} className="flex items-center">
                        <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                        <Skeleton className="h-3 w-3/4 rounded-lg" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Skeleton className="h-48 w-full rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case "ai":
      return (
        <div className="bg-gradient-to-r from-[#70f570]/40 to-[#49c628]/40 py-10 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Skeleton className="h-8 sm:h-10 w-4/5 mb-4 rounded-lg" />
                <Skeleton className="h-4 w-full mb-4 rounded-lg" />
                <div className="space-y-3">
                  {[1, 2, 3, 4].map(i => (
                    <Skeleton key={i} className="h-16 w-full rounded-lg" />
                  ))}
                </div>
                <Skeleton className="h-10 w-40 mt-6 rounded-lg" />
              </div>
              <div className="hidden sm:block">
                <Skeleton className="h-72 w-full max-w-md mx-auto rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="py-8 px-4 sm:px-6">
          <div className="w-full max-w-md mx-auto">
            <Skeleton className="h-8 w-3/4 mb-4 rounded-lg" />
            <Skeleton className="h-4 w-full mb-2 rounded-lg" />
            <Skeleton className="h-4 w-5/6 mb-2 rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg mt-6" />
          </div>
        </div>
      );
  }
}

export default function DashboardHomePage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [localLoading, setLocalLoading] = useState(true)
  const { isFirstVisit, markRouteVisited, isTransitioning, setIsTransitioning } = useNavigation()
  const currentRoute = '/dashboard/home'
  
  // Define modules to preload for better dashboard performance
  const dashboardModules = [
    () => import("@/components/wsu/dashboard/DashboardIntroHero"),
    () => import("@/components/wsu/dashboard/DashboardExplainer"),
    () => import("@/components/wsu/dashboard/AIInsights")
  ]
  
  // Track whether we've shown the loading timeout toast
  const hasShownTimeoutToastRef = useRef(false)
  
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
  
  // Handle navigation with updated routing paths
  const handleNavigation = (view: 'home' | 'dashboard' | 'companies' | 'saved' | 'communities') => {
    setIsTransitioning(true)
    if (view === 'home') {
      router.push('/dashboard/home')
    } else if (view === 'dashboard') {
      router.push('/dashboard/overview')
    } else if (view === 'companies') {
      router.push('/dashboard/companies')
    } else if (view === 'saved') {
      router.push('/dashboard/saved')
    } else if (view === 'communities') {
      router.push('/dashboard/communities')
    }
  }
  
  // Only show loading for first visit or transition
  if (localLoading && (isFirstVisit(currentRoute) || isTransitioning)) {
    return (
      <LoadingPreloader
        preloadModules={dashboardModules}
      />
    )
  }

  // If no user after loading completes, show login message
  if (!user) {
    return <LoginRequired />
  }

  return (
    <div className="w-full max-w-[2000px] mx-auto overflow-hidden rounded-lg">
      {/* Main Content */}
      <main className="w-full">
        {/* Hero Section with dashboard introduction */}
        <div className="relative ">
          <Suspense fallback={<ComponentLoadingPlaceholder type="hero" />}>
            <DashboardIntroHeroDynamic 
              profile={profile} 
              onNavigate={handleNavigation} 
            />
          </Suspense>
        </div>

        {/* Dashboard Features Section - Explains the dashboard */}
        <div className="w-full bg-white">
          <Suspense fallback={<ComponentLoadingPlaceholder type="explainer" />}>
            <DashboardExplainerDynamic />
          </Suspense>
        </div>

        {/* AI Insights Section - Explains how AI is used under the hood */}
        <div className="w-full">
          <Suspense fallback={<ComponentLoadingPlaceholder type="ai" />}>
            <AIInsightsDynamic />
          </Suspense>
        </div>
      </main>
    </div>
  )
} 