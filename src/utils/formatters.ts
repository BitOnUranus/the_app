/**
 * Format a price in cents to a human-readable string with currency symbol
 * @param priceInCents Price in cents
 * @returns Formatted price string
 */
export const formatPrice = (priceInCents: number): string => {
  return `₹${(priceInCents / 100).toLocaleString('en-IN')}`;
};