import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchWithAuth } from '@/lib/utils/fetchWithAuth'
import { useToast } from '@/hooks/use-toast'
import { Community } from '@/types/community'
import { useAuth } from '@/hooks/use-auth'

export function useCommunities() {
  const [communities, setCommunities] = useState<Community[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const fetchAttemptedRef = useRef(false)
  const isFetchingRef = useRef(false)
  const { user, loading: authLoading, isAuthenticated } = useAuth()

  // Use useCallback to memoize the fetchCommunities function
  const fetchCommunities = useCallback(async () => {
    // Don't try to fetch if we know we're not authenticated
    if (!isAuthenticated && !authLoading) {
      console.log('Not authenticated, skipping communities fetch');
      setLoading(false);
      setError("Unauthorized");
      return;
    }
    
    // Prevent concurrent fetches and limit retry attempts
    if (isFetchingRef.current) {
      console.log('Fetch already in progress, skipping');
      return;
    }
    
    // Only attempt to fetch once if unauthorized
    if (error === "Unauthorized" && fetchAttemptedRef.current) {
      console.log('Already attempted fetch with unauthorized result, skipping');
      return;
    }
    
    try {
      isFetchingRef.current = true;
      setLoading(true)
      setError(null)
      
      console.log('useCommunities: Fetching communities data...');
      const response = await fetchWithAuth('/api/communities')
      
      console.log('useCommunities: API response received:', 
        JSON.stringify({
          error: response.error,
          status: response.status,
          dataPresent: !!response.data,
          dataType: response.data ? typeof response.data : 'undefined',
          isArray: response.data ? Array.isArray(response.data) : false,
          dataLength: response.data && Array.isArray(response.data) ? response.data.length : 'n/a',
          nestedDataPresent: response.data?.data ? true : false,
          nestedDataType: response.data?.data ? typeof response.data.data : 'undefined',
          nestedIsArray: response.data?.data ? Array.isArray(response.data.data) : false,
          nestedDataLength: response.data?.data && Array.isArray(response.data.data) ? response.data.data.length : 'n/a'
        }, null, 2)
      );
      
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
        } else {
          // Mark that we've attempted a fetch that resulted in unauthorized
          fetchAttemptedRef.current = true;
          console.log('Unauthorized fetch attempt recorded');
        }
        return
      }
      
      // Reset the fetch attempted flag on successful request
      fetchAttemptedRef.current = false;
      
      // Handle different API response formats
      if (Array.isArray(response.data)) {
        console.log(`useCommunities: Setting ${response.data.length} communities from direct array`);
        setCommunities(response.data);
      } 
      else if (response.data?.data && Array.isArray(response.data.data)) {
        console.log(`useCommunities: Setting ${response.data.data.length} communities from nested data.data array`);
        setCommunities(response.data.data);
      }
      // Handle empty array in API response data field
      else if (response.data && Object.prototype.hasOwnProperty.call(response.data, 'data') && response.data.data === null) {
        console.log('useCommunities: API returned null data, setting empty communities array');
        setCommunities([]);
      }
      // Handle empty array directly in data field by checking its length 
      else if (response.data && Object.prototype.hasOwnProperty.call(response.data, 'data') && Array.isArray(response.data.data) && response.data.data.length === 0) {
        console.log('useCommunities: API returned empty array in data, setting empty communities array');
        setCommunities([]);
      }
      else {
        console.error('useCommunities: Unexpected API response format:', response);
        
        // Try to extract any available communities data 
        if (response.data && typeof response.data === 'object') {
          console.log('useCommunities: Attempting to extract data from response object');
          
          const possibleData = Object.values(response.data).find(value => 
            Array.isArray(value) && value.length > 0 && value[0].id
          );
          
          if (possibleData && Array.isArray(possibleData)) {
            console.log(`useCommunities: Found potential communities array with ${possibleData.length} items`);
            setCommunities(possibleData as Community[]);
            return;
          }
        }
        
        console.log('useCommunities: No valid communities data found, setting empty array');
        setCommunities([]);
        setError('Unexpected API response format');
        toast({
          title: 'Data Format Error',
          description: 'Received unexpected data format from the server.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('useCommunities: Error fetching communities:', error)
      setError(error instanceof Error ? error.message : 'Failed to load communities')
      setCommunities([]) // Ensure we clear any stale data
      toast({
        title: 'Error',
        description: 'Failed to load communities. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
      isFetchingRef.current = false;
    }
  }, [toast, error, isAuthenticated, authLoading]); // Updated dependencies

  // Add debug logging when communities state changes
  useEffect(() => {
    console.log(`useCommunities: State updated - ${communities.length} communities, loading: ${loading}, error: ${error || 'none'}`);
  }, [communities, loading, error]);

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
    return communities.filter(community => 
      community.companies && typeof community.companies === 'object' && community.companies.score > 70
    )
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