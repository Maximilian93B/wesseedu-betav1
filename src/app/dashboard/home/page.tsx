"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import dynamic from "next/dynamic"

// Import modularized components
import { LoadingScreen, LoginRequired } from "@/components/wsu/home"

// Dynamically import home page components
const HomeHeroDynamic = dynamic(
  () => import("@/components/wsu/home").then(mod => ({ default: mod.HomeHero })), 
  { ssr: true }
)

const HowItWorksDynamic = dynamic(
  () => import("@/components/wsu/home").then(mod => ({ default: mod.HowItWorks })), 
  { ssr: true }
)

const FeaturedContentDynamic = dynamic(
  () => import("@/components/wsu/home").then(mod => ({ default: mod.FeaturedContent })), 
  { ssr: true }
)

const DataVizTransitionDynamic = dynamic(
  () => import("@/components/wsu/dashboard/DataVizTransition").then(mod => ({ default: mod.DataVizTransition })), 
  { ssr: false }
)

export default function DashboardHomePage() {
  const { user, profile, loading } = useAuth()
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

  return (
    <div className="w-full max-w-[2000px] mx-auto overflow-x-hidden">
      {/* Main Content */}
      <main className="w-full">
        {/* Hero Section with green apple styling */}
        <div className="relative">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-16">
            <Suspense fallback={<div className="h-[250px] sm:h-[300px] flex items-center justify-center"><LoadingScreen /></div>}>
              <HomeHeroDynamic 
                profile={profile} 
                onNavigate={handleNavigation} 
              />
            </Suspense>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="relative overflow-hidden rounded-t-[1.5rem] sm:rounded-t-[2rem] border-t border-white/20 shadow-[0_-8px_30px_rgba(0,0,0,0.1)] bg-white pt-12 pb-10 sm:pt-16 md:pt-24 md:pb-16 mt-[-1rem]">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<div className="h-[180px] sm:h-[200px] flex items-center justify-center"><LoadingScreen /></div>}>
              <HowItWorksDynamic />
            </Suspense>
          </div>
        </div>

        {/* Data Visualization Section */}
        <div className="bg-white pb-6 sm:pb-8">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<div className="h-[250px] sm:h-[300px] flex items-center justify-center"><LoadingScreen /></div>}>
              <DataVizTransitionDynamic />
            </Suspense>
          </div>
        </div>

        {/* Featured Content Section */}
        <div className="relative bg-white">
          {/* Split background container - improved for mobile */}
          <div className="absolute inset-0">
            <div className="h-1/2 md:h-full md:w-1/2 bg-green-50 absolute top-0 left-0 md:bottom-0"></div>
            <div className="h-1/2 md:h-full md:w-1/2 bg-white absolute bottom-0 right-0 md:top-0"></div>
          </div>
          
          {/* Content container */}
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <Suspense fallback={<div className="h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center"><LoadingScreen /></div>}>
              <FeaturedContentDynamic />
            </Suspense>
          </div>
          
          {/* Responsive height container */}
          <div className="h-[500px] sm:h-[580px] md:h-[720px] lg:h-[800px]"></div>
        </div>
      </main>
    </div>
  )
} 