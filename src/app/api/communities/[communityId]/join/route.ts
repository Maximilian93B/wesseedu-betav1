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
    
    // Check if the user is already a member
    const { data: existingMember, error: memberError } = await supabase
      .from('community_members')
      .select('id')
      .eq('community_id', communityId)
      .eq('user_id', userId)
      .maybeSingle();
    
    if (existingMember) {
      return NextResponse.json({ message: 'User is already a member of this community' });
    }
    
    // Add the user to the community
    const { data: newMember, error: insertError } = await supabase
      .from('community_members')
      .insert([
        { community_id: communityId, user_id: userId }
      ])
      .select()
      .single();
    
    if (insertError) {
      console.error('Error joining community:', insertError);
      return NextResponse.json({ error: 'Failed to join community' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      message: 'Successfully joined community',
      member: newMember
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 