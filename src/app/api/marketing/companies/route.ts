import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Database } from '@/lib/supabase/types'

type MarketplaceFilters = {
  search?: string
  industry?: string[]
  funding_stage?: string[]
  min_esg?: number
  sort_by?: 'newest' | 'funding' | 'esg'
  page: number
  limit: number
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Default filters with type safety
    const filters: MarketplaceFilters = {
      page: Math.max(1, Number(searchParams.get('page')) || 1),
      limit: Math.min(50, Math.max(1, Number(searchParams.get('limit')) || 10)),
      search: searchParams.get('search') || undefined,
      industry: searchParams.getAll('industry').filter(Boolean),
      funding_stage: searchParams.getAll('funding_stage').filter(Boolean),
      min_esg: Number(searchParams.get('min_esg')) || undefined,
      sort_by: (searchParams.get('sort_by') as MarketplaceFilters['sort_by']) || 'newest'
    }

    // Use different client initialization based on environment
    const supabase = process.env.NODE_ENV === 'development' 
      ? createClient<Database>(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
      : createRouteHandlerClient<Database>({ 
          cookies: () => cookies() 
        })

    let query = supabase
      .from('companies')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .eq('is_verified', true)

    // Apply filters if they exist
    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,industry.ilike.%${filters.search}%`)
    }

    if (filters.industry && filters.industry.length > 0) {
      query = query.in('industry', filters.industry)
    }

    if (filters.funding_stage && filters.funding_stage.length > 0) {
      query = query.in('funding_stage', filters.funding_stage)
    }

    if (filters.min_esg) {
      query = query.gte('esg_score', filters.min_esg)
    }

    // Apply sorting
    switch (filters.sort_by) {
      case 'newest':
        query = query.order('created_at', { ascending: false })
        break
      case 'funding':
        query = query.order('current_funding', { ascending: false })
        break
      case 'esg':
        query = query.order('esg_score', { ascending: false })
        break
      default:
        query = query.order('created_at', { ascending: false })
    }

    // Apply pagination
    const from = (filters.page - 1) * filters.limit
    const to = from + filters.limit - 1
    
    const { data, error, count } = await query
      .range(from, to)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch companies' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      companies: data || [],
      pagination: {
        total: count ?? 0,
        pages: Math.ceil((count ?? 0) / filters.limit),
        current: filters.page,
        limit: filters.limit
      }
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 