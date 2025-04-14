"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth"
import CommunityDetailsView from "@/components/community/CommunityDetailsView"
import { Community } from "@/types/community"
import { HomeIcon, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

interface CommunityPageProps {
  params: {
    communityId: string
  }
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      duration: 0.5
    }
  }
}

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
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
      <main 
        className="min-h-screen relative"
        style={{ 
          background: 'linear-gradient(115deg, #70f570, #49c628)',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Ambient light effects */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-white/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-white/10 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Return to home button - fixed position */}
        <div className="fixed top-6 left-6 z-50">
          <button
            onClick={handleReturnHome}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/30 backdrop-blur-sm transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.1)] font-helvetica"
          >
            <HomeIcon className="h-4 w-4 text-white" />
            Return to Home
          </button>
        </div>
        
        {/* Content container */}
        <div className="container mx-auto px-4 pt-28 pb-20 relative z-10">
          <div className="flex justify-center py-16">
            <div className="w-14 h-14 border-2 border-t-white border-r-white/40 border-b-white/20 border-l-white/60 rounded-full animate-spin"></div>
          </div>
        </div>
      </main>
    )
  }

  if (!community) {
    return (
      <main 
        className="min-h-screen relative"
        style={{ 
          background: 'linear-gradient(115deg, #70f570, #49c628)',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Ambient light effects */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-white/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-white/10 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Return to home button - fixed position */}
        <div className="fixed top-6 left-6 z-50">
          <button
            onClick={handleReturnHome}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/30 backdrop-blur-sm transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.1)] font-helvetica"
          >
            <HomeIcon className="h-4 w-4 text-white" />
            Return to Home
          </button>
        </div>
        
        {/* Content container */}
        <div className="container mx-auto px-4 pt-28 pb-20 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.1)]"
          >
            <motion.h1 variants={itemVariants} className="text-2xl font-bold text-white mb-4 font-display">Community Not Found</motion.h1>
            <motion.p variants={itemVariants} className="text-white/90 mb-6 font-body">The community you're looking for doesn't exist or has been removed.</motion.p>
            <motion.button 
              variants={itemVariants}
              onClick={handleBack}
              className="px-4 py-2 bg-white hover:bg-white/90 hover:text-green-900 text-black rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300 font-helvetica"
            >
              Go Back
            </motion.button>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main 
      className="min-h-screen relative"
      style={{ 
        background: 'linear-gradient(115deg, #70f570, #49c628)',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Ambient light effects */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-white/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-white/10 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Return to home button - fixed position */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={handleReturnHome}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/30 backdrop-blur-sm transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.1)] font-helvetica"
        >
          <HomeIcon className="h-4 w-4 text-white" />
          Return to Home
        </button>
      </div>
      
      {/* Back button - fixed position on opposite side */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/30 backdrop-blur-sm transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.1)] font-helvetica"
        >
          <ArrowLeft className="h-4 w-4 text-white" />
          Back to Communities
        </button>
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 pt-28 pb-20 relative z-10">
        <CommunityDetailsView community={community} onBack={handleBack} />
      </div>
    </main>
  )
} 