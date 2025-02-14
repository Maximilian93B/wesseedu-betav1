import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const { email, password } = await request.json();
    
    // Create supabase client with await
    const supabase = createRouteHandlerClient({ 
      cookies: () => cookieStore 
    });

    // Attempt to sign in
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 401 }
      );
    }

    // Get authenticated user data securely
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      );
    }

    // Check for user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      return NextResponse.json(
        { error: 'Error checking profile status' },
        { status: 500 }
      );
    }

    const response = NextResponse.json({
      user,
      hasProfile: !!profile,
      profile: profile,
    });

    // redirect URL to /home
    response.headers.set('Location', '/Home');
    response.headers.set('status', '301');


    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 