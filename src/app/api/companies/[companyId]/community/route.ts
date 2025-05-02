import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { checkAuth } from '@/lib/utils/authCheck'

export async function GET(
  request: Request,
  { params }: { params: { companyId: string } }
) {
  try {
    // Check authentication
    const auth = await checkAuth()
    if (!auth.authenticated) return auth.error || NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { session, supabase } = auth
    
    if (!session) {
      return NextResponse.json({ error: 'No active session' }, { status: 401 })
    }
    
    if (!supabase) {
      return NextResponse.json({ error: 'Database client not available' }, { status: 500 })
    }
    
    const userId = session.user.id

    const companyId = params.companyId
    if (!companyId) {
      return NextResponse.json(
        { error: 'Company ID is required' },
        { status: 400 }
      )
    }

    // First, get the community for this company
    const { data: communityData, error: communityError } = await supabase
      .from('communities')
      .select('id')
      .eq('company_id', companyId)
      .single()

    if (communityError || !communityData) {
      return NextResponse.json({ 
        data: null, 
        error: 'Community not found for this company', 
        status: 404 
      })
    }

    // Check if the user is a member of this community
    const { data: membershipData, error: membershipError } = await supabase
      .from('community_members')
      .select('id')
      .eq('community_id', communityData.id)
      .eq('user_id', userId)
      .single()

    const isMember = !membershipError && membershipData !== null

    return NextResponse.json({
      data: {
        id: communityData.id,
        isMember
      },
      error: null,
      status: 200
    })
  } catch (error) {
    console.error('Error getting company community:', error)
    return NextResponse.json(
      { data: null, error: 'Failed to get company community', status: 500 }
    )
  }
} 