"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { useAuth } from "@/hooks/use-auth"
import { useWatchlist } from "@/components/wsu/dashboard/WatchlistView"
import { LoadingScreen } from "@/components/wsu/home"

// Placeholder component for lazy loading
const LazyLoadingPlaceholder = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <LoadingScreen />
  </div>
)

// Dynamically import the watchlist component
const WatchlistViewDynamic = dynamic(
  () => import("@/components/wsu/dashboard/WatchlistView").then(mod => ({ default: mod.WatchlistView })), 
  { ssr: true, loading: () => <LazyLoadingPlaceholder /> }
)

export default function SavedPage() {
  const { loading: authLoading } = useAuth()
  // Use the shared watchlist hook to avoid duplicate data fetching
  const { watchlistCompanies, loading: watchlistLoading } = useWatchlist()
  
  // Show loading during auth check
  if (authLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="py-4 md:py-6">
      <Suspense fallback={<div className="h-[400px] flex items-center justify-center"><LoadingScreen /></div>}>
        <WatchlistViewDynamic 
          externalData={watchlistCompanies}
          externalLoading={watchlistLoading}
        />
      </Suspense>
    </div>
  )
} 