import { useEffect, useCallback } from 'react'
import { Building2, Users, Award, TrendingUp, Filter, RotateCcw, Briefcase, Shield } from 'lucide-react'
import { useCommunities } from '@/hooks/use-communities'
import { useCompanies } from '@/hooks/use-companies'
import { CommunitiesGrid } from './CommunitiesGrid'
import { useCommunityFilters } from '@/hooks/use-community-filters'
import { Badge } from '@/components/ui/badge'
import { CommunityWithTags, Ambassador } from '@/types'
import Link from 'next/link'

export interface ExtendedCommunity extends CommunityWithTags {
  featured?: boolean
  ambassadorCount?: number
  sectors?: string[]
}

interface CommunitiesViewProps {
  onCommunitySelect: (id: string) => void
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

  // Fetch data on component mount
  useEffect(() => {
    fetchCommunities()
    fetchCompanies()
  }, [])

  // Handle card selection with useCallback
  const handleCardSelect = useCallback((id: string) => {
    onCommunitySelect(id)
  }, [onCommunitySelect])

  // Show error state if there's an issue with the API
  if ((communitiesError || companiesError) && !communitiesLoading && !companiesLoading) {
    const isUnauthorized = communitiesError === "Unauthorized" || companiesError === "Unauthorized"
    
    return (
      <div className="py-16 text-center bg-gradient-to-b from-black/90 to-zinc-900/30 border border-zinc-800/50 rounded-xl overflow-hidden">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-900/20 rounded-xl mx-auto flex items-center justify-center mb-6 border border-red-900/20 shadow-lg shadow-red-900/10">
            <Building2 className="h-8 w-8 text-red-400" />
          </div>
          <h3 className="text-xl font-medium text-white mb-3">
            {isUnauthorized ? "Authentication Required" : "Unable to Load Communities"}
          </h3>
          <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
            {isUnauthorized 
              ? "Please sign in to view communities and investment opportunities." 
              : "We encountered an issue loading the communities. Please try again in a moment."}
          </p>
          
          {isUnauthorized ? (
            <Link 
              href="/auth/signin"
              className="px-6 py-3 rounded-md bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium inline-block shadow-lg shadow-indigo-900/20"
            >
              Sign In
            </Link>
          ) : (
            <button 
              className="px-6 py-3 rounded-md bg-zinc-900 text-zinc-300 border border-zinc-700/50 hover:text-white shadow-lg shadow-black/10"
              onClick={() => {
                fetchCommunities()
                fetchCompanies()
              }}
            >
              <RotateCcw className="h-4 w-4 mr-2 inline-block" />
              Retry
            </button>
          )}
        </div>
      </div>
    )
  }

  // Simplified isLoading determination
  const isLoading = communitiesLoading || companiesLoading

  // Get stats for communities
  const totalCommunities = filteredCommunities.length;
  const ambassadorCommunities = filteredCommunities.filter(c => 
    (c.ambassadors && c.ambassadors.length > 0) || 
    (c.ambassadorCount !== undefined && c.ambassadorCount > 0)
  ).length;
  const featuredCommunities = filteredCommunities.filter(c => c.featured).length;

  return (
    <div className="space-y-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Available Communities Card */}
        <div className="bg-gradient-to-br from-zinc-900/90 to-black rounded-xl border border-zinc-800/70 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
          <div className="p-6 relative">
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-600/50" />
            
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-indigo-900/40 to-indigo-800/20 h-14 w-14 rounded-xl flex items-center justify-center mr-5 border border-indigo-700/20 shadow-md shadow-black/10">
                <Building2 className="h-6 w-6 text-indigo-400 drop-shadow-[0_1px_1px_rgba(99,102,241,0.3)]" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1 drop-shadow-sm">
                  {totalCommunities}
                </div>
                <div className="text-xs uppercase tracking-wider text-indigo-400 font-medium">Communities</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* With Ambassadors Card */}
        <div className="bg-gradient-to-br from-zinc-900/90 to-black rounded-xl border border-zinc-800/70 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
          <div className="p-6 relative">
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-amber-600/50" />
            
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-amber-900/40 to-amber-800/20 h-14 w-14 rounded-xl flex items-center justify-center mr-5 border border-amber-700/20 shadow-md shadow-black/10">
                <Award className="h-6 w-6 text-amber-400 drop-shadow-[0_1px_1px_rgba(251,191,36,0.3)]" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1 drop-shadow-sm">
                  {ambassadorCommunities}
                </div>
                <div className="text-xs uppercase tracking-wider text-amber-400 font-medium">With Ambassadors</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* High Performance Card */}
        <div className="bg-gradient-to-br from-zinc-900/90 to-black rounded-xl border border-zinc-800/70 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
          <div className="p-6 relative">
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600/50" />
            
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 h-14 w-14 rounded-xl flex items-center justify-center mr-5 border border-emerald-700/20 shadow-md shadow-black/10">
                <TrendingUp className="h-6 w-6 text-emerald-400 drop-shadow-[0_1px_1px_rgba(52,211,153,0.3)]" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1 drop-shadow-sm">
                  {featuredCommunities}
                </div>
                <div className="text-xs uppercase tracking-wider text-emerald-400 font-medium">Premium</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter and results indicator */}
      <div className="flex items-center justify-between bg-gradient-to-r from-black/40 to-zinc-900/30 rounded-lg p-4 border border-zinc-800/50 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.05)]">
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-indigo-400 mr-3 drop-shadow-sm" />
          <Badge className="bg-indigo-900/30 text-indigo-400 border border-indigo-700/30 py-1.5 px-4 rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            <Users className="h-3.5 w-3.5 mr-2" />
            {filteredCommunities.length} {filteredCommunities.length === 1 ? 'community' : 'communities'}
          </Badge>
          {isLoading && (
            <div className="ml-4 text-sm text-zinc-500 flex items-center">
              <div className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse mr-2 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
              Loading...
            </div>
          )}
        </div>
        
        <div className="text-xs text-zinc-500">
          <span className="text-zinc-400 font-medium">WeSeedU</span> Investment Communities
        </div>
      </div>
      
      {/* Communities Grid */}
      <CommunitiesGrid 
        filteredCommunities={filteredCommunities}
        isLoading={isLoading}
        handleCardSelect={handleCardSelect}
        clearFilters={clearFilters}
      />
    </div>
  )
} 