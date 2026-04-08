/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@seashore/ui', '@seashore/content', '@seashore/types', 'leaflet', 'react-leaflet'],
};

module.exports = nextConfig;
