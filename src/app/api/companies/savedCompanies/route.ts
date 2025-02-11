import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Pass the cookies function directly instead of calling await cookies()
    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase
      .from('company_saves')
      .select(`
        id,
        company_id,
        created_at,
        companies:companies (
          id,
          name,
          description,
          mission_statement,
          score,
          pitch_deck_url,
          sustainability_data,
          financials
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    const validSavedCompanies = data?.filter((save) => save.companies !== null) || [];
    return NextResponse.json({ 
      success: true,
      savedCompanies: validSavedCompanies 
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}