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
      
      if (response.error || response.status >= 400) {
        throw new Error('Failed to fetch communities')
      }
      
      // The API consistently returns data in the format { data: [...communities] }
      if (response.data && Array.isArray(response.data)) {
        setCommunities(response.data)
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setCommunities(response.data.data)
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