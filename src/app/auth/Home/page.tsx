"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter } from "next/navigation"
import { AuthProvider, useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { useWatchlist } from "@/components/wsu/dashboard/WatchlistView"
import { Community } from "@/types/community"
import dynamic from "next/dynamic"

// Import view components
import { DashboardView } from "@/components/wsu/dashboard/DashboardView"
import { WatchlistView } from "@/components/wsu/dashboard/WatchlistView"
import CompaniesView from "@/components/company/CompaniesView"
import { CompanyDetailsView } from "@/components/company/CompanyDetailsView"
import CommunitiesView from "@/components/community/CommunitiesView"
import CommunityDetailsView from "@/components/community/CommunityDetailsView"

// Import home page specific components
import { HomePageNav } from "@/components/wsu/dashboard/HomePageNav"
import { SectionTransition } from "@/components/wsu/dashboard/SectionTransition"
import { DataVizTransition } from "@/components/wsu/dashboard/DataVizTransition"

// Import new modularized components from barrel file
import {
  HomeHero,
  StatsCards,
  QuickActions,
  HowItWorks,
  PlatformImpact,
  FeaturedContent,
  CallToAction,
  LoadingScreen,
  LoginRequired
} from "@/components/wsu/home"

// Dynamically import heavier components
const DashboardViewDynamic = dynamic(() => import("@/components/wsu/dashboard/DashboardView").then(mod => ({ default: mod.DashboardView })), { 
  ssr: true,
  loading: () => <div className="flex justify-center items-center min-h-[50vh]"><LoadingScreen /></div>
})

const WatchlistViewDynamic = dynamic(() => import("@/components/wsu/dashboard/WatchlistView").then(mod => ({ default: mod.WatchlistView })), {
  ssr: true,
  loading: () => <div className="flex justify-center items-center min-h-[50vh]"><LoadingScreen /></div>
})

const CompaniesViewDynamic = dynamic(() => import("@/components/company/CompaniesView"), {
  ssr: true,
  loading: () => <div className="flex justify-center items-center min-h-[50vh]"><LoadingScreen /></div>
})

const CompanyDetailsViewDynamic = dynamic(() => import("@/components/company/CompanyDetailsView").then(mod => ({ default: mod.CompanyDetailsView })), {
  ssr: true,
  loading: () => <div className="flex justify-center items-center min-h-[50vh]"><LoadingScreen /></div>
})

const CommunitiesViewDynamic = dynamic(() => import("@/components/community/CommunitiesView"), {
  ssr: true,
  loading: () => <div className="flex justify-center items-center min-h-[50vh]"><LoadingScreen /></div>
})

const CommunityDetailsViewDynamic = dynamic(() => import("@/components/community/CommunityDetailsView"), {
  ssr: true,
  loading: () => <div className="flex justify-center items-center min-h-[50vh]"><LoadingScreen /></div>
})

// Dynamically import home page components
const HomeHeroDynamic = dynamic(() => import("@/components/wsu/home").then(mod => ({ default: mod.HomeHero })), {
  ssr: true
})

const StatsCardsDynamic = dynamic(() => import("@/components/wsu/home").then(mod => ({ default: mod.StatsCards })), {
  ssr: true
})

const QuickActionsDynamic = dynamic(() => import("@/components/wsu/home").then(mod => ({ default: mod.QuickActions })), {
  ssr: true
})

const HowItWorksDynamic = dynamic(() => import("@/components/wsu/home").then(mod => ({ default: mod.HowItWorks })), {
  ssr: true
})

const PlatformImpactDynamic = dynamic(() => import("@/components/wsu/home").then(mod => ({ default: mod.PlatformImpact })), {
  ssr: true
})

const FeaturedContentDynamic = dynamic(() => import("@/components/wsu/home").then(mod => ({ default: mod.FeaturedContent })), {
  ssr: true
})

const CallToActionDynamic = dynamic(() => import("@/components/wsu/home").then(mod => ({ default: mod.CallToAction })), {
  ssr: true
})

const DataVizTransitionDynamic = dynamic(() => import("@/components/wsu/dashboard/DataVizTransition").then(mod => ({ default: mod.DataVizTransition })), {
  ssr: false
})

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
  
  // Use the shared watchlist hook to avoid duplicate data fetching
  const { watchlistCompanies, loading: watchlistLoading } = useWatchlist()

  // Add a timeout to ensure we don't get stuck in loading state
  useEffect(() => {
    // Flag to track component mount state for preventing memory leaks
    let isMounted = true;
    
    // Set a timeout to force loading to false after 5 seconds
    const timeoutId = setTimeout(() => {
      if (isMounted && localLoading) {
        console.warn('HomePage: Loading timeout reached, forcing loading to false');
        setLocalLoading(false);
        
        toast({
          title: "Loading timeout",
          description: "Some data might not be available. Please refresh if needed.",
          variant: "default"
        });
      }
    }, 5000);

    // Update loading state when auth loading completes
    if (isMounted && !loading) {
      setLocalLoading(false);
    }

    // Cleanup function to prevent memory leaks and cancel timeout
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [loading, localLoading, toast]);

  const handleNavigation = (view: 'home' | 'dashboard' | 'companies' | 'saved' | 'communities') => {
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
    <div className="flex flex-col min-h-screen bg-black relative overflow-hidden">
      <HomePageNav
        currentView={currentView}
        onNavigate={handleNavigation}
        onSignOut={signOut}
      />
      
      {/* Enhanced background effects */}
      <div className="absolute left-[5%] top-[-5%] w-[900px] h-[900px] 
        bg-gradient-to-br from-emerald-500/10 to-emerald-900/5 blur-[150px] rounded-full 
        animate-pulse [animation-duration:15s] pointer-events-none"></div>
      
      <div className="absolute right-[5%] bottom-[-10%] w-[800px] h-[800px] 
        bg-gradient-to-tl from-emerald-600/10 to-emerald-300/5 blur-[130px] rounded-full 
        animate-pulse [animation-duration:20s] [animation-delay:1s] pointer-events-none"></div>

      <div className="absolute left-[40%] top-[40%] w-[600px] h-[600px] 
        bg-gradient-to-r from-emerald-400/5 to-emerald-500/3 blur-[100px] rounded-full 
        animate-pulse [animation-duration:25s] [animation-delay:2s] pointer-events-none"></div>

      {/* Main Layout */}
      <div className="flex-1 relative">
        {/* Main Content */}
        <main>
          {currentView === 'home' && (
            <>
              {/* Dark Section: Hero */}
              <div className="bg-black relative">
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/5 to-transparent z-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
                  <Suspense fallback={<div className="h-[300px] flex items-center justify-center"><LoadingScreen /></div>}>
                    <HomeHeroDynamic 
                      profile={profile} 
                      onNavigate={handleNavigation} 
                    />
                    <div className="mt-16 md:mt-24">
                      <StatsCardsDynamic profile={profile} />
                    </div>
                    <div className="mt-16 md:mt-20 mb-8">
                      <QuickActionsDynamic onNavigate={handleNavigation} />
                    </div>
                  </Suspense>
                </div>
              </div>

              {/* Transition from dark to light */}
              <SectionTransition direction="dark-to-light" />

              {/* WHITE SECTION 1: How It Works */}
              <div className="bg-white py-24 md:py-32 relative">
                <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_center_top,rgba(16,185,129,0.03),transparent_70%)] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <Suspense fallback={<div className="h-[300px] flex items-center justify-center"><LoadingScreen /></div>}>
                    <HowItWorksDynamic />
                    <div className="mt-24 md:mt-32">
                      <PlatformImpactDynamic />
                    </div>
                  </Suspense>
                </div>
              </div>

              {/* DataViz with integrated wave transition */}
              <Suspense fallback={<div className="h-[600px] bg-black flex items-center justify-center"><LoadingScreen /></div>}>
                <DataVizTransitionDynamic />
              </Suspense>
              
              {/* BACK TO DARK: Featured Content Section - CLEAN IMPLEMENTATION */}
              <div className="relative">
                {/* Simple split background container */}
                <div className="flex flex-col md:flex-row">
                  {/* Left half - Black */}
                  <div className="w-full md:w-1/2 bg-black"></div>
                  
                  {/* Right half - White */}
                  <div className="w-full md:w-1/2 bg-white"></div>
                </div>
                
                {/* Subtle top separator */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
                
                {/* Content container */}
                <div className="absolute inset-0">
                  <Suspense fallback={<div className="h-[600px] flex items-center justify-center"><LoadingScreen /></div>}>
                    <FeaturedContentDynamic />
                  </Suspense>
                </div>
                
                {/* Subtle bottom separator */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
                
                {/* Fixed height container - increased for better spacing */}
                <div className="h-[680px] sm:h-[700px] md:h-[750px] lg:h-[780px]"></div>
              </div>

              {/* Transition from dark to light */}
              <SectionTransition direction="dark-to-light" />

              {/* WHITE SECTION 2: Call to Action */}
              <div className="bg-white pt-12 pb-24 relative">
                {/* Enhanced top decoration for better integration with SectionTransition */}
                <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_center_top,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none"></div>
                <div className="absolute inset-x-0 top-4 h-px bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent"></div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
                  <Suspense fallback={<div className="h-[200px] flex items-center justify-center"><LoadingScreen /></div>}>
                    <CallToActionDynamic onNavigate={handleNavigation} />
                  </Suspense>
                </div>
              </div>
            </>
          )}

          {/* Dashboard overlay */}
          {currentView === 'dashboard' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-12">
              <Suspense fallback={<div className="h-[600px] flex items-center justify-center"><LoadingScreen /></div>}>
                <DashboardViewDynamic user={user} />
              </Suspense>
            </div>
          )}

          {/* Companies overlay */}
          {currentView === 'companies' && (
            <div className="py-6 md:py-8">
              <Suspense fallback={<div className="h-[600px] flex items-center justify-center"><LoadingScreen /></div>}>
                <CompaniesViewDynamic 
                  onCompanySelect={(id: string) => {
                    setSelectedCompanyId(id)
                    setCurrentView('company-details')
                  }}
                />
              </Suspense>
            </div>
          )}

          {/* Company details overlay */}
          {currentView === 'company-details' && selectedCompanyId && (
            <div className="py-6 md:py-8">
              <Suspense fallback={<div className="h-[600px] flex items-center justify-center"><LoadingScreen /></div>}>
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
            <div className="py-6 md:py-8">
              <Suspense fallback={<div className="h-[600px] flex items-center justify-center"><LoadingScreen /></div>}>
                <CommunitiesViewDynamic 
                  onCommunitySelect={(id: string) => {
                    setSelectedCommunityId(id)
                    setCurrentView('community-details')
                  }}
                />
              </Suspense>
            </div>
          )}

          {/* Community details overlay */}
          {currentView === 'community-details' && selectedCommunityId && (
            <div className="py-6 md:py-8">
              <Suspense fallback={<div className="h-[600px] flex items-center justify-center"><LoadingScreen /></div>}>
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
            <div className="py-6 md:py-8">
              <Suspense fallback={<div className="h-[600px] flex items-center justify-center"><LoadingScreen /></div>}>
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
  )
}

export default function HomePage() {
  return (
    <AuthProvider>
      <HomePageContent />
    </AuthProvider>
  )
}