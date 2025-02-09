// Auth configuration file
interface AuthConfig {
  isAuthEnabled: boolean;
  devBypassEmail?: string; // Optional dev account for testing
}

const authConfig: AuthConfig = {
  isAuthEnabled: process.env.NODE_ENV === 'production', // Automatically disable in non-prod
  devBypassEmail: process.env.DEV_BYPASS_EMAIL || 'dev@weseedu.com',
};

export default authConfig; 