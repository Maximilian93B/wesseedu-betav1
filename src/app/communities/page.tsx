"use client"

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CommunitiesView } from '@/components/community/CommunitiesView'
import { motion } from 'framer-motion'
import { Globe, Users, Award, BarChart3, TrendingUp, Shield, Briefcase, ArrowLeft, Home, ChevronDown, LineChart, GanttChartSquare, Check, ArrowRight } from 'lucide-react'
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

export default function CommunitiesPage() {
  const router = useRouter()
  const { communities, loading } = useCommunities()
  
  // Extract ambassadors from all communities if available
  const ambassadors = loading ? sampleAmbassadors : getAllAmbassadors(communities || []);
  
  const handleCommunitySelect = useCallback((id: string) => {
    router.push(`/communities/${id}`)
  }, [router])

  return (
    <div 
      className="min-h-screen" 
      style={{ 
        background: 'linear-gradient(115deg, #70f570, #49c628)',
        backgroundAttachment: 'fixed'
      }}
    >
 
      {/* Navigation */}
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="bg-white rounded-xl shadow-lg p-5 mb-8 flex justify-between items-center">
          <Button
            variant="outline"
            className="text-green-800 hover:text-green-700 p-2.5 h-auto bg-white border border-green-100 transition-all duration-200 hover:bg-green-50"
            asChild
          >
            <Link href="/auth/home">
              <div className="flex items-center">
                <div className="bg-green-50 rounded-full p-1.5 mr-2.5 border border-green-100">
                  <ArrowLeft className="h-4 w-4 text-green-600" />
                </div>
                <span className="font-helvetica">Back to Dashboard</span>
              </div>
            </Link>
          </Button>
          
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-sm text-green-700 font-helvetica">WeSeedU Platform</span>
            <div className="w-1 h-4 bg-green-200 rounded-full"></div>
            <span className="text-sm font-semibold text-green-800 font-helvetica">Communities</span>
          </div>
        </div>
      </div>
    
      {/* Hero Section with Green Apple styling and more white accents */}
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mb-28">
        <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border-4 border-white relative shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-green-50 via-transparent to-transparent opacity-70"></div>
          
          {/* Green accent bar */}
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#70f570] to-[#49c628]"></div>
          
          {/* Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative z-20 px-8 py-16 sm:px-10 sm:py-20 md:p-16 lg:p-20"
          >
            <div className="max-w-3xl">
              <motion.div className="mb-3" variants={itemVariants}>
                <span className="text-green-700 text-sm tracking-wide font-medium px-3 py-1 rounded-full border border-green-200 shadow-[0_2px_10px_rgba(0,0,0,0.1)] bg-green-50 font-helvetica">
                  WeSeedU Communities
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-6 tracking-tight leading-tight font-display" 
                variants={itemVariants}
              >
                <span className="text-green-700">Seed</span> Capital,
                <span className="block">Grow Impact</span>
              </motion.h1>
              
              <motion.p 
                className="text-green-700 mb-10 leading-relaxed max-w-2xl text-lg font-body" 
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
                className="mt-16 p-6 bg-white rounded-xl shadow-lg border border-green-100" 
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
              
              {/* Feature highlights with Green + White styling */}
              <motion.div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6" variants={itemVariants}>
                <div className="p-5 rounded-lg bg-white border border-green-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-50 p-2 rounded-md mr-3">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-green-800 font-medium font-display">Regenerative Networks</p>
                  </div>
                  <p className="text-green-700 text-sm font-body">Collaborate with like-minded investors committed to positive environmental and social impact.</p>
                </div>
                
                <div className="p-5 rounded-lg bg-white border border-green-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-50 p-2 rounded-md mr-3">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-green-800 font-medium font-display">Sustainable Alpha</p>
                  </div>
                  <p className="text-green-700 text-sm font-body">Gain access to curated investment opportunities that generate returns while accelerating positive change.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* White container for Ambassador Showcase Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="bg-white rounded-xl p-10 shadow-lg mb-20 border-4 border-white">
          <AmbassadorShowcase ambassadors={ambassadors} />
        </div>
      </div>
      
      {/* Communities List Section with white background */}
      <div id="communities-list" className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-32 relative">
            {/* Green accents */}
            <div className="absolute -left-40 top-0 w-120 h-120 rounded-full bg-green-50 blur-[200px] z-0" />
            <div className="absolute right-20 bottom-0 w-120 h-120 rounded-full bg-green-50 blur-[220px] z-0" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-8 mb-16">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-r from-[#70f570] to-[#49c628] flex items-center justify-center border-4 border-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="text-base uppercase tracking-wide text-green-600 font-medium mb-3 font-helvetica">
                    Find Your Place
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-bold text-green-800 tracking-tight font-display">
                    Select Your <span className="text-green-700">Community</span>
                  </h2>
                </div>
                <div className="h-px flex-grow bg-gradient-to-r from-green-300 to-transparent ml-10"></div>
              </div>
              
              <div className="flex items-start mt-16 pl-10">
                <div className="w-1 h-28 bg-gradient-to-b from-green-500 to-transparent rounded-full mr-8 ml-10" />
                <p className="text-green-700 max-w-4xl pl-8 text-xl leading-relaxed font-body">
                  Each community is curated for specific impact areas and investment approaches. 
                  Find your niche where your capital can seed meaningful change while connecting 
                  with aligned investors pursuing returns with purpose.
                </p>
              </div>
              
              {/* Feature tags with white backgrounds */}
              <div className="flex flex-wrap gap-4 mt-20 ml-28">
                <span className="text-base text-green-700 bg-white px-6 py-2.5 rounded-full border border-green-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)] font-helvetica">
                  Sustainable Finance
                </span>
                <span className="text-base text-green-700 bg-white px-6 py-2.5 rounded-full border border-green-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)] font-helvetica">
                  Climate Tech
                </span>
                <span className="text-base text-green-700 bg-white px-6 py-2.5 rounded-full border border-green-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)] font-helvetica">
                  Regenerative Agriculture
                </span>
                <span className="text-base text-green-700 bg-white px-6 py-2.5 rounded-full border border-green-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)] font-helvetica">
                  Impact Ventures
                </span>
              </div>
              
              {/* Subtle accent line */}
              <div className="h-0.5 bg-gradient-to-r from-green-300 via-green-200/20 to-transparent max-w-5xl mt-24" />
            </div>
          </div>
          
          {/* Community grid */}
          <div className="mt-16">
            <CommunitiesView onCommunitySelect={handleCommunitySelect} />
          </div>
        </div>
      </div>
      
      {/* White footer accent */}
      <div className="w-full h-20 bg-white shadow-inner"></div>
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