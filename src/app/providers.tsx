'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  // ✅ Ensure Supabase client is correctly initialized
  const [supabaseClient] = useState(() => createClientComponentClient());

  return (
    <ThemeProvider>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </SessionContextProvider>
    </ThemeProvider>
  );
}

export default Providers;