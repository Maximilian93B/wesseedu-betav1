"use client"

import { useState, useEffect, Suspense, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { AuthProvider, useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { useWatchlist } from "@/components/wsu/dashboard/WatchlistView"
import Head from "next/head"
import dynamic from "next/dynamic"

// Import home page specific components
import { HomePageNav } from "@/components/wsu/dashboard/HomePageNav"
import { SectionTransition } from "@/components/wsu/dashboard/SectionTransition"

// Import new modularized components from barrel file
import { LoadingScreen, LoginRequired } from "@/components/wsu/home"

// Placeholder component for lazy loading
const LazyLoadingPlaceholder = () => (
  <div className="flex justify-center items-center min-h-[50vh] bg-white">
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

const PlatformImpactDynamic = dynamic(
  () => import("@/components/wsu/home").then(mod => ({ default: mod.PlatformImpact })), 
  { ssr: true }
)

const FeaturedContentDynamic = dynamic(
  () => import("@/components/wsu/home").then(mod => ({ default: mod.FeaturedContent })), 
  { ssr: true }
)

const CallToActionDynamic = dynamic(
  () => import("@/components/wsu/home").then(mod => ({ default: mod.CallToAction })), 
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

  const handleNavigation = useCallback((view: 'home' | 'dashboard' | 'companies' | 'saved' | 'communities') => {
    if (view === 'home') {
      setCurrentView('home')
    } else if (view === 'dashboard') {
      setCurrentView('dashboard')
    } else if (view === 'companies') {
      setCurrentView('companies')
    } else if (view === 'saved') {
      setCurrentView('saved')
    } else if (view === 'communities') {
      // Use router to navigate to the communities page instead of changing view
      router.push('/communities')
    }
  }, [router]);

  const handleCompanySelect = useCallback((id: string) => {
    setSelectedCompanyId(id);
    setCurrentView('company-details');
  }, []);

  const handleCommunitySelect = useCallback((id: string) => {
    setSelectedCommunityId(id);
    setCurrentView('community-details');
  }, []);

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
        style={{ 
          backgroundImage: "linear-gradient(to right top, #ebebeb, #eeeef0, #f1f2f5, #f4f5fa, #f6f9ff)" 
        }}
      >
        <HomePageNav
          currentView={currentView}
          onNavigate={handleNavigation}
          onSignOut={signOut}
        />
        
        {/* Simplified background effects - with light colors for better performance */}
        <div 
          className="absolute left-[5%] top-[-5%] w-[600px] h-[600px] 
            bg-gradient-to-br from-blue-100 to-emerald-50 blur-[100px] rounded-full 
            pointer-events-none opacity-50"
          aria-hidden="true"
        ></div>
        
        {/* Main Layout - with overflow handling for mobile */}
        <div className="flex-1 relative overflow-x-hidden">
          {/* Main Content */}
          <main className="w-full">
            {currentView === 'home' && (
              <>
                {/* Hero Section - now light */}
                <div className="bg-transparent relative">
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

                {/* Transition - now light-to-white */}
                <SectionTransition direction="light-to-white" />

                {/* WHITE SECTION 1: How It Works */}
                <div className="bg-white py-16 md:py-24 relative">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <Suspense fallback={<div className="h-[200px] flex items-center justify-center bg-white"><LoadingScreen /></div>}>
                      <HowItWorksDynamic />
                      <div className="mt-16 md:mt-24">
                        <PlatformImpactDynamic />
                      </div>
                    </Suspense>
                  </div>
                </div>

                {/* DataViz with integrated wave transition */}
                <Suspense fallback={<div className="h-[400px] bg-slate-50 flex items-center justify-center"><LoadingScreen /></div>}>
                  <DataVizTransitionDynamic />
                </Suspense>
                
                {/* FeaturedContent Section - now with light colors */}
                <div className="relative">
                  {/* Simple split background container */}
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 bg-blue-50"></div>
                    <div className="w-full md:w-1/2 bg-white"></div>
                  </div>
                  
                  {/* Content container */}
                  <div className="absolute inset-0">
                    <Suspense fallback={<div className="h-full flex items-center justify-center py-12 bg-white"><LoadingScreen /></div>}>
                      <FeaturedContentDynamic />
                    </Suspense>
                  </div>
                  
                  {/* Fixed height container - adjusted for mobile */}
                  <div className="h-[600px] sm:h-[660px] md:h-[720px] lg:h-[800px]"></div>
                </div>
                
                {/* GrowthHero Section - now light */}
                <div className="relative bg-gradient-to-b from-slate-50 to-white">
                  <Suspense fallback={<div className="h-[70vh] flex items-center justify-center bg-white"><LoadingScreen /></div>}>
                    <GrowthHeroDynamic 
                      onAction={() => handleNavigation('companies')} 
                      actionButtonText="Start Investing Today"
                    />
                  </Suspense>
                </div>
                
                {/* Call to Action */}
                <div className="bg-slate-50 pt-12 pb-16 sm:pt-16 sm:pb-20 relative overflow-hidden">
                  {/* Subtle accent glow element */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-emerald-100 rounded-full blur-3xl pointer-events-none"></div>
                  
                  {/* Content container */}
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8 relative z-10">
                    <Suspense fallback={<div className="h-[150px] flex items-center justify-center bg-white"><LoadingScreen /></div>}>
                      <CallToActionDynamic onNavigate={handleNavigation} />
                    </Suspense>
                  </div>
                </div>
              </>
            )}

            {/* Dashboard overlay */}
            {currentView === 'dashboard' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-8 bg-transparent">
                <Suspense fallback={<div className="h-[400px] flex items-center justify-center"><LoadingScreen /></div>}>
                  <DashboardViewDynamic user={user} />
                </Suspense>
              </div>
            )}

            {/* Companies overlay */}
            {currentView === 'companies' && (
              <div className="py-4 md:py-6 bg-transparent">
                <Suspense fallback={<div className="h-[400px] flex items-center justify-center"><LoadingScreen /></div>}>
                  <CompaniesViewDynamic 
                    onCompanySelect={handleCompanySelect}
                  />
                </Suspense>
              </div>
            )}

            {/* Company details overlay */}
            {currentView === 'company-details' && selectedCompanyId && (
              <div className="py-4 md:py-6 bg-transparent">
                <Suspense fallback={<div className="h-[400px] flex items-center justify-center"><LoadingScreen /></div>}>
                  <CompanyDetailsViewDynamic 
                    companyId={selectedCompanyId}
                    onClose={() => {
                      setSelectedCompanyId(null)
                      setCurrentView('companies')
                    }}
                  />
                </Suspense>
              </div>
            )}

            {/* Communities overlay */}
            {currentView === 'communities' && (
              <div className="py-4 md:py-6 bg-transparent">
                <Suspense fallback={<div className="h-[400px] flex items-center justify-center"><LoadingScreen /></div>}>
                  <CommunitiesViewDynamic 
                    onCommunitySelect={handleCommunitySelect}
                  />
                </Suspense>
              </div>
            )}

            {/* Community details overlay */}
            {currentView === 'community-details' && selectedCommunityId && (
              <div className="py-4 md:py-6 bg-transparent">
                <Suspense fallback={<div className="h-[400px] flex items-center justify-center"><LoadingScreen /></div>}>
                  <CommunityDetailsViewDynamic
                    community={{
                      id: selectedCommunityId,
                      isMember: false,
                      description: null,
                      created_at: new Date().toISOString(),
                      companies: {
                        id: selectedCommunityId,
                        name: 'Loading...',
                        description: null,
                        mission_statement: null,
                        score: 0,
                        image_url: null
                      }
                    }}
                    onBack={() => {
                      setSelectedCommunityId(null)
                      setCurrentView('communities')
                    }}
                  />
                </Suspense>
              </div>
            )}

            {/* Watchlist overlay */}
            {currentView === 'saved' && (
              <div className="py-4 md:py-6 bg-transparent">
                <Suspense fallback={<div className="h-[400px] flex items-center justify-center"><LoadingScreen /></div>}>
                  <WatchlistViewDynamic 
                    externalData={watchlistCompanies}
                    externalLoading={watchlistLoading}
                  />
                </Suspense>
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