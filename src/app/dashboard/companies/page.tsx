"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useAuthGuard } from "@/hooks/use-auth-guard"
import { LoadingScreen } from "@/components/wsu/home"

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
  const { isAuthenticated, isLoading } = useAuthGuard()
  const router = useRouter()
  
  // Show loading during auth check
  if (isLoading) {
    return <LoadingScreen />
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