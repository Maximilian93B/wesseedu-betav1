"use client"

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CommunitiesView } from '@/components/community/CommunitiesView'
import { motion } from 'framer-motion'
import { Globe, Users, Award, BarChart3, TrendingUp, Shield, Briefcase, ArrowLeft, Home, ChevronDown, LineChart, GanttChartSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AmbassadorShowcase } from '@/components/community/AmbassadorShowcase'
import { useCommunities } from '@/hooks/use-communities'
import { Ambassador, Community } from '@/types/community'

// Sample ambassador data (you'll want to replace this with real data from your API)
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
  },
  {
    id: 'ambassador-4',
    name: 'David Park',
    bio: 'Serial entrepreneur with multiple successful green tech ventures. Passionate about scaling climate solutions through innovative financial models.',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&h=250&auto=format&fit=crop',
    role: 'Green Tech Entrepreneur',
    joined_date: '2021-11-04'
  },
  {
    id: 'ambassador-5',
    name: 'Elena Morales',
    bio: 'Policy expert specializing in ESG regulatory frameworks and sustainable finance. Former advisor to international climate initiatives.',
    avatar_url: 'https://images.unsplash.com/photo-1619855544858-e05c94b62c72?q=80&w=250&h=250&auto=format&fit=crop',
    role: 'Policy Advisor',
    joined_date: '2022-07-18'
  }
];

export default function CommunitiesPage() {
  const router = useRouter()
  const { communities, loading } = useCommunities()
  
  // Extract ambassadors from all communities if available
  const ambassadors = loading ? sampleAmbassadors : getAllAmbassadors(communities || []);
  
  const handleCommunitySelect = useCallback((id: string) => {
    router.push(`/communities/${id}`)
  }, [router])

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-7xl">
      {/* Navigation */}
      <div className="mb-8 flex justify-between items-center">
        <Button
          variant="ghost"
          className="text-zinc-400 hover:text-indigo-400 p-2.5 h-auto bg-black/20 border border-zinc-800/30 transition-colors duration-200"
          asChild
        >
          <Link href="/auth/home">
            <div className="flex items-center">
              <div className="bg-black/40 rounded-full p-1.5 mr-2.5">
                <ArrowLeft className="h-4 w-4" />
              </div>
              <span>Back to Dashboard</span>
            </div>
          </Link>
        </Button>
      </div>
    
      {/* Hero Section with minimalist styling and WeSeedU narrative */}
      <div className="mb-28">
        <div className="rounded-2xl overflow-hidden border border-zinc-800/40 bg-gradient-to-br from-zinc-900/95 to-black relative shadow-xl shadow-black/20">
          {/* Subtle decorative accents */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500/40 to-transparent z-10" />
          <div className="absolute -left-40 top-20 w-60 h-60 rounded-full bg-indigo-900/10 blur-[120px]" />
          <div className="absolute right-20 bottom-20 w-80 h-80 rounded-full bg-indigo-900/5 blur-[140px]" />
          
          <div className="relative z-20 px-8 py-16 sm:px-10 sm:py-20 md:p-16 lg:p-20">
            <div className="max-w-3xl">
              <div className="mb-3">
                <span className="text-indigo-300 text-sm tracking-wide font-medium px-3 py-1 rounded-full border border-indigo-800/20 shadow-sm shadow-indigo-900/10">
                  WeSeedU Communities
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-blue-300">Seed</span> Capital,
                <span className="block">Grow Impact</span>
              </h1>
              
              <p className="text-zinc-300 mb-10 leading-relaxed max-w-2xl text-lg">
                Join specialized communities where sustainable investors cultivate ideas, nurture opportunities, and harvest collective success in regenerative markets.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 text-sm shadow-md transition-all duration-200 rounded-lg"
                  onClick={() => document.getElementById('communities-list')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="mr-2">Discover Your Community</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Clean Stats Bar */}
              <div className="mt-16 grid grid-cols-3 gap-8">
                <div className="flex flex-col space-y-1">
                  <p className="text-white font-semibold text-2xl">3,000+</p>
                  <div className="h-px w-12 bg-indigo-500/30 mb-1"></div>
                  <p className="text-zinc-400 text-sm">Impact Investors</p>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <p className="text-white font-semibold text-2xl">40+</p>
                  <div className="h-px w-12 bg-indigo-500/30 mb-1"></div>
                  <p className="text-zinc-400 text-sm">Sustainable Deals</p>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <p className="text-white font-semibold text-2xl">12</p>
                  <div className="h-px w-12 bg-indigo-500/30 mb-1"></div>
                  <p className="text-zinc-400 text-sm">Niche Networks</p>
                </div>
              </div>
              
              {/* Feature highlights with subtle styling */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-lg bg-black/30 backdrop-blur-sm border border-zinc-800/20 shadow-sm">
                  <div className="flex items-center mb-3">
                    <Users className="h-4 w-4 text-indigo-400 mr-3" />
                    <p className="text-white font-medium">Regenerative Networks</p>
                  </div>
                  <p className="text-zinc-400 text-sm">Collaborate with like-minded investors committed to positive environmental and social impact.</p>
                </div>
                
                <div className="p-5 rounded-lg bg-black/30 backdrop-blur-sm border border-zinc-800/20 shadow-sm">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="h-4 w-4 text-indigo-400 mr-3" />
                    <p className="text-white font-medium">Sustainable Alpha</p>
                  </div>
                  <p className="text-zinc-400 text-sm">Gain access to curated investment opportunities that generate returns while accelerating positive change.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ambassador Showcase Section */}
      <AmbassadorShowcase ambassadors={ambassadors} />
      
      {/* Communities List Section - Dramatically enlarged */}
      <div id="communities-list" className="pt-32 pb-24">
        <div className="mb-32 relative">
          {/* Background accents - dramatically enlarged */}
          <div className="absolute -left-40 top-0 w-120 h-120 rounded-full bg-indigo-900/8 blur-[200px] z-0" />
          <div className="absolute right-20 bottom-0 w-120 h-120 rounded-full bg-indigo-900/5 blur-[220px] z-0" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-8 mb-16">
              <div className="w-20 h-20 rounded-xl bg-black/40 flex items-center justify-center border border-indigo-800/20 shadow-xl shadow-black/10">
                <Users className="h-8 w-8 text-indigo-400" />
              </div>
              <div>
                <div className="text-base uppercase tracking-wide text-indigo-400 font-medium mb-3">
                  Find Your Place
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  Select Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-blue-300">Community</span>
                </h2>
              </div>
              <div className="h-px flex-grow bg-gradient-to-r from-indigo-700/30 to-transparent ml-10"></div>
            </div>
            
            <div className="flex items-start mt-16 pl-10">
              <div className="w-1 h-28 bg-gradient-to-b from-indigo-500/40 to-transparent rounded-full mr-8 ml-10" />
              <p className="text-zinc-300 max-w-4xl pl-8 text-xl leading-relaxed">
                Each community is curated for specific impact areas and investment approaches. 
                Find your niche where your capital can seed meaningful change while connecting 
                with aligned investors pursuing returns with purpose.
              </p>
            </div>
            
            {/* Feature tags - dramatically enlarged */}
            <div className="flex flex-wrap gap-4 mt-20 ml-28">
              <span className="text-base text-indigo-300 bg-indigo-950/30 px-6 py-2.5 rounded-full border border-indigo-800/20 shadow-md">
                Sustainable Finance
              </span>
              <span className="text-base text-indigo-300 bg-indigo-950/30 px-6 py-2.5 rounded-full border border-indigo-800/20 shadow-md">
                Climate Tech
              </span>
              <span className="text-base text-indigo-300 bg-indigo-950/30 px-6 py-2.5 rounded-full border border-indigo-800/20 shadow-md">
                Regenerative Agriculture
              </span>
              <span className="text-base text-indigo-300 bg-indigo-950/30 px-6 py-2.5 rounded-full border border-indigo-800/20 shadow-md">
                Impact Ventures
              </span>
            </div>
            
            {/* Subtle accent line - wider and more space */}
            <div className="h-0.5 bg-gradient-to-r from-indigo-600/30 via-indigo-400/10 to-transparent max-w-5xl mt-24" />
          </div>
        </div>
        
        {/* Add significant spacing and container for the community grid */}
        <div className="mt-16">
          <CommunitiesView onCommunitySelect={handleCommunitySelect} />
        </div>
      </div>
    </div>
  )
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