'use client';

import { createContext, useEffect, useState } from 'react';

interface SavedCompaniesContextType {
  savedCompanyIds: string[];
  addSavedCompany: (id: string) => void;
  removeSavedCompany: (id: string) => void;
}

export const SavedCompaniesContext = createContext<SavedCompaniesContextType>({
  savedCompanyIds: [],
  addSavedCompany: () => {},
  removeSavedCompany: () => {},
});

export function SavedCompaniesProvider({ children }: { children: React.ReactNode }) {
  const [savedCompanyIds, setSavedCompanyIds] = useState<string[]>([]);

  useEffect(() => {
    // Fetch saved companies once on mount
    const fetchSavedCompanies = async () => {
      try {
        const response = await fetch('/api/companies/savedCompanies');
        const data = await response.json();
        if (data.success) {
          const ids = data.savedCompanies.map((save: any) => save.companies.id);
          setSavedCompanyIds(ids);
        }
      } catch (error) {
        console.error('Error fetching saved companies:', error);
      }
    };

    fetchSavedCompanies();
  }, []);

  const addSavedCompany = (id: string) => {
    setSavedCompanyIds(prev => [...prev, id]);
  };

  const removeSavedCompany = (id: string) => {
    setSavedCompanyIds(prev => prev.filter(savedId => savedId !== id));
  };

  return (
    <SavedCompaniesContext.Provider value={{ savedCompanyIds, addSavedCompany, removeSavedCompany }}>
      {children}
    </SavedCompaniesContext.Provider>
  );
} 