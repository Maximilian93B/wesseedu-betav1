export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name?: string | null
          last_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          created_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          website_url: string | null
          industry: string
          location: string
          year_founded: number
          
          // Company Content
          mission_statement: string
          company_description: string
          problem_statement: string
          solution_description: string
          target_market: string
          competitive_advantage: string
          
          // Team
          team_members: Json
          
          // Financial Summary
          funding_stage: string
          funding_goal: number
          current_funding: number
          pre_money_valuation: number
          equity_available: number
          
          // ESG Data
          esg_score: number | null
          sdg_alignment: string[] | null
          sustainability_impact: string | null
          
          // Admin Fields
          created_at: string
          updated_at: string
          is_active: boolean
          is_verified: boolean
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          website_url?: string | null
          industry: string
          location: string
          year_founded: number
          mission_statement: string
          company_description: string
          problem_statement: string
          solution_description: string
          target_market: string
          competitive_advantage: string
          team_members?: Json
          funding_stage: string
          funding_goal: number
          current_funding?: number
          pre_money_valuation: number
          equity_available: number
          esg_score?: number | null
          sdg_alignment?: string[] | null
          sustainability_impact?: string | null
          created_at?: string
          updated_at?: string
          is_active?: boolean
          is_verified?: boolean
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string | null
          website_url?: string | null
          industry?: string
          location?: string
          year_founded?: number
          mission_statement?: string
          company_description?: string
          problem_statement?: string
          solution_description?: string
          target_market?: string
          competitive_advantage?: string
          team_members?: Json
          funding_stage?: string
          funding_goal?: number
          current_funding?: number
          pre_money_valuation?: number
          equity_available?: number
          esg_score?: number | null
          sdg_alignment?: string[] | null
          sustainability_impact?: string | null
          updated_at?: string
          is_active?: boolean
          is_verified?: boolean
        }
      }
      company_documents: {
        Row: {
          id: string
          company_id: string
          document_type: string
          file_url: string
          file_name: string
          uploaded_at: string
        }
        Insert: {
          id?: string
          company_id: string
          document_type: string
          file_url: string
          file_name: string
          uploaded_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          document_type?: string
          file_url?: string
          file_name?: string
          uploaded_at?: string
        }
      }
      company_financials: {
        Row: {
          id: string
          company_id: string
          revenue_ttm: number
          revenue_growth: number
          gross_margin: number
          burn_rate: number
          runway_months: number
          market_size: number
          market_growth_rate: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          revenue_ttm: number
          revenue_growth: number
          gross_margin: number
          burn_rate: number
          runway_months: number
          market_size: number
          market_growth_rate: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          revenue_ttm?: number
          revenue_growth?: number
          gross_margin?: number
          burn_rate?: number
          runway_months?: number
          market_size?: number
          market_growth_rate?: number
          updated_at?: string
        }
      }
      user_follows: {
        Row: {
          id: string
          user_id: string
          company_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
