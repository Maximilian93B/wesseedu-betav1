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

export async function POST(request: Request, context: RouteParams) {
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
    const userId = auth.session!.user.id;
    
    // Check if the community exists
    const { data: community, error: communityError } = await supabase
      .from('company_communities')
      .select('id')
      .eq('id', communityId)
      .single();
    
    if (communityError || !community) {
      return NextResponse.json({ error: 'Community not found' }, { status: 404 });
    }
    
    // Check if the user is a member
    const { data: existingMember, error: memberError } = await supabase
      .from('community_members')
      .select('id')
      .eq('community_id', communityId)
      .eq('user_id', userId)
      .maybeSingle();
    
    if (!existingMember) {
      return NextResponse.json({ message: 'User is not a member of this community' });
    }
    
    // Remove the user from the community
    const { error: deleteError } = await supabase
      .from('community_members')
      .delete()
      .eq('community_id', communityId)
      .eq('user_id', userId);
    
    if (deleteError) {
      console.error('Error leaving community:', deleteError);
      return NextResponse.json({ error: 'Failed to leave community' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      message: 'Successfully left community'
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 