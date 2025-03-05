import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Initialize Supabase client with the public anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function GET(request: Request) {
  try {
    // Fetch active sponsored ads, ordered by priority
    const { data, error } = await supabase
      .from('sponsored_ads')
      .select('id, name, logo, description, impact_score, cta, url')
      .eq('active', true)
      .order('priority', { ascending: false })
    
    if (error) throw error
    
    return NextResponse.json({ ads: data })
  } catch (error) {
    console.error('Error fetching sponsored ads:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch sponsored ads' 
    })
  }
} 
