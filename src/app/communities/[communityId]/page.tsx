"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth"
import CommunityDetailsView from "@/components/community/CommunityDetailsView"
import { Community } from "@/types/community"

interface CommunityPageProps {
  params: {
    communityId: string
  }
}

export default function CommunityPage({ params }: CommunityPageProps) {
  const { communityId } = params
  const router = useRouter()
  const { toast } = useToast()
  const [community, setCommunity] = useState<Community | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCommunityData()
  }, [communityId])

  const fetchCommunityData = async () => {
    setLoading(true)
    try {
      const response = await fetchWithAuth(`/api/communities/${communityId}`)
      
      if (response.error || response.status >= 400) {
        throw new Error('Failed to fetch community data')
      }
      
      setCommunity(response.data.community)
    } catch (error) {
      console.error('Error fetching community data:', error)
      toast({
        title: 'Error',
        description: 'Failed to load community. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.back()
  }
  
  const handleReturnHome = useCallback(() => {
    router.push('/auth/home')
  }, [router])

  if (loading) {
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
          <div className="flex justify-center py-16">
            <div className="w-14 h-14 border-2 border-t-emerald-500 border-r-emerald-400/40 border-b-emerald-400/20 border-l-emerald-400/60 rounded-full animate-spin"></div>
          </div>
        </div>
      </main>
    )
  }

  if (!community) {
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
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Community Not Found</h1>
            <p className="text-zinc-400 mb-6">The community you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={handleBack}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md border border-zinc-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
    )
  }

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
        <CommunityDetailsView community={community} onBack={handleBack} />
      </div>
    </main>
  )
} 