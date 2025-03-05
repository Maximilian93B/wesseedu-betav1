"use client"

import { useState } from "react"
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
import { WatchlistView } from "@/components/wsu/dashboard/WatchlistView"
import { AuthProvider, useAuth } from "@/context/AuthContext"

function HomePageContent() {
  const { user, profile, loading, signOut } = useAuth()
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'companies' | 'company-details' | 'saved'>('home')
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null)

  const handleNavigation = (view: 'home' | 'dashboard' | 'companies' | 'saved') => {
    setCurrentView(view)
    setSelectedCompanyId(null)
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-black text-gray-400">Loading...</div>
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen bg-black text-gray-400">
      Redirecting to login...
    </div>
  }

  // Prepare stats from profile data
  const stats = profile ? [
    {
      title: "Your Investment",
      value: `$${profile.total_investments?.toLocaleString() || '0'}`,
      icon: <TrendingUp className="h-10 w-10 text-emerald-400" />,
    },
    {
      title: "Impact Score",
      value: `${profile.impact_score || '0'}/10`,
      icon: <BarChart className="h-10 w-10 text-emerald-400" />,
    },
  ] : [];

  return (
    <div className="flex flex-col min-h-screen bg-black relative overflow-hidden">
      <HomePageNav
        currentView={currentView}
        onNavigate={handleNavigation}
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

              {/* Stats Grid */}
              {stats.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {stats.map((stat, index) => (
                    <Card 
                      key={index} 
                      className="bg-[#0A0A0A] border-2 border-white/5 hover:border-white/10 
                        rounded-xl overflow-hidden transition-all duration-300
                        shadow-[0_0_15px_-3px_rgba(255,255,255,0.05)] 
                        hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="text-emerald-400">{stat.icon}</div>
                          <CardTitle className="text-xl font-medium text-white">{stat.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-3xl font-bold text-emerald-400">
                          {stat.value}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  onClick={() => {
                    handleNavigation('companies')
                  }}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white 
                    transition-colors shadow-md hover:shadow-emerald-500/25"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Find Companies
                </Button>
                <Button 
                  onClick={() => {
                    handleNavigation('dashboard')
                  }}
                  variant="outline" 
                  className="flex-1 border-2 border-white/5 hover:border-white/10 text-emerald-400 
                    hover:bg-white/5 transition-colors"
                >
                  <Bookmark className="w-4 h-4 mr-2" />
                  View Dashboard
                </Button>
              </div>

              {/* Features List */}
              <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span>Verified Companies</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span>Impact Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span>Sustainable Growth</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard overlay */}
          <AnimatePresence mode="wait">
            {currentView === 'dashboard' && <DashboardView user={user} />}
          </AnimatePresence>

          {/* Companies overlay */}
          {currentView === 'companies' && (
            <CompaniesView 
              onCompanySelect={(id) => {
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
                setCurrentView('companies')
                setSelectedCompanyId(null)
              }}
            />
          )}

          {/* Watchlist overlay (previously SavedCompaniesView) */}
          {currentView === 'saved' && (
            <WatchlistView />
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