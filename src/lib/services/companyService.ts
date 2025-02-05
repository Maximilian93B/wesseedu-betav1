import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

// Type definitions for company and related data from Supabase database
type Company = Database['public']['Tables']['companies']['Row']
type CompanyWithRelations = Company & {
  company_documents: Database['public']['Tables']['company_documents']['Row'][]
  company_financials: Database['public']['Tables']['company_financials']['Row'][]
}

// Interface defining possible filter parameters for company queries
export interface CompanyFilters {
  industry?: string
  funding_stage?: string
  min_esg_score?: number
  search?: string
  is_active?: boolean
  is_verified?: boolean
}

export class CompanyService {
  // Initialize Supabase client
  private static supabase = createClient()

  // Fetch companies with optional filters
  static async getCompanies(filters?: CompanyFilters): Promise<CompanyWithRelations[]> {
    // Initialize base query with related data
    let query = this.supabase
      .from('companies')
      .select(`
        *,
        company_documents (*),
        company_financials (*)
      `)
      .eq('is_active', true)
      .eq('is_verified', true)

    // Apply additional filters if provided
    if (filters?.industry) {
      query = query.eq('industry', filters.industry)
    }
    if (filters?.funding_stage) {
      query = query.eq('funding_stage', filters.funding_stage)
    }
    if (filters?.min_esg_score) {
      query = query.gte('esg_score', filters.min_esg_score)
    }
    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,company_description.ilike.%${filters.search}%`)
    }

    // Execute query and return results
    const { data, error } = await query
    if (error) throw error
    return data as CompanyWithRelations[]
  }

  static async getCompanyById(id: string): Promise<CompanyWithRelations | null> {
    const { data, error } = await this.supabase
      .from('companies')
      .select(`
        *,
        company_documents (*),
        company_financials (*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data as CompanyWithRelations
  }

  static async followCompany(companyId: string): Promise<void> {
    const { data: { session }, error: authError } = await this.supabase.auth.getSession()
    if (authError || !session) throw new Error('Not authenticated')

    const { error } = await this.supabase
      .from('user_follows')
      .insert({
        user_id: session.user.id,
        company_id: companyId
      })

    if (error) throw error
  }

  static async unfollowCompany(companyId: string): Promise<void> {
    const { data: { session }, error: authError } = await this.supabase.auth.getSession()
    if (authError || !session) throw new Error('Not authenticated')

    const { error } = await this.supabase
      .from('user_follows')
      .delete()
      .match({ user_id: session.user.id, company_id: companyId })

    if (error) throw error
  }

  static async isFollowing(companyId: string): Promise<boolean> {
    const { data: { session }, error: authError } = await this.supabase.auth.getSession()
    if (authError || !session) return false

    const { data, error } = await this.supabase
      .from('user_follows')
      .select('id')
      .match({ user_id: session.user.id, company_id: companyId })
      .single()

    if (error) return false
    return !!data
  }
}