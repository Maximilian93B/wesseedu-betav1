import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/api/**',
      },
    ],
  },
};

declare module 'next' {
  interface NextApiRequest {
    user?: {
      email: string;
      role: string;
    }
  }
}

export default nextConfig;
