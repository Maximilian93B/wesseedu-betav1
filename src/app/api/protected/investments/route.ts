import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/utils/cookieManager';

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient(req);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('investments')
      .select(`
        id,
        amount,
        investment_date,
        notes,
        companies(id, name)
      `)
      .eq('user_id', session.user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ investments: data });
  } catch (error) {
    console.error('Error fetching investments:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient(req);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { company_id, amount, notes } = await req.json();

    if (!company_id || !amount) {
      return NextResponse.json({ error: 'Company ID and amount are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('investments')
      .insert({
        user_id: session.user.id,
        company_id,
        amount,
        notes,
        investment_date: new Date().toISOString(),
      })
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ investment: data[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating investment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}