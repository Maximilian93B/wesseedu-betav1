
import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/utils/authCheck';

export const dynamic = 'force-dynamic';

type RouteParams = {
  params: {
    companyId: string;
  };
};

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { companyId } = params;
    
    if (!companyId) {
      return NextResponse.json(
        { data: null, error: 'Company ID is required', status: 400 },
        { status: 400 }
      );
    }

    // Authentication check
    const auth = await checkAuth();
    if (auth.error) {
      return auth.error;
    }
    
    const supabase = auth.supabase;
    const body = await request.json();
    
    // Create a new community linked to the company
    const { data: community, error } = await supabase
      .from('communities')
      .insert({
        company_id: companyId,
        ...body,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating community:', error);
      return NextResponse.json(
        { data: null, error: 'Failed to create community', status: 500 },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: community,
      error: null,
      status: 201
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating community:', error);
    return NextResponse.json(
      { data: null, error: 'Failed to create community', status: 500 },
      { status: 500 }
    );
  }
} 