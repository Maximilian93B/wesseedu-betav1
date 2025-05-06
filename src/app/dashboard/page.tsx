"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { LoadingPreloader, LoginRequired } from "@/components/wsu/home"
import { useNavigation } from "@/context/NavigationContext"


export default function DashboardPage() {
  // Use the unified auth hook with checkOnMount: false to prevent automatic redirects
  const { user, loading } = useAuth({
    requireAuth: false,
    checkOnMount: false
  })
  const router = useRouter()
  const { isFirstVisit, markRouteVisited, setIsTransitioning } = useNavigation()
  const currentRoute = '/dashboard'
  const redirectAttemptedRef = useRef(false)
  
  // Redirect to dashboard/home after authentication check
  useEffect(() => {
    if (!loading && user && !redirectAttemptedRef.current) {
      console.log("DashboardPage: Redirecting authenticated user to dashboard/home")
      redirectAttemptedRef.current = true
      setIsTransitioning(true)
      router.replace('/dashboard/home')
    }
  }, [user, loading, router, setIsTransitioning])
  
  // Mark dashboard root as visited to avoid redundant loading
  useEffect(() => {
    if (!loading) {
      markRouteVisited(currentRoute)
    }
  }, [loading, markRouteVisited, currentRoute])
  
  // Define modules to preload for better dashboard performance
  const dashboardModules = [
    () => import("@/components/wsu/dashboard/DashboardNav"),
    () => import("@/components/wsu/home").then(mod => mod.HomeHero),
    () => import("@/components/wsu/home").then(mod => mod.QuickActions),
    () => import("@/components/wsu/dashboard/DataVizTransition")
  ]
  
  // Define routes to preload for faster navigation
  const dashboardRoutes = [
    '/dashboard/home',
    '/dashboard/overview',
    '/dashboard/companies',
    '/dashboard/saved',
    '/dashboard/communities'
  ]
  
  // Only show loading for first visit
  if (loading && isFirstVisit(currentRoute)) {
    return (
      <LoadingPreloader 
        preloadModules={dashboardModules}
        preloadRoutes={dashboardRoutes}
      />
    )
  }

  // If no user after loading completes, show login message
  if (!user) {
    return <LoginRequired />
  }

  // This will briefly show while redirecting, but also preload content
  return (
    <LoadingPreloader 
      preloadModules={dashboardModules}
      preloadRoutes={dashboardRoutes}
    />
  )
} 