import { NextRequest, NextResponse } from 'next/server'
import { checkAuth } from '@/lib/utils/authCheck'

// Add this line to prevent static optimization
export const dynamic = 'force-dynamic'

interface ProfileData {
  id: string;
  username: string;
  avatar_url: string | null;
}

interface CommunityActivity {
  id: string;
  title: string;
  content: string;
  created_at: string;
  community_id: string;
  community_name: string;
  author_id: string;
  author_name: string;
  avatar_url: string | null;
}

export async function GET(req: NextRequest) {
  console.log("API: Community feed request received")
  
  // Check authentication using the shared utility
  const { error, authenticated, supabase, session } = await checkAuth()
  
  if (!authenticated) {
    console.log("API: User not authenticated for community feed")
    return NextResponse.json({ error: 'Unauthorized' }, { 
      status: 401,
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      }
    })
  }
  
  console.log("API: User authenticated, ID:", session?.user.id)
  
  try {
    const userId = session!.user.id
    
    // Get user community stats using the function
    const statsResult = await supabase!
      .rpc('get_user_community_stats', { input_user_id: userId })
    
    if (statsResult.error) {
      console.error('API: Error fetching user community stats:', statsResult.error)
      
      // Fallback to direct queries if function fails
      const communityCountQuery = await supabase!
        .from('community_members')
        .select('count', { count: 'exact' })
        .eq('user_id', userId)
      
      const postsCountQuery = await supabase!
        .from('community_posts')
        .select('count', { count: 'exact' })
        .eq('author_id', userId)
      
      const commentsCountQuery = await supabase!
        .from('community_post_comments')
        .select('count', { count: 'exact' })
        .eq('user_id', userId)
      
      const communityStats = {
        communities_joined: communityCountQuery.count || 0,
        posts_created: postsCountQuery.count || 0,
        comments_made: commentsCountQuery.count || 0
      }
      
      console.log("API: Community stats (fallback):", communityStats)
    }
    
    // Get communities the user is a member of using the function
    const userCommunitiesResult = await supabase!
      .rpc('get_user_communities', { input_user_id: userId })
    
    // Declare userCommunities as a generic array to handle both formats
    let userCommunities: any[] = []
    
    if (userCommunitiesResult.error) {
      console.error('API: Error fetching user communities function:', userCommunitiesResult.error)
      
      // Fallback to direct query if function fails
      const fallbackCommunitiesResult = await supabase!
        .from('community_members')
        .select('community_id')
        .eq('user_id', userId)
      
      if (fallbackCommunitiesResult.error) {
        console.error('API: Error in fallback communities query:', fallbackCommunitiesResult.error)
        return NextResponse.json({ error: 'Failed to fetch communities' }, { status: 500 })
      }
      
      userCommunities = fallbackCommunitiesResult.data || []
    } else {
      userCommunities = userCommunitiesResult.data || []
    }
    
    console.log(`API: Found ${userCommunities.length} communities for user`)
    
    // Set up the stats object, either from the function or fallback
    let communityStats
    if (statsResult.error) {
      // Already handled in the fallback above
    } else {
      communityStats = statsResult.data
      console.log("API: Community stats (from function):", communityStats)
    }
    
    // Get recent activity from communities the user is a part of
    let recentActivity = []
    
    if (userCommunities.length > 0) {
      // Convert array of community IDs to a format suitable for the IN clause
      const communityIds = userCommunities.map(community => {
        // Handle both possible formats from direct query or function
        return community.community_id !== undefined ? community.community_id : community
      })
      
      // Use the user_community_activity view to get activity data with proper joins
      const activityResult = await supabase!
        .from('user_community_activity')
        .select('*')
        .in('community_id', communityIds)
        .order('created_at', { ascending: false })
        .limit(10)
      
      if (activityResult.error) {
        console.error('API: Error fetching community activity:', activityResult.error)
        return NextResponse.json({ error: 'Failed to fetch community activity' }, { status: 500 })
      }
      
      recentActivity = activityResult.data || []
      console.log(`API: Found ${recentActivity.length} activity items`)
    }
    
    // In case we can't find any real activity, return empty arrays rather than null
    const response = {
      communities: userCommunities || [],
      stats: communityStats,
      recentActivity: recentActivity || []
    }
    
    console.log("API: Returning successful response")
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('API: Error in community feed API:', error)
    return NextResponse.json({ error: 'Failed to fetch community data' }, { status: 500 })
  }
} 