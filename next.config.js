/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  reactStrictMode: true,
  
  // Environment Variables Validation
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
  },

  // Image configuration for OpenGraph
  images: {
    domains: [
      'localhost',
      'domination.vercel.app',
      process.env.VERCEL_URL ? process.env.VERCEL_URL.split(':')[0] : '',
    ].filter(Boolean),
    formats: ['image/avif', 'image/webp'],
  },

  // Metadata configuration
  experimental: {
    typedRoutes: false,
    optimizePackageImports: ['components']
  },

  // Webpack configuration
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: "canvas" }];
    
    // Exclude examples directory
    if (config.module && config.module.rules) {
      config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /src\/app\/examples/,
        use: []
      });
    }
    
    return config;
  },

  // Additional security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  },

  // Redirects for proper URL handling
  async redirects() {
    return [
      {
        source: '/challenges',
        has: [
          {
            type: 'query',
            key: 'page',
            value: '1'
          }
        ],
        destination: '/challenges',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
