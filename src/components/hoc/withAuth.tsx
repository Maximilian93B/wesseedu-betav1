import React from 'react';
import { useAuthGuard } from '@/hooks/use-auth-guard';
import { LoadingScreen } from '@/components/wsu/home';

interface WithAuthOptions {
  redirectTo?: string;
  LoadingComponent?: React.ComponentType;
}

/**
 * Higher-order component to protect routes that require authentication
 * Shows loading screen during auth check and redirects if not authenticated
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const {
    redirectTo = '/auth/login',
    LoadingComponent = LoadingScreen
  } = options;

  const WithAuthComponent = (props: P) => {
    const { loading, isAuthenticated } = useAuthGuard({
      redirectTo,
      requireAuth: true,
    });

    // Show loading screen while checking authentication
    if (loading) {
      return <LoadingComponent />;
    }

    // If authenticated, render the protected component
    if (isAuthenticated) {
      return <Component {...props} />;
    }

    // If not loading and not authenticated, useAuthGuard will handle redirection
    // This is a fallback in case the redirect hasn't happened yet
    return <LoadingComponent />;
  };

  // Add displayName for easier debugging
  const displayName = Component.displayName || Component.name || 'Component';
  WithAuthComponent.displayName = `withAuth(${displayName})`;

  return WithAuthComponent;
} 