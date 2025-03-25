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
      <div className="py-16 text-center bg-gradient-to-b from-white to-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-md">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-50 rounded-xl mx-auto flex items-center justify-center mb-6 border border-red-200 shadow-sm">
            <Building2 className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-xl font-medium text-slate-800 mb-3">
            {isUnauthorized ? "Authentication Required" : "Unable to Load Communities"}
          </h3>
          <p className="text-slate-600 mb-8 max-w-sm mx-auto">
            {isUnauthorized 
              ? "Please sign in to view communities and investment opportunities." 
              : "We encountered an issue loading the communities. Please try again in a moment."}
          </p>
          
          {isUnauthorized ? (
            <Link 
              href="/auth/signin"
              className="px-6 py-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium inline-block shadow-sm"
            >
              Sign In
            </Link>
          ) : (
            <button 
              className="px-6 py-3 rounded-md bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm"
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
        <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden">
          <div className="p-6 relative">
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500/70" />
            
            <div className="flex items-center">
              <div className="bg-orange-50 h-14 w-14 rounded-xl flex items-center justify-center mr-5 border border-orange-200 shadow-sm">
                <Building2 className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-800 mb-1">
                  {totalCommunities}
                </div>
                <div className="text-xs uppercase tracking-wider text-orange-600 font-medium">Communities</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* With Ambassadors Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden">
          <div className="p-6 relative">
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500/70" />
            
            <div className="flex items-center">
              <div className="bg-orange-50 h-14 w-14 rounded-xl flex items-center justify-center mr-5 border border-orange-200 shadow-sm">
                <Award className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-800 mb-1">
                  {ambassadorCommunities}
                </div>
                <div className="text-xs uppercase tracking-wider text-orange-600 font-medium">With Ambassadors</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Premium Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden">
          <div className="p-6 relative">
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500/70" />
            
            <div className="flex items-center">
              <div className="bg-orange-50 h-14 w-14 rounded-xl flex items-center justify-center mr-5 border border-orange-200 shadow-sm">
                <TrendingUp className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-800 mb-1">
                  {featuredCommunities}
                </div>
                <div className="text-xs uppercase tracking-wider text-orange-600 font-medium">Premium</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter and results indicator */}
      <div className="flex items-center justify-between bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-orange-500 mr-3" />
          <Badge className="bg-orange-50 text-orange-600 border border-orange-200 py-1.5 px-4 rounded-md shadow-sm">
            <Users className="h-3.5 w-3.5 mr-2" />
            {filteredCommunities.length} {filteredCommunities.length === 1 ? 'community' : 'communities'}
          </Badge>
          {isLoading && (
            <div className="ml-4 text-sm text-slate-600 flex items-center">
              <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse mr-2 shadow-sm"></div>
              Loading...
            </div>
          )}
        </div>
        
        <div className="text-xs text-slate-500">
          <span className="text-slate-700 font-medium">WeSeedU</span> Investment Communities
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