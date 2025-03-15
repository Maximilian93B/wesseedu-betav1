let userConfig = undefined
try {
  userConfig = require('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  webpack: (config, { isServer }) => {
    // For THREE.js support
    config.externals = [...config.externals, { canvas: 'canvas' }]
    
    // Only apply these optimizations on client-side bundles
    if (!isServer) {
      // Fix for the "self is not defined" error
      config.output.globalObject = 'globalThis';
      
      // Basic optimization for Three.js on client only
      config.resolve.alias = {
        ...config.resolve.alias,
        'three/addons': 'three/examples/jsm',
      }
      
      // Client-side optimizations only
      config.optimization = {
        ...config.optimization,
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              chunks: 'all',
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|framer-motion)[\\/]/,
              priority: 40,
              enforce: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              chunks: 'all',
              priority: 20,
            },
          },
        },
      }
    } else {
      // Server-specific settings (minimal to avoid conflicts)
      config.resolve.alias = {
        ...config.resolve.alias,
        'three/addons': 'three/examples/jsm',
      }
    }
    
    return config
  }
}

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

mergeConfig(nextConfig, userConfig)

module.exports = nextConfig 