import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/utils/cookieManager';

export const dynamic = 'force-dynamic'
type RouteParams = {
  params: {
    companyId: string;
  };
};

export async function GET(req: NextRequest, context: RouteParams) {
  const companyId = context.params.companyId;
  console.log('Company ID:', companyId);

  try {
    const supabase = await createClient(req);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the company's pitch deck URL from the database
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('pitch_deck_url')
      .eq('id', companyId)
      .single();

    if (companyError || !company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    if (!company.pitch_deck_url) {
      return NextResponse.json({ error: 'No pitch deck available' }, { status: 404 });
    }

    console.log('Stored pitch deck URL:', company.pitch_deck_url);

    // Get the storage URL from environment variables
    let storageUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL || '';
    // Remove '/s3' if it appears on the end of the storage URL so that it matches
    // the pattern of the signed URL (which uses /object/sign/…)
    if (storageUrl.endsWith('/s3')) {
      storageUrl = storageUrl.replace('/s3', '');
    }

    const bucketName = process.env.NEXT_PUBLIC_STORAGE_BUCKET;

    let filePath = '';
    // Check for a signed URL format
    if (company.pitch_deck_url.includes(`/object/sign/${bucketName}/`)) {
      const splitToken = `${storageUrl}/object/sign/${bucketName}/`;
      const parts = company.pitch_deck_url.split(splitToken);

      if (parts.length < 2) {
        return NextResponse.json({ error: 'Invalid pitch deck URL format' }, { status: 400 });
      }
      // Remove any query parameters from the file path.
      filePath = parts[1].split('?')[0];
    }
  
    console.log('Extracted file path:', filePath);

    // Generate a new signed URL valid for 3600 seconds (1 hour)
    const { data: signedUrl, error: storageError } = await supabase
      .storage
      .from(bucketName!)
      .createSignedUrl(filePath, 3600);

    if (storageError || !signedUrl) {
      console.error('Storage error:', storageError);
      return NextResponse.json({ error: 'File not found in storage' }, { status: 404 });
    }

    // Return the generated signed URL so the client can download the PDF
    return NextResponse.json({ url: signedUrl.signedUrl });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
