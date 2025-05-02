import { useAuth } from "@/hooks/use-auth";

/**
 * Helper function to create a handler for authentication errors
 * This creates a consistent way to handle 401 errors across components
 * 
 * @returns An auth error handler function
 */
export function useAuthErrorHandler() {
  const { handleAuthError } = useAuth();
  return handleAuthError;
}

/**
 * Handles a 401 status from API responses
 * 
 * @param status The HTTP status code from the response
 * @param handler The auth error handler (from useAuthErrorHandler or useAuth().handleAuthError)
 * @param errorData Optional error data from the response
 * @returns True if an auth error was handled, false otherwise
 */
export function handleAuthStatus(
  status: number, 
  handler: (message: string, options?: { redirect?: string }) => void,
  errorData?: any
): boolean {
  if (status === 401) {
    const message = errorData?.message || "Your session has expired. Please sign in again.";
    handler(message);
    return true;
  }
  
  if (status === 403) {
    handler("You don't have permission to access this resource", { redirect: "/" });
    return true;
  }
  
  return false;
} 