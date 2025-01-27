import { useState, useEffect } from 'react'
import { CompanyService, CompanyFilters } from '@/lib/services/companyService'
import type { Database } from '@/lib/supabase/types'

type Company = Database['public']['Tables']['companies']['Row']
type CompanyWithRelations = Company & {
  company_documents: Database['public']['Tables']['company_documents']['Row'][]
  company_financials: Database['public']['Tables']['company_financials']['Row'][]
}

// Custom hook for managing company data and filters in React components
export function useCompanies(initialFilters?: CompanyFilters) {
  // State management for companies, loading state, errors, and filters
  const [companies, setCompanies] = useState<CompanyWithRelations[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [filters, setFilters] = useState<CompanyFilters>(initialFilters || {})

  // Load companies whenever filters change
  useEffect(() => {
    loadCompanies()
  }, [filters])

  // Function to fetch companies using CompanyService
  const loadCompanies = async () => {
    try {
      setLoading(true)
      const data = await CompanyService.getCompanies(filters)
      setCompanies(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  // Return data and functions for component use
  return {
    companies,
    loading,
    error,
    setFilters,
    refreshCompanies: loadCompanies,
  }
}