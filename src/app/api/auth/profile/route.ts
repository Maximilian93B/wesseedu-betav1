import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })

  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    console.log('Profile API: No session found, returning unauthorized')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  console.log(`Profile API: Fetching data for user ${session.user.id}`)

  try {
    // Get user profile data
    console.log('Profile API: Fetching profile data')
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single()

    if (profileError) {
      console.error('Profile API: Error fetching profile data:', profileError)
      throw profileError
    }

    console.log('Profile API: Profile data fetched successfully')

    // Get user's investments
    console.log('Profile API: Fetching investments data')
    const { data: investments, error: investmentsError } = await supabase
      .from("investments")
      .select(`
        id,
        amount,
        investment_date,
        notes,
        companies (
          id,
          name,
          description
        )
      `)
      .eq('user_id', session.user.id)
      .order('investment_date', { ascending: false })

    if (investmentsError) {
      console.error('Profile API: Error fetching investments data:', investmentsError)
      throw investmentsError
    }

    console.log(`Profile API: Found ${investments?.length || 0} investments`)

    // Get saved companies
    console.log('Profile API: Fetching saved companies')
    const { data: savedCompanies, error: savedError } = await supabase
      .from("company_saves")
      .select("*, companies(*)")
      .eq('user_id', session.user.id)

    if (savedError) {
      console.error('Profile API: Error fetching saved companies:', savedError)
      throw savedError
    }

    console.log(`Profile API: Found ${savedCompanies?.length || 0} saved companies`)

    // Get stats
    console.log('Profile API: Fetching company count')
    const { count: companiesCount, error: companiesError } = await supabase
      .from("companies")
      .select("*", { count: "exact", head: true })

    if (companiesError) {
      console.error('Profile API: Error fetching company count:', companiesError)
      throw companiesError
    }

    console.log('Profile API: Fetching user count')
    const { count: usersCount, error: usersError } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })

    if (usersError) {
      console.error('Profile API: Error fetching user count:', usersError)
      throw usersError
    }

    const responseData = {
      profile,
      investments,
      savedCompanies,
      stats: {
        companiesCount,
        usersCount
      }
    }

    console.log('Profile API: Successfully compiled all data')
    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error fetching profile data:', error)
    return NextResponse.json({ error: 'Failed to fetch profile data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { id, email, name, user_type, user_tier, sustainable_investment_tags, total_investments, previous_month_investments, impact_score } = await request.json()

    // Insert the profile into the profiles table
    const { error } = await supabaseAdmin.from('profiles').insert([
      {
        id,
        email,
        name,
        user_type,
        user_tier,
        sustainable_investment_tags,
        total_investments,
        previous_month_investments,
        impact_score,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error('Profile creation error:', error)
      return NextResponse.json(
        { error: 'Profile creation failed', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, message: 'Profile created successfully' })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Profile creation failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
