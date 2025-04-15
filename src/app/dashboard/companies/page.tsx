"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { LoadingScreen, LoginRequired } from "@/components/wsu/home"

// Placeholder component for lazy loading
const LazyLoadingPlaceholder = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <LoadingScreen />
  </div>
)

// Dynamically import the companies view component
const CompaniesViewDynamic = dynamic(
  () => import("@/components/company/CompaniesView"), 
  { ssr: false, loading: () => <LazyLoadingPlaceholder /> }
)

export default function CompaniesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  
  // Show loading during auth check
  if (loading) {
    return <LoadingScreen />
  }
  
  // If no user after loading completes, show login message
  if (!user) {
    return <LoginRequired />
  }

  return (
    <div className="w-full">
      <Suspense fallback={<div className="h-[400px] flex items-center justify-center"><LoadingScreen /></div>}>
        <CompaniesViewDynamic 
          onCompanySelect={(id) => {
            router.push(`/dashboard/companies/${id}`)
          }}
        />
      </Suspense>
    </div>
  )
} 