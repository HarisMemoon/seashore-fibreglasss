/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@seashore/ui', '@seashore/content', '@seashore/types', 'leaflet', 'react-leaflet'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
};

module.exports = nextConfig;
