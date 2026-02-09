// Get the base path for assets
// This matches the basePath in next.config.ts
export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/raffle-drow-system' : '';

// Helper function to get asset path
export function getAssetPath(path: string): string {
  return `${BASE_PATH}${path}`;
}
