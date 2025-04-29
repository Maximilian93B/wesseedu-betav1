import { useEffect, useCallback } from 'react'
import { Building2, Users, Award, TrendingUp, Filter, RotateCcw, Briefcase, Shield } from 'lucide-react'
import { useCommunities } from '@/hooks/use-communities'
import { useCompanies } from '@/hooks/use-companies'
import { CommunitiesGrid } from './CommunitiesGrid'
import { useCommunityFilters } from '@/hooks/use-community-filters'
import { Badge } from '@/components/ui/badge'
import { CommunityWithTags, Ambassador } from '@/types'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useNavigation } from '@/context/NavigationContext'

export interface ExtendedCommunity extends CommunityWithTags {
  featured?: boolean
  ambassadorCount?: number
  sectors?: string[]
}

interface CommunitiesViewProps {
  onCommunitySelect: (id: string) => void
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

export function CommunitiesView({ onCommunitySelect }: CommunitiesViewProps) {
  const { 
    communities, 
    loading: communitiesLoading,
    error: communitiesError,
    fetchCommunities,
    hasAmbassadorCommunities
  } = useCommunities()
  
  const {
    companies,
    loading: companiesLoading,
    error: companiesError,
    fetchCompanies
  } = useCompanies()

  const { setIsTransitioning } = useNavigation()

  // Use the community filters hook with empty search query
  const {
    filteredCommunities,
    clearFilters,
  } = useCommunityFilters({ 
    communities, 
    companies, 
    communitiesLoading, 
    companiesLoading 
  })

  // Simplified isLoading determination - moved up before any conditional returns
  const isLoading = communitiesLoading || companiesLoading

  // Fetch data on component mount
  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      if (isMounted) {
        fetchCommunities();
        fetchCompanies();
      }
    };
    
    loadData();
    
    // Clean up transitioning state when component unmounts
    return () => {
      isMounted = false;
      setIsTransitioning(false);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally omitting dependencies to prevent infinite loop

  // When data loads, clear transitioning state - moved up before any conditional returns
  useEffect(() => {
    if (!isLoading && filteredCommunities.length > 0) {
      setIsTransitioning(false);
    }
  }, [isLoading, filteredCommunities.length, setIsTransitioning]);

  // Handle card selection with useCallback and transition state
  const handleCardSelect = useCallback((id: string) => {
    setIsTransitioning(true)
    onCommunitySelect(id)
  }, [onCommunitySelect, setIsTransitioning])

  // Show error state if there's an issue with the API
  if ((communitiesError || companiesError) && !communitiesLoading && !companiesLoading) {
    const isUnauthorized = communitiesError === "Unauthorized" || companiesError === "Unauthorized"
    
    return (
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full bg-white min-h-screen rounded-t-[2rem] sm:rounded-t-[2.5rem] md:rounded-t-[3rem] shadow-[0_-8px_30px_rgba(0,0,0,0.15)] border-t border-white/20 overflow-hidden"
        onAnimationComplete={() => setIsTransitioning(false)}
      >
        <div className="relative w-full">
          <div className="px-3 py-4 pt-6 sm:pt-8 md:pt-10 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 space-y-10">
            <motion.div 
              variants={itemVariants}
              className="w-16 h-16 bg-gradient-to-r from-[#70f570] to-[#49c628] rounded-2xl mx-auto flex items-center justify-center mb-6 border-4 border-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
            >
              <Building2 className="h-8 w-8 text-white" />
            </motion.div>
            <motion.h3 
              variants={itemVariants}
              className="text-xl sm:text-2xl font-bold text-green-800 mb-3 font-display text-center tracking-tight"
            >
              {isUnauthorized ? "Authentication Required" : "Unable to Load Communities"}
            </motion.h3>
            <motion.p 
              variants={itemVariants}
              className="text-green-700 mb-8 max-w-sm mx-auto font-body text-center leading-relaxed"
            >
              {isUnauthorized 
                ? "Please sign in to view communities and investment opportunities." 
                : "We encountered an issue loading the communities. Please try again in a moment."}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex justify-center">
              {isUnauthorized ? (
                <Link 
                  href="/auth/signin"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold inline-block shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out hover:translate-y-[-2px] font-helvetica"
                >
                  Sign In
                </Link>
              ) : (
                <motion.button 
                  variants={itemVariants}
                  className="px-6 py-3 rounded-lg bg-white text-green-700 border border-green-200 hover:bg-green-50 shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out hover:translate-y-[-2px] font-helvetica"
                  onClick={() => {
                    fetchCommunities()
                    fetchCompanies()
                  }}
                >
                  <RotateCcw className="h-4 w-4 mr-2 inline-block" />
                  Retry
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Get stats for communities
  const totalCommunities = filteredCommunities.length;
  const ambassadorCommunities = filteredCommunities.filter(c => 
    (c.ambassadors && c.ambassadors.length > 0) || 
    (c.ambassadorCount !== undefined && c.ambassadorCount > 0)
  ).length;
  const featuredCommunities = filteredCommunities.filter(c => c.featured).length;

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full bg-white min-h-screen rounded-t-[2rem] sm:rounded-t-[2.5rem] md:rounded-t-[3rem] shadow-[0_-8px_30px_rgba(0,0,0,0.15)] border-t border-white/20 overflow-hidden"
      onAnimationComplete={() => setIsTransitioning(false)}
    >
      <div className="relative w-full">
        <div className="px-3 py-4 pt-6 sm:pt-8 md:pt-10 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 space-y-10">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {/* Available Communities Card */}
            <motion.div 
              variants={itemVariants}
              className="rounded-xl sm:rounded-2xl border border-green-100 shadow-[0_8px_30px_rgba(0,0,0,0.1)] overflow-hidden relative bg-white"
            >
              <div className="p-6 relative z-10">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-[#70f570] to-[#49c628] h-14 w-14 rounded-xl flex items-center justify-center mr-5 border-4 border-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-green-800 mb-1 font-helvetica">
                      {totalCommunities}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-green-700 font-medium font-helvetica">Communities</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* With Ambassadors Card */}
            <motion.div 
              variants={itemVariants}
              className="rounded-xl sm:rounded-2xl border border-green-100 shadow-[0_8px_30px_rgba(0,0,0,0.1)] overflow-hidden relative bg-white"
            >
              <div className="p-6 relative z-10">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-[#70f570] to-[#49c628] h-14 w-14 rounded-xl flex items-center justify-center mr-5 border-4 border-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-green-800 mb-1 font-helvetica">
                      {ambassadorCommunities}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-green-700 font-medium font-helvetica">With Ambassadors</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Premium Card */}
            <motion.div 
              variants={itemVariants}
              className="rounded-xl sm:rounded-2xl border border-green-100 shadow-[0_8px_30px_rgba(0,0,0,0.1)] overflow-hidden relative bg-white"
            >
              <div className="p-6 relative z-10">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-[#70f570] to-[#49c628] h-14 w-14 rounded-xl flex items-center justify-center mr-5 border-4 border-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-green-800 mb-1 font-helvetica">
                      {featuredCommunities}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-green-700 font-medium font-helvetica">Premium</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Filter and results indicator */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-between bg-white rounded-xl p-5 border border-green-100 shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
          >
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-[#70f570] to-[#49c628] p-2 rounded-md mr-3 shadow-sm">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <Badge className="bg-green-50 text-green-700 border border-green-100 py-1.5 px-4 rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                <Users className="h-3.5 w-3.5 mr-2 text-green-600" />
                {filteredCommunities.length} {filteredCommunities.length === 1 ? 'community' : 'communities'}
              </Badge>
              {isLoading && (
                <div className="ml-4 text-sm text-green-700 flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
                  Loading...
                </div>
              )}
            </div>
            
            <div className="text-xs text-green-600 font-helvetica">
              <span className="text-green-800 font-medium">WeSeedU</span> Investment Communities
            </div>
          </motion.div>
          
          {/* Communities Grid */}
          <CommunitiesGrid 
            filteredCommunities={filteredCommunities}
            isLoading={isLoading}
            handleCardSelect={handleCardSelect}
            clearFilters={clearFilters}
          />
        </div>
      </div>
    </motion.div>
  )
} 