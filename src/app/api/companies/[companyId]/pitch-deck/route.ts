import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(_request: Request, context: { params: { companyId: string } }) {
  // Await the dynamic parameter directly
  const companyId = await Promise.resolve(context.params.companyId);
  console.log('Company ID:', companyId);

  try {
    // Fetch company details including the pitch deck URL
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('id, pitch_deck_url')
      .eq('id', companyId)
      .single();

    if (companyError || !company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    if (!company.pitch_deck_url) {
      return NextResponse.json({ error: 'No pitch deck available' }, { status: 404 });
    }

  
    
   
    const bucketName = process.env.NEXT_PUBLIC_STORAGE_BUCKET; // should be "weSeedU-pitch-decks"
    const splitToken = `/storage/v1/object/sign/${bucketName}/`;
    const parts = company.pitch_deck_url.split(splitToken);

    if (parts.length < 2) {
      return NextResponse.json({ error: 'Invalid pitch deck URL format' }, { status: 400 });
    }

    // Remove any query parameters
    const filePathWithQuery = parts[1];
    const filePath = filePathWithQuery.split('?')[0];
    console.log('Extracted file path:', filePath);

    // Generate a signed URL valid for 3600 seconds (1 hour)
    const { data: signedUrl, error: storageError } = await supabase
      .storage
      .from(bucketName!)
      .createSignedUrl(filePath, 3600);

    if (storageError || !signedUrl) {
      console.error('Storage error details:', storageError);
      return NextResponse.json({ error: 'File not found in storage' }, { status: 404 });
    }

    return NextResponse.json({ url: signedUrl.signedUrl });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
