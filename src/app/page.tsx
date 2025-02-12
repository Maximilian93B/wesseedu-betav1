import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import './globals.css';

// Force Next.js to treat this route as dynamic (not statically generated)
export const dynamic = 'force-dynamic';

export default async function Home() {
  const cookieStore = await cookies();

  const supabase = createServerComponentClient({ 
    cookies: () => cookieStore
  });

  const { data: { user } } = await supabase.auth.getUser();
 
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-8 text-center bg-gradient-to-b from-white to-gray-50">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to WeSeedU
          {user && `, ${user.email}`}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connecting investors with innovative companies. Discover, invest, and grow together.
        </p>
        <div className="space-x-4">
          {user ? (
            <Link 
              href="/dashboard" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link 
                href="/companies" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Companies
              </Link>
              <Link 
                href="/auth/signup" 
                className="inline-block border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </section>

    </div>
  );
}
