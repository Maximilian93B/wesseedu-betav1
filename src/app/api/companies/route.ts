import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/utils/authCheck'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    // Check authentication
    const auth = await checkAuth()
    if (auth.error) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized', status: 401 },
        { status: 401 }
      )
    }

    const { supabase } = auth
    
    console.log('Fetching companies from database')
    
    // Get search parameter if it exists
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    
    // Fetch all companies with more fields
    let query = supabase
      .from('companies')
      .select('id, name, description, mission_statement, score, image_url, community_members, sustainability_data')
    
    // Add search functionality if search term is provided
    if (search) {
      console.log(`Searching for companies matching: ${search}`)
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,mission_statement.ilike.%${search}%`)
    }
    
    // Order by score descending
    query = query.order('score', { ascending: false })
    
    const { data, error } = await query

    if (error) {
      console.error('Error fetching companies:', error)
      throw error
    }

    if (!data || data.length === 0) {
      console.log('No companies found in database')
      return NextResponse.json({ data: [] })
    }

    console.log(`Successfully fetched ${data.length} companies`)
    
    // Return the data with the same structure as communities
    return NextResponse.json({
      data: data,
      error: null,
      status: 200
    })
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json(
      { data: null, error: 'Failed to fetch companies', status: 500 },
      { status: 500 }
    )
  }
}