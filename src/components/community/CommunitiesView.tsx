import { useState, useEffect, useCallback } from 'react'
import { Building2 } from 'lucide-react'
import { useCommunities } from '@/hooks/use-communities'
import { useCompanies } from '@/hooks/use-companies'
import { FilterBar } from './filters/FilterBar'
import { ActiveFilters } from './filters/ActiveFilters'
import { CommunitiesGrid } from './CommunitiesGrid'
import { useCommunityFilters } from '@/hooks/use-community-filters'

// Export interface for use in other components
export interface ExtendedCommunity {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  memberCount: number;
  postCount: number;
  ambassadorCount: number;
  ambassadors?: {
    id: string;
    name: string;
    image?: string;
  }[];
  tags?: string[];
  companies: {
    id: string;
    name: string;
    description: string | null;
    mission_statement: string | null;
    score: number;
    image_url: string | null;
    sector?: string;
  } | any;
  created_at?: string;
  isMember?: boolean;
  featured?: boolean;
  sectors?: string[];
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

  // Use the community filters hook
  const {
    filteredCommunities,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    selectedSectors,
    setSelectedSectors,
    showAmbassadors,
    setShowAmbassadors,
    sortOption,
    setSortOption,
    clearFilters,
    handleSectorToggle,
    hasActiveFilters,
    allSectors,
    checkAmbassadorCommunities
  } = useCommunityFilters({ communities, companies, communitiesLoading, companiesLoading })

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
    return (
      <div className="py-12 text-center bg-black/40 backdrop-blur-sm border border-zinc-800/30 rounded-xl">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-medium text-zinc-300 mb-2">Error Loading Communities</h3>
          <p className="text-sm text-zinc-500 mb-4">
            We encountered an issue loading the communities. Please try again later.
          </p>
          <button 
            className="px-4 py-2 rounded bg-black/60 text-zinc-300 border border-zinc-700/50 hover:bg-zinc-900/60"
            onClick={() => {
              fetchCommunities()
              fetchCompanies()
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Simplified isLoading determination
  const isLoading = communitiesLoading || companiesLoading

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8 items-center bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-zinc-800">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Building2 className="h-6 w-6 mr-2 text-emerald-400" />
            <span>Explore Communities</span>
          </h2>
          <p className="text-zinc-400 mt-1">Discover sustainable communities working towards a better future</p>
        </div>
        
        <FilterBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          checkAmbassadorCommunities={checkAmbassadorCommunities}
          fetchCommunities={fetchCommunities}
        />
      </div>
      
      {/* Search and filter section */}
      <div className="space-y-4">
        <FilterBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOption={sortOption}
          setSortOption={setSortOption}
          showAmbassadors={showAmbassadors}
          setShowAmbassadors={setShowAmbassadors}
          selectedSectors={selectedSectors}
          handleSectorToggle={handleSectorToggle}
          clearFilters={clearFilters}
          allSectors={allSectors}
          hasActiveFilters={hasActiveFilters}
          fullWidth
        />
        
        {/* Active filters display */}
        {hasActiveFilters && (
          <ActiveFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            showAmbassadors={showAmbassadors}
            setShowAmbassadors={setShowAmbassadors}
            selectedSectors={selectedSectors}
            handleSectorToggle={handleSectorToggle}
            clearFilters={clearFilters}
          />
        )}
      </div>
      
      {/* Results count */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-zinc-400">
          {filteredCommunities.length} {filteredCommunities.length === 1 ? 'community' : 'communities'} found
          {isLoading && ' (Loading...)'}
        </div>
        {hasActiveFilters && communities.length !== filteredCommunities.length && (
          <div className="text-sm text-zinc-500">
            Showing {filteredCommunities.length} of {communities.length}
          </div>
        )}
      </div>
      
      <CommunitiesGrid 
        filteredCommunities={filteredCommunities}
        isLoading={isLoading}
        handleCardSelect={handleCardSelect}
        clearFilters={clearFilters}
      />
    </div>
  )
} 