import { NextRequest, NextResponse } from 'next/server'
import { checkAuth } from '@/lib/utils/authCheck'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

// Force rebuild of this API route - profiles not user_profiles

interface ProfileData {
  id: string;
  name: string;
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
  profiles: {
    id: string;
    name: string;
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
  profiles: {
    id: string;
    name: string;
  };  
}

export async function GET(req: NextRequest) {
  try {
    console.log('Community feed API called');
    
    // Check authentication
    const auth = await checkAuth();
    
    // Debug auth issues
    console.log('Auth check result:', { 
      authenticated: auth.authenticated, 
      hasError: !!auth.error,
      hasSession: !!auth.session,
      userId: auth.session?.user?.id || 'no-user-id'
    });
    
    // If not authenticated, return 401 with proper error message
    if (auth.error) {
      console.log('Auth error detected in community feed API');
      return NextResponse.json({ 
        data: null,
        error: 'Unauthorized', 
        status: 401 
      }, { status: 401 });
    }

    // Use the Supabase client from auth check
    const supabase = auth.supabase;
    
    // Get user from the auth session
    const user = auth.session?.user;
    
    if (!user) {
      console.log('No user in session for community feed API');
      return NextResponse.json({ 
        data: null,
        error: 'User not found', 
        status: 401 
      }, { status: 401 });
    }
    
    // Add user ID to log
    console.log('Processing community feed for user:', user.id);

    // Fetch community posts with user and community information (last 2 weeks)
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    
    const { data: postsData, error: postsError } = await supabase
      .from('community_posts')
      .select(`
        id,
        title,
        content,
        created_at,
        community_id,
        community:company_communities!community_posts_community_id_fkey(
          id,
          company_id,
          companies(id, name)
        ),
        author_id,
        profiles!community_posts_author_id_fkey(id, name)
      `)
      .gt('created_at', twoWeeksAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(20);
      
    if (postsError) {
      console.error('Error fetching community posts:', postsError);
      return NextResponse.json({ 
        data: null,
        error: postsError, 
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
        community:company_communities!community_members_community_id_fkey(
          id, 
          company_id,
          companies(id, name)
        ),
        user_id,
        profiles!community_members_user_id_fkey(id, name)
      `)
      .gt('created_at', twoWeeksAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(20);
      
    if (membersError) {
      console.error('Error fetching community members:', membersError);
      return NextResponse.json({ 
        data: null,
        error: membersError, 
        status: 500 
      }, { status: 500 });
    }
    
    // Format posts data
    const formattedPosts = postsData.map((post: any) => {
      try {
        return {
          id: post.id,
          title: post.title || (post.content && post.content.substring(0, 50).replace(/<[^>]+>/g, '')) || 'Untitled Post',
          content: post.content || '',
          created_at: post.created_at,
          community_id: post.community_id,
          community_name: post.community?.companies?.name || 'Unknown Community',
          author_id: post.author_id,
          author_name: post.profiles?.name || 'Anonymous',
        };
      } catch (err) {
        console.error('Error formatting post:', err, post);
        // Return a minimal valid object if there's an error
        return {
          id: post.id || 'unknown-id',
          title: 'Error displaying post',
          content: 'There was an error displaying this post content',
          created_at: post.created_at || new Date().toISOString(),
          community_id: post.community_id || '',
          community_name: 'Unknown Community',
          author_id: post.author_id || '',
          author_name: 'Unknown Author',
        };
      }
    });
    
    // Format members data - convert to CommunityActivity format
    const formattedMembers = membersData.map((member: any) => {
      try {
        const communityName = member.community?.companies?.name || 'Unknown Community';
        return {
          id: member.id,
          title: `Joined ${communityName} community`,
          content: `Joined ${communityName} community`,
          created_at: member.created_at,
          community_id: member.community_id,
          community_name: communityName,
          author_id: member.user_id,
          author_name: member.profiles?.name || 'Anonymous',
        };
      } catch (err) {
        console.error('Error formatting member:', err, member);
        // Return a minimal valid object if there's an error
        return {
          id: member.id || 'unknown-id',
          title: 'New community member',
          content: 'User joined a community',
          created_at: member.created_at || new Date().toISOString(),
          community_id: member.community_id || '',
          community_name: 'Unknown Community',
          author_id: member.user_id || '',
          author_name: 'Unknown User',
        };
      }
    });
    
    // Combine and sort all activity by timestamp
    const combinedActivity = [...formattedPosts, ...formattedMembers]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 30); // Limit to 30 most recent activities
    
    // Prepare response data
    const responseData = {
      recentActivity: combinedActivity,
      stats: {
        communities_joined: membersData.length,
        posts_created: postsData.length,
        comments_made: 0 // Add comment data when available
      }
    };
    
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
        data: {
          ...responseData,
          recentActivity: [...mockData, ...combinedActivity]
        },
        error: null,
        status: 200
      });
    }

    return NextResponse.json({ 
      data: responseData,
      error: null,
      status: 200
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Error in community posts/members processing:', error);
    return NextResponse.json({ 
      data: null,
      error: {
        message: error.message || 'Error processing community data',
        code: error.code || 'UNKNOWN',
        details: error.details || null,
        hint: error.hint || null
      }, 
      status: 500 
    }, { status: 500 });
  }
} 