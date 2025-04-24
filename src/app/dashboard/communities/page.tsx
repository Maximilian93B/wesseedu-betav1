"use client"

import { Suspense, useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { LoadingPreloader, LoginRequired } from "@/components/wsu/home"
import { Users, TrendingUp,} from 'lucide-react'
import { useCommunities } from '@/hooks/use-communities'
import { Ambassador, Community } from '@/types/community'
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { CommunityHero } from "@/components/community/CommunityHero"

// Placeholder component for lazy loading
const LazyLoadingPlaceholder = () => (
  <div className="space-y-6 p-4">
    <Skeleton className="h-14 w-1/2 mb-3 rounded-lg" />
    <Skeleton className="h-6 w-3/4 mb-6 rounded-lg" />
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl overflow-hidden border border-green-100 shadow-sm">
          <Skeleton className="w-full h-40 rounded-t-xl" />
          <div className="p-4">
            <Skeleton className="h-7 w-1/2 mb-2 rounded-lg" />
            <Skeleton className="h-4 w-full mb-1 rounded-lg" />
            <Skeleton className="h-4 w-3/4 mb-4 rounded-lg" />
            <div className="flex justify-between items-center mt-4">
              <Skeleton className="h-8 w-20 rounded-lg" />
              <Skeleton className="h-6 w-16 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
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
  
  // Define modules to preload
  const preloadModules = [
    () => import("@/components/community/CommunitiesView"),
    () => import("@/components/community/AmbassadorShowcase")
  ]
  
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
    return <LoadingPreloader preloadModules={preloadModules} />
  }

  // If no user after loading completes, show login message
  if (!user) {
    return <LoginRequired />
  }
  
  return (
    <div className="space-y-4 max-w-[2000px] mx-auto">
      {/* Hero Section */}
      <CommunityHero 
        icon3DPath="/sustainability.png"
        onDiscoverClick={() => document.getElementById('communities-list')?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* Feature rows with two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div className="p-6 rounded-xl bg-white border border-green-100 shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-[#70f570] to-[#49c628] p-3 rounded-md mr-4 shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
              <Users className="h-5 w-5 text-white" />
            </div>
            <p className="text-green-800 font-medium text-lg font-display">Regenerative Networks</p>
          </div>
          <p className="text-green-700 font-body leading-relaxed">Collaborate with like-minded investors committed to positive environmental and social impact. Join forums, events, and discussions that align with your values.</p>
        </div>
        
        <div className="p-6 rounded-xl bg-white border border-green-100 shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-[#70f570] to-[#49c628] p-3 rounded-md mr-4 shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <p className="text-green-800 font-medium text-lg font-display">Sustainable Alpha</p>
          </div>
          <p className="text-green-700 font-body leading-relaxed">Gain access to curated investment opportunities that generate returns while accelerating positive change. Our network helps you identify high-potential sustainable opportunities.</p>
        </div>
      </div>
      
    
      {/* Ambassador Showcase */}
      <div className="bg-white rounded-xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-green-100">
        <h2 className="text-2xl font-black text-green-800 mb-6 font-display tracking-tight">Our Community Ambassadors</h2>
        <Suspense fallback={<div className="space-y-6">
          <div className="flex justify-around flex-wrap gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden border border-green-100 shadow-sm p-4 w-60">
                <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-1 rounded-lg" />
                <Skeleton className="h-4 w-5/6 mx-auto mb-1 rounded-lg" />
                <Skeleton className="h-4 w-1/2 mx-auto mb-4 rounded-lg" />
              </div>
            ))}
          </div>
        </div>}>
          <AmbassadorShowcaseDynamic ambassadors={ambassadors} />
        </Suspense>
      </div>
      
   
      
      {/* Communities List Section */}
      <div id="communities-list" className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] p-8 border border-green-100">
        <div className="mb-8 relative">
          <div className="flex items-center gap-8 mb-6">
            <div>
              <h2 className="text-2xl font-black text-green-800 font-display tracking-tight">
                Select Your <span className="text-green-700">Community</span>
              </h2>
              <p className="text-green-700 mt-2 font-body leading-relaxed">
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
        <Suspense fallback={<LazyLoadingPlaceholder />}>
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