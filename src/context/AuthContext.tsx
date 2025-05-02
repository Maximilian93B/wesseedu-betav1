"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User, Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import authConfig from '@/config/auth.config';

interface AuthContextType {
  user: User | null;
  profile: any | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
  isAuthenticated: boolean;
}

// Export the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple cache for profile data to avoid repeated fetches
const profileCache = new Map<string, any>();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  
  // Single emergency timeout to prevent infinite loading
  const emergencyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to fetch user profile data with caching
  const fetchUserProfile = useCallback(async (userId: string) => {
    console.log("AuthContext: Fetching profile for user:", userId);
    
    // Check cache first
    if (profileCache.has(userId)) {
      console.log("AuthContext: Using cached profile");
      return profileCache.get(userId);
    }
    
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
      
      console.log("AuthContext: Profile fetch successful");
      
      // Cache the profile data
      if (data) {
        profileCache.set(userId, data);
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
      console.log("AuthContext: Signing out user");
      await supabase.auth.signOut();
      
      // Clear state
      setUser(null);
      setProfile(null);
      setSession(null);
      setIsAuthenticated(false);
      
      // Clear cache
      profileCache.clear();
      
      // Navigate to home
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
      
      // Force refresh the session
      const { data: { session: refreshedSession }, error } = 
        await supabase.auth.refreshSession();
      
      if (error || !refreshedSession) {
        console.error('AuthContext: Failed to refresh session:', error);
        return false;
      }
      
      console.log('AuthContext: Session refreshed successfully');
      
      setSession(refreshedSession);
      setUser(refreshedSession.user);
      
      // If we have a user, fetch their profile
      if (refreshedSession.user) {
        const profileData = await fetchUserProfile(refreshedSession.user.id);
        if (profileData) {
          setProfile(profileData);
        }
        setIsAuthenticated(true);
      }
      
      return true;
    } catch (error) {
      console.error('AuthContext: Error refreshing session:', error);
      return false;
    }
  };

  // Initialize auth state only once on component mount
  useEffect(() => {
    let isMounted = true;
    console.log("AuthContext: Initializing auth");
    
    // Set emergency timeout (10 seconds)
    emergencyTimeoutRef.current = setTimeout(() => {
      console.log("AuthContext: EMERGENCY - Auth initialization timed out");
      if (isMounted) {
        setLoading(false);
      }
    }, 10000);
    
    const initializeAuth = async () => {
      try {
        // Handle dev bypass if enabled
        if (!authConfig.isAuthEnabled && authConfig.devBypassEmail) {
          console.log(`Auth: DEV MODE - Using dev bypass with email ${authConfig.devBypassEmail}`);
          
          // Set mock user for development
          const mockUser = {
            id: 'dev-user-id',
            email: authConfig.devBypassEmail,
            app_metadata: {},
            user_metadata: { name: 'Development User' },
            aud: 'authenticated',
            created_at: new Date().toISOString()
          } as unknown as User;
          
          // Set mock session
          const mockSession = {
            access_token: 'dev-token',
            refresh_token: 'dev-refresh-token',
            expires_in: 3600,
            expires_at: Math.floor(Date.now() / 1000) + 3600,
            token_type: 'bearer',
            user: mockUser
          } as Session;
          
          if (isMounted) {
            setUser(mockUser);
            setSession(mockSession);
            setProfile({ id: 'dev-user-id', name: 'Development User' });
            setIsAuthenticated(true);
            setLoading(false);
          }
          return;
        }
        
        // Get current session
        console.log("Auth: Checking for existing session");
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (currentSession) {
          console.log("Auth: Found existing session for user:", currentSession.user.id);
          
          if (isMounted) {
            setSession(currentSession);
            setUser(currentSession.user);
            
            // Fetch profile data
            const profileData = await fetchUserProfile(currentSession.user.id);
            if (profileData) {
              setProfile(profileData);
            }
            
            setIsAuthenticated(true);
          }
        } else {
          console.log("Auth: No active session found");
          if (isMounted) {
            setUser(null);
            setProfile(null);
            setSession(null);
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error("Auth: Error during initialization:", error);
        if (isMounted) {
          setUser(null);
          setProfile(null);
          setSession(null);
          setIsAuthenticated(false);
        }
      } finally {
        // Clear emergency timeout
        if (emergencyTimeoutRef.current) {
          clearTimeout(emergencyTimeoutRef.current);
          emergencyTimeoutRef.current = null;
        }
        
        if (isMounted) {
          console.log("Auth: Initialization complete");
          setLoading(false);
        }
      }
    };
    
    initializeAuth();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Auth: State change event:", event);
        
        if (event === 'SIGNED_IN' && newSession) {
          console.log("Auth: User signed in:", newSession.user.id);
          if (isMounted) {
            setSession(newSession);
            setUser(newSession.user);
            
            // Fetch profile data
            const profileData = await fetchUserProfile(newSession.user.id);
            if (profileData) {
              setProfile(profileData);
            }
            
            setIsAuthenticated(true);
          }
        } 
        // Cast event to string for the USER_DELETED check to bypass potential type mismatch issues
        else if (event === 'SIGNED_OUT' || (event as string) === 'USER_DELETED') {
          console.log("Auth: User signed out or deleted");
          if (isMounted) {
            setUser(null);
            setProfile(null);
            setSession(null);
            setIsAuthenticated(false);
            profileCache.clear();
          }
        }
        else if (event === 'TOKEN_REFRESHED' && newSession) {
          console.log("Auth: Session token refreshed");
          if (isMounted) {
            setSession(newSession);
            
            // Make sure user data is up-to-date
            if (newSession.user.id !== user?.id) {
              setUser(newSession.user);
              const profileData = await fetchUserProfile(newSession.user.id);
              if (profileData) {
                setProfile(profileData);
              }
              setIsAuthenticated(true);
            }
          }
        }
      }
    );
    
    return () => {
      console.log("AuthContext: Cleaning up");
      isMounted = false;
      
      // Clear emergency timeout if it exists
      if (emergencyTimeoutRef.current) {
        clearTimeout(emergencyTimeoutRef.current);
      }
      
      // Unsubscribe from auth state changes
      subscription.unsubscribe();
    };
  }, [fetchUserProfile, supabase.auth, router, user]);

  const value = {
    user,
    profile,
    session,
    loading,
    signOut,
    refreshSession,
    isAuthenticated
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