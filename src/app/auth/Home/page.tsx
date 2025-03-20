"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  TrendingUp, 
  BarChart, 
  Search, 
  Bookmark, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Globe, 
  Leaf, 
  DollarSign, 
  TrendingDown,
  ChevronRight
} from "lucide-react"
import { NewsSection } from "@/components/wsu/dashboard/NewsSection"
import { SidebarAds } from "@/components/advertising/SidebarAds"
import { DashboardView } from "@/components/wsu/dashboard/DashboardView"
import { HomePageNav } from "@/components/wsu/dashboard/HomePageNav"
import CompaniesView from "@/components/company/CompaniesView"
import { CompanyDetailsView } from "@/components/company/CompanyDetailsView"
import { WatchlistView, useWatchlist } from "@/components/wsu/dashboard/WatchlistView"
import { AuthProvider, useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import CommunitiesView from "@/components/community/CommunitiesView"
import CommunityDetailsView from "@/components/community/CommunityDetailsView"
import { motion } from "framer-motion" 
import { useRouter } from "next/navigation"

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

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

  // Show loading state with a better UI
  if (localLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-400">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-14 h-14 border-2 border-t-emerald-500 border-r-emerald-400/40 border-b-emerald-400/20 border-l-emerald-400/60 rounded-full animate-spin mb-6"></div>
          <p className="text-emerald-400/80 font-light tracking-wider">Preparing your sustainable investment dashboard...</p>
        </motion.div>
      </div>
    )
  }

  // If no user after loading completes, show login message
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-400">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 backdrop-blur-sm"
        >
          <p className="mb-6 text-xl text-center font-light">You need to be logged in to view this page</p>
          <Button 
            onClick={() => window.location.href = '/auth/login'}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg shadow-emerald-900/20"
          >
            Go to Login
          </Button>
        </motion.div>
      </div>
    )
  }

  // Prepare stats from profile data with default values if data is missing
  const stats = [
    {
      title: "Your Investment",
      value: `$${profile?.total_investments?.toLocaleString() || '0'}`,
      icon: <TrendingUp className="h-10 w-10 text-emerald-400" />,
      detail: "Total portfolio value"
    },
    {
      title: "Impact Score",
      value: `${profile?.impact_score || '0'}/10`,
      icon: <BarChart className="h-10 w-10 text-emerald-400" />,
      detail: "Your sustainability rating"
    },
  ];

  // Platform metrics for the impact section
  const platformMetrics = [
    {
      title: "Total Sustainable Investments",
      value: "$142M+",
      icon: <DollarSign className="h-6 w-6 text-emerald-400" />,
      change: "+18% this year"
    },
    {
      title: "Carbon Footprint Reduced",
      value: "87K tons",
      icon: <Leaf className="h-6 w-6 text-emerald-400" />,
      change: "+12% this quarter" 
    },
    {
      title: "Companies Supported",
      value: "214+",
      icon: <Globe className="h-6 w-6 text-emerald-400" />,
      change: "+32 in 2023"
    },
    {
      title: "Emissions Averted",
      value: "54K tons",
      icon: <TrendingDown className="h-6 w-6 text-emerald-400" />,
      change: "+21% this year"
    }
  ];

  // How it works steps
  const howItWorksSteps = [
    {
      number: "01",
      title: "Monitor Your Portfolio",
      description: "Track the performance of your current sustainable investments"
    },
    {
      number: "02",
      title: "Explore New Opportunities",
      description: "Discover additional companies that match your sustainability goals"
    },
    {
      number: "03",
      title: "Manage Your Investments",
      description: "Update your portfolio based on performance and impact metrics"
    },
    {
      number: "04",
      title: "Connect With Community",
      description: "Share insights and strategies with like-minded sustainable investors"
    }
  ];

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
              {/* Dark Section: Hero - Keep it on dark background for impact */}
              <div className="bg-black relative">
                {/* Add a subtle transition overlay at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/5 to-transparent z-10"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                  <motion.section 
                    className="mb-20 pt-8"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                  >
                    <motion.div className="space-y-5 text-center" variants={itemVariants}>
                      <div className="flex justify-center mb-4">
                        <motion.span 
                          className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium tracking-wider uppercase 
                            bg-gradient-to-r from-emerald-500/10 to-emerald-400/20 px-5 py-1.5 rounded-full border border-emerald-400/20
                            shadow-inner shadow-emerald-500/5"
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.15)" }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Sparkles className="h-3.5 w-3.5" /> Welcome Back, {profile?.name || profile?.username || profile?.full_name || 'Investor'} <Sparkles className="h-3.5 w-3.5" />
                        </motion.span>
                      </div>
                      <h1 className="relative">
                        <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-emerald-400/20 
                          via-white/5 to-emerald-400/20 animate-pulse"></span>
                        <span className="relative text-4xl md:text-5xl lg:text-7xl font-bold 
                          bg-gradient-to-r from-zinc-200 via-white to-zinc-300 bg-clip-text 
                          text-transparent tracking-tight leading-tight">
                          Your Investment <br className="hidden sm:block" />
                          <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">Dashboard</span>
                        </span>
                      </h1>
                      <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed font-light">
                        Track your portfolio, discover opportunities, and manage your 
                        <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent font-normal"> sustainable investments</span>
                      </p>
                      
                      <motion.div 
                        className="flex justify-center gap-4 mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <Button
                          onClick={() => handleNavigation('dashboard')}
                          className="px-8 py-6 bg-gradient-to-r from-emerald-600 to-emerald-500 
                            hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg shadow-emerald-900/20
                            text-base font-medium rounded-lg transition-all duration-300"
                        >
                          View My Dashboard
                        </Button>
                        <Button
                          onClick={() => handleNavigation('companies')}
                          variant="outline"
                          className="px-8 py-6 border-white/10 text-zinc-200 hover:text-white
                            hover:bg-zinc-800/50 hover:border-emerald-500/30 text-base font-medium
                            rounded-lg transition-all duration-300"
                        >
                          Explore Investments
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.section>

                  {/* Stats Cards - Keep in dark theme */}
                  <motion.section 
                    className="mb-20"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {stats.map((stat, index) => (
                        <motion.div 
                          key={index} 
                          variants={itemVariants}
                          whileHover={{ y: -5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                          <Card className="bg-zinc-900/50 border-2 border-white/5 backdrop-blur-sm
                            hover:border-emerald-500/30 group transition-all duration-500 
                            hover:shadow-xl hover:shadow-emerald-500/10 overflow-hidden">
                            <CardHeader className="pb-2 relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                              <CardTitle className="text-zinc-400 text-sm font-normal">{stat.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-6">
                              <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                  <span className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">{stat.value}</span>
                                  <p className="text-xs text-zinc-500">{stat.detail}</p>
                                </div>
                                <div className="bg-zinc-800/50 p-3.5 rounded-xl border border-white/5 group-hover:bg-emerald-900/20 
                                  group-hover:border-emerald-500/20 transition-all duration-500">
                                  {stat.icon}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                  
                  {/* Quick Actions - Keep in dark theme */}
                  <motion.section 
                    className="mb-0 pb-20"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                  >
                    <motion.h2 
                      variants={itemVariants} 
                      className="text-2xl font-semibold text-white mb-8 flex items-center"
                    >
                      <span className="border-b-2 border-emerald-500/30 pb-1 mr-2">Quick Actions</span>
                      <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-1 rounded-md">
                        One-click access
                      </span>
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <motion.div 
                        variants={itemVariants}
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.05), 0 10px 10px -5px rgba(16, 185, 129, 0.02)"
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Button 
                          onClick={() => handleNavigation('companies')}
                          className="w-full flex items-center justify-center gap-3 h-24 bg-zinc-900/50 border-2 border-white/5 
                            group hover:border-emerald-500/30 hover:bg-zinc-900 transition-all duration-500 
                            hover:shadow-lg hover:shadow-emerald-500/10 rounded-xl"
                        >
                          <div className="bg-zinc-800 p-3 rounded-lg border border-white/5 group-hover:bg-emerald-500/10 
                            group-hover:border-emerald-500/20 transition-all duration-500">
                            <Search className="h-6 w-6 text-emerald-400" />
                          </div>
                          <div className="text-left flex-1">
                            <span className="block text-white font-medium text-lg">Explore Companies</span>
                            <span className="text-sm text-zinc-500">Find sustainable businesses</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-zinc-500 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 
                            transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                        </Button>
                      </motion.div>
                      
                      <motion.div 
                        variants={itemVariants}
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.05), 0 10px 10px -5px rgba(16, 185, 129, 0.02)"
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Button 
                          onClick={() => handleNavigation('communities')}
                          className="w-full flex items-center justify-center gap-3 h-24 bg-zinc-900/50 border-2 border-white/5 
                            group hover:border-emerald-500/30 hover:bg-zinc-900 transition-all duration-500 
                            hover:shadow-lg hover:shadow-emerald-500/10 rounded-xl"
                        >
                          <div className="bg-zinc-800 p-3 rounded-lg border border-white/5 group-hover:bg-emerald-500/10 
                            group-hover:border-emerald-500/20 transition-all duration-500">
                            <Users className="h-6 w-6 text-emerald-400" />
                          </div>
                          <div className="text-left flex-1">
                            <span className="block text-white font-medium text-lg">Join Communities</span>
                            <span className="text-sm text-zinc-500">Connect with investors</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-zinc-500 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 
                            transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                        </Button>
                      </motion.div>
                      
                      <motion.div 
                        variants={itemVariants}
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.05), 0 10px 10px -5px rgba(16, 185, 129, 0.02)"
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Button 
                          onClick={() => handleNavigation('saved')}
                          className="w-full flex items-center justify-center gap-3 h-24 bg-zinc-900/50 border-2 border-white/5 
                            group hover:border-emerald-500/30 hover:bg-zinc-900 transition-all duration-500 
                            hover:shadow-lg hover:shadow-emerald-500/10 rounded-xl"
                        >
                          <div className="bg-zinc-800 p-3 rounded-lg border border-white/5 group-hover:bg-emerald-500/10 
                            group-hover:border-emerald-500/20 transition-all duration-500">
                            <Bookmark className="h-6 w-6 text-emerald-400" />
                          </div>
                          <div className="text-left flex-1">
                            <span className="block text-white font-medium text-lg">View Watchlist</span>
                            <span className="text-sm text-zinc-500">Track favorite companies</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-zinc-500 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 
                            transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                        </Button>
                      </motion.div>
                    </div>
                  </motion.section>
                </div>
              </div>

              {/* WHITE SECTION 1: How It Works - Add subtle top gradient */}
              <div className="bg-white py-20 rounded-t-[3rem] relative">
                {/* Add subtle top pattern */}
                <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_center_top,rgba(16,185,129,0.03),transparent_70%)] pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUpVariant}
                    className="mb-20"
                  >
                    <h2 className="text-2xl font-semibold text-zinc-900 mb-10 flex items-center">
                      <span className="border-b-2 border-emerald-600 pb-1">How WeSeedU Works</span>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {howItWorksSteps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-gradient-to-b from-white to-zinc-50 border border-zinc-200 rounded-xl p-7 
                            hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-500 
                            relative overflow-hidden group"
                          whileHover={{ y: -5 }}
                        >
                          {/* Decorative elements */}
                          <div className="absolute -right-4 -top-4 text-8xl font-bold text-emerald-500/10 group-hover:text-emerald-500/20
                            transition-all duration-700">{step.number}</div>
                          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-50 rounded-full opacity-0 
                            group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>
                          
                          {/* Step indicator */}
                          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700
                            font-semibold mb-4 relative z-10">{index + 1}</div>
                          
                          <h3 className="text-lg font-medium text-zinc-900 mb-3 relative z-10">{step.title}</h3>
                          <p className="text-sm text-zinc-600 relative z-10">{step.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                  
                  {/* Platform Impact Metrics - in white section */}
                  <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUpVariant}
                    className="mb-0"
                  >
                    <h2 className="text-2xl font-semibold text-zinc-900 mb-8 flex items-center">
                      <span className="border-b-2 border-emerald-600/70 pb-1">Our Collective Impact</span>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {platformMetrics.map((metric, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          className="bg-zinc-50 border border-zinc-200 rounded-xl p-6
                            hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-500"
                        >
                          <div className="flex items-center gap-4 mb-3">
                            <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
                              <div className="text-emerald-600">
                                {metric.icon}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-zinc-700">{metric.title}</h3>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-3xl font-bold text-zinc-900">{metric.value}</p>
                            <span className="text-xs text-emerald-600">{metric.change}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                </div>
              </div>
              
              {/* BACK TO DARK: Featured Content Section - Add top transition */}
              <div className="bg-black py-20 relative">
                {/* Add subtle top curved transition */}
                <div className="absolute inset-x-0 top-0 h-20 bg-white rounded-b-[6rem] -translate-y-10 z-0"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                  <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUpVariant}
                    className="mb-20"
                  >
                    <h2 className="text-2xl font-semibold text-white mb-8 flex items-center">
                      <span className="border-b-2 border-emerald-500/30 pb-1 mr-2">Featured Content</span>
                      <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-1 rounded-md">
                        Updated daily
                      </span>
                    </h2>
                    
                    {/* Investment Spotlight - Keep dark themed */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="mb-8"
                    >
                      <div className="p-1 bg-gradient-to-r from-emerald-500/50 via-emerald-400/30 to-emerald-500/50 rounded-xl">
                        <Card className="bg-zinc-900/80 border-0 backdrop-blur-sm overflow-hidden rounded-lg">
                          <CardContent className="p-0">
                            <div className="flex flex-col lg:flex-row">
                              {/* Left side - Promotional content */}
                              <div className="p-8 lg:w-1/3 bg-gradient-to-br from-zinc-900 to-zinc-900/95 flex flex-col justify-center relative overflow-hidden">
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full"></div>
                                <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-emerald-400/10 blur-2xl rounded-full"></div>
                                
                                <motion.div 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.3, duration: 0.7 }}
                                  className="relative z-10"
                                >
                                  <span className="inline-flex items-center justify-center px-3 py-1 mb-4 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                                    Investment Spotlight
                                  </span>
                                  <h3 className="text-2xl font-bold text-white mb-4">
                                    Featured <br/> 
                                    <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                                      Opportunity
                                    </span>
                                  </h3>
                                  <p className="text-sm text-zinc-400 mb-6 max-w-md">
                                    Discover curated investment opportunities that align with your sustainability goals and offer strong growth potential.
                                  </p>
                                  <div className="flex items-center space-x-1">
                                    {[1, 2, 3].map(i => (
                                      <div key={i} className="w-2 h-2 rounded-full bg-emerald-500/80"></div>
                                    ))}
                                  </div>
                                </motion.div>
                              </div>
                              
                              {/* Right side - SidebarAds component */}
                              <div className="p-6 lg:p-8 lg:w-2/3 relative">
                                <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/5 blur-2xl rounded-full"></div>
                                <SidebarAds />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                    
                    {/* NewsSection - Keep dark themed */}
                    <div className="w-full">
                      <motion.div
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        <Card className="bg-zinc-900/50 border border-white/5 backdrop-blur-sm
                          hover:border-emerald-500/30 transition-all duration-500 overflow-hidden h-full
                          hover:shadow-xl hover:shadow-emerald-900/10 rounded-xl">
                          <CardContent className="p-0 h-full">
                            <div className="p-6 h-full">
                              <NewsSection />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                  </motion.section>
                </div>
              </div>

              {/* WHITE SECTION 2: Call to Action - Add subtle top pattern */}
              <div className="bg-white py-20 rounded-t-[3rem] relative">
                {/* Add subtle top pattern */}
                <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_center_top,rgba(16,185,129,0.03),transparent_70%)] pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-10"
                  >
                    <div className="bg-gradient-to-br from-emerald-100 via-white to-emerald-50 border border-emerald-200
                      rounded-2xl p-12 text-center relative overflow-hidden shadow-xl">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_60%)]"></div>
                      
                      {/* Add decorative elements */}
                      <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-200/30 rounded-full blur-3xl"></div>
                      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-emerald-100/40 rounded-full blur-3xl"></div>
                      
                      <h2 className="text-3xl font-bold text-zinc-900 mb-4 relative z-10">Ready to Grow Your Impact?</h2>
                      <p className="text-zinc-600 mb-10 max-w-2xl mx-auto relative z-10 text-lg">
                        Expand your sustainable portfolio with new investment opportunities.
                      </p>
                      <Button 
                        onClick={() => handleNavigation('companies')}
                        className="px-10 py-7 bg-gradient-to-r from-emerald-600 to-emerald-500 
                          hover:from-emerald-500 hover:to-emerald-400 text-white text-lg font-medium
                          rounded-xl shadow-xl shadow-emerald-300/40 relative z-10 transition-all duration-300
                          hover:shadow-emerald-300/60 hover:scale-[1.02]"
                      >
                        <span>Explore New Investments</span>
                        <ArrowRight className="ml-3 h-5 w-5" />
                      </Button>
                    </div>
                  </motion.section>
                </div>
              </div>
            </>
          )}

          {/* Dashboard overlay */}
          {currentView === 'dashboard' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
              <DashboardView user={user} />
            </div>
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

          {/* Communities overlay */}
          {currentView === 'communities' && (
            <CommunitiesView 
              onCommunitySelect={(id: string) => {
                setSelectedCommunityId(id)
                setCurrentView('community-details')
              }}
            />
          )}

          {/* Community details overlay */}
          {currentView === 'community-details' && selectedCommunityId && (
            <div className="flex justify-center items-center h-full">
              <button 
                onClick={() => {
                  router.push(`/communities/${selectedCommunityId}`)
                }}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md border border-zinc-700"
              >
                View in new Communities page
              </button>
            </div>
          )}

          {/* Watchlist overlay (previously SavedCompaniesView) */}
          {currentView === 'saved' && (
            <WatchlistView 
              externalData={watchlistCompanies}
              externalLoading={watchlistLoading}
            />
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