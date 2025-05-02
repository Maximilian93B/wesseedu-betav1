"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { useAuth } from "@/hooks/use-auth"
import { useWatchlist } from "@/components/wsu/dashboard/WatchlistView"
import { LoadingPreloader } from "@/components/wsu/home"
import { Skeleton } from "@/components/ui/skeleton"

// Placeholder component for lazy loading
const LazyLoadingPlaceholder = () => (
  <div className="w-full max-w-5xl mx-auto py-8 px-4">
    <Skeleton className="h-10 w-1/3 mb-6 rounded-lg" />
    
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl overflow-hidden border shadow-sm p-4 flex flex-col md:flex-row gap-4">
          <Skeleton className="w-full md:w-48 h-36 rounded-lg" />
          <div className="flex-1">
            <Skeleton className="h-7 w-1/2 mb-2 rounded-lg" />
            <Skeleton className="h-4 w-full mb-1 rounded-lg" />
            <Skeleton className="h-4 w-2/3 mb-4 rounded-lg" />
            <div className="flex gap-2 mt-3">
              <Skeleton className="h-7 w-20 rounded-lg" />
              <Skeleton className="h-7 w-20 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

// Dynamically import the watchlist component
const WatchlistViewDynamic = dynamic(
  () => import("@/components/wsu/dashboard/WatchlistView").then(mod => ({ default: mod.WatchlistView })), 
  { ssr: true, loading: () => <LazyLoadingPlaceholder /> }
)

export default function SavedPage() {
  // Use the unified auth hook with checkOnMount: false to prevent automatic redirects
  const { user, loading: authLoading, isAuthenticated } = useAuth({
    requireAuth: false,
    checkOnMount: false
  })
  // Use the shared watchlist hook to avoid duplicate data fetching
  const { watchlistCompanies, loading: watchlistLoading } = useWatchlist()
  
  // Define modules to preload
  const preloadModules = [
    () => import("@/components/wsu/dashboard/WatchlistView").then(mod => mod.WatchlistView)
  ]
  
  // Show loading during auth check
  if (authLoading) {
    return <LoadingPreloader preloadModules={preloadModules} />
  }

  return (
    <div className="py-4 md:py-6">
      <Suspense fallback={<LazyLoadingPlaceholder />}>
        <WatchlistViewDynamic 
          externalData={watchlistCompanies}
          externalLoading={watchlistLoading}
        />
      </Suspense>
    </div>
  )
} 