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

// Dynamically import the community details component
const CommunityDetailsViewDynamic = dynamic(
  () => import("@/components/community/CommunityDetailsView"), 
  { ssr: false, loading: () => <LazyLoadingPlaceholder /> }
)

export default function CommunityDetailsPage({ params }: { params: { id: string } }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const communityId = params.id
  
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
        <CommunityDetailsViewDynamic
          community={{
            id: communityId,
            isMember: false,
            description: null,
            created_at: new Date().toISOString(),
            companies: {
              id: communityId,
              name: 'Loading...',
              description: null,
              mission_statement: null,
              score: 0,
              image_url: null
            }
          }}
          onBack={() => {
            router.push('/dashboard/communities')
          }}
        />
      </Suspense>
    </div>
  )
} 