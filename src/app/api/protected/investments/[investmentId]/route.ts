import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/utils/cookieManager';

export async function GET(
  req: NextRequest,
  { params }: { params: { investmentId: string } }
) {
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
      .eq('id', params.investmentId)
      .eq('user_id', session.user.id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Investment not found' }, { status: 404 });
    }

    return NextResponse.json({ investment: data });
  } catch (error) {
    console.error('Error fetching investment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { investmentId: string } }
) {
  try {
    const supabase = await createClient(req);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { amount, notes } = await req.json();

    // Verify the investment belongs to the user
    const { data: existingInvestment, error: fetchError } = await supabase
      .from('investments')
      .select('id')
      .eq('id', params.investmentId)
      .eq('user_id', session.user.id)
      .single();

    if (fetchError || !existingInvestment) {
      return NextResponse.json({ error: 'Investment not found' }, { status: 404 });
    }

    const updates: any = {
      updated_at: new Date().toISOString()
    };

    if (amount !== undefined) updates.amount = amount;
    if (notes !== undefined) updates.notes = notes;

    const { data, error } = await supabase
      .from('investments')
      .update(updates)
      .eq('id', params.investmentId)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ investment: data[0] });
  } catch (error) {
    console.error('Error updating investment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { investmentId: string } }
) {
  try {
    const supabase = await createClient(req);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the investment belongs to the user
    const { data: existingInvestment, error: fetchError } = await supabase
      .from('investments')
      .select('id')
      .eq('id', params.investmentId)
      .eq('user_id', session.user.id)
      .single();

    if (fetchError || !existingInvestment) {
      return NextResponse.json({ error: 'Investment not found' }, { status: 404 });
    }

    const { error } = await supabase
      .from('investments')
      .delete()
      .eq('id', params.investmentId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting investment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}