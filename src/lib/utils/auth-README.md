# Authentication Architecture

This document explains the authentication architecture in the WeSeeEdu application.

## Core Authentication Components

### 1. Auth Context (`/context/AuthContext.tsx`)
- Provides global authentication state
- Handles session management with Supabase
- Used by the unified `useAuth` hook

### 2. Unified Auth Hook (`/hooks/use-auth.ts`)
- **Primary hook for all authentication needs**
- Combines functionality from multiple hooks
- Features:
  - User authentication state
  - Route protection
  - Login functionality
  - Error handling
  - Redirects

### 3. Server-Side Auth Check (`/lib/utils/authCheck.ts`)
- Used in API routes to verify authentication
- Handles development mode bypass
- Includes rate limiting for failed attempts

### 4. Authenticated Fetch (`/lib/utils/fetchWithAuth.ts`)
- Makes authenticated API requests
- Automatically adds auth tokens
- Handles token refresh

## Usage Examples

### Client-Side Authentication
```tsx
import { useAuth } from '@/hooks/use-auth';

function MyProtectedComponent() {
  // Basic usage - will redirect if not authenticated
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return <div>Welcome, {user?.email}</div>;
}

function CustomAuthComponent() {
  // Custom auth options
  const { 
    user, 
    loading, 
    login, 
    loginLoading, 
    handleAuthError 
  } = useAuth({
    redirectTo: '/custom-login',
    requireAuth: true,
    checkOnMount: true
  });
  
  // Use login function
  const handleLogin = async () => {
    try {
      await login({ 
        email: 'user@example.com', 
        password: 'password' 
      });
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  
  return (/* component JSX */);
}
```

### Dashboard Authentication
```tsx
import { useAuth } from '@/hooks/use-auth';
import { checkDashboardAuth } from '@/lib/utils';

function DashboardPage() {
  const { user, loading } = useAuth();
  
  // Check if user can access dashboard
  const { isAuthorized, redirectUrl, message } = checkDashboardAuth(user, loading);
  
  if (loading) return <div>Loading...</div>;
  
  if (!isAuthorized && redirectUrl) {
    // Handle redirect or display message
    return <div>{message}</div>;
  }
  
  return <div>Dashboard Content</div>;
}
```

### Server-Side Authentication
```tsx
// In an API route
import { checkAuth } from '@/lib/utils';

export async function GET(request: Request) {
  // Check authentication
  const { error, authenticated, session, supabase } = await checkAuth();
  
  if (!authenticated) {
    return error; // Returns appropriate error response
  }
  
  // Proceed with authenticated request
  // session.user contains the user information
  // supabase client is authenticated
}
```

## Deprecated Components

The following components are deprecated and should be replaced with the unified approach:

- `useAuthGuard` → Use `useAuth` instead
- `useLogin` → Use `useAuth().login` instead
- `useDashboardAuthCheck` → Use `checkDashboardAuth` with `useAuth`

## Best Practices

1. Use the unified `useAuth` hook for all client-side authentication
2. Use `fetchWithAuth` for all authenticated API requests
3. Use `checkAuth` for server-side authentication in API routes
4. Keep auth checks consistent across the application 