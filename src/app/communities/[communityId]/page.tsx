"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth"
import CommunityDetailsView from "@/components/community/CommunityDetailsView"
import { Community } from "@/types/community"
import { HomeIcon } from "lucide-react"

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
      <main className="min-h-screen bg-white dark:bg-slate-950 relative">
        {/* Subtle light mode ambient effects */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-slate-100/20 dark:bg-slate-800/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-slate-100/20 dark:bg-slate-800/10 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Return to home button - fixed position */}
        <div className="fixed top-6 left-6 z-50">
          <button
            onClick={handleReturnHome}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-md border border-slate-200 dark:border-slate-700 backdrop-blur-sm transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
          >
            <HomeIcon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            Return to Home
          </button>
        </div>
        
        {/* Content container */}
        <div className="container mx-auto px-4 pt-28 pb-20 relative z-10">
          <div className="flex justify-center py-16">
            <div className="w-14 h-14 border-2 border-t-slate-600 border-r-slate-400/40 border-b-slate-400/20 border-l-slate-400/60 rounded-full animate-spin"></div>
          </div>
        </div>
      </main>
    )
  }

  if (!community) {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-950 relative">
        {/* Subtle light mode ambient effects */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-slate-100/20 dark:bg-slate-800/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-slate-100/20 dark:bg-slate-800/10 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Return to home button - fixed position */}
        <div className="fixed top-6 left-6 z-50">
          <button
            onClick={handleReturnHome}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-md border border-slate-200 dark:border-slate-700 backdrop-blur-sm transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
          >
            <HomeIcon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            Return to Home
          </button>
        </div>
        
        {/* Content container */}
        <div className="container mx-auto px-4 pt-28 pb-20 relative z-10">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Community Not Found</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">The community you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={handleBack}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 relative">
      {/* Subtle light mode ambient effects */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-slate-100/20 dark:bg-slate-800/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-slate-100/20 dark:bg-slate-800/10 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Return to home button - fixed position */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={handleReturnHome}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-md border border-slate-200 dark:border-slate-700 backdrop-blur-sm transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
        >
          <HomeIcon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
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