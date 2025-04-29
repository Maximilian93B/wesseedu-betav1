"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User, Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import authConfig from '@/config/auth.config';

interface AuthContextType {
  user: User | null;
  profile: any | null; // Add profile data
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
}

// Export the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const router = useRouter();

  // Function to fetch user profile data
  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      
      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
      return null;
    }
  }, [supabase]);

  // Sign out function
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setSession(null);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Refresh session function
  const refreshSession = async () => {
    try {
      console.log('AuthContext: Refreshing session');
      const { data: { session: refreshedSession } } = await supabase.auth.getSession();
      
      // If session exists, update the session state and verify the user
      if (refreshedSession) {
        setSession(refreshedSession);
        await verifyAndSetUser();
        return true;
      }
      return false;
    } catch (error) {
      console.error('AuthContext: Error refreshing session:', error);
      return false;
    }
  };

  // Function to verify and set user
  const verifyAndSetUser = useCallback(async () => {
    try {
      // Always verify user with getUser() first
      const { data: { user: verifiedUser }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !verifiedUser) {
        console.log("Auth: User verification failed or no user found");
        setUser(null);
        setProfile(null);
        setSession(null);
        return false;
      }

      setUser(verifiedUser);
      
      // Fetch and set profile data
      const profileData = await fetchUserProfile(verifiedUser.id);
      if (profileData) {
        setProfile(profileData);
      }
      
      return true;
    } catch (error) {
      console.error("Auth: Error verifying user:", error);
      return false;
    }
  }, [supabase.auth, fetchUserProfile]);

  useEffect(() => {
    let mounted = true;
    console.log("AuthContext: Initializing auth context");

    async function initializeAuth() {
      try {
        // Handle dev bypass if enabled
        if (!authConfig.isAuthEnabled && authConfig.devBypassEmail) {
          console.log(`Auth: Using dev bypass with email ${authConfig.devBypassEmail}`);
          // Set mock user for development
          setUser({ 
            id: 'dev-user-id',
            email: authConfig.devBypassEmail,
            app_metadata: {},
            user_metadata: { name: 'Development User' },
            aud: 'authenticated',
            created_at: new Date().toISOString()
          } as unknown as User);
          // Also set a mock session for API calls
          setSession({
            access_token: 'dev-token',
            refresh_token: 'dev-refresh-token',
            expires_in: 3600,
            expires_at: new Date().getTime() + 3600000,
            token_type: 'bearer',
            user: {
              id: 'dev-user-id',
              email: authConfig.devBypassEmail
            } as unknown as User
          } as Session);
          setLoading(false);
          return;
        }
        
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (currentSession) {
          const isUserVerified = await verifyAndSetUser();
          if (isUserVerified && mounted) {
            setSession(currentSession);
          } else if (mounted) {
            // If user verification fails, clear session and sign out
            setSession(null);
            await supabase.auth.signOut();
          }
        } else if (mounted) {
          setUser(null);
          setProfile(null);
          setSession(null);
        }
      } catch (error) {
        console.error("Auth: Error during initialization:", error);
        if (mounted) {
          setUser(null);
          setProfile(null);
          setSession(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Auth: State change event:", event);

        if (event === 'SIGNED_OUT') {
          if (mounted) {
            setUser(null);
            setProfile(null);
            setSession(null);
            setLoading(false);
          }
          return;
        }

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (mounted) {
            setLoading(true); // Set loading while we verify
          }
          
          const isUserVerified = await verifyAndSetUser();
          if (mounted) {
            if (isUserVerified && newSession) {
              setSession(newSession);
            } else if (newSession === null) {
              setSession(null);
              setUser(null);
              setProfile(null);
            }
            setLoading(false);
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase.auth, router, verifyAndSetUser]);

  const value = {
    user,
    profile,
    session,
    loading,
    signOut,
    refreshSession
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Export the hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 