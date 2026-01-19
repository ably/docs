import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Page extensions (MDX handled via next-mdx-remote, not as pages)
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],

  // For static export compatibility
  images: {
    unoptimized: true,
  },

  // Preserve existing path structure
  basePath: '',

  // Enable trailing slash to match Gatsby behavior
  trailingSlash: false,

  // Transpile packages that need it
  transpilePackages: ['@ably/ui'],

  // Environment variables that should be available client-side
  env: {
    NEXT_PUBLIC_ABLY_MAIN_WEBSITE: process.env.NEXT_PUBLIC_ABLY_MAIN_WEBSITE || 'https://ably.com',
  },

  // Webpack configuration for compatibility
  webpack: (config, { isServer }) => {
    // Handle SVG imports - support both URL and React component
    // Use ?url suffix for URL imports, default to React component
    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: /url/, // *.svg?url
      type: 'asset/resource',
    });
    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: { not: /url/ }, // exclude *.svg?url
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // Redirects - these will be expanded from frontmatter during build
  async redirects() {
    return [
      {
        source: '/',
        destination: '/docs',
        permanent: true,
      },
    ];
  },

  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // Sentry webpack plugin options
  silent: true, // Suppresses source map upload logs during build
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
}, {
  // Sentry SDK options
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
});
