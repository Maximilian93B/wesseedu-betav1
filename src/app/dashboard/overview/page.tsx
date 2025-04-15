"use client"

import { Suspense, useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { AuthProvider, useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import dynamic from "next/dynamic"
import Head from "next/head"

// Import modularized components
import { LoadingScreen, LoginRequired } from "@/components/wsu/home"

// Placeholder component for lazy loading
const LazyLoadingPlaceholder = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <LoadingScreen />
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

function DashboardOverviewContent() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [localLoading, setLocalLoading] = useState(true)
  
  // Track whether we've shown the loading timeout toast
  const hasShownTimeoutToastRef = useRef(false)
  
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
    return <LoadingScreen />
  }

  // If no user after loading completes, show login message
  if (!user) {
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
      {/* Dashboard View with QuickActions */}
      <Suspense fallback={<div className="h-[400px] flex items-center justify-center"><LoadingScreen /></div>}>
        <DashboardViewDynamic 
          user={user} 
          quickActionsComponent={<StandaloneQuickActions />} 
        />
      </Suspense>
    </div>
  )
}

export default function DashboardOverviewPage() {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <DashboardOverviewContent />
    </AuthProvider>
  )
} 