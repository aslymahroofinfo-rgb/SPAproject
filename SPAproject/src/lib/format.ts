export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(value);
}

export function formatCategoryLabel(category: string): string {
  return category
    .split('-')
    .map((token) => `${token.charAt(0).toUpperCase()}${token.slice(1)}`)
    .join(' ');
}

export function discountedPrice(price: number, discountPercentage: number): number {
  const discount = (price * discountPercentage) / 100;
  return Math.max(price - discount, 0);
}

