import { NextRequest, NextResponse } from 'next/server'
import { checkAuth } from '@/lib/utils/authCheck'

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
  // Check authentication using the shared utility
  const { error, authenticated, supabase, session } = await checkAuth()
  
  if (!authenticated) {
    return error
  }
  
  try {
    const userId = session!.user.id
    
    // Get communities the user is a member of
    const { data: userCommunities, error: communitiesError } = await supabase!
      .from('community_members')
      .select('community_id')
      .eq('user_id', userId)
    
    if (communitiesError) {
      console.error('Error fetching user communities:', communitiesError)
      return NextResponse.json({ error: 'Failed to fetch communities' }, { status: 500 })
    }
    
    // Get community stats for the user
    const statsQuery = await supabase!
      .from('community_members')
      .select('count', { count: 'exact' })
      .eq('user_id', userId)
    
    const postsQuery = await supabase!
      .from('community_posts')
      .select('count', { count: 'exact' })
      .eq('author_id', userId)
    
    const commentsQuery = await supabase!
      .from('community_post_comments')
      .select('count', { count: 'exact' })
      .eq('user_id', userId)
    
    const communityStats = {
      communities_joined: statsQuery.count || 0,
      posts_created: postsQuery.count || 0,
      comments_made: commentsQuery.count || 0
    }
    
    // Get recent activity from communities the user is a part of
    let recentActivity: CommunityActivity[] = []
    
    if (userCommunities && userCommunities.length > 0) {
      // Convert array of community IDs to a format suitable for the IN clause
      const communityIds = userCommunities.map(community => community.community_id)
      
      // Use the user_community_activity view to get activity data with proper joins
      const { data: activityData, error: activityError } = await supabase!
        .from('user_community_activity')
        .select('*')
        .in('community_id', communityIds)
        .order('created_at', { ascending: false })
        .limit(10)
      
      if (activityError) {
        console.error('Error fetching community activity:', activityError)
        return NextResponse.json({ error: 'Failed to fetch community activity' }, { status: 500 })
      }
      
      recentActivity = activityData || []
    }
    
    return NextResponse.json({
      communities: userCommunities || [],
      stats: communityStats,
      recentActivity
    })
    
  } catch (error) {
    console.error('Error in community feed API:', error)
    return NextResponse.json({ error: 'Failed to fetch community data' }, { status: 500 })
  }
} 