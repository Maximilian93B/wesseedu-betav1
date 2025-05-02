import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchWithAuth } from '@/lib/utils/fetchWithAuth';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';

export interface Company {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  mission_statement?: string;
  image_url?: string;
  logo_url?: string;
  banner_url?: string;
  website?: string;
  score: number;
  sector?: string;
  founded_year?: number;
  headquarters?: string;
  employee_count?: number;
  impact_metrics?: {
    carbon_reduction?: number;
    sustainability_score?: number;
    social_impact?: number;
  };
  financial_metrics?: {
    market_cap?: number;
    annual_revenue?: number;
    growth_rate?: number;
  };
  is_saved?: boolean;
}

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const fetchAttemptedRef = useRef(false);
  const isFetchingRef = useRef(false);
  const { user, loading: authLoading, isAuthenticated } = useAuth();

  const fetchCompanies = useCallback(async (search?: string, filters?: Record<string, any>) => {
    // Don't try to fetch if we know we're not authenticated
    if (!isAuthenticated && !authLoading) {
      console.log('Not authenticated, skipping companies fetch');
      setLoading(false);
      setError("Unauthorized");
      return;
    }
    
    // Prevent concurrent fetches and limit retry attempts
    if (isFetchingRef.current) {
      console.log('Companies fetch already in progress, skipping');
      return;
    }
    
    // Only attempt to fetch once if unauthorized
    if (error === "Unauthorized" && fetchAttemptedRef.current) {
      console.log('Already attempted companies fetch with unauthorized result, skipping');
      return;
    }
    
    isFetchingRef.current = true;
    setLoading(true);
    setError(null);
    
    try {
      let endpoint = '/api/companies';
      const queryParams = new URLSearchParams();
      
      if (search) {
        queryParams.append('search', search);
      }
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }
      
      const queryString = queryParams.toString();
      if (queryString) {
        endpoint += `?${queryString}`;
      }
      
      const response = await fetchWithAuth(endpoint);
      
      if (response.error) {
        // Pass through the exact error message from fetchWithAuth
        setError(response.error);
        
        // Only show toast for non-auth errors to avoid duplicate messages
        if (response.error !== "Unauthorized") {
          toast({
            title: 'Error',
            description: 'Failed to load companies. Please try again.',
            variant: 'destructive',
          });
        } else {
          // Mark that we've attempted a fetch that resulted in unauthorized
          fetchAttemptedRef.current = true;
          console.log('Unauthorized companies fetch attempt recorded');
        }
        return;
      }
      
      // Reset the fetch attempted flag on successful request
      fetchAttemptedRef.current = false;
      
      // Handle different response formats
      if (response.data && Array.isArray(response.data)) {
        setCompanies(response.data);
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setCompanies(response.data.data);
      } else {
        console.error('Unexpected API response format:', response);
        setCompanies([]);
        setError('Unexpected API response format');
        toast({
          title: 'Error',
          description: 'Received unexpected data format from the server.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setError(error instanceof Error ? error.message : 'Failed to load companies');
      toast({
        title: 'Error',
        description: 'Failed to load companies. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [toast, error, isAuthenticated, authLoading]);

  const fetchCompanyById = async (id: string) => {
    // Skip if not authenticated
    if (!isAuthenticated && !authLoading) {
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchWithAuth(`/api/companies/${id}`);
      
      if (response.error) {
        // Pass through the exact error message from fetchWithAuth
        setError(response.error);
        
        // Only show toast for non-auth errors to avoid duplicate messages
        if (response.error !== "Unauthorized") {
          toast({
            title: 'Error',
            description: `Failed to load company details. Please try again.`,
            variant: 'destructive',
          });
        }
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching company with ID ${id}:`, error);
      setError(error instanceof Error ? error.message : `Failed to load company with ID ${id}`);
      toast({
        title: 'Error',
        description: `Failed to load company details. Please try again.`,
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const saveCompany = async (companyId: string) => {
    // Skip if not authenticated 
    if (!isAuthenticated) {
      toast({
        title: 'Error',
        description: 'You must be signed in to save companies.',
        variant: 'destructive',
      });
      return false;
    }
    
    try {
      const response = await fetchWithAuth('/api/companies/saveCompany', {
        method: 'POST',
        body: JSON.stringify({ companyId }),
      });
      
      if (response.error) {
        // Pass through the exact error message from fetchWithAuth
        if (response.error !== "Unauthorized") {
          toast({
            title: 'Error',
            description: 'Failed to save company. Please try again.',
            variant: 'destructive',
          });
        }
        return false;
      }
      
      // Update the local state to reflect that the company is saved
      setCompanies(prevCompanies => 
        prevCompanies.map(company => 
          company.id === companyId ? { ...company, is_saved: true } : company
        )
      );
      
      toast({
        title: 'Success',
        description: 'Company added to saved companies.',
        variant: 'default',
      });
      
      return true;
    } catch (error) {
      console.error('Error saving company:', error);
      toast({
        title: 'Error',
        description: 'Failed to save company. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const unsaveCompany = async (companyId: string) => {
    // Skip if not authenticated
    if (!isAuthenticated) {
      toast({
        title: 'Error',
        description: 'You must be signed in to manage saved companies.',
        variant: 'destructive',
      });
      return false;
    }
    
    try {
      const response = await fetchWithAuth(`/api/companies/savedCompanies/${companyId}`, {
        method: 'DELETE',
      });
      
      if (response.error) {
        // Pass through the exact error message from fetchWithAuth
        if (response.error !== "Unauthorized") {
          toast({
            title: 'Error',
            description: 'Failed to remove company from saved list. Please try again.',
            variant: 'destructive',
          });
        }
        return false;
      }
      
      // Update the local state to reflect that the company is no longer saved
      setCompanies(prevCompanies => 
        prevCompanies.map(company => 
          company.id === companyId ? { ...company, is_saved: false } : company
        )
      );
      
      toast({
        title: 'Success',
        description: 'Company removed from saved companies.',
        variant: 'default',
      });
      
      return true;
    } catch (error) {
      console.error('Error removing saved company:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove company from saved list. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const fetchSavedCompanies = async () => {
    // Skip if not authenticated
    if (!isAuthenticated && !authLoading) {
      setLoading(false);
      setError("Unauthorized");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchWithAuth('/api/companies/savedCompanies');
      
      if (response.error) {
        // Pass through the exact error message from fetchWithAuth
        setError(response.error);
        
        // Only show toast for non-auth errors
        if (response.error !== "Unauthorized") {
          toast({
            title: 'Error',
            description: 'Failed to load saved companies. Please try again.',
            variant: 'destructive',
          });
        }
        return;
      }
      
      // Handle different response formats
      if (response.data && Array.isArray(response.data)) {
        setCompanies(response.data);
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setCompanies(response.data.data);
      } else {
        console.error('Unexpected API response format:', response);
        setCompanies([]);
        setError('Unexpected API response format');
        toast({
          title: 'Error',
          description: 'Received unexpected data format from the server.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching saved companies:', error);
      setError(error instanceof Error ? error.message : 'Failed to load saved companies');
      toast({
        title: 'Error',
        description: 'Failed to load saved companies. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter companies based on criteria
  const filterCompanies = (filter: Record<string, any>, query?: string) => {
    let filtered = [...companies];
    
    // Apply search filter
    if (query) {
      const searchLower = query.toLowerCase();
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(searchLower) ||
        (company.description && company.description.toLowerCase().includes(searchLower)) ||
        (company.mission_statement && company.mission_statement.toLowerCase().includes(searchLower)) ||
        (company.sector && company.sector.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply score filter
    if (filter.minScore !== undefined) {
      filtered = filtered.filter(company => company.score >= filter.minScore);
    }
    
    // Apply sector filter
    if (filter.sector) {
      filtered = filtered.filter(company => 
        company.sector && company.sector.toLowerCase() === filter.sector.toLowerCase()
      );
    }
    
    // Apply other filters as needed
    if (filter.savedOnly) {
      filtered = filtered.filter(company => company.is_saved);
    }
    
    return filtered;
  };

  return {
    companies,
    loading,
    error,
    fetchCompanies,
    fetchCompanyById,
    saveCompany,
    unsaveCompany,
    fetchSavedCompanies,
    filterCompanies
  };
} 