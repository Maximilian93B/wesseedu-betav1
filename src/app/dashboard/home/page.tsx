"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthProvider, useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import dynamic from "next/dynamic"
import Head from "next/head"

// Import modularized components
import { LoadingScreen, LoginRequired } from "@/components/wsu/home"

// Dynamically import home page components
const HomeHeroDynamic = dynamic(
  () => import("@/components/wsu/home").then(mod => ({ default: mod.HomeHero })), 
  { ssr: true }
)

const QuickActionsDynamic = dynamic(
  () => import("@/components/wsu/home").then(mod => ({ default: mod.QuickActions })), 
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

const GrowthHeroDynamic = dynamic(
  () => import("@/components/wsu/home").then(mod => ({ default: mod.GrowthHero })), 
  { ssr: true }
)

const DataVizTransitionDynamic = dynamic(
  () => import("@/components/wsu/dashboard/DataVizTransition").then(mod => ({ default: mod.DataVizTransition })), 
  { ssr: false }
)

function DashboardHomeContent() {
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
    <div className="space-y-8 max-w-[2000px] mx-auto">
      {/* Main Content */}
      <main className="w-full">
        {/* Hero Section with green apple styling */}
        <div className="relative">
          <div className="w-full px-4 sm:px-6 py-8 md:py-16">
            <Suspense fallback={<div className="h-[300px] flex items-center justify-center"><LoadingScreen /></div>}>
              <HomeHeroDynamic 
                profile={profile} 
                onNavigate={handleNavigation} 
              />
              
              {/* QuickActions */}
              <div className="mt-8 md:mt-16 relative">
                <QuickActionsDynamic onNavigate={handleNavigation} />
              </div>
            </Suspense>
          </div>
        </div>

        {/* WHITE SECTION 1: How It Works */}
        <div className="relative overflow-hidden rounded-t-[2rem] border-t border-white/20 shadow-[0_-8px_30px_rgba(0,0,0,0.1)] bg-white pt-20 pb-16 md:pt-24 md:pb-24 mt-[-1rem]">
          <div className="w-full px-4 sm:px-6">
            <Suspense fallback={<div className="h-[200px] flex items-center justify-center"><LoadingScreen /></div>}>
              <HowItWorksDynamic />
            </Suspense>
          </div>
        </div>

        {/* DataViz with integrated wave transition */}
        <Suspense fallback={<div className="h-[400px] bg-white flex items-center justify-center"><LoadingScreen /></div>}>
          <div className="pb-0 bg-white"> 
            <DataVizTransitionDynamic />
          </div>
        </Suspense>

        {/* FeaturedContent Section */}
        <div className="relative bg-white">
          {/* Split background container */}
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-green-50"></div>
            <div className="w-full md:w-1/2 bg-white"></div>
          </div>
          
          {/* Content container */}
          <div className="absolute inset-0">
            <Suspense fallback={<div className="h-full flex items-center justify-center py-12"><LoadingScreen /></div>}>
              <FeaturedContentDynamic />
            </Suspense>
          </div>
          
          {/* Fixed height container - adjusted for mobile */}
          <div className="h-[600px] sm:h-[660px] md:h-[720px] lg:h-[800px]"></div>
        </div>
        
        {/* GrowthHero Section */}
        <div className="relative bg-gradient-to-b from-green-50 to-white">
          <Suspense fallback={<div className="h-[30vh] flex items-center justify-center"><LoadingScreen /></div>}>
            <GrowthHeroDynamic 
              onAction={() => handleNavigation('companies')} 
              actionButtonText="Start Investing Today"
            />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

export default function DashboardHomePage() {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <DashboardHomeContent />
    </AuthProvider>
  )
} 