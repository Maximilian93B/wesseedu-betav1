"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { LoadingScreen } from '@/components/wsu/home'

export default function CommunitiesRedirectPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  
  useEffect(() => {
    if (!loading) {
      // Redirect to dashboard communities page for authenticated users
      if (user) {
        router.push('/dashboard/communities')
      } else {
        // Redirect to login if not authenticated
        router.push('/auth/signin?redirect=/dashboard/communities')
      }
    }
  }, [router, user, loading])
  
  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(115deg, #70f570, #49c628)' }}>
      <LoadingScreen />
    </div>
  )
}