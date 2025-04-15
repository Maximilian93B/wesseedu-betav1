import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

/**
 * Helper function to create a handler for authentication errors
 * This creates a consistent way to handle 401 errors across components
 * 
 * @returns An auth error handler function
 */
export function useAuthErrorHandler() {
  const { signOut } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  return (message?: string) => {
    toast({
      title: "Authentication Error",
      description: message || "Your session has expired. Please sign in again.",
      variant: "destructive",
    });
    
    // Use the global sign out function
    signOut();
  };
}

/**
 * Handles a 401 status from API responses
 * 
 * @param status The HTTP status code from the response
 * @param handler The auth error handler (from useAuthErrorHandler)
 * @returns True if an auth error was handled, false otherwise
 */
export function handleAuthStatus(status: number, handler: ReturnType<typeof useAuthErrorHandler>): boolean {
  if (status === 401) {
    handler();
    return true;
  }
  return false;
} 