/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn-boomershub.s3.amazonaws.com'],
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  rewrites() {
    return {
      beforeFiles: [
        {
          source: '/blog',
          destination: 'https://blog.boomershub.com',
        },
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'blog.boomershub.com',
            },
          ],
          destination: '/blog/:path*',
        },
      ],
    };
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  env: {
    API_URL: process.env.API_URL,
  },
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};

// module.exports = withBundleAnalyzer(nextConfig);
module.exports = nextConfig;
