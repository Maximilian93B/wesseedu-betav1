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

export async function POST(
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
    const userId = session.user.id
    const companyId = params.companyId
    
    if (!companyId) {
      return NextResponse.json(
        { error: 'Company ID is required' },
        { status: 400 }
      )
    }

    // Get request body
    const body = await request.json()
    const { description } = body
    
    // First, check if company exists
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .select('id, created_by')
      .eq('id', companyId)
      .single()
    
    if (companyError || !companyData) {
      return NextResponse.json({ 
        data: null, 
        error: 'Company not found', 
        status: 404 
      }, { status: 404 })
    }
    
    // Verify user has permission (is company creator or admin)
    if (companyData.created_by !== userId) {
      const { data: isAdmin } = await supabase
        .rpc('is_admin', { user_id: userId })
      
      if (!isAdmin) {
        return NextResponse.json({ 
          data: null, 
          error: 'Unauthorized. Only company creators or admins can create communities', 
          status: 403 
        }, { status: 403 })
      }
    }
    
    // Check if a community already exists for this company
    const { data: existingCommunity, error: existingError } = await supabase
      .from('company_communities')
      .select('id')
      .eq('company_id', companyId)
      .single()
    
    if (existingCommunity) {
      return NextResponse.json({ 
        data: null, 
        error: 'A community already exists for this company', 
        status: 400 
      }, { status: 400 })
    }
    
    // Create new community
    const { data: newCommunity, error: createError } = await supabase
      .from('company_communities')
      .insert({
        company_id: companyId,
        description: description || `Official community for this company`
      })
      .select('id')
      .single()
    
    if (createError) {
      console.error('Error creating community:', createError)
      return NextResponse.json({ 
        data: null, 
        error: 'Failed to create community', 
        status: 500 
      }, { status: 500 })
    }
    
    // Add the creator as a community member
    await supabase
      .from('community_members')
      .insert({
        community_id: newCommunity.id,
        user_id: userId
      })
    
    // Add the creator as a community ambassador
    await supabase
      .from('community_ambassadors')
      .insert({
        community_id: newCommunity.id,
        user_id: userId
      })
    
    return NextResponse.json({
      data: {
        id: newCommunity.id,
        message: 'Community created successfully'
      },
      error: null,
      status: 201
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating company community:', error)
    return NextResponse.json(
      { data: null, error: 'Failed to create company community', status: 500 },
      { status: 500 }
    )
  }
} 