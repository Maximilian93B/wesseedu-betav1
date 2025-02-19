// app/api/apply/[companyId]/route.ts
import { NextResponse } from 'next/server';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(
  request: Request,
  { params }: { params: { companyId: string } }
) {
  try {
    const supabase = createServerActionClient({ cookies });
    const { funding_amount, message, applicant_id } = await request.json();
    const companyId = params.companyId;

    // Insert funding application into the funding_applications table
    const { data, error } = await supabase
      .from('funding_applications')
      .insert([
        {
          company_id: companyId,
          applicant_id,
          funding_amount,
          message,
          status: 'pending',
        },
      ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Application submitted successfully', data },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
