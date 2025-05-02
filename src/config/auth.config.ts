// Auth configuration file
interface AuthConfig {
  isAuthEnabled: boolean;
  devBypassEmail?: string; // Optional dev account for testing
}

// Function to check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Helper to safely read environment variables
const getEnvVariable = (name: string, fallback: string = ''): string => {
  if (isBrowser) {
    // In browser, try to get from window.__ENV__ if available
    const envObj = (window as any).__ENV__;
    return envObj && envObj[name] ? envObj[name] : fallback;
  }
  // In Node.js environment
  return process.env[name] || fallback;
};

// Determine authentication mode
const NODE_ENV = getEnvVariable('NODE_ENV', 'development');
const ENABLE_AUTH = getEnvVariable('ENABLE_AUTH_IN_DEV', 'false');

// In production, always enable auth and remove bypass
const isProduction = NODE_ENV === 'production';

// Only set DEV_EMAIL if not in production
const DEV_EMAIL = isProduction ? '' : getEnvVariable('DEV_BYPASS_EMAIL', '');

// For debugging - only in development
if (NODE_ENV !== 'production') {
  console.log('Auth config:', {
    env: NODE_ENV,
    authEnabled: isProduction || ENABLE_AUTH === 'true',
    bypassEmail: DEV_EMAIL
  });
}

const authConfig: AuthConfig = {
  // Enable auth if in production OR if ENABLE_AUTH_IN_DEV is set to 'true'
  isAuthEnabled: isProduction || ENABLE_AUTH === 'true',
  // Only set devBypassEmail in non-production environments
  ...(NODE_ENV !== 'production' && DEV_EMAIL && { devBypassEmail: DEV_EMAIL }),
};

export default authConfig; 