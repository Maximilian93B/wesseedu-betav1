
  // src/middleware.ts
  import { createMiddlewareClient, SupabaseClient } from '@supabase/auth-helpers-nextjs';
  import { NextResponse, NextRequest } from 'next/server';




  // Function to check user role
export const checkUserRole = async (supabase: SupabaseClient) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    
    const { data: userData } = await supabase
      .from('users')
      .select('user_type')
      .eq('id', session.user.id)
      .single();
  
    return userData?.user_type;
  };
  
// Middleware to check user role
  export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

  
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    // Protect admin routes
    if (req.nextUrl.pathname.startsWith('/auth/admin')) {
      if (!session) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }
  
      const { data: userData } = await supabase
        .from('users')
        .select('user_type')
        .eq('id', session.user.id)
        .single();
  
      if (userData?.user_type !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }
  
    return res;
  }
  
  export const config = {
    matcher: ['/auth/admin/:path*', '/dashboard/:path*'],
  };