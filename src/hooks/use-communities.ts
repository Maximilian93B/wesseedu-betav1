import { useState, useEffect } from 'react'
import { fetchWithAuth } from '@/lib/utils/fetchWithAuth'
import { useToast } from '@/hooks/use-toast'
import { Community } from '@/types/community'

export function useCommunities() {
  const [communities, setCommunities] = useState<Community[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchCommunities()
  }, [])

  const fetchCommunities = async (search?: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const endpoint = search 
        ? `/api/communities?search=${encodeURIComponent(search)}` 
        : '/api/communities'
      
      const response = await fetchWithAuth(endpoint)
      console.log('Raw API response from communities endpoint:', response)
      
      if (response.error || response.status >= 400) {
        throw new Error(response.error || 'Failed to fetch communities')
      }
      
      // Based on the API structure in route.ts, the response should be:
      // { data: [ array of communities with companies property nested inside ] }
      if (response.data && Array.isArray(response.data)) {
        // Direct array response
        console.log('Communities format: direct array', response.data.length)
        setCommunities(response.data)
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        // Response with nested data property (common in API responses)
        console.log('Communities format: nested data property', response.data.data.length)
        setCommunities(response.data.data)
      } else if (typeof response === 'object' && response !== null && 'data' in response && Array.isArray(response.data)) {
        // Response where data is a direct property
        console.log('Communities format: data property at root', response.data.length)
        setCommunities(response.data)
      } else {
        console.error('Unexpected API response format:', response)
        setCommunities([])
        throw new Error('Unexpected API response format')
      }
    } catch (error) {
      console.error('Error fetching communities:', error)
      setError(error instanceof Error ? error.message : 'Failed to load communities')
      toast({
        title: 'Error',
        description: 'Failed to load communities. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  // Filter communities based on criteria
  const filterCommunities = (filter: string, query?: string) => {
    let filtered = [...communities]
    
    // Apply search filter
    if (query) {
      filtered = filtered.filter(comm => 
        comm.companies.name.toLowerCase().includes(query.toLowerCase()) ||
        (comm.companies.description && comm.companies.description.toLowerCase().includes(query.toLowerCase()))
      )
    }
    
    // Apply category filter
    if (filter === 'ambassador-communities' || filter === 'with-ambassadors') {
      filtered = filtered.filter(comm => 
        comm.hasAmbassadors === true || 
        (comm.ambassadorCount !== undefined && comm.ambassadorCount > 0)
      )
    } else if (filter === 'my-communities') {
      filtered = filtered.filter(comm => comm.isMember === true)
    } else if (filter === 'high-impact') {
      filtered = filtered.filter(comm => comm.companies.score > 70)
    }
    
    return filtered
  }

  // Count communities with ambassadors
  const getAmbassadorCommunityCount = () => {
    return communities.filter(community => 
      community.hasAmbassadors === true || 
      (community.ambassadorCount !== undefined && community.ambassadorCount > 0)
    ).length
  }

  // Get total ambassador count
  const getTotalAmbassadorCount = () => {
    return communities.reduce((sum, community) => {
      const count = community.ambassadorCount !== undefined ? community.ambassadorCount : 0
      return sum + count
    }, 0)
  }

  // Check if there are any communities with ambassadors
  const hasAmbassadorCommunities = () => {
    return communities.some(c => 
      c.hasAmbassadors || 
      (c.ambassadorCount && c.ambassadorCount > 0)
    )
  }

  return {
    communities,
    loading,
    error,
    fetchCommunities,
    filterCommunities,
    getAmbassadorCommunityCount,
    getTotalAmbassadorCount,
    hasAmbassadorCommunities
  }
} 