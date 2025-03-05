# WeSeedU Authentication System

## Overview

The WeSeedU application uses a consolidated authentication system based on Supabase Auth. The system consists of several key components that work together to provide a seamless authentication experience.

## Key Components

### 1. AuthContext (src/context/AuthContext.tsx)

This is the central component of the authentication system. It:

- Provides a React context for authentication state
- Manages user, session, and authentication state
- Handles login and logout operations
- Refreshes the session when needed
- Integrates with auth.config.ts for development bypass options

### 2. use-auth.ts Hook (src/hooks/use-auth.ts)

This hook is a wrapper around the AuthContext that:

- Provides a convenient way to access the authentication context
- Adds additional functionality like signOut (an alias for logout)
- Ensures components are using the AuthContext correctly

### 3. use-login.ts Hook (src/hooks/use-login.ts)

This specialized hook handles the login process by:

- Managing the loading state during login
- Handling server-side login via the API
- Updating the client-side session via the AuthContext
- Managing redirects after successful login
- Providing error handling and user feedback

### 4. Login API Route (src/app/api/auth/login/route.ts)

This server-side component:

- Handles authentication requests
- Sets the necessary cookies for Supabase Auth
- Determines the appropriate redirect URL based on user profile
- Manages cookie expiry based on "Remember Me" option

### 5. LoginForm Component (src/components/wsu/LoginForm.tsx)

This UI component:

- Provides the login form interface
- Manages form state and validation
- Uses the use-login hook for authentication
- Provides user feedback during the login process
- Offers a manual navigation option if automatic redirect fails

### 6. auth.config.ts (src/config/auth.config.ts)

This configuration file:

- Controls whether authentication is enabled (automatically disabled in development)
- Provides a development bypass email for testing

## Authentication Flow

1. User enters credentials in the LoginForm
2. LoginForm calls the login function from use-login.ts
3. use-login.ts makes a server-side login request to /api/auth/login
4. The login API route authenticates with Supabase and sets cookies
5. use-login.ts then updates the client-side session via AuthContext
6. After successful login, the user is redirected to the appropriate page

## Recent Changes

We've consolidated two separate authentication systems into a single, coherent system:

1. Removed duplicate state management by making use-auth.ts a wrapper around AuthContext
2. Ensured consistent usage of authentication across components
3. Improved the login flow to work with both server-side and client-side authentication
4. Integrated auth.config.ts for development bypass options
5. Enhanced error handling and user feedback during the login process

## Development Mode

In development mode, authentication can be bypassed by:

1. Setting NODE_ENV to anything other than 'production'
2. Using the email specified in auth.config.ts (default: dev@weseedu.com)

This allows for easier testing and development without needing to authenticate each time. 