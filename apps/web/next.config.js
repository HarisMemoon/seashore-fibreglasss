/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@seashore/ui', '@seashore/content', '@seashore/types', 'leaflet', 'react-leaflet'],
  images: {
    // Default deviceSizes minus the 3840 candidate — no display on the site
    // needs a 4K variant, and the extra srcset entries bloat every page's HTML.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
};

module.exports = nextConfig;
