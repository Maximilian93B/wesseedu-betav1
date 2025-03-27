"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthProvider, useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { SidebarAds } from "@/components/advertising/SidebarAds"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { SectionTransition } from "@/components/wsu/dashboard/SectionTransition"
import { LoadingScreen, LoginRequired } from "@/components/wsu/home"

function SponsoredPageContent() {
  const { user, loading } = useAuth()
  const [localLoading, setLocalLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()
  
  // Add a timeout to ensure we don't get stuck in loading state
  useEffect(() => {
    // Flag to track component mount state for preventing memory leaks
    let isMounted = true;
    
    // Set a timeout to force loading to false after 5 seconds
    const timeoutId = setTimeout(() => {
      if (isMounted && localLoading) {
        setLocalLoading(false);
        
        toast({
          title: "Loading timeout",
          description: "Some sponsored content might not be available. Please refresh if needed.",
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

  const handleGoBack = () => router.back();

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
      {/* Enhanced background effects */}
      <div className="absolute left-[5%] top-[-5%] w-[900px] h-[900px] 
        bg-gradient-to-br from-emerald-500/10 to-emerald-900/5 blur-[150px] rounded-full 
        animate-pulse [animation-duration:15s] pointer-events-none"></div>
      
      <div className="absolute right-[5%] bottom-[-10%] w-[800px] h-[800px] 
        bg-gradient-to-tl from-emerald-600/10 to-emerald-300/5 blur-[130px] rounded-full 
        animate-pulse [animation-duration:20s] [animation-delay:1s] pointer-events-none"></div>

      {/* Header */}
      <header className="bg-black py-4 relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGoBack}
              className="text-white hover:text-emerald-300 hover:bg-white/5"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-lg font-medium text-white">Featured Opportunities</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        {/* Dark Section: Sponsored Content */}
        <div className="bg-black relative py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                  Featured Opportunities
                </span>
              </h2>
              <p className="text-zinc-300 mt-4 max-w-md mx-auto">
                Discover curated sustainable investment opportunities from our trusted partners.
              </p>
            </motion.div>
            
            <div className="relative">
              {/* We're using SidebarAds but styling its container to make it look like a featured card */}
              <div className="bg-white rounded-xl overflow-hidden shadow-xl max-w-2xl mx-auto">
                <SidebarAds />
              </div>
              
              {/* Additional sponsored information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-12 bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 
                  rounded-xl p-6 max-w-2xl mx-auto shadow-md"
              >
                <div className="flex items-center mb-4">
                  <Sparkles className="h-5 w-5 text-emerald-500 mr-2" />
                  <h3 className="text-xl font-semibold text-emerald-800">Why Partner With Us?</h3>
                </div>
                <p className="text-zinc-600 mb-4">
                  Our featured opportunities are carefully selected based on their environmental impact,
                  governance practices, and potential for sustainable returns.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="rounded-full bg-emerald-100 p-1 mr-3 mt-0.5">
                      <ArrowUpRight className="h-3 w-3 text-emerald-600" />
                    </div>
                    <span className="text-zinc-700">Access to exclusive sustainable investment opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-emerald-100 p-1 mr-3 mt-0.5">
                      <ArrowUpRight className="h-3 w-3 text-emerald-600" />
                    </div>
                    <span className="text-zinc-700">Thorough vetting process ensures quality and alignment with ESG principles</span>
                  </li>
                  <li className="flex items-start">
                    <div className="rounded-full bg-emerald-100 p-1 mr-3 mt-0.5">
                      <ArrowUpRight className="h-3 w-3 text-emerald-600" />
                    </div>
                    <span className="text-zinc-700">Transparent reporting on impact metrics and performance</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white"
                  onClick={() => window.open('/contact', '_self')}
                >
                  Contact Us About Partnerships
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Transition from dark to light */}
        <SectionTransition direction="dark-to-light" />

        {/* WHITE SECTION: Related content */}
        <div className="bg-white py-20 relative">
          <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_center_top,rgba(16,185,129,0.03),transparent_70%)] pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h3 className="text-2xl font-semibold text-zinc-800 mb-8">Looking for more investment insights?</h3>
            <div className="flex flex-wrap gap-6 justify-center">
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push('/news')}
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300"
              >
                Latest News
              </Button>
              <Button
                size="lg"
                onClick={() => router.push('/auth/home')}
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white"
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function SponsoredPage() {
  return (
    <AuthProvider>
      <SponsoredPageContent />
    </AuthProvider>
  )
} 