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

// Dynamically import the company details component
const CompanyDetailsViewDynamic = dynamic(
  () => import("@/components/company/CompanyDetailsView").then(mod => ({ default: mod.CompanyDetailsView })), 
  { ssr: false, loading: () => <LazyLoadingPlaceholder /> }
)

export default function CompanyDetailsPage({ params }: { params: { id: string } }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const companyId = params.id
  
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
        <CompanyDetailsViewDynamic 
          companyId={companyId}
          onClose={() => {
            router.push('/dashboard/companies')
          }}
        />
      </Suspense>
    </div>
  )
} 