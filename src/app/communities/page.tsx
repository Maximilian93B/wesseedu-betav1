"use client"

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import CommunitiesView from '@/components/community/CommunitiesView'

export default function CommunitiesPage() {
  const router = useRouter()
  
  const handleCommunitySelect = useCallback((id: string) => {
    router.push(`/communities/${id}`)
  }, [router])

  const handleReturnHome = useCallback(() => {
    router.push('/auth/home')
  }, [router])

  return (
    <main className="min-h-screen bg-black relative">
      {/* Gradient overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-black to-black pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-emerald-950/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
      
      {/* Ambient glow effects */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Return to home button - fixed position */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={handleReturnHome}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 hover:bg-zinc-800 text-white rounded-md border border-zinc-700 backdrop-blur-sm transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Return to Home
        </button>
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 pt-28 pb-20 relative z-10">
        <CommunitiesView onCommunitySelect={handleCommunitySelect} />
      </div>
    </main>
  )
} 