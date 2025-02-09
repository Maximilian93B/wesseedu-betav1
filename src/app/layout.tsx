// app/layout.tsx
// This file is used to wrap the app in a supabase provider
// this allows us to use the supabase client in the app

import SupabaseProvider from './providers';
import './globals.css';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>WeSeedU</title>
      </head>
      <body>
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
