import { NextRequest, NextResponse } from 'next/server'
import { checkAuth } from '@/lib/utils/authCheck'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

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

interface CommunityPost {
  id: string;
  content: string;
  created_at: string;
  community_id: string;
  communities: {
    id: string;
    name: string;
  };
  user_id: string;
  user_profiles: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
}

interface CommunityMember {
  id: string;
  created_at: string;
  community_id: string;
  communities: {
    id: string;
    name: string;
  };
  user_id: string;
  user_profiles: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
}

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const auth = await checkAuth();
    
    // If not authenticated, return 401 with proper error message
    if (auth.error) {
      return NextResponse.json({ 
        data: null,
        error: 'Unauthorized', 
        status: 401 
      }, { status: 401 });
    }

    // Use the Supabase client from auth check
    const supabase = auth.supabase;
    
    // Get user from the auth session
    const user = auth.session.user;
    
    if (!user) {
      return NextResponse.json({ 
        data: null,
        error: 'User not found', 
        status: 401 
      }, { status: 401 });
    }

    // Fetch community posts with user and community information (last 2 weeks)
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    
    const { data: postsData, error: postsError } = await supabase
      .from('community_posts')
      .select(`
        id,
        content,
        created_at,
        community_id,
        communities!community_posts_community_id_fkey(id, name),
        user_id,
        user_profiles!community_posts_user_id_fkey(id, username, avatar_url)
      `)
      .gt('created_at', twoWeeksAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(20);
      
    if (postsError) {
      console.error('Error fetching community posts:', postsError);
      return NextResponse.json({ 
        data: null,
        error: 'Error fetching community posts', 
        status: 500 
      }, { status: 500 });
    }
    
    // Fetch new community members (last 2 weeks)
    const { data: membersData, error: membersError } = await supabase
      .from('community_members')
      .select(`
        id,
        created_at,
        community_id,
        communities!community_members_community_id_fkey(id, name),
        user_id,
        user_profiles!community_members_user_id_fkey(id, username, avatar_url)
      `)
      .gt('created_at', twoWeeksAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(20);
      
    if (membersError) {
      console.error('Error fetching community members:', membersError);
      return NextResponse.json({ 
        data: null,
        error: 'Error fetching community members', 
        status: 500 
      }, { status: 500 });
    }
    
    // Format posts data
    const formattedPosts = postsData.map((post: any) => ({
      id: post.id,
      user: {
        id: post.user_profiles.id,
        name: post.user_profiles.username,
        avatar: post.user_profiles.avatar_url
      },
      type: 'post',
      content: post.content,
      timestamp: post.created_at,
      community: {
        id: post.community_id,
        name: post.communities.name
      },
      likes: 0,
      comments: 0
    }));
    
    // Format members data
    const formattedMembers = membersData.map((member: any) => ({
      id: member.id,
      user: {
        id: member.user_profiles.id,
        name: member.user_profiles.username,
        avatar: member.user_profiles.avatar_url
      },
      type: 'join',
      content: `Joined ${member.communities.name} community`,
      timestamp: member.created_at,
      community: {
        id: member.community_id,
        name: member.communities.name
      },
      likes: 0,
      comments: 0
    }));
    
    // Combine and sort all activity by timestamp
    const combinedActivity = [...formattedPosts, ...formattedMembers]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 30); // Limit to 30 most recent activities
    
    // In development mode, you can return mock + real data for testing
    if (process.env.NODE_ENV === 'development' && req.nextUrl.searchParams.get('mock') === 'true') {
      console.log('Development mode: Returning mock + real community feed data');
      
      // Mock data
      const mockData = [
        {
          id: 'feed-1',
          user: {
            id: 'user-1',
            name: 'Emma Johnson',
            avatar: 'https://placehold.co/100'
          },
          type: 'investment',
          content: 'Invested in EcoTech Solutions',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          company: {
            id: 'company-1',
            name: 'EcoTech Solutions',
            image: 'https://placehold.co/100'
          },
          likes: 12,
          comments: 3
        },
        {
          id: 'feed-2',
          user: {
            id: 'user-2',
            name: 'Michael Chen',
            avatar: 'https://placehold.co/100'
          },
          type: 'comment',
          content: 'Great progress on their water purification project!',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          company: {
            id: 'company-3',
            name: 'AquaPure Technologies',
            image: 'https://placehold.co/100'
          },
          likes: 8,
          comments: 1
        },
        {
          id: 'feed-3',
          user: {
            id: 'user-3',
            name: 'Sophia Rodriguez',
            avatar: 'https://placehold.co/100'
          },
          type: 'investment',
          content: 'Invested in GreenGrow Farms',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          company: {
            id: 'company-2',
            name: 'GreenGrow Farms',
            image: 'https://placehold.co/100'
          },
          likes: 15,
          comments: 5
        }
      ];
      
      return NextResponse.json({
        data: [...mockData, ...combinedActivity],
        error: null,
        status: 200
      });
    }

    return NextResponse.json({ 
      data: combinedActivity,
      error: null,
      status: 200
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error in community feed API:', error);
    return NextResponse.json({ 
      data: null,
      error: 'Internal Server Error', 
      status: 500 
    }, { status: 500 });
  }
} 