import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { checkAuth } from '@/lib/utils/authCheck'

export async function GET(
  request: Request,
  { params }: { params: { companyId: string } }
) {
  try {
    // Check authentication
    const auth = await checkAuth()
    if (auth.error) return auth.response

    const { session, supabase } = auth
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