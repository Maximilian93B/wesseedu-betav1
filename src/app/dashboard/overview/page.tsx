"use client"

import { Suspense, useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import dynamic from "next/dynamic"
import Head from "next/head"
import { useDashboardAuthCheck } from "@/lib/utils/dashboardAuthCheck"

// Import modularized components
import { LoadingPreloader, LoginRequired } from "@/components/wsu/home"
import { Skeleton } from "@/components/ui/skeleton"

// Placeholder component for lazy loading
const LazyLoadingPlaceholder = () => (
  <div className="w-full p-6 mx-auto">
    <div className="space-y-6">
      {/* Dashboard header skeleton */}
      <div className="mb-8">
        <Skeleton className="h-12 w-3/4 mb-2 rounded-lg" />
        <Skeleton className="h-5 w-1/2 rounded-lg" />
      </div>
      
      {/* Stats row skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border shadow-sm">
            <Skeleton className="h-8 w-8 mb-3 rounded-lg" />
            <Skeleton className="h-7 w-1/2 mb-1 rounded-lg" />
            <Skeleton className="h-4 w-3/4 rounded-lg" />
          </div>
        ))}
      </div>
      
      {/* Main chart skeleton */}
      <div className="bg-white rounded-xl p-5 border shadow-sm">
        <Skeleton className="h-7 w-1/4 mb-2 rounded-lg" />
        <Skeleton className="h-4 w-1/2 mb-6 rounded-lg" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    </div>
  </div>
)

// Dynamically import the dashboard component
const DashboardViewDynamic = dynamic(
  () => import("@/components/wsu/dashboard/DashboardView").then(mod => ({ default: mod.DashboardView })), 
  { ssr: false, loading: () => <LazyLoadingPlaceholder /> }
)

// Dynamically import QuickActions
const QuickActionsDynamic = dynamic(
  () => import("@/components/wsu/home").then(mod => ({ default: mod.QuickActions })), 
  { ssr: true }
)

export default function DashboardOverviewPage() {
  const { user, loading, isAuthenticated } = useAuth({
    requireAuth: false,
    checkOnMount: false
  })
  const router = useRouter()
  const { toast } = useToast()
  const [localLoading, setLocalLoading] = useState(true)
  const { checkAuth } = useDashboardAuthCheck()
  
  // Define modules to preload for better performance
  const preloadModules = [
    () => import("@/components/wsu/dashboard/DashboardView"),
    () => import("@/components/wsu/home").then(mod => mod.QuickActions)
  ]
  
  // Track whether we've shown the loading timeout toast
  const hasShownTimeoutToastRef = useRef(false)
  
  // Perform auth check using the utility
  const authResult = checkAuth(user, loading)
  
  // Handle unauthorized access
  useEffect(() => {
    if (!loading && !authResult.isAuthorized && authResult.redirectUrl) {
      router.push(authResult.redirectUrl)
    }
  }, [loading, authResult, router]);
  
  // Add a timeout to ensure we don't get stuck in loading state
  useEffect(() => {
    // Flag to track component mount state for preventing memory leaks
    let isMounted = true;
    
    // If auth loading is already complete, update local loading state immediately
    if (!loading && isMounted) {
      setLocalLoading(false);
    }
    
    // Set a timeout to force loading to false after 5 seconds
    const timeoutId = setTimeout(() => {
      if (isMounted && localLoading) {
        setLocalLoading(false);
        
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
  }, [loading, localLoading, toast]);
  
  // Handle navigation with updated routing paths
  const handleNavigation = (view: 'home' | 'dashboard' | 'companies' | 'saved' | 'communities') => {
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
  
  // Show loading state
  if (localLoading) {
    return <LoadingPreloader preloadModules={preloadModules} />
  }

  // If not authorized after loading completes, show login message
  if (!authResult.isAuthorized && !loading) {
    return <LoginRequired />
  }

  // Create a standalone QuickActions component that uses the green apple styling
  const StandaloneQuickActions = () => (
    <div className="mx-3 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 2xl:mx-16">
      <QuickActionsDynamic onNavigate={handleNavigation} />
    </div>
  );

  return (
    <div className="space-y-8 max-w-[2000px] mx-auto">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      {/* Dashboard View with QuickActions */}
      <Suspense fallback={<LazyLoadingPlaceholder />}>
        <DashboardViewDynamic 
          user={user} 
          quickActionsComponent={<StandaloneQuickActions />} 
        />
      </Suspense>
    </div>
  )
} 