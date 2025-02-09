// app/dashboard/page.tsx
'use client';

import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { supabaseClient } from '@/lib/supabase/supabaseClient';

export default function DashboardPage() {
  const user = useUser();
  const router = useRouter();
  const supabase = supabaseClient;

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}</p>
      
      <div>
        <button onClick={() => router.push('/companies')}>Companies</button>
      </div>
      
      
      
      
      
      
      <div>
        <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
      </div>

      {/* Additional dashboard content can go here */}
    </div>
  );
}
