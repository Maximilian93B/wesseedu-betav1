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
      <div 
        className="py-16 text-center border border-slate-200 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative"
        style={{ 
          backgroundImage: "linear-gradient(to right top, #ffffff, #f6f6ff, #eaefff, #dae8ff, #c8e2ff)" 
        }}
      >
        {/* Subtle texture pattern for depth */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 20px 20px, black 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }} 
        />
        
        {/* Top edge shadow line for definition */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30"></div>
        
        {/* Inner shadow effects for depth */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50/50 to-transparent"></div>
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl mx-auto flex items-center justify-center mb-6 border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <Building2 className="h-8 w-8 text-slate-600" />
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
              className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium inline-block shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out hover:translate-y-[-2px]"
            >
              Sign In
            </Link>
          ) : (
            <button 
              className="px-6 py-3 rounded-lg bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out hover:translate-y-[-2px]"
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
        <div 
          className="rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative"
          style={{ 
            backgroundImage: "linear-gradient(to right top, #ffffff, #f6f6ff, #eaefff, #dae8ff, #c8e2ff)" 
          }}
        >
          {/* Subtle texture pattern for depth */}
          <div className="absolute inset-0 opacity-[0.02]" 
            style={{ 
              backgroundImage: `radial-gradient(circle at 20px 20px, black 1px, transparent 0)`,
              backgroundSize: "40px 40px"
            }} 
          />
          
          {/* Top edge shadow line for definition */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30"></div>
          
          <div className="p-6 relative z-10">
            <div className="flex items-center">
              <div className="bg-white h-14 w-14 rounded-xl flex items-center justify-center mr-5 border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <Building2 className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-800 mb-1">
                  {totalCommunities}
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-600 font-medium">Communities</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* With Ambassadors Card */}
        <div 
          className="rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative"
          style={{ 
            backgroundImage: "linear-gradient(to right top, #ffffff, #f6f6ff, #eaefff, #dae8ff, #c8e2ff)" 
          }}
        >
          {/* Subtle texture pattern for depth */}
          <div className="absolute inset-0 opacity-[0.02]" 
            style={{ 
              backgroundImage: `radial-gradient(circle at 20px 20px, black 1px, transparent 0)`,
              backgroundSize: "40px 40px"
            }} 
          />
          
          {/* Top edge shadow line for definition */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30"></div>
          
          <div className="p-6 relative z-10">
            <div className="flex items-center">
              <div className="bg-white h-14 w-14 rounded-xl flex items-center justify-center mr-5 border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <Award className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-800 mb-1">
                  {ambassadorCommunities}
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-600 font-medium">With Ambassadors</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Premium Card */}
        <div 
          className="rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative"
          style={{ 
            backgroundImage: "linear-gradient(to right top, #ffffff, #f6f6ff, #eaefff, #dae8ff, #c8e2ff)" 
          }}
        >
          {/* Subtle texture pattern for depth */}
          <div className="absolute inset-0 opacity-[0.02]" 
            style={{ 
              backgroundImage: `radial-gradient(circle at 20px 20px, black 1px, transparent 0)`,
              backgroundSize: "40px 40px"
            }} 
          />
          
          {/* Top edge shadow line for definition */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30"></div>
          
          <div className="p-6 relative z-10">
            <div className="flex items-center">
              <div className="bg-white h-14 w-14 rounded-xl flex items-center justify-center mr-5 border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <TrendingUp className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-800 mb-1">
                  {featuredCommunities}
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-600 font-medium">Premium</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter and results indicator */}
      <div className="flex items-center justify-between bg-white rounded-lg p-4 border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-slate-600 mr-3" />
          <Badge className="bg-slate-50 text-slate-700 border border-slate-200 py-1.5 px-4 rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <Users className="h-3.5 w-3.5 mr-2" />
            {filteredCommunities.length} {filteredCommunities.length === 1 ? 'community' : 'communities'}
          </Badge>
          {isLoading && (
            <div className="ml-4 text-sm text-slate-600 flex items-center">
              <div className="h-2 w-2 rounded-full bg-slate-600 animate-pulse mr-2"></div>
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