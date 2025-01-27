import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      memoryLimit: 4 * 1024 * 1024 * 1024,
      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
      ],
      treeShaking: true,
      useSwc: true,
      cache: true,
      moduleIdStrategy: 'deterministic',
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
      resolveAlias: {
        components: './src/components',
        utils: './src/app/utils',
      },
      reactStrictMode: true,
      useSwcCss: true,
      webpack5: true,
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
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    ],
  },
  async redirects() {
    return [
      { source: '/email', destination: '/api/email', permanent: true },
      { source: '/example', destination: 'https://example.com/', permanent: true },
    ];
  },
};

export default withMDX(nextConfig);