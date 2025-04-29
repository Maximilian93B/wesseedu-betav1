// Auth configuration file
interface AuthConfig {
  isAuthEnabled: boolean;
  devBypassEmail?: string; // Optional dev account for testing
}

const authConfig: AuthConfig = {
  // Enable auth if in production OR if ENABLE_AUTH_IN_DEV is set to 'true'
  isAuthEnabled: process.env.NODE_ENV === 'production' || process.env.ENABLE_AUTH_IN_DEV === 'true',
  devBypassEmail: process.env.DEV_BYPASS_EMAIL || 'mxa.md.bosch@gmail.com',
};

export default authConfig; 