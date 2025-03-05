import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  try {
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
      return NextResponse.json([])
    }

    console.log(`Successfully fetched ${data.length} companies`)
    
    // Return the data directly, not wrapped in a 'companies' object
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 })
  }
}