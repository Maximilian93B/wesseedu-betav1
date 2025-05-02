import { useEffect } from "react"
import { LoadingScreen } from "./LoadingScreen"
import { useRouter } from "next/navigation"

interface LoadingPreloaderProps {
  preloadRoutes?: string[]
  preloadModules?: Array<() => Promise<any>>
  children?: React.ReactNode
  message?: string
}

/**
 * Enhanced loading screen that preloads important dashboard resources
 * to improve performance when the user navigates to the dashboard
 */
export function LoadingPreloader({
  preloadRoutes = [],
  preloadModules = [],
  children,
  message
}: LoadingPreloaderProps) {
  const router = useRouter()
  
  // Preload key components and routes
  useEffect(() => {
    // Default modules to preload for dashboard
    const defaultModules = [
      () => import("@/components/wsu/home"),
      () => import("@/components/wsu/dashboard/DashboardNav")
    ]
    
    // Default routes to preload for dashboard
    const defaultRoutes = [
      '/dashboard/home',
      '/dashboard/overview',
      '/dashboard/companies'
    ]
    
    // Combine default and custom preloads
    const modulesToLoad = [...defaultModules, ...preloadModules]
    const routesToPrefetch = [...defaultRoutes, ...preloadRoutes]
    
    // Preload modules in the background
    modulesToLoad.forEach(moduleLoader => {
      moduleLoader().catch(err => {
        // Silently handle preload errors without disrupting the UI
        console.error("Error preloading module:", err)
      })
    })
    
    // Prefetch routes in the background
    routesToPrefetch.forEach(route => {
      router.prefetch(route)
    })
  }, [preloadModules, preloadRoutes, router])
  
  // Use the standard LoadingScreen but with optional custom message
  return (
    <div>
      {children || <LoadingScreen />}
    </div>
  )
} 