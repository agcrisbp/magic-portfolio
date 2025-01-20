import mdx from '@next/mdx';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    turbo: {
      // Set memory limit for Turbo
      memoryLimit: 4 * 1024 * 1024 * 1024, // 4GB in bytes
      
      // Define custom extensions for module resolution
      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
      ],

      // Enable tree shaking for removing unused code
      treeShaking: true,

      // Enable SWC for faster JavaScript and TypeScript compilation
      useSwc: true,

      // Enable caching to speed up builds and development
      cache: true,

      // Customize the module ID strategy (options: 'named', 'deterministic')
      moduleIdStrategy: 'deterministic', // Ensures long-term caching

      // Configure custom rules for loaders (e.g., for MDX, SVG files, etc.)
      rules: {
        '*.mdx': [
          {
            loader: '@mdx-js/loader',
            options: {},
          },
        ],
        '*.svg': [
          {
            loader: '@svgr/webpack',
            options: {},
          },
        ],
      },

      // Resolve alias for module imports
      resolveAlias: {
        components: './src/components',
        utils: './src/app/utils',
      },

      // Enable React's strict mode in development
      reactStrictMode: true,

      // Set up specific loaders for CSS (can use SWC for CSS handling)
      useSwcCss: true,
      
      // Enable Webpack 5 support for certain configurations
      webpack5: true,

      // Enable incremental compilation (improves performance)
      incremental: true,
    },
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'cdn.discordapp.com' },
      { protocol: 'https', hostname: 'i.scdn.co' },
      { protocol: 'https', hostname: 'media.discordapp.net' },
      { protocol: 'https', hostname: 'image-cdn-ak.spotifycdn.com' },
      { protocol: 'https', hostname: 'image-cdn-fa.spotifycdn.com' },
      { protocol: 'https', hostname: 'mosaic.scdn.co' },
    ],
  },

  async redirects() {
    return [
      { source: '/example', destination: 'https://example.com', permanent: true },
      { source: '/email', destination: '/api/email', permanent: true },
    ];
  },
};

export default withMDX(nextConfig);