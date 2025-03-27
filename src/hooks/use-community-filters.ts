import { useState, useEffect, useMemo } from 'react'
import { ExtendedCommunity } from '@/components/community/CommunitiesView'
import { Community } from '@/types/community'
import { Company } from '@/hooks/use-companies'

interface UseCommunityFiltersProps {
  communities: Community[]
  companies: Company[]
  communitiesLoading: boolean
  companiesLoading: boolean
}

export function useCommunityFilters({ 
  communities = [], 
  companies = [], 
  communitiesLoading, 
  companiesLoading 
}: UseCommunityFiltersProps) {
  const [filteredCommunities, setFilteredCommunities] = useState<ExtendedCommunity[]>([])
  const [activeTab, setActiveTab] = useState('all-communities')
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<'newest' | 'popular' | 'alphabetical'>('popular')

  // Determine if there are active filters
  const hasActiveFilters: boolean = selectedSectors.length > 0 || activeTab !== 'all-communities'

  // Handle sector toggle
  const handleSectorToggle = (sector: string) => {
    setSelectedSectors(prev => 
      prev.includes(sector) 
        ? prev.filter(s => s !== sector)
        : [...prev, sector]
    )
  }
  
  // Clear all filters and reset to initial state
  const clearFilters = () => {
    setSelectedSectors([])
    setSortOption('popular')
    setActiveTab('all-communities')
  }

  // Create enriched communities data
  const enhancedCommunities = useMemo(() => {
    // Handle empty data cases
    if (!communities?.length || !companies?.length) {
      return []
    }
    
    return communities.map(community => {
      // Handle potential undefined data
      if (!community || !community.companies) {
        return null
      }
      
      const companyData = companies.find(company => company?.id === community.companies?.id)
      
      return {
        id: community.id,
        name: community.companies?.name || 'Unnamed Community',
        slug: community.id,
        description: community.companies?.description || community.companies?.mission_statement || '',
        image: community.companies?.image_url || undefined,
        memberCount: 0,
        postCount: 0,
        ambassadorCount: community.ambassadorCount || 0,
        isMember: community.isMember || false,
        created_at: community.created_at,
        ambassadors: community.ambassadors || [],
        companies: companyData || community.companies,
        tags: [
          companyData?.sector || 'Sustainable Business',
          'Sustainable Investment'
        ].filter(Boolean) as string[],
        sectors: [(companyData?.sector || 'Sustainable Business')].filter(Boolean) as string[],
        featured: false
      } as ExtendedCommunity
    }).filter(Boolean) as ExtendedCommunity[] // Filter out any null values
  }, [communities, companies])

  // Apply filters and sorting
  const filteredAndSortedCommunities = useMemo(() => {
    let results = [...enhancedCommunities]
    
    // Apply sector filters
    if (selectedSectors.length > 0) {
      results = results.filter(
        community => 
          community.sectors && 
          community.sectors.some(sector => selectedSectors.includes(sector))
      )
    }
    
    // Apply tab filters
    if (activeTab === 'my-communities') {
      results = results.filter(community => community.isMember)
    } else if (activeTab === 'ambassador-communities') {
      results = results.filter(
        community => 
          (community.ambassadors && community.ambassadors.length > 0) || 
          (community.ambassadorCount !== undefined && community.ambassadorCount > 0)
      )
    }
    
    // Apply sorting
    switch(sortOption) {
      case 'alphabetical':
        results.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
        results.sort((a, b) => {
          if (a.created_at && b.created_at) {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          }
          return 0
        })
        break
      case 'popular':
        // Sort by ambassador count
        results.sort((a, b) => (b.ambassadorCount || 0) - (a.ambassadorCount || 0))
        break
    }
    
    return results
  }, [
    enhancedCommunities, 
    selectedSectors, 
    sortOption, 
    activeTab
  ])

  // Update filteredCommunities state when memoized value changes
  useEffect(() => {
    if (!communitiesLoading && !companiesLoading) {
      setFilteredCommunities(filteredAndSortedCommunities)
    }
  }, [filteredAndSortedCommunities, communitiesLoading, companiesLoading])

  // Get all unique sectors from communities
  const allSectors = useMemo(() => {
    return Array.from(
      new Set(
        enhancedCommunities.flatMap(community => community.sectors || [])
      )
    ).filter(Boolean) as string[]
  }, [enhancedCommunities])

  // Check if there are communities with ambassadors
  const checkAmbassadorCommunities = () => 
    filteredCommunities.some(c => 
      (c.ambassadors && c.ambassadors.length > 0) || 
      (c.ambassadorCount || 0) > 0
    )

  return {
    filteredCommunities,
    activeTab,
    setActiveTab,
    selectedSectors,
    setSelectedSectors,
    sortOption,
    setSortOption,
    clearFilters,
    handleSectorToggle,
    hasActiveFilters,
    allSectors,
    checkAmbassadorCommunities
  }
} 