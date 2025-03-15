import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Initialize Supabase client with the public anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
// For admin access to bypass RLS
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export interface SponsoredAd {
  id: string;
  name: string;
  logo: string;
  description: string;
  impact_score: number;
  cta: string;
  url: string;
  company_id: string;
  active: boolean;
  priority: number;
  placement: string;
  created_at: string;
  updated_at: string;
}

export async function GET(request: Request) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const placement = searchParams.get('placement')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : undefined
    
    // Use the service role key to bypass RLS policies
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Start building the query
    let query = supabase
      .from('sponsored_ads')
      .select('*')
      .eq('active', true)
      .order('priority', { ascending: false })
    
    // Filter by placement if provided
    if (placement) {
      query = query.eq('placement', placement)
    }
    
    // Limit results if specified
    if (limit) {
      query = query.limit(limit)
    }
    
    // Execute the query
    const { data, error } = await query
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    // Return data directly as an array
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching sponsored ads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sponsored ads' }, 
      { status: 500 }
    )
  }
} 
