"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { WatchlistView } from "./WatchlistView"

// This component is kept for backward compatibility
// It now simply renders the WatchlistView component
export function SavedCompaniesView() {
  const router = useRouter()
  
  // Log a deprecation warning
  useEffect(() => {
    console.warn(
      "SavedCompaniesView is deprecated and will be removed in a future version. " +
      "Please use WatchlistView instead."
    )
  }, [])

  return <WatchlistView />
}

