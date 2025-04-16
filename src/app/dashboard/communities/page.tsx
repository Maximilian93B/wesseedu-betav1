"use client"

import { Suspense, useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { LoadingScreen, LoginRequired } from "@/components/wsu/home"
import { motion } from 'framer-motion'
import { Users, TrendingUp, ChevronDown, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCommunities } from '@/hooks/use-communities'
import { Ambassador, Community } from '@/types/community'
import { useToast } from "@/hooks/use-toast"

// Placeholder component for lazy loading
const LazyLoadingPlaceholder = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <LoadingScreen />
  </div>
)

// Dynamically import the communities component
const CommunitiesViewDynamic = dynamic(
  () => import("@/components/community/CommunitiesView").then(mod => ({ default: mod.CommunitiesView })), 
  { ssr: false, loading: () => <LazyLoadingPlaceholder /> }
)

// Dynamically import ambassador showcase
const AmbassadorShowcaseDynamic = dynamic(
  () => import("@/components/community/AmbassadorShowcase").then(mod => ({ default: mod.AmbassadorShowcase })), 
  { ssr: false, loading: () => <LazyLoadingPlaceholder /> }
)

// Sample ambassador data (will be replaced with real data from API)
const sampleAmbassadors: Ambassador[] = [
  {
    id: 'ambassador-1',
    name: 'Jessica Reynolds',
    bio: 'Award-winning sustainability advocate and impact investor with over 15 years of experience in renewable energy markets and ESG strategy development.',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&h=250&auto=format&fit=crop',
    role: 'Sustainability Advisor',
    joined_date: '2022-01-15'
  },
  {
    id: 'ambassador-2',
    name: 'Marcus Chen',
    bio: 'Former hedge fund manager turned clean tech investor, focusing on bridging traditional finance with sustainable investment opportunities.',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&h=250&auto=format&fit=crop',
    role: 'Financial Strategist',
    joined_date: '2022-03-22'
  },
  {
    id: 'ambassador-3',
    name: 'Amara Wilson',
    bio: 'Environmental scientist specializing in agriculture tech and sustainable food systems. Committed to advancing regenerative investing practices.',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&h=250&auto=format&fit=crop',
    role: 'AgTech Specialist',
    joined_date: '2022-05-10'
  }
];

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

// Utility function to collect all ambassadors from all communities
function getAllAmbassadors(communities: Community[]): Ambassador[] {
  if (!communities || communities.length === 0) return [];
  
  // Collect all ambassadors
  const allAmbassadors = communities
    .filter((community: Community) => community?.ambassadors && community.ambassadors.length > 0)
    .flatMap((community: Community) => community.ambassadors || []);
  
  // Remove duplicates by id
  const uniqueAmbassadors = Array.from(
    new Map(allAmbassadors.map((amb: Ambassador) => [amb.id, amb])).values()
  ) as Ambassador[];
  
  return uniqueAmbassadors.length > 0 ? uniqueAmbassadors : sampleAmbassadors;
}

export default function CommunitiesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { communities, loading: communitiesLoading } = useCommunities()
  const { toast } = useToast()
  const [localLoading, setLocalLoading] = useState(true)
  
  // Track whether we've shown the loading timeout toast
  const hasShownTimeoutToastRef = useRef(false)
  
  // Extract ambassadors from all communities if available
  const ambassadors = communitiesLoading ? sampleAmbassadors : getAllAmbassadors(communities || []);
  
  // Add a timeout to ensure we don't get stuck in loading state
  useEffect(() => {
    // Flag to track component mount state for preventing memory leaks
    let isMounted = true;
    
    // If auth loading is already complete, update local loading state immediately
    if (!loading && isMounted) {
      setLocalLoading(false);
    }
    
    // Set a timeout to force loading to false after 5 seconds
    const timeoutId = setTimeout(() => {
      if (isMounted && localLoading) {
        setLocalLoading(false);
        
        // Only show toast if we actually had to force the loading state change
        // and we haven't shown it yet
        if (loading && !hasShownTimeoutToastRef.current) {
          hasShownTimeoutToastRef.current = true;
          toast({
            title: "Loading timeout",
            description: "Some data might not be available. Please refresh if needed.",
            variant: "default"
          });
        }
      }
    }, 5000);

    // Cleanup function to prevent memory leaks and cancel timeout
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [loading, localLoading, toast]);
  
  // Show loading state
  if (localLoading) {
    return <LoadingScreen />
  }

  // If no user after loading completes, show login message
  if (!user) {
    return <LoginRequired />
  }
  
  return (
    <div className="space-y-8 max-w-[2000px] mx-auto">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border-4 border-white relative shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-green-50 via-transparent to-transparent opacity-70"></div>
        
        {/* Green accent bar */}
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#70f570] to-[#49c628]"></div>
        
        {/* Content */}
        <div className="relative z-20 px-8 py-12 sm:px-10 sm:py-16 md:p-16">
          <div className="max-w-3xl">
            <motion.div className="mb-3" variants={itemVariants}>
              <span className="text-green-700 text-sm tracking-wide font-medium px-3 py-1 rounded-full border border-green-200 shadow-[0_2px_10px_rgba(0,0,0,0.1)] bg-green-50 font-helvetica">
                WeSeedU Communities
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 mb-6 tracking-tight leading-tight font-display" 
              variants={itemVariants}
            >
              <span className="text-green-700">Seed</span> Capital,
              <span className="block">Grow Impact</span>
            </motion.h1>
            
            <motion.p 
              className="text-green-700 mb-8 leading-relaxed max-w-2xl text-lg font-body" 
              variants={itemVariants}
            >
              Join specialized communities where sustainable investors cultivate ideas, nurture opportunities, and harvest collective success in regenerative markets.
            </motion.p>
            
            <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
              <Button 
                className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold px-6 py-2.5 text-sm font-helvetica shadow-lg hover:shadow transition-all duration-300 rounded-xl"
                onClick={() => document.getElementById('communities-list')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="mr-2">Discover Your Community</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="bg-white text-green-700 hover:bg-green-50 border border-green-200 font-semibold px-6 py-2.5 text-sm font-helvetica shadow-md hover:shadow transition-all duration-300 rounded-xl"
              >
                <span className="mr-2">Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
            
            {/* Stats Bar in White Card */}
            <motion.div 
              className="mt-10 p-6 bg-white rounded-xl shadow-lg border border-green-100" 
              variants={itemVariants}
            >
              <div className="grid grid-cols-3 gap-8">
                <div className="flex flex-col space-y-1">
                  <p className="text-green-700 font-semibold text-2xl font-helvetica">3,000+</p>
                  <div className="h-px w-12 bg-green-200 mb-1"></div>
                  <p className="text-green-600 text-sm font-body">Impact Investors</p>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <p className="text-green-700 font-semibold text-2xl font-helvetica">40+</p>
                  <div className="h-px w-12 bg-green-200 mb-1"></div>
                  <p className="text-green-600 text-sm font-body">Sustainable Deals</p>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <p className="text-green-700 font-semibold text-2xl font-helvetica">12</p>
                  <div className="h-px w-12 bg-green-200 mb-1"></div>
                  <p className="text-green-600 text-sm font-body">Niche Networks</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Feature rows with two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div className="p-6 rounded-xl bg-white border border-green-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
          <div className="flex items-center mb-4">
            <div className="bg-green-50 p-3 rounded-md mr-4">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-green-800 font-medium text-lg font-display">Regenerative Networks</p>
          </div>
          <p className="text-green-700 font-body">Collaborate with like-minded investors committed to positive environmental and social impact. Join forums, events, and discussions that align with your values.</p>
        </div>
        
        <div className="p-6 rounded-xl bg-white border border-green-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
          <div className="flex items-center mb-4">
            <div className="bg-green-50 p-3 rounded-md mr-4">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-green-800 font-medium text-lg font-display">Sustainable Alpha</p>
          </div>
          <p className="text-green-700 font-body">Gain access to curated investment opportunities that generate returns while accelerating positive change. Our network helps you identify high-potential sustainable opportunities.</p>
        </div>
      </div>
      
      {/* Ambassador Showcase */}
      <div className="bg-white rounded-xl p-8 shadow-lg border-4 border-white">
        <h2 className="text-2xl font-bold text-green-800 mb-6 font-display">Our Community Ambassadors</h2>
        <Suspense fallback={<div className="h-[200px] flex items-center justify-center"><LoadingScreen /></div>}>
          <AmbassadorShowcaseDynamic ambassadors={ambassadors} />
        </Suspense>
      </div>
      
      {/* Communities List Section */}
      <div id="communities-list" className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8 relative">
          <div className="flex items-center gap-8 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-green-800 font-display">
                Select Your <span className="text-green-700">Community</span>
              </h2>
              <p className="text-green-700 mt-2 font-body">
                Find your niche where your capital can seed meaningful change
              </p>
            </div>
          </div>
          
          {/* Feature tags with white backgrounds */}
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="text-sm text-green-700 bg-white px-4 py-1.5 rounded-full border border-green-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)] font-helvetica">
              Sustainable Finance
            </span>
            <span className="text-sm text-green-700 bg-white px-4 py-1.5 rounded-full border border-green-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)] font-helvetica">
              Climate Tech
            </span>
            <span className="text-sm text-green-700 bg-white px-4 py-1.5 rounded-full border border-green-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)] font-helvetica">
              Regenerative Agriculture
            </span>
            <span className="text-sm text-green-700 bg-white px-4 py-1.5 rounded-full border border-green-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)] font-helvetica">
              Impact Ventures
            </span>
          </div>
        </div>
        
        {/* Community grid */}
        <Suspense fallback={<div className="h-[400px] flex items-center justify-center"><LoadingScreen /></div>}>
          <CommunitiesViewDynamic 
            onCommunitySelect={(id) => {
              router.push(`/dashboard/communities/${id}`)
            }}
          />
        </Suspense>
      </div>
    </div>
  )
} 