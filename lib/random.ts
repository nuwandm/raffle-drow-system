/**
 * Generate a cryptographically secure random integer in range [0, maxExclusive)
 * Uses Web Crypto API for better randomness than Math.random()
 */
export function cryptoRandomInt(maxExclusive: number): number {
  if (maxExclusive <= 0) {
    throw new Error('maxExclusive must be greater than 0');
  }

  // Use crypto.getRandomValues for secure randomness
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);

  return array[0] % maxExclusive;
}

/**
 * Pick a random element from an array using crypto randomness
 */
export function cryptoRandomElement<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  const index = cryptoRandomInt(array.length);
  return array[index];
}
