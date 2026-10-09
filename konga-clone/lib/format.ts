export function naira(amount: number) {
  return '₦' + Math.round(amount).toLocaleString('en-NG');
}

export function discount(price: number, oldPrice?: number) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}
