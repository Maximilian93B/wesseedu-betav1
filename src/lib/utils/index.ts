import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Export auth utilities
export { fetchWithAuth } from './fetchWithAuth'
export { checkAuth } from './authCheck'
export { useAuthErrorHandler, handleAuthStatus } from './handleAuthError'
export { checkDashboardAuth } from './dashboardAuthCheck'

// Deprecated exports (kept for backward compatibility)
export { useDashboardAuthCheck } from './dashboardAuthCheck'
