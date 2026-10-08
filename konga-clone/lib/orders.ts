import { getProduct, Product } from './data';

export type OrderLine = { slug: string; qty: number; price: number; oldPrice?: number };

export type Order = {
  id: string;
  placedAt: string; // ISO
  customer: { name: string; phone: string; email: string };
  address: string;
  deliveryMethod: 'Door Delivery' | 'Pickup Station';
  paymentMethod: string;
  paymentRef: string;
  lines: OrderLine[];
  shipping: number;
  discount: number; // KongaPay or promo discount
};

const STORAGE_KEY = 'konga-clone-orders';

export function orderTotals(order: Order) {
  const subtotal = order.lines.reduce((n, l) => n + l.price * l.qty, 0);
  const savings = order.lines.reduce((n, l) => n + (l.oldPrice ? (l.oldPrice - l.price) * l.qty : 0), 0) + order.discount;
  const total = subtotal + order.shipping - order.discount;
  // Nigerian VAT is 7.5% and prices are VAT-inclusive, so show the VAT portion of the total
  const vat = Math.round((total * 7.5) / 107.5);
  const items = order.lines.reduce((n, l) => n + l.qty, 0);
  return { subtotal, savings, total, vat, items };
}

export function lineProduct(line: OrderLine): Product | undefined {
  return getProduct(line.slug);
}

export function saveOrder(order: Order) {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    all[order.id] = order;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {}
}

export function loadOrder(id: string): Order | null {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return all[id] ?? null;
  } catch {
    return null;
  }
}

export function newOrderId() {
  return 'R' + String(Math.floor(100000000 + Math.random() * 899999999));
}

export function newPaymentRef() {
  const d = new Date();
  const stamp = d.toISOString().replace(/\D/g, '').slice(2, 14);
  return `KPY${stamp}${Math.floor(Math.random() * 1e6).toString().padStart(6, '0')}`;
}

// Sample order so the receipt can be previewed without checking out
export const demoOrder: Order = {
  id: 'R927646502',
  placedAt: '2026-10-06T17:48:00+01:00',
  customer: { name: 'Augusta Nnadi', phone: '0703 248 4145', email: 'augusta@example.com' },
  address: '5 Redemption Crescent, Gbagada, Lagos',
  deliveryMethod: 'Door Delivery',
  paymentMethod: 'KongaPay',
  paymentRef: 'KPY2610061748093417',
  lines: [
    { slug: 'starlink-mini-portable-satellite-internet-kit', qty: 1, price: 400000, oldPrice: 430000 },
    { slug: 'oraimo-traveler-4-27000mah-power-bank', qty: 2, price: 28900, oldPrice: 35000 },
    { slug: 'logitech-g102-wired-gaming-mouse-rgb', qty: 1, price: 7500 },
  ],
  shipping: 3000,
  discount: 23265,
};
