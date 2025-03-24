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
  communities, 
  companies, 
  communitiesLoading, 
  companiesLoading 
}: UseCommunityFiltersProps) {
  const [filteredCommunities, setFilteredCommunities] = useState<ExtendedCommunity[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all-communities')
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])
  const [showAmbassadors, setShowAmbassadors] = useState(false)
  const [sortOption, setSortOption] = useState<'newest' | 'popular' | 'alphabetical'>('popular')

  // Get all unique sectors from communities
  const allSectors = Array.from(
    new Set(
      filteredCommunities.flatMap(community => community.sectors || [])
    )
  ).filter(Boolean) as string[]
  
  // Check if there are communities with ambassadors
  const checkAmbassadorCommunities = () => 
    filteredCommunities.some(c => (c.ambassadors && c.ambassadors.length > 0) || (c.ambassadorCount || 0) > 0)

  // Determine if there are active filters
  const hasActiveFilters: boolean = Boolean(searchQuery) || selectedSectors.length > 0 || showAmbassadors || activeTab !== 'all-communities'

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
    setSearchQuery('')
    setSelectedSectors([])
    setShowAmbassadors(false)
    setSortOption('popular')
    setActiveTab('all-communities')
  }

  // Use memoized value for filtered communities to prevent unnecessary recomputation
  const filteredAndSortedCommunities = useMemo(() => {
    // Skip if no data is available
    if (communities.length === 0 || companies.length === 0) {
      return []
    }
    
    // Create base enriched communities
    const baseEnrichedCommunities = communities.map(community => {
      const companyData = companies.find(company => company.id === community.companies?.id)
      
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
        featured: (companyData?.score || community.companies?.score || 0) > 75
      } as ExtendedCommunity
    })
    
    let results = [...baseEnrichedCommunities]
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        community => 
          community.name.toLowerCase().includes(query) || 
          (community.description && community.description.toLowerCase().includes(query)) ||
          (community.tags || []).some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    // Apply sector filters
    if (selectedSectors.length > 0) {
      results = results.filter(
        community => 
          community.sectors && 
          community.sectors.some(sector => selectedSectors.includes(sector))
      )
    }
    
    // Apply ambassador filter
    if (showAmbassadors) {
      results = results.filter(
        community => 
          (community.ambassadors && community.ambassadors.length > 0) || 
          (community.ambassadorCount !== undefined && community.ambassadorCount > 0)
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
          return b.id.localeCompare(a.id)
        })
        break
      case 'popular':
        // Since memberCount is always 0, sort by ambassador count instead
        results.sort((a, b) => (b.ambassadorCount || 0) - (a.ambassadorCount || 0))
        break
    }
    
    return results
  }, [
    communities, 
    companies, 
    searchQuery, 
    selectedSectors, 
    showAmbassadors, 
    sortOption, 
    activeTab
  ])

  // Update filteredCommunities state when memoized value changes
  useEffect(() => {
    if (!communitiesLoading && !companiesLoading) {
      setFilteredCommunities(filteredAndSortedCommunities)
    }
  }, [filteredAndSortedCommunities, communitiesLoading, companiesLoading])

  return {
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
  }
} 