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

  const fetchCommunities = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetchWithAuth('/api/communities')
      
      if (response.error) {
        // Pass through the exact error message from fetchWithAuth
        setError(response.error)
        
        // Only show toast for non-auth errors to avoid duplicate messages
        if (response.error !== "Unauthorized") {
          toast({
            title: 'Error',
            description: 'Failed to load communities. Please try again.',
            variant: 'destructive',
          })
        }
        return
      }
      
      if (Array.isArray(response.data)) {
        setCommunities(response.data)
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        setCommunities(response.data.data)
      } else {
        console.error('Unexpected API response format:', response)
        setCommunities([])
        setError('Unexpected API response format')
        toast({
          title: 'Error',
          description: 'Received unexpected data format from the server.',
          variant: 'destructive',
        })
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

  // Get communities that have ambassadors
  const getAmbassadorCommunities = () => {
    return communities.filter(community => 
      community.hasAmbassadors === true || 
      (community.ambassadorCount !== undefined && community.ambassadorCount > 0)
    )
  }

  // Get member communities
  const getMemberCommunities = () => {
    return communities.filter(community => community.isMember === true)
  }

  // Get high impact communities
  const getHighImpactCommunities = () => {
    return communities.filter(community => community.companies.score > 70)
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
    getAmbassadorCommunities,
    getMemberCommunities,
    getHighImpactCommunities,
    hasAmbassadorCommunities
  }
} 