"use client"

import { ReactNode, useEffect, useState } from "react"
import { DashboardNav } from "@/components/wsu/dashboard/DashboardNav"
import { useAuth } from "@/hooks/use-auth"
import { LoadingScreen } from "@/components/wsu/home"
import { useRouter } from "next/navigation"

import { NavigationProvider } from "@/context/NavigationContext"
import { LoginRequired } from "@/components/wsu/home"
import { usePathname } from "next/navigation"

// Prefetch component modules without requiring hooks
const prefetchModules = () => {
  import("@/components/wsu/home")
  import("@/components/wsu/dashboard/DashboardNav")
}

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  // Use the unified auth hook with checkOnMount: false to prevent automatic redirects
  const { user, loading, isAuthenticated } = useAuth({
    requireAuth: false,
    checkOnMount: false
  })
  const [readyToRender, setReadyToRender] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const [redirectAttempted, setRedirectAttempted] = useState(false)
  
  // Debug log for dashboard layout
  useEffect(() => {
    console.log("DashboardLayout: Auth state -", 
      "user:", user?.id || "not authenticated", 
      "loading:", loading,
      "isAuthenticated:", isAuthenticated
    );
  }, [user, loading, isAuthenticated]);
  
  // Preload critical components when the dashboard layout mounts
  useEffect(() => {
    console.log("DashboardLayout: Prefetching routes and modules");
    // Prefetch modules
    prefetchModules()
    
    // Prefetch routes using the router from the component
    router.prefetch('/dashboard/home')
    router.prefetch('/dashboard/overview')
    router.prefetch('/dashboard/companies')
  }, [router])
  
  // Redirect if not authenticated after loading completes
  useEffect(() => {
    // Only make decisions once loading is complete and only redirect once
    if (!loading && !redirectAttempted) {
      if (!isAuthenticated) {
        console.log("DashboardLayout: User not authenticated, redirecting to login");
        setRedirectAttempted(true) // Mark that we've attempted a redirect
        const returnPath = encodeURIComponent(pathname || '/dashboard');
        // Use full page navigation to preserve cookies
        window.location.href = `/auth/login?returnTo=${returnPath}`;
      } else {
        // Set ready to render when authenticated
        console.log("DashboardLayout: User authenticated, ready to render");
        setReadyToRender(true)
      }
    }
  }, [loading, isAuthenticated, router, pathname, redirectAttempted]);
  
  // Show loading during auth check
  if (loading) {
    console.log("DashboardLayout: Authentication in progress, showing loading screen");
    return <LoadingScreen />
  }
  
  // Show login required if not authenticated
  if (!isAuthenticated && !loading) {
    console.log("DashboardLayout: Not authenticated, showing login required");
    return <LoginRequired />
  }
  
  // Wait until we're sure we're ready to render
  if (!readyToRender) {
    console.log("DashboardLayout: Waiting to ensure auth is stable before rendering");
    return <LoadingScreen />
  }
  
  console.log("DashboardLayout: Rendering dashboard with authorized user");
  return (
    <NavigationProvider>
      <div className="min-h-screen">
        <DashboardNav />
        <main className="w-full">
          {children}
        </main>
      </div>
    </NavigationProvider>
  )
} 