import type { NextConfig } from 'next';

// Determine base path for GitHub Pages
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/raffle-drow-system' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
