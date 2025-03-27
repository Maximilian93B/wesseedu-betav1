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
    
    // Get search parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const offset = (page - 1) * limit;
    const filter = searchParams.get('filter') || '';
    
    // Build the query
    let query = supabase
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
      .eq('community_id', communityId);
    
    // Apply filters if needed
    if (filter === 'company_updates') {
      query = query.eq('is_company_update', true);
    }
    
    // Apply pagination
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    const { data: posts, error: postsError, count } = await query;

    if (postsError) {
      console.error('Supabase error fetching posts:', postsError);
      return NextResponse.json({ error: 'Error fetching community posts' }, { status: 500 });
    }

    // Get total count for pagination
    const { count: totalCount, error: countError } = await supabase
      .from('community_posts')
      .select('id', { count: 'exact', head: true })
      .eq('community_id', communityId);

    if (countError) {
      console.error('Supabase error fetching count:', countError);
      return NextResponse.json({ error: 'Error fetching post count' }, { status: 500 });
    }

    return NextResponse.json({
      posts: posts || [],
      pagination: {
        total: totalCount || 0,
        page,
        limit,
        totalPages: Math.ceil((totalCount || 0) / limit)
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 