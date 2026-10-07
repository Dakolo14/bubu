export type Category = {
  slug: string;
  name: string;
  icon: string;
  tint: [string, string];
  subcategories: { title: string; items: string[] }[];
};

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  icon: string;
  image?: string; // drop a real image URL here to replace the drawn tile
  seller: string;
  stock: number;
  express?: boolean;
  tags?: ('deal' | 'top' | 'new')[];
  highlights: string[];
};

export const categories: Category[] = [
  {
    slug: 'computers-and-accessories',
    name: 'Computers and Accessories',
    icon: '💻',
    tint: ['#E8F0FF', '#C9DAFF'],
    subcategories: [
      { title: 'Computers', items: ['Laptops', 'Desktops', 'Mini PCs', 'All-in-One PCs'] },
      { title: 'Accessories', items: ['Keyboards & Mice', 'Monitors', 'Laptop Bags', 'Power Banks'] },
      { title: 'Storage', items: ['Flash Drives', 'External Hard Drives', 'Memory Cards', 'SSDs'] },
      { title: 'Printers & Office', items: ['Printers', 'Ink & Toner', 'Scanners', 'Projectors'] },
    ],
  },
  {
    slug: 'phones-and-tablets',
    name: 'Phones and Tablets',
    icon: '📱',
    tint: ['#FFF0E6', '#FFD8BF'],
    subcategories: [
      { title: 'Mobile Phones', items: ['Smartphones', 'iPhones', 'Android Phones', 'Feature Phones'] },
      { title: 'Tablets', items: ['iPads', 'Android Tablets', 'Kids Tablets', 'E-Readers'] },
      { title: 'Accessories', items: ['Chargers', 'Phone Cases', 'Screen Guards', 'Earphones'] },
      { title: 'Wearables', items: ['Smart Watches', 'Fitness Trackers', 'Smart Bands'] },
    ],
  },
  {
    slug: 'electronics',
    name: 'Electronics',
    icon: '📺',
    tint: ['#EAF7F0', '#C8EBD8'],
    subcategories: [
      { title: 'Television', items: ['Smart TVs', 'LED TVs', 'OLED TVs', 'TV Mounts'] },
      { title: 'Audio', items: ['Home Theatres', 'Soundbars', 'Bluetooth Speakers', 'Headphones'] },
      { title: 'Power', items: ['Generators', 'Inverters', 'Solar Panels', 'Stabilizers'] },
      { title: 'Cameras', items: ['Digital Cameras', 'CCTV', 'Action Cameras', 'Drones'] },
    ],
  },
  {
    slug: 'konga-fashion',
    name: 'Konga Fashion',
    icon: '👗',
    tint: ['#FDE6F2', '#F9C6E0'],
    subcategories: [
      { title: "Men's Fashion", items: ['Clothing', 'Shoes', 'Watches', 'Accessories'] },
      { title: "Women's Fashion", items: ['Clothing', 'Shoes', 'Bags', 'Jewellery'] },
      { title: 'Kids Fashion', items: ['Boys', 'Girls', 'School Wear'] },
      { title: 'Beauty', items: ['Fragrances', 'Makeup', 'Hair Care', 'Skin Care'] },
    ],
  },
  {
    slug: 'home-and-kitchen',
    name: 'Home and Kitchen',
    icon: '🍳',
    tint: ['#FFF8E1', '#FFE9A8'],
    subcategories: [
      { title: 'Appliances', items: ['Refrigerators', 'Washing Machines', 'Air Conditioners', 'Freezers'] },
      { title: 'Small Appliances', items: ['Blenders', 'Microwaves', 'Air Fryers', 'Kettles'] },
      { title: 'Home', items: ['Furniture', 'Bedding', 'Lighting', 'Decor'] },
      { title: 'Kitchen', items: ['Cookware', 'Dinnerware', 'Storage', 'Gas Cookers'] },
    ],
  },
  {
    slug: 'baby-kids-and-toys',
    name: 'Baby, Kids and Toys',
    icon: '🧸',
    tint: ['#F1ECFF', '#DCCFFF'],
    subcategories: [
      { title: 'Baby Care', items: ['Diapers', 'Wipes', 'Baby Food', 'Feeding'] },
      { title: 'Gear', items: ['Strollers', 'Car Seats', 'Baby Carriers'] },
      { title: 'Toys', items: ['Educational Toys', 'Dolls', 'Ride-Ons', 'Games'] },
    ],
  },
  {
    slug: 'other-categories',
    name: 'Other Categories',
    icon: '🛒',
    tint: ['#EEF2F5', '#D6DEE5'],
    subcategories: [
      { title: 'Groceries', items: ['Beverages', 'Food Cupboard', 'Household Supplies'] },
      { title: 'Health & Beauty', items: ['Personal Care', 'Vitamins', 'Medical Supplies'] },
      { title: 'Sports & Fitness', items: ['Gym Equipment', 'Sportswear', 'Outdoor'] },
      { title: 'Automobile', items: ['Car Care', 'Car Electronics', 'Tyres'] },
    ],
  },
];

type Seed = [
  name: string,
  brand: string,
  category: string,
  price: number,
  oldPrice: number | 0,
  icon: string,
  tags?: Product['tags'],
];

const seeds: Seed[] = [
  ['HP 15 Intel Core i5 12th Gen 8GB RAM 512GB SSD Laptop', 'HP', 'computers-and-accessories', 689000, 815000, '💻', ['deal', 'top']],
  ['Lenovo IdeaPad Slim 3 Core i3 8GB 256GB SSD 15.6"', 'Lenovo', 'computers-and-accessories', 459999, 520000, '💻', ['deal']],
  ['Apple MacBook Air M2 13.6" 8GB 256GB - Midnight', 'Apple', 'computers-and-accessories', 1499000, 1650000, '💻', ['top']],
  ['Dell Latitude 7490 Core i7 16GB 512GB SSD (Refurbished)', 'Dell', 'computers-and-accessories', 385000, 450000, '💻'],
  ['Logitech MK270 Wireless Keyboard & Mouse Combo', 'Logitech', 'computers-and-accessories', 32500, 38000, '⌨️', ['deal']],
  ['Oraimo Traveler 4 27000mAh Power Bank', 'Oraimo', 'computers-and-accessories', 28900, 35000, '🔋', ['top', 'deal']],
  ['SanDisk Ultra 128GB USB 3.0 Flash Drive', 'SanDisk', 'computers-and-accessories', 9800, 12500, '💾'],
  ['HP LaserJet Pro M15a Monochrome Printer', 'HP', 'computers-and-accessories', 189000, 0, '🖨️', ['new']],

  ['Samsung Galaxy A15 6.5" 4GB RAM 128GB - Blue Black', 'Samsung', 'phones-and-tablets', 219000, 249000, '📱', ['deal', 'top']],
  ['Apple iPhone 15 Pro Max 256GB - Natural Titanium', 'Apple', 'phones-and-tablets', 2150000, 2390000, '📱', ['top']],
  ['Tecno Spark 20 Pro 8GB RAM 256GB - Sunset Blush', 'Tecno', 'phones-and-tablets', 238500, 275000, '📱', ['deal']],
  ['Infinix Hot 40i 6.56" 8GB RAM 256GB - Starlit Black', 'Infinix', 'phones-and-tablets', 172000, 199000, '📱', ['deal', 'top']],
  ['Redmi Note 13 8GB RAM 256GB - Midnight Black', 'Xiaomi', 'phones-and-tablets', 315000, 349000, '📱'],
  ['Apple iPad 10th Gen 10.9" Wi-Fi 64GB - Silver', 'Apple', 'phones-and-tablets', 589000, 640000, '📲', ['new']],
  ['Oraimo FreePods Lite True Wireless Earbuds', 'Oraimo', 'phones-and-tablets', 18500, 24000, '🎧', ['deal']],
  ['Smart Watch Series 9 Ultra Bluetooth Calling', 'Generic', 'phones-and-tablets', 21999, 35000, '⌚', ['deal']],

  ['Hisense 43" Full HD Smart Frameless TV + Free Wall Bracket', 'Hisense', 'electronics', 298000, 345000, '📺', ['deal', 'top']],
  ['Samsung 55" Crystal UHD 4K Smart TV CU7000', 'Samsung', 'electronics', 685000, 760000, '📺', ['top']],
  ['LG 65" OLED evo 4K Smart TV C3 Series', 'LG', 'electronics', 2450000, 2700000, '📺'],
  ['Sumec Firman 3.8kVA Key Start Generator SPG4000E2', 'Firman', 'electronics', 545000, 610000, '⚡', ['top']],
  ['Polystar 2.5kVA Pure Sine Wave Inverter', 'Polystar', 'electronics', 315000, 0, '🔌', ['new']],
  ['JBL Flip 6 Portable Waterproof Bluetooth Speaker', 'JBL', 'electronics', 112000, 135000, '🔊', ['deal']],
  ['Sony 5.1ch Home Cinema System with Bluetooth', 'Sony', 'electronics', 389000, 420000, '🔊'],
  ['Hikvision 4-Channel CCTV Kit with 1TB HDD', 'Hikvision', 'electronics', 176000, 210000, '📹'],

  ["Men's Classic Slim Fit Long Sleeve Shirt - Navy", 'Kmax', 'konga-fashion', 8500, 12000, '👔', ['deal']],
  ["Women's Floral Maxi Dress - Multicolour", 'Bellerose', 'konga-fashion', 14500, 21000, '👗', ['deal', 'top']],
  ['Classic Leather Corporate Oxford Shoes - Black', 'Lagos Leather', 'konga-fashion', 26500, 34000, '👞'],
  ['Unisex Air Cushion Sports Sneakers - White', 'Generic', 'konga-fashion', 17999, 25000, '👟', ['top']],
  ['Ladies Quilted Shoulder Handbag - Beige', 'Generic', 'konga-fashion', 15800, 22000, '👜', ['new']],
  ['Casio Analog Stainless Steel Wristwatch MTP-1374', 'Casio', 'konga-fashion', 48500, 0, '⌚'],
  ['Oud Royale Eau de Parfum 100ml', 'Arabiyat', 'konga-fashion', 19500, 26000, '🧴', ['deal']],
  ['Nivea Perfect & Radiant Even Tone Body Lotion 400ml', 'Nivea', 'konga-fashion', 5600, 6800, '🧴'],

  ['Hisense 205L Double Door Refrigerator - Silver', 'Hisense', 'home-and-kitchen', 365000, 410000, '🧊', ['deal', 'top']],
  ['LG 8kg Front Load Inverter Washing Machine', 'LG', 'home-and-kitchen', 589000, 640000, '🫧'],
  ['Midea 1.5HP Split Inverter Air Conditioner', 'Midea', 'home-and-kitchen', 498000, 560000, '❄️', ['top']],
  ['Silver Crest 8L Digital Air Fryer', 'Silver Crest', 'home-and-kitchen', 52000, 75000, '🍟', ['deal', 'top']],
  ['Binatone 1.5L Blender with Grinding Mill BLG-450', 'Binatone', 'home-and-kitchen', 38500, 45000, '🥤', ['deal']],
  ['Scanfrost 20L Solo Microwave Oven', 'Scanfrost', 'home-and-kitchen', 76000, 85000, '🍲'],
  ['12-Piece Non-Stick Granite Cookware Set', 'Generic', 'home-and-kitchen', 46000, 65000, '🍳', ['new']],
  ['Vitafoam Grand Orthopaedic Mattress 6x6ft', 'Vitafoam', 'home-and-kitchen', 312000, 0, '🛏️'],

  ['Pampers Baby Dry Diapers Size 4 Jumbo Pack (64 pcs)', 'Pampers', 'baby-kids-and-toys', 18200, 21000, '🍼', ['deal', 'top']],
  ['Huggies Gentle Baby Wipes Pack of 3 (168 Wipes)', 'Huggies', 'baby-kids-and-toys', 6900, 8200, '🧻'],
  ['Foldable Lightweight Baby Stroller with Canopy', 'Generic', 'baby-kids-and-toys', 68500, 89000, '👶', ['deal']],
  ['Kids Rechargeable Ride-On Car with Remote', 'Generic', 'baby-kids-and-toys', 145000, 180000, '🚗'],
  ['Educational Building Blocks Set (500 pcs)', 'Generic', 'baby-kids-and-toys', 14800, 19000, '🧱', ['new']],
  ['Nestlé Cerelac Maize & Milk Infant Cereal 1kg', 'Nestlé', 'baby-kids-and-toys', 9500, 0, '🥣'],

  ['Golden Penny Spaghetti 500g x 20 Pack', 'Golden Penny', 'other-categories', 21500, 24000, '🍝', ['deal']],
  ['Peak Full Cream Milk Powder Refill 900g', 'Peak', 'other-categories', 9800, 11200, '🥛', ['top']],
  ['Adjustable Dumbbell Set 20kg with Case', 'Generic', 'other-categories', 38000, 48000, '🏋️'],
  ['Michelin Primacy 4 205/55R16 Car Tyre', 'Michelin', 'other-categories', 98000, 0, '🛞', ['new']],
  ['Omron M2 Automatic Blood Pressure Monitor', 'Omron', 'other-categories', 42500, 49000, '🩺', ['deal']],
  ['Hollandia Evaporated Milk 160g x 24', 'Hollandia', 'other-categories', 14800, 16500, '🥫'],
];

const sellers = ['Konga Retail', 'Konga Mall Partner', 'Slot Systems', 'Pointek', '3C Hub', 'Kayatech Store'];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/["'&]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Deterministic pseudo-random so server and client renders agree
function seeded(n: number) {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export const products: Product[] = seeds.map(([name, brand, category, price, oldPrice, icon, tags], i) => ({
  slug: slugify(name),
  name,
  brand,
  category,
  price,
  oldPrice: oldPrice || undefined,
  rating: Math.round((3.6 + seeded(i) * 1.4) * 10) / 10,
  reviews: Math.floor(seeded(i + 100) * 480) + 3,
  icon,
  seller: sellers[i % sellers.length],
  stock: Math.floor(seeded(i + 200) * 40) + 2,
  express: seeded(i + 300) > 0.45,
  tags,
  highlights: [
    `Genuine ${brand} product sold by a verified seller`,
    'Pay on delivery available in selected cities',
    '7-day free return policy on eligible items',
    'Nationwide delivery within 1 – 7 working days',
  ],
}));

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsIn(category: string) {
  return products.filter((p) => p.category === category);
}

export function withTag(tag: 'deal' | 'top' | 'new') {
  return products.filter((p) => p.tags?.includes(tag));
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/);
  return products.filter((p) => {
    const hay = `${p.name} ${p.brand} ${getCategory(p.category)?.name ?? ''}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  });
}

export const heroSlides = [
  {
    title: 'Konga Mega Sales',
    subtitle: 'Up to 60% off phones, appliances & more',
    cta: 'Shop Now',
    href: '/category/phones-and-tablets',
    from: '#ED017F',
    to: '#33058D',
    art: '🛍️',
  },
  {
    title: 'Power Up Your Home',
    subtitle: 'Generators, inverters & solar — pay small small',
    cta: 'Explore Power',
    href: '/category/electronics',
    from: '#FF8A00',
    to: '#E2004F',
    art: '⚡',
  },
  {
    title: 'Back to School',
    subtitle: 'Laptops from ₦385,000 with free delivery',
    cta: 'Get Yours',
    href: '/category/computers-and-accessories',
    from: '#0057D9',
    to: '#00A3E0',
    art: '🎒',
  },
  {
    title: 'Konga Fashion Week',
    subtitle: 'New season styles for men, women & kids',
    cta: 'Discover',
    href: '/category/konga-fashion',
    from: '#111111',
    to: '#ED017F',
    art: '👠',
  },
];

export const quickLinks = [
  { label: "Today's Deals", icon: '🔥', href: '/deals' },
  { label: 'Konga Mall', icon: '🏬', href: '/category/other-categories' },
  { label: 'Phones Deals', icon: '📱', href: '/category/phones-and-tablets' },
  { label: 'Appliances', icon: '🧊', href: '/category/home-and-kitchen' },
  { label: 'Buy Airtime', icon: '📶', href: '#' },
  { label: 'Pay Bills', icon: '🧾', href: '#' },
  { label: 'Konga Health', icon: '💊', href: '#' },
  { label: 'Konga Travel', icon: '✈️', href: '#' },
  { label: 'Konga Food', icon: '🍔', href: '#' },
  { label: 'Sell on Konga', icon: '🤝', href: '#' },
];

export const brands = [
  'Samsung', 'Apple', 'HP', 'Tecno', 'Infinix', 'Hisense', 'LG', 'Oraimo', 'Lenovo', 'Binatone', 'Nivea', 'Pampers',
];
