"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, BarChart, Search, Bookmark } from "lucide-react"
import { NewsSection } from "@/components/wsu/dashboard/NewsSection"
import { SidebarAds } from "@/components/advertising/SidebarAds"
import { AnimatePresence } from "framer-motion"
import { DashboardView } from "@/components/wsu/dashboard/DashboardView"
import { HomePageNav } from "@/components/wsu/dashboard/HomePageNav"
import CompaniesView from "@/components/company/CompaniesView"
import { CompanyDetailsView } from "@/components/company/CompanyDetailsView"
import { WatchlistView, useWatchlist } from "@/components/wsu/dashboard/WatchlistView"
import { AuthProvider, useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"

function HomePageContent() {
  const { user, profile, loading, signOut } = useAuth()
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'companies' | 'company-details' | 'saved'>('home')
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null)
  const [localLoading, setLocalLoading] = useState(true)
  const { toast } = useToast()
  
  // Use the shared watchlist hook to avoid duplicate data fetching
  const { watchlistCompanies, loading: watchlistLoading } = useWatchlist()

  // Add a timeout to ensure we don't get stuck in loading state
  useEffect(() => {
    // Set a timeout to force loading to false after 5 seconds
    const timeoutId = setTimeout(() => {
      if (localLoading) {
        console.warn('HomePage: Loading timeout reached, forcing loading to false')
        setLocalLoading(false)
        
        // Show a toast to inform the user
        toast({
          title: "Loading timeout",
          description: "Some data might not be available. Please refresh if needed.",
          variant: "default"
        })
      }
    }, 5000)

    // If auth loading completes, update local loading state
    if (!loading) {
      setLocalLoading(false)
      clearTimeout(timeoutId)
    }

    return () => clearTimeout(timeoutId)
  }, [loading, localLoading, toast])

  const handleNavigation = (view: 'home' | 'dashboard' | 'companies' | 'saved') => {
    setCurrentView(view)
    setSelectedCompanyId(null)
  }

  // Show loading state with a better UI
  if (localLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-400">
        <div className="w-12 h-12 border-t-2 border-emerald-500 rounded-full animate-spin mb-4"></div>
        <p>Loading your dashboard...</p>
      </div>
    )
  }

  // If no user after loading completes, show login message
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-400">
        <p className="mb-4">You need to be logged in to view this page</p>
        <Button 
          onClick={() => window.location.href = '/auth/login'}
          className="bg-emerald-500 hover:bg-emerald-400 text-white"
        >
          Go to Login
        </Button>
      </div>
    )
  }

  // Prepare stats from profile data with default values if data is missing
  const stats = [
    {
      title: "Your Investment",
      value: `$${profile?.total_investments?.toLocaleString() || '0'}`,
      icon: <TrendingUp className="h-10 w-10 text-emerald-400" />,
    },
    {
      title: "Impact Score",
      value: `${profile?.impact_score || '0'}/10`,
      icon: <BarChart className="h-10 w-10 text-emerald-400" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black relative overflow-hidden">
      <HomePageNav
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view)
          setSelectedCompanyId(null)
        }}
        onSignOut={signOut}
      />
      
      {/* Background glows */}
      <div className="absolute left-[10%] top-0 w-[900px] h-[900px] 
        bg-emerald-500/5 blur-[150px] rounded-full 
        pointer-events-none"></div>
      
      <div className="absolute right-[5%] bottom-0 w-[800px] h-[800px] 
        bg-emerald-500/5 blur-[130px] rounded-full 
        pointer-events-none"></div>

      <div className="absolute left-[40%] top-[40%] w-[600px] h-[600px] 
        bg-emerald-400/3 blur-[100px] rounded-full 
        pointer-events-none"></div>

      {/* Main layout with sidebars */}
      <div className="flex flex-1 relative">
        {/* Left Sidebar - Ads */}
        <SidebarAds />
        
        {/* Main Content - centered between sidebars */}
        <main className="flex-1 ml-80 mr-80 relative">
          {/* Home content */}
          <div className={currentView === 'home' ? 'block' : 'hidden'}>
            <div className="max-w-5xl mx-auto px-4 py-8">
              {/* Welcome Section */}
              <section className="mb-12">
                <div className="space-y-4 text-center">
                  <span className="inline-block text-emerald-400 text-sm font-medium tracking-wider uppercase 
                    bg-emerald-400/10 px-4 py-1 rounded-full border border-emerald-400/20">
                    Welcome Back
                  </span>
                  <h1 className="relative">
                    <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-emerald-400/20 
                      via-white/5 to-emerald-400/20 animate-pulse"></span>
                    <span className="relative text-4xl md:text-5xl lg:text-6xl font-bold 
                      bg-gradient-to-r from-zinc-200 via-white to-zinc-300 bg-clip-text 
                      text-transparent tracking-tight leading-tight">
                      Your Gateway to <br className="hidden sm:block" />
                      <span className="text-emerald-400">Sustainable</span> Investments
                    </span>
                  </h1>
                  <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed font-light">
                    Make an impact while growing your portfolio with our 
                    <span className="text-emerald-400 font-normal"> innovative platform</span>
                  </p>
                </div>
              </section>

              {/* Stats Cards */}
              <section className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <Card key={index} className="bg-zinc-900/50 border-2 border-white/5 hover:border-emerald-500/20 
                      transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-zinc-400 text-sm font-normal">{stat.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-white">{stat.value}</span>
                        {stat.icon}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Quick Actions */}
              <section className="mb-12">
                <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Button 
                    onClick={() => handleNavigation('companies')}
                    className="flex items-center justify-center gap-3 h-16 bg-zinc-900/50 border-2 border-white/5 
                      hover:border-emerald-500/20 hover:bg-zinc-900 transition-all duration-300 
                      hover:shadow-lg hover:shadow-emerald-500/5"
                  >
                    <Search className="h-5 w-5 text-emerald-400" />
                    <span className="text-white">Explore Companies</span>
                  </Button>
                  
                  <Button 
                    onClick={() => handleNavigation('saved')}
                    className="flex items-center justify-center gap-3 h-16 bg-zinc-900/50 border-2 border-white/5 
                      hover:border-emerald-500/20 hover:bg-zinc-900 transition-all duration-300 
                      hover:shadow-lg hover:shadow-emerald-500/5"
                  >
                    <Bookmark className="h-5 w-5 text-emerald-400" />
                    <span className="text-white">View Watchlist</span>
                  </Button>
                </div>
              </section>
            </div>
          </div>

          {/* Dashboard overlay */}
          {currentView === 'dashboard' && (
            <DashboardView user={user} />
          )}

          {/* Companies overlay */}
          {currentView === 'companies' && (
            <CompaniesView 
              onCompanySelect={(id: string) => {
                setSelectedCompanyId(id)
                setCurrentView('company-details')
              }}
            />
          )}

          {/* Company details overlay */}
          {currentView === 'company-details' && selectedCompanyId && (
            <CompanyDetailsView 
              companyId={selectedCompanyId}
              onClose={() => {
                setSelectedCompanyId(null)
                setCurrentView('companies')
              }}
            />
          )}

          {/* Watchlist overlay (previously SavedCompaniesView) */}
          {currentView === 'saved' && (
            <WatchlistView 
              externalData={watchlistCompanies}
              externalLoading={watchlistLoading}
            />
          )}
        </main>

        {/* Right Sidebar - News */}
        <NewsSection />
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