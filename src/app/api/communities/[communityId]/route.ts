import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { checkAuth } from '@/lib/utils/authCheck'

export const dynamic = 'force-dynamic'

type RouteParams = {
  params: Promise<{
    communityId: string;
  }>;
};

export async function GET(request: Request, context: RouteParams) {
  const params = await context.params;
  const communityId = params.communityId;

  if (!communityId) {
    return NextResponse.json({ error: 'Community ID is required' }, { status: 400 });
  }

  try {
    // Check authentication
    const auth = await checkAuth();
    if (auth.error) {
      return auth.error;
    }
    
    const supabase = auth.supabase!;
    
    // Get the community details
    const { data: community, error: communityError } = await supabase
      .from('company_communities')
      .select(`
        id, 
        description, 
        created_at,
        companies (
          id,
          name,
          description,
          mission_statement,
          score,
          image_url
        )
      `)
      .eq('id', communityId)
      .single();

    if (communityError) {
      console.error('Supabase error:', communityError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (!community) {
      return NextResponse.json({ error: 'Community not found' }, { status: 404 });
    }

    // Get the posts for this community
    const { data: posts, error: postsError } = await supabase
      .from('community_posts')
      .select(`
        id,
        title,
        content,
        is_company_update,
        created_at,
        updated_at,
        profiles: author_id (
          id,
          name
        )
      `)
      .eq('community_id', communityId)
      .order('created_at', { ascending: false });

    if (postsError) {
      console.error('Supabase error fetching posts:', postsError);
      return NextResponse.json({ error: 'Error fetching community posts' }, { status: 500 });
    }

    // Get the member count for this community
    const { count: memberCount, error: countError } = await supabase
      .from('community_members')
      .select('id', { count: 'exact', head: true })
      .eq('community_id', communityId);

    if (countError) {
      console.error('Supabase error fetching member count:', countError);
      return NextResponse.json({ error: 'Error fetching member count' }, { status: 500 });
    }

    // Get the authenticated user's membership status
    const userId = auth.session!.user.id;
    let isMember = false;
    let isAmbassador = false;
    
    // Check if user is a member
    const { data: memberData, error: memberError } = await supabase
      .from('community_members')
      .select('id')
      .eq('community_id', communityId)
      .eq('user_id', userId)
      .single();
    
    if (!memberError && memberData) {
      isMember = true;
    }
    
    // Check if user is an ambassador
    const { data: ambassadorData, error: ambassadorError } = await supabase
      .from('community_ambassadors')
      .select('id')
      .eq('community_id', communityId)
      .eq('user_id', userId)
      .single();
    
    if (!ambassadorError && ambassadorData) {
      isAmbassador = true;
    }

    // Fetch community ambassadors with their profiles
    const { data: ambassadors, error: ambassadorsError } = await supabase
      .from('community_ambassadors')
      .select(`
        id,
        profiles:user_id (
          id,
          name,
          avatar_url,
          job_title,
          bio
        )
      `)
      .eq('community_id', communityId);

    if (ambassadorsError) {
      console.error('Error fetching ambassadors:', ambassadorsError);
    }

    // Combine all data and return
    return NextResponse.json({
      community,
      posts: posts || [],
      memberCount: memberCount || 0,
      isMember,
      isAmbassador,
      ambassadors: ambassadors || []
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 