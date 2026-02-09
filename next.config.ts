import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // basePath is automatically injected by actions/configure-pages
};

export default nextConfig;
