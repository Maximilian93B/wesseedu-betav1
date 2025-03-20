import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/utils/authCheck'

export const dynamic = 'force-dynamic'

// Define interfaces to help with type checking
interface Company {
  id: string
  name: string
  description: string | null
  mission_statement: string | null
  score: number
  image_url: string | null
}

interface CommunityBase {
  id: string
  description: string | null
  created_at: string
  company_id: string
}

interface CommunityWithCompany extends CommunityBase {
  companies: Company
}

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

    const { session, supabase } = auth
    const userId = session.user.id

    console.log('Fetching communities for user:', userId)

    // Get search parameter from URL if it exists
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    
    let finalCommunities: CommunityWithCompany[] = []
    
    try {
      // Try the first approach with company_communities table
      let query = supabase
        .from('company_communities')
        .select(`
          id,
          description,
          created_at,
          company_id,
          companies:company_id (
            id,
            name,
            description,
            mission_statement,
            score,
            image_url
          )
        `)
      
      if (search) {
        query = query.textSearch('description', search)
      }
      
      const { data, error } = await query
      
      if (!error && data) {
        finalCommunities = data as unknown as CommunityWithCompany[]
      } else {
        throw error
      }
    } catch (firstError) {
      console.log('First query approach failed:', firstError)
      
      // Fallback approach
      try {
        const { data: communities, error } = await supabase
          .from('communities')
          .select('id, description, created_at, company_id')
          
        if (error) throw error
        
        // Get company data for each community
        finalCommunities = await Promise.all(
          communities.map(async (community): Promise<CommunityWithCompany> => {
            try {
              const { data: companyData } = await supabase
                .from('companies')
                .select('id, name, description, mission_statement, score, image_url')
                .eq('id', community.company_id)
                .single()
                
              return {
                ...community,
                companies: companyData as Company
              }
            } catch (err) {
              // If company data can't be fetched, provide default data
              return {
                ...community,
                companies: {
                  id: community.company_id,
                  name: 'Unknown Company',
                  description: null,
                  mission_statement: null,
                  score: 0,
                  image_url: null
                }
              }
            }
          })
        )
      } catch (secondError) {
        console.error('Both query approaches failed:', secondError)
        return NextResponse.json(
          { data: null, error: 'Failed to fetch communities', status: 500 },
          { status: 500 }
        )
      }
    }

    // Get the user's memberships
    const { data: memberships, error: membershipError } = await supabase
      .from('community_members')
      .select('community_id')
      .eq('user_id', userId)
    
    if (membershipError) {
      console.error('Error fetching memberships:', membershipError)
    }
    
    // Create a set of community IDs the user is a member of
    const membershipSet = new Set(memberships?.map(m => m.community_id) || [])
    
    // Add the isMember flag to each community
    const communitiesWithMembership = finalCommunities.map(community => ({
      ...community,
      isMember: membershipSet.has(community.id)
    }))

    // Get ambassador counts for each community
    const communityIds = communitiesWithMembership.map(community => community.id)
    
    // Check if there are any communities to query
    if (communityIds.length === 0) {
      return NextResponse.json({ data: [] })
    }
    
    // Fetch ambassador counts - use proper count query instead of group
    const { data: ambassadorCounts, error: ambassadorError } = await supabase
      .from('community_ambassadors')
      .select('community_id')
      .in('community_id', communityIds)
    
    if (ambassadorError) {
      console.error('Error fetching ambassador counts:', ambassadorError)
    }

    // Calculate ambassador counts manually
    const countMap = new Map<string, number>()
    if (ambassadorCounts) {
      ambassadorCounts.forEach((item: { community_id: string }) => {
        const communityId = item.community_id
        countMap.set(communityId, (countMap.get(communityId) || 0) + 1)
      })
    }
    
    // Fetch featured ambassador for each community (the first ambassador)
    const { data: featuredAmbassadors, error: ambassadorsFetchError } = await supabase
      .from('community_ambassadors')
      .select(`
        community_id,
        profiles:user_id (
          name,
          avatar_url
        )
      `)
      .in('community_id', communityIds)
      .order('created_at', { ascending: true })
    
    if (ambassadorsFetchError) {
      console.error('Error fetching ambassadors:', ambassadorsFetchError)
    }
    
    // Create a map of community_id to featured ambassador
    const ambassadorMap = new Map<string, any>()
    if (featuredAmbassadors) {
      featuredAmbassadors.forEach((ambassador: { community_id: string, profiles: any }) => {
        if (!ambassadorMap.has(ambassador.community_id)) {
          ambassadorMap.set(ambassador.community_id, ambassador.profiles)
        }
      })
    }
    
    // Add ambassador info to each community
    const communitiesWithAmbassadors = communitiesWithMembership.map(community => {
      const ambassadorCount = countMap.get(community.id) || 0
      const featuredAmbassador = ambassadorMap.get(community.id) || null
      
      return {
        ...community,
        ambassadorCount,
        hasAmbassadors: ambassadorCount > 0,
        featuredAmbassador
      }
    })

    return NextResponse.json({ 
      data: communitiesWithAmbassadors, 
      error: null, 
      status: 200 
    })
  } catch (error) {
    console.error('Error in communities route:', error)
    return NextResponse.json(
      { data: null, error: 'An unexpected error occurred', status: 500 },
      { status: 500 }
    )
  }
} 