'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  // ✅ Ensure Supabase client is correctly initialized
  const [supabaseClient] = useState(() => createClientComponentClient());


  return (
    <ThemeProvider>
      <SessionContextProvider supabaseClient={supabaseClient}>
        {children}
        <Toaster />
      </SessionContextProvider>
    </ThemeProvider>
  );
}

export default Providers;