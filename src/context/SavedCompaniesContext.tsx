'use client';

import { createContext, useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/utils/fetchWithAuth';
import { useAuth } from '@/hooks/use-auth';

interface SavedCompaniesContextType {
  savedCompanyIds: string[];
  addSavedCompany: (id: string) => void;
  removeSavedCompany: (id: string) => void;
  isCompanySaved: (id: string) => boolean;
  refreshSavedCompanies: () => Promise<void>;
}

export const SavedCompaniesContext = createContext<SavedCompaniesContextType>({
  savedCompanyIds: [],
  addSavedCompany: () => {},
  removeSavedCompany: () => {},
  isCompanySaved: () => false,
  refreshSavedCompanies: async () => {},
});

export function SavedCompaniesProvider({ children }: { children: React.ReactNode }) {
  const [savedCompanyIds, setSavedCompanies] = useState<string[]>([]);
  const { user, loading: authLoading } = useAuth();

  const refreshSavedCompanies = async () => {
    if (!user?.id) {
      console.log('SavedCompaniesContext: No user ID, skipping refresh');
      return;
    }
    
    try {
      console.log('SavedCompaniesContext: Fetching watchlist data for user', user.id);
      
      // First try to get data from the profile API which includes saved companies
      const profileResponse = await fetchWithAuth('/api/auth/profile', {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (profileResponse.data && profileResponse.data.savedCompanies) {
        console.log('SavedCompaniesContext: Using saved companies from profile data');
        const ids = profileResponse.data.savedCompanies
          .filter((item: any) => item.company_id)
          .map((item: any) => item.company_id);
        
        console.log(`SavedCompaniesContext: Found ${ids.length} saved company IDs from profile:`, ids);
        setSavedCompanies(ids);
        return;
      }
      
      // Fallback to the watchlist API if profile data doesn't have saved companies
      console.log('SavedCompaniesContext: Falling back to watchlist API');
      const response = await fetchWithAuth('/api/watchlist', {
        // Add cache-busting to prevent caching
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (response.error) {
        console.error('SavedCompaniesContext: Error fetching watchlist:', response.error);
        return;
      }
      
      // Handle different response formats
      let watchlistData;
      if (response.data?.data) {
        // New format: data is in data property
        watchlistData = response.data.data;
      } else if (Array.isArray(response.data)) {
        // Old format: data is directly in response
        watchlistData = response.data;
      } else {
        console.error('SavedCompaniesContext: Unexpected watchlist response format', response);
        return;
      }
      
      console.log('SavedCompaniesContext: Watchlist data received:', watchlistData);
      
      // Extract company IDs from the watchlist data
      const ids = watchlistData
        .filter((item: any) => item.company_id)
        .map((item: any) => item.company_id);
      
      console.log(`SavedCompaniesContext: Found ${ids.length} saved company IDs:`, ids);
      setSavedCompanies(ids);
    } catch (error) {
      console.error('SavedCompaniesContext: Error fetching saved companies:', error);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      console.log('SavedCompaniesContext: Auth loading complete, refreshing saved companies');
      refreshSavedCompanies();
    }
  }, [authLoading, user]);

  const addSavedCompany = (id: string) => {
    console.log(`SavedCompaniesContext: Adding company ${id} to saved companies`);
    setSavedCompanies(prev => {
      if (prev.includes(id)) {
        console.log(`SavedCompaniesContext: Company ${id} already in saved companies`);
        return prev;
      }
      console.log(`SavedCompaniesContext: Company ${id} added to saved companies`);
      return [...prev, id];
    });
  };

  const removeSavedCompany = (id: string) => {
    console.log(`SavedCompaniesContext: Removing company ${id} from saved companies`);
    setSavedCompanies(prev => {
      const newIds = prev.filter(savedId => savedId !== id);
      console.log(`SavedCompaniesContext: Removed company ${id}, new count: ${newIds.length}`);
      return newIds;
    });
  };
  
  const isCompanySaved = (id: string) => {
    const saved = savedCompanyIds.includes(id);
    console.log(`SavedCompaniesContext: Checking if company ${id} is saved: ${saved}`);
    return saved;
  };

  return (
    <SavedCompaniesContext.Provider value={{ 
      savedCompanyIds, 
      addSavedCompany, 
      removeSavedCompany,
      isCompanySaved,
      refreshSavedCompanies
    }}>
      {children}
    </SavedCompaniesContext.Provider>
  );
} 