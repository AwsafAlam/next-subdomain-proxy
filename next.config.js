/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');

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
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/blog',
          destination: 'https://blog.boomershub.com',
        },
        {
          source: '/blog/:path*',
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
  // === ---
  // async rewrites() {
  //   return [
  //     {
  //       source: '/blog/category/resources',
  //       destination: 'https://blog.boomershub.com',
  //     },
  //     {
  //       source: '/blog/sitemap.xml',
  //       destination: 'https://blog.boomershub.com/sitemap.xml',
  //     },
  //     {
  //       source: '/blog',
  //       destination: 'https://blog.boomershub.com',
  //     },
  //     {
  //       source: '/:path*',
  //       has: [
  //         {
  //           type: 'host',
  //           value: 'blog.boomershub.com',
  //         },
  //       ],
  //       destination: '/blog/:path*',
  //     },
  //   ];
  // },
  // ------=========---
  //   return {
  //     beforeFiles: [
  //       {
  //         source: '/:path*',
  //         has: [
  //           {
  //             type: 'host',
  //             value: 'blog.boomershub.com',
  //           },
  //         ],
  //         destination: '/blog/:path*',
  //       },
  //       {
  //         source: '/blog',
  //         destination: 'https://blog.boomershub.com',
  //       },
  //     ],
  //   };
  // },
  sentry: {
    hideSourceMaps: false,
    autoInstrumentServerFunctions: true,
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

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);

// module.exports = withBundleAnalyzer(nextConfig);
// module.exports = nextConfig;
