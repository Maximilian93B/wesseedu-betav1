// app/providers.tsx
// This file is used to provide the supabase client to the app
// it is used to wrap the app in a session provider
'use client';

import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabaseClient } from '@/lib/supabase/supabaseClient';


export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
}

