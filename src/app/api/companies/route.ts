import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    let query = supabase
      .from('companies')
      .select('*')
      .order('score', { ascending: false })

    // Add search functionality if search term is provided
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,mission_statement.ilike.%${search}%`)
    }

    const { data: companies, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (!companies) {
      return NextResponse.json({ companies: [] })
    }

    return NextResponse.json({ companies })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}