"use client"

import { useState, useEffect, Suspense, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { AuthProvider, useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { useWatchlist } from "@/components/wsu/dashboard/WatchlistView"
import Head from "next/head"
import dynamic from "next/dynamic"

// Import DashboardNav for standardized navigation
import { DashboardNav } from "@/components/wsu/dashboard/DashboardNav"

// Import new modularized components from barrel file
import { LoadingScreen, LoginRequired } from "@/components/wsu/home"

// Placeholder component for lazy loading
const LazyLoadingPlaceholder = () => (
  <div className="flex justify-center items-center min-h-[50vh]" style={{ background: 'linear-gradient(115deg, #70f570, #49c628)' }}>
    <LoadingScreen />
  </div>
)

// Dynamically import heavier components
const DashboardViewDynamic = dynamic(
  () => import("@/components/wsu/dashboard/DashboardView").then(mod => ({ default: mod.DashboardView })), 
  { ssr: true, loading: () => <LazyLoadingPlaceholder /> }
)

const WatchlistViewDynamic = dynamic(
  () => import("@/components/wsu/dashboard/WatchlistView").then(mod => ({ default: mod.WatchlistView })), 
  { ssr: true, loading: () => <LazyLoadingPlaceholder /> }
)

const CompaniesViewDynamic = dynamic(
  () => import("@/components/company/CompaniesView"), 
  { ssr: true, loading: () => <LazyLoadingPlaceholder /> }
)

const CompanyDetailsViewDynamic = dynamic(
  () => import("@/components/company/CompanyDetailsView").then(mod => ({ default: mod.CompanyDetailsView })), 
  { ssr: true, loading: () => <LazyLoadingPlaceholder /> }
)

const CommunitiesViewDynamic = dynamic(
  () => import("@/components/community/CommunitiesView").then(mod => ({ default: mod.CommunitiesView })), 
  { ssr: true, loading: () => <LazyLoadingPlaceholder /> }
)

const CommunityDetailsViewDynamic = dynamic(
  () => import("@/components/community/CommunityDetailsView"), 
  { ssr: true, loading: () => <LazyLoadingPlaceholder /> }
)

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

function HomePageContent() {
  const { user, profile, loading, signOut } = useAuth()
  const [currentView, setCurrentView] = useState<
    'home' | 'dashboard' | 'companies' | 'company-details' | 'saved' | 'communities' | 'community-details'
  >('home')
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null)
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null)
  const [localLoading, setLocalLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()
  
  // Track whether we've shown the loading timeout toast
  const hasShownTimeoutToastRef = useRef(false)
  
  // Use the shared watchlist hook to avoid duplicate data fetching
  const { watchlistCompanies, loading: watchlistLoading } = useWatchlist()

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
  }, [loading]); // Only depend on auth loading state, not localLoading

  // Use router for navigation instead of state
  const handleNavigation = useCallback((view: 'home' | 'dashboard' | 'companies' | 'saved' | 'communities') => {
    if (view === 'home') {
      setCurrentView('home')
    } else if (view === 'dashboard') {
      router.push('/dashboard/overview')
    } else if (view === 'companies') {
      router.push('/dashboard/companies')
    } else if (view === 'saved') {
      router.push('/dashboard/saved')
    } else if (view === 'communities') {
      router.push('/dashboard/communities')
    }
  }, [router]);

  const handleCompanySelect = useCallback((id: string) => {
    router.push(`/dashboard/companies/${id}`)
  }, [router]);

  const handleCommunitySelect = useCallback((id: string) => {
    router.push(`/dashboard/communities/${id}`)
  }, [router]);

  // Show loading state
  if (localLoading) {
    return <LoadingScreen />
  }

  // If no user after loading completes, show login message
  if (!user) {
    return <LoginRequired />
  }

  return (
    <>
      <div 
        className="flex flex-col min-h-screen relative overflow-hidden max-w-[100vw]"
        style={{ background: 'linear-gradient(115deg, #70f570, #49c628)' }}
      >
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px"
          }}
        ></div>
        
        {/* Background glow effects */}
        <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-white/15 rounded-full blur-[150px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[800px] h-[800px] bg-white/15 rounded-full blur-[150px] -z-10 animate-pulse" style={{ animationDelay: '-2s' }}></div>
        
        <DashboardNav />
        
        {/* Main Layout - with overflow handling for mobile */}
        <div className="flex-1 relative overflow-x-hidden">
          {/* Main Content */}
          <main className="w-full">
            {currentView === 'home' && (
              <>
                {/* Hero Section with green apple styling */}
                <div className="relative">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
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
                  <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
              </>
            )}

            {/* We no longer need these sections as they're now handled by separate routes */}
            {/* Instead, show a redirect message if someone tries to use the old URL patterns */}
            {currentView !== 'home' && (
              <div className="container mx-auto py-6 px-4 bg-white rounded-xl shadow-lg">
                <p className="text-green-800 text-lg">
                  Redirecting to the proper page...
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  )
}

export default function HomePage() {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <HomePageContent />
    </AuthProvider>
  )
}