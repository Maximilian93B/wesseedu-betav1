"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import dynamic from "next/dynamic"
import { useNavigation } from "@/context/NavigationContext"

// Import modularized components
import { LoadingPreloader, LoginRequired } from "@/components/wsu/home"
import { Skeleton } from "@/components/ui/skeleton"

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

const FooterDynamic = dynamic(
  () => import("@/components/wsu/Footer").then(mod => ({ default: mod.Footer })), 
  { ssr: true }
) 

// Component loading placeholder with responsive design
const ComponentLoadingPlaceholder = ({ type = "default" }: { type?: "hero" | "explainer" | "ai" | "default" | "footer" }) => {
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
  // Use the unified auth hook with checkOnMount: false to prevent automatic redirects
  const { user, profile, loading, isAuthenticated } = useAuth({
    requireAuth: false,
    checkOnMount: false
  })
  const router = useRouter()
  const { isFirstVisit, markRouteVisited, isTransitioning, setIsTransitioning } = useNavigation()
  const [pageLoading, setPageLoading] = useState(true)
  const currentRoute = '/dashboard/home'
  
  // Define modules to preload for better dashboard performance
  const dashboardModules = [
    () => import("@/components/wsu/dashboard/DashboardIntroHero"),
    () => import("@/components/wsu/dashboard/DashboardExplainer"),
    () => import("@/components/wsu/dashboard/AIInsights")
  ]
  
  // Reset transitioning state when component mounts/unmounts
  useEffect(() => {
    console.log("DashboardHomePage: Component mounted, resetting transition state");
    setIsTransitioning(false)
    return () => setIsTransitioning(false)
  }, [setIsTransitioning])
  
  // Handle loading state and route visits
  useEffect(() => {
    // If this is not a first visit, skip loading process
    if (!isFirstVisit(currentRoute) && !isTransitioning) {
      console.log("DashboardHomePage: Not first visit and not transitioning, skipping loading");
      setPageLoading(false)
      return
    }
    
    console.log("DashboardHomePage: First visit or transitioning, starting loading process");
    
    // Only consider auth loading once
    if (!loading) {
      console.log("DashboardHomePage: Auth loading complete, marking route as visited");
      setPageLoading(false);
      markRouteVisited(currentRoute)
    }
    
    // Safety timeout to prevent infinite loading (3 seconds)
    const timeoutId = setTimeout(() => {
      console.log("DashboardHomePage: Safety timeout reached, forcing loading off");
      setPageLoading(false);
      markRouteVisited(currentRoute);
    }, 3000);

    return () => {
      console.log("DashboardHomePage: Cleaning up loading effect");
      clearTimeout(timeoutId);
    };
  }, [loading, isFirstVisit, currentRoute, markRouteVisited, isTransitioning]);
  
  // Handle navigation with updated routing paths
  const handleNavigation = (view: 'home' | 'dashboard' | 'companies' | 'saved' | 'communities') => {
    console.log("DashboardHomePage: Navigation requested to", view);
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
  if (pageLoading && (isFirstVisit(currentRoute) || isTransitioning)) {
    console.log("DashboardHomePage: Showing loading preloader");
    return (
      <LoadingPreloader
        preloadModules={dashboardModules}
      />
    )
  }

  // If not authenticated, show login required
  if (!isAuthenticated && !loading) {
    console.log("DashboardHomePage: Not authorized, showing login required");
    return <LoginRequired />
  }

  console.log("DashboardHomePage: Rendering main content");
  return (
    <div className="w-full max-w-full mx-auto overflow-hidden rounded-lg">
      {/* Main Content */}
      <main className="w-full">
        {/* Hero Section with dashboard introduction */}
        <div className="relative">
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
        <div className="w-full">
          <Suspense fallback={<ComponentLoadingPlaceholder type="footer" />}>
            <FooterDynamic />
          </Suspense>
        </div>
      </main>
   
    </div>
  )
} 