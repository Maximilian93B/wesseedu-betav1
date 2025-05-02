"use client"

import { ReactNode } from "react"
import { AuthProvider } from "@/context/AuthContext"
import { useAuth } from "@/hooks/use-auth"
import { LoadingScreen } from "@/components/wsu/home"
import { LoginRequired } from "@/components/wsu/home"

// A wrapper that provides auth context and handles loading/unauthenticated states
export function AuthWrapper({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <LoadingScreen />
  }
  
  if (!user) {
    return <LoginRequired />
  }
  
  return <>{children}</>
}

// HOC to wrap pages with AuthProvider
export function withAuthProvider<P extends object>(Component: React.ComponentType<P>) {
  function WithAuthProvider(props: P) {
    return (
      <AuthProvider>
        <AuthWrapper>
          <Component {...props} />
        </AuthWrapper>
      </AuthProvider>
    )
  }
  
  const displayName = Component.displayName || Component.name || 'Component'
  WithAuthProvider.displayName = `withAuthProvider(${displayName})`
  
  return WithAuthProvider
}

// Function to use directly in component tree (instead of HOC pattern)
export function WithAuth({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AuthWrapper>
        {children}
      </AuthWrapper>
    </AuthProvider>
  )
} 