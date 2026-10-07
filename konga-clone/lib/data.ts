export type Category = {
  slug: string;
  name: string;
  icon: string;
  tint: [string, string];
  inNav: boolean;
  subcategories: { title: string; items: string[] }[];
};

type Tag = 'deal' | 'trending' | 'sponsored' | 'best' | 'new';

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
  sold: number; // % of deal stock sold, shown on Today's Deals
  kongaNow: boolean;
  official: boolean;
  tags: Tag[];
  highlights: string[];
};

export const categories: Category[] = [
  {
    slug: 'computers-and-accessories',
    name: 'Computers and Accessories',
    icon: '💻',
    tint: ['#E8F0FF', '#C9DAFF'],
    inNav: true,
    subcategories: [
      { title: 'Computers', items: ['Laptops', 'Desktops', 'Mini PCs', 'All-in-One PCs'] },
      { title: 'Accessories', items: ['Keyboards & Mice', 'Monitors', 'Laptop Bags', 'Power Banks'] },
      { title: 'Storage', items: ['Flash Drives', 'External Hard Drives', 'Memory Cards', 'RAM'] },
      { title: 'Printers & Office', items: ['Printers', 'Ink & Toner', 'Surge Protectors', 'Projectors'] },
    ],
  },
  {
    slug: 'phones-and-tablets',
    name: 'Phones and Tablets',
    icon: '📱',
    tint: ['#FFF0E6', '#FFD8BF'],
    inNav: true,
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
    inNav: true,
    subcategories: [
      { title: 'Television', items: ['Smart TVs', 'LED TVs', 'OLED TVs', 'TV Mounts'] },
      { title: 'Audio', items: ['Home Theatres', 'Soundbars', 'Bluetooth Speakers', 'Party Speakers'] },
      { title: 'Power', items: ['Generators', 'Inverters', 'Solar Panels', 'Batteries'] },
      { title: 'Internet & Cameras', items: ['Starlink', 'Routers', 'CCTV', 'Drones'] },
    ],
  },
  {
    slug: 'konga-fashion',
    name: 'Konga Fashion',
    icon: '👗',
    tint: ['#FDE6F2', '#F9C6E0'],
    inNav: true,
    subcategories: [
      { title: "Men's Fashion", items: ['Clothing', 'Shoes', 'Watches', 'Accessories'] },
      { title: "Women's Fashion", items: ['Clothing', 'Shoes', 'Bags', 'Jewellery'] },
      { title: 'Kids Fashion', items: ['Boys', 'Girls', 'School Wear'] },
    ],
  },
  {
    slug: 'home-and-kitchen',
    name: 'Home and Kitchen',
    icon: '🍳',
    tint: ['#FFF8E1', '#FFE9A8'],
    inNav: true,
    subcategories: [
      { title: 'Appliances', items: ['Refrigerators', 'Freezers', 'Washing Machines', 'Air Conditioners'] },
      { title: 'Small Appliances', items: ['Blenders', 'Irons', 'Air Fryers', 'Sandwich Makers'] },
      { title: 'Home', items: ['Furniture', 'Bedding', 'Lighting', 'Door Hardware'] },
      { title: 'Kitchen', items: ['Cookware', 'Dinnerware', 'Storage', 'Gas Cookers'] },
    ],
  },
  {
    slug: 'baby-kids-and-toys',
    name: 'Baby, Kids and Toys',
    icon: '🧸',
    tint: ['#F1ECFF', '#DCCFFF'],
    inNav: true,
    subcategories: [
      { title: 'Baby Care', items: ['Diapers', 'Wipes', 'Baby Food', 'Feeding'] },
      { title: 'Gear', items: ['Strollers', 'Car Seats', 'Baby Carriers'] },
      { title: 'Toys & Books', items: ['Educational Toys', 'Ride-Ons', "Children's Books", 'Games'] },
    ],
  },
  {
    slug: 'beauty-health-and-personal-care',
    name: 'Beauty, Health & Personal Care',
    icon: '💄',
    tint: ['#FFEDEF', '#FFD0D6'],
    inNav: true,
    subcategories: [
      { title: 'Beauty', items: ['Fragrances', 'Makeup', 'Hair Care', 'Skin Care'] },
      { title: 'Health', items: ['Vitamins & Supplements', 'Medical Devices', 'Eye Care'] },
      { title: 'Personal Care', items: ['Oral Care', 'Bath & Body', 'Shaving', 'Personal Safety'] },
    ],
  },
  {
    slug: 'groceries-and-more',
    name: 'Groceries, Sports & More',
    icon: '🛒',
    tint: ['#EEF2F5', '#D6DEE5'],
    inNav: false,
    subcategories: [
      { title: 'Groceries', items: ['Beverages', 'Food Cupboard', 'Household Supplies'] },
      { title: 'Sports & Fitness', items: ['Gym Equipment', 'Sportswear', 'Outdoor'] },
      { title: 'Gaming', items: ['Consoles', 'Controllers', 'Gift Cards'] },
      { title: 'Books & Automobile', items: ['Books', 'Car Care', 'Tyres'] },
    ],
  },
];

// name, brand, category, price, oldPrice (0 = none), icon, tags, flags (n = KongaNow, o = Official Store)
type Seed = [string, string, string, number, number, string, Tag[], string?];

const seeds: Seed[] = [
  // Today's Deals
  ['Hisense 2HP Split Inverter Air Conditioner AS-18TW', 'Hisense', 'home-and-kitchen', 477700, 600000, '❄️', ['deal'], 'o'],
  ['Samsung 65" Neo QLED Mini LED 4K Smart TV', 'Samsung', 'electronics', 850999, 1385832, '📺', ['deal', 'trending'], 'o'],
  ['JBL PartyBox Ultimate Wi-Fi Party Speaker', 'JBL', 'electronics', 2950000, 0, '🔊', ['deal']],
  ['Haier Thermocool 519L Large Chest Freezer', 'Haier Thermocool', 'home-and-kitchen', 1959000, 0, '🧊', ['deal']],
  ['Apple 2025 MacBook Pro 14" M4 Pro 24GB 512GB', 'Apple', 'computers-and-accessories', 2680000, 3700000, '💻', ['deal', 'best']],
  ['Zyre 2-Slice Sandwich Maker Non-Stick', 'Zyre', 'home-and-kitchen', 32300, 40000, '🥪', ['deal']],
  ['Zyre Steam Iron Ceramic Soleplate 2200W', 'Zyre', 'home-and-kitchen', 14000, 16500, '🧺', ['deal']],
  ['Oraimo Traveler 4 27000mAh Power Bank', 'Oraimo', 'computers-and-accessories', 28900, 35000, '🔋', ['deal', 'best'], 'n'],
  ['Silver Crest 8L Digital Air Fryer', 'Silver Crest', 'home-and-kitchen', 52000, 75000, '🍟', ['deal', 'trending']],
  ['Infinix Hot 40i 6.56" 8GB RAM 256GB - Starlit Black', 'Infinix', 'phones-and-tablets', 172000, 199000, '📱', ['deal']],

  // Now Trending
  ['Apple iTunes $100 USD Gift Card (US Store)', 'Apple', 'groceries-and-more', 187050, 0, '🎁', ['trending', 'best']],
  ['S26 Ultra Smartphone 16GB RAM 1TB 7.3" Display', 'Generic', 'phones-and-tablets', 180000, 0, '📱', ['trending']],
  ['Hithium 1kWh Solar Generator Portable Power Station', 'Hithium', 'electronics', 255999, 280000, '🔋', ['trending'], 'no'],
  ['Tecno SPARK 50 6.78" 128GB ROM 4GB+8GB RAM - Purple', 'Tecno', 'phones-and-tablets', 205000, 0, '📱', ['trending', 'best']],
  ['Logitech G102 Wired Gaming Mouse RGB', 'Logitech', 'computers-and-accessories', 7500, 0, '🖱️', ['trending']],
  ['Redmi Note 14 8GB RAM 256GB - Midnight Black', 'Xiaomi', 'phones-and-tablets', 315000, 349000, '📱', ['trending']],
  ['Starlink Standard Kit V4 Satellite Internet', 'Starlink', 'electronics', 605000, 900000, '🛰️', ['trending', 'best'], 'no'],
  ['DC 12V Air Blower Portable Car Tyre Inflator', 'Generic', 'groceries-and-more', 18500, 0, '🌀', ['trending']],
  ['Lenovo IdeaPad Slim 3 Core i3 8GB 256GB SSD 15.6"', 'Lenovo', 'computers-and-accessories', 459999, 520000, '💻', ['trending']],
  ['Samsung Galaxy A16 6.7" 4GB RAM 128GB - Gray', 'Samsung', 'phones-and-tablets', 219000, 249000, '📱', ['trending'], 'o'],

  // Sponsored
  ['HP M24f 23.8" Diagonal FHD IPS Monitor', 'HP', 'computers-and-accessories', 370500, 0, '🖥️', ['sponsored'], 'o'],
  ['HP 22 All-in-One Desktop Pentium 8GB 256GB', 'HP', 'computers-and-accessories', 1145000, 0, '🖥️', ['sponsored'], 'o'],
  ['HP 22 All-in-One Desktop Core i3 8GB 512GB', 'HP', 'computers-and-accessories', 1225000, 0, '🖥️', ['sponsored'], 'o'],
  ['HP M24f Diagonal FHD IPS Monitor - Silver', 'HP', 'computers-and-accessories', 326000, 0, '🖥️', ['sponsored']],
  ['Desktop Mic Boom Arm Adjustable Suspension Stand', 'Generic', 'computers-and-accessories', 63999, 0, '🎙️', ['sponsored']],
  ['Lenovo IdeaPad 15 Intel Celeron 4GB 256GB SSD', 'Lenovo', 'computers-and-accessories', 441000, 0, '💻', ['sponsored']],
  ['Lenovo IdeaPad 15 Intel Core i3 8GB 512GB', 'Lenovo', 'computers-and-accessories', 442000, 0, '💻', ['sponsored']],

  // KongaNow (same day)
  ['Samsung Galaxy A36 5G 8GB RAM 256GB - Lavender', 'Samsung', 'phones-and-tablets', 484706, 490000, '📱', [], 'no'],
  ['Starlink Mini - Portable Satellite Internet Kit', 'Starlink', 'electronics', 400000, 430000, '🛰️', ['best'], 'no'],
  ['Asus AiO V500 Core 5 16GB 512GB All-in-One PC', 'Asus', 'computers-and-accessories', 1346700, 1818045, '🖥️', [], 'no'],
  ['Asus TUF 500 Series Gaming Desktop RTX 4060', 'Asus', 'computers-and-accessories', 2037500, 2750625, '🖥️', [], 'no'],
  ['Asus V400 AiO AMD Ryzen 5 8GB 512GB', 'Asus', 'computers-and-accessories', 1295540, 1748979, '🖥️', [], 'no'],
  ['Asus V400 AiO AMD Ryzen 7 16GB 512GB', 'Asus', 'computers-and-accessories', 1392310, 1879619, '🖥️', [], 'no'],
  ['Asus Zenbook Duo 14" OLED Core Ultra 7 32GB 1TB', 'Asus', 'computers-and-accessories', 2578947, 2701087, '💻', [], 'no'],
  ['HP ProBook 4 G1iR 14" Core Ultra 5 16GB 512GB', 'HP', 'computers-and-accessories', 1174680, 1300000, '💻', ['best'], 'no'],

  // Best sellers & everyday
  ["Living As God's Children Level 1 (Pupil's Book)", 'Paulines', 'baby-kids-and-toys', 6000, 0, '📘', ['best']],
  ['Essential Christian Religious Studies Textbook', 'Generic', 'baby-kids-and-toys', 8000, 0, '📕', ['best']],
  ['HP Stream 11 G4 Pro Celeron 4GB 64GB Laptop', 'HP', 'computers-and-accessories', 135000, 0, '💻', ['best']],
  ['Personal Defence Pepper Spray 60ml', 'Generic', 'beauty-health-and-personal-care', 3700, 4000, '🧯', ['best']],
  ['Brass Door Knocker and Viewer Peephole', 'Generic', 'home-and-kitchen', 5500, 0, '🚪', ['best']],
  ['TV Guard with Surge Protector 13A', 'Voltguard', 'computers-and-accessories', 5900, 0, '🔌', ['best']],
  ['APC Surge Protector 6-Outlet Power Strip', 'APC', 'computers-and-accessories', 18000, 20000, '🔌', ['best']],
  ['Vision Enhance & Eye Health Drops 10ml', 'Generic', 'beauty-health-and-personal-care', 8000, 0, '👁️', ['best']],
  ['7.5% Nano Hydroxyapatite Whitening Toothpaste', 'Generic', 'beauty-health-and-personal-care', 5999, 0, '🪥', ['best']],
  ["Living As God's Children Level 2 (Pupil's Book)", 'Paulines', 'baby-kids-and-toys', 6000, 0, '📗', ['best']],
  ['Adjustable Mosquito & Insect Repellent Wristband', 'Generic', 'beauty-health-and-personal-care', 999, 5000, '⌚', ['best']],
  ['Desktop RAM DDR3 8GB 1600MHz', 'Kingston', 'computers-and-accessories', 7000, 0, '💾', ['best']],
  ['14500 Battery 3.7V Rechargeable Li-ion', 'Generic', 'electronics', 1650, 2500, '🔋', ['best']],
  ['Grass-Fed Whey Protein Isolate 908g - Vanilla', 'Transparent Labs', 'beauty-health-and-personal-care', 62000, 0, '💪', ['best']],
  ['Oil of Oregano 6000mg with Black Seed Oil 180 Softgels', 'Generic', 'beauty-health-and-personal-care', 15000, 30000, '🌿', ['best']],

  // Category depth
  ['Hisense 43" Full HD Smart Frameless TV + Free Wall Bracket', 'Hisense', 'electronics', 298000, 345000, '📺', [], 'o'],
  ['Sumec Firman 3.8kVA Key Start Generator SPG4000E2', 'Firman', 'electronics', 545000, 610000, '⚡', []],
  ['Apple iPhone 16 Pro Max 256GB - Desert Titanium', 'Apple', 'phones-and-tablets', 2150000, 2390000, '📱', [], 'o'],
  ['Apple iPad 11" A16 Wi-Fi 128GB - Silver', 'Apple', 'phones-and-tablets', 689000, 740000, '📲', []],
  ['Oraimo FreePods Lite True Wireless Earbuds', 'Oraimo', 'phones-and-tablets', 18500, 24000, '🎧', [], 'n'],
  ["Men's Classic Slim Fit Long Sleeve Shirt - Navy", 'Kmax', 'konga-fashion', 8500, 12000, '👔', []],
  ["Women's Floral Maxi Dress - Multicolour", 'Bellerose', 'konga-fashion', 14500, 21000, '👗', ['new']],
  ['Classic Leather Corporate Oxford Shoes - Black', 'Lagos Leather', 'konga-fashion', 26500, 34000, '👞', []],
  ['Unisex Air Cushion Sports Sneakers - White', 'Generic', 'konga-fashion', 17999, 25000, '👟', []],
  ['Ladies Quilted Shoulder Handbag - Beige', 'Generic', 'konga-fashion', 15800, 22000, '👜', []],
  ['Casio Analog Stainless Steel Wristwatch MTP-1374', 'Casio', 'konga-fashion', 48500, 0, '⌚', []],
  ['Binatone 1.5L Blender with Grinding Mill BLG-450', 'Binatone', 'home-and-kitchen', 38500, 45000, '🥤', [], 'n'],
  ['LG 8kg Front Load Inverter Washing Machine', 'LG', 'home-and-kitchen', 589000, 640000, '🫧', [], 'o'],
  ['Pampers Baby Dry Diapers Size 4 Jumbo Pack (64 pcs)', 'Pampers', 'baby-kids-and-toys', 18200, 21000, '🍼', [], 'n'],
  ['Foldable Lightweight Baby Stroller with Canopy', 'Generic', 'baby-kids-and-toys', 68500, 89000, '👶', []],
  ['Kids Rechargeable Ride-On Car with Remote', 'Generic', 'baby-kids-and-toys', 145000, 180000, '🚗', []],
  ['Oud Royale Eau de Parfum 100ml', 'Arabiyat', 'beauty-health-and-personal-care', 19500, 26000, '🧴', []],
  ['Nivea Perfect & Radiant Even Tone Body Lotion 400ml', 'Nivea', 'beauty-health-and-personal-care', 5600, 6800, '🧴', [], 'n'],
  ['Omron M2 Automatic Blood Pressure Monitor', 'Omron', 'beauty-health-and-personal-care', 42500, 49000, '🩺', []],
  ['Golden Penny Spaghetti 500g x 20 Pack', 'Golden Penny', 'groceries-and-more', 21500, 24000, '🍝', [], 'n'],
  ['Peak Full Cream Milk Powder Refill 900g', 'Peak', 'groceries-and-more', 9800, 11200, '🥛', [], 'n'],
  ['Adjustable Dumbbell Set 20kg with Case', 'Generic', 'groceries-and-more', 38000, 48000, '🏋️', []],
  ['PlayStation 5 Slim Digital Edition Console', 'Sony', 'groceries-and-more', 845000, 920000, '🎮', ['new'], 'o'],
];

const sellers = ['Konga Retail', 'Konga Mall Partner', 'Slot Systems', 'Pointek', '3C Hub', 'Kayatech Store'];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/["'&$]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Deterministic pseudo-random so server and client renders agree
function seeded(n: number) {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export const products: Product[] = seeds.map(([name, brand, category, price, oldPrice, icon, tags, flags = ''], i) => ({
  slug: slugify(name),
  name,
  brand,
  category,
  price,
  oldPrice: oldPrice || undefined,
  rating: seeded(i) > 0.35 ? Math.round((3 + seeded(i + 50) * 2) * 2) / 2 : 0,
  reviews: seeded(i) > 0.35 ? Math.floor(seeded(i + 100) * 40) + 1 : 0,
  icon,
  seller: flags.includes('o') ? `${brand} Official Store` : sellers[i % sellers.length],
  stock: Math.floor(seeded(i + 200) * 40) + 2,
  sold: Math.floor(seeded(i + 400) * 80) + 5,
  kongaNow: flags.includes('n'),
  official: flags.includes('o'),
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

export function withTag(tag: Tag) {
  return products.filter((p) => p.tags.includes(tag));
}

export function kongaNowProducts() {
  return products.filter((p) => p.kongaNow);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/);
  return products.filter((p) => {
    const hay = `${p.name} ${p.brand} ${p.seller} ${getCategory(p.category)?.name ?? ''} ${p.kongaNow ? 'konganow same day' : ''}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  });
}

export const heroSlides = [
  {
    kicker: 'KONGA FREEDOM SALES',
    title: 'Up to 66% Off',
    subtitle: 'Appliances, TVs, phones & more — this week only.',
    cta: 'Shop Now',
    href: '/deals',
    bg: 'linear-gradient(120deg,#CFF7E4 0%,#E9FFF5 56%,#0F3D2B 56.2%,#0B2A1E 100%)',
    ink: '#0B5D3B',
    art: ['🧊', '📺', '🥤'],
  },
  {
    kicker: 'KONGANOW',
    title: 'Same Day Delivery',
    subtitle: 'Order before 12pm, receive it today in Lagos & Abuja.',
    cta: 'Order Now',
    href: '/category/computers-and-accessories',
    bg: 'linear-gradient(120deg,#FFE7F3 0%,#FFF4FA 56%,#ED017F 56.2%,#B10061 100%)',
    ink: '#ED017F',
    art: ['🛵', '📦', '⚡'],
  },
  {
    kicker: 'BACK TO SCHOOL',
    title: 'Laptops from ₦135,000',
    subtitle: 'HP, Lenovo, Asus & Apple — pay small small with KongaPay.',
    cta: 'Get Yours',
    href: '/category/computers-and-accessories',
    bg: 'linear-gradient(120deg,#DCEBFF 0%,#F0F6FF 56%,#0D47A1 56.2%,#062A63 100%)',
    ink: '#0D47A1',
    art: ['💻', '🎒', '🖱️'],
  },
  {
    kicker: 'POWER UP',
    title: 'Solar & Inverters',
    subtitle: 'Beat the bills with clean energy. Free installation in Lagos.',
    cta: 'Explore',
    href: '/category/electronics',
    bg: 'linear-gradient(120deg,#FFF3D6 0%,#FFFAEE 56%,#F7941D 56.2%,#C25E00 100%)',
    ink: '#B45309',
    art: ['☀️', '🔋', '⚡'],
  },
];

export const quickTiles = [
  { label: 'Verified Best Prices', art: '✅', bg: 'linear-gradient(135deg,#FFE3EF,#FFFFFF)', text: 'BEST\nPRICES', color: '#E11D48', href: '/deals' },
  { label: 'Bulk Price Drops', art: '📦', bg: 'linear-gradient(135deg,#3B2412,#8A5A2B)', text: 'BULK', color: '#FFFFFF', href: '/deals' },
  { label: 'KongaNow', art: '🛵', bg: '#FFFFFF', text: 'NOW\nNOW', color: '#ED017F', href: '/search?q=konganow' },
  { label: 'Buy More. Save More', art: '🛍️', bg: '#111111', text: 'SAVE\nMORE', color: '#FFFFFF', href: '/deals' },
  { label: 'Flash Sales Reloaded', art: '⚡', bg: 'linear-gradient(135deg,#1A1A1A,#3A3A00)', text: 'FLASH\nDEALS', color: '#FFE600', href: '/deals' },
  { label: 'Home Essentials', art: '🏠', bg: 'linear-gradient(135deg,#F1F5F9,#CBD5E1)', text: '', color: '#111', href: '/category/home-and-kitchen' },
  { label: 'Groceries', art: '🛒', bg: '#FFFFFF', text: '', color: '#111', href: '/category/groceries-and-more' },
  { label: 'Hot Deals', art: '🔥', bg: 'linear-gradient(135deg,#2B0A00,#7A1F00)', text: 'HOT\nDEALS', color: '#FFB020', href: '/deals' },
  { label: 'Sports & Fitness', art: '🏋️', bg: 'linear-gradient(135deg,#FDE68A,#FFFBEB)', text: '', color: '#111', href: '/category/groceries-and-more' },
  { label: 'Gaming Deals', art: '🎮', bg: 'linear-gradient(135deg,#1E0B3A,#3B0F6B)', text: 'GAME\nOVER', color: '#4ADE80', href: '/search?q=playstation' },
  { label: 'Phone Deals', art: '📱', bg: 'linear-gradient(135deg,#FFEDD5,#FFFFFF)', text: '', color: '#111', href: '/category/phones-and-tablets' },
  { label: 'Fashion Week', art: '👠', bg: 'linear-gradient(135deg,#ED017F,#7A0042)', text: 'STYLE', color: '#FFFFFF', href: '/category/konga-fashion' },
];

export const services = [
  { label: 'TRAVEL', icon: '🧳' },
  { label: 'KongaPay', icon: '💳' },
  { label: 'Konga Corporate', icon: '🏢' },
  { label: 'KongaHealth', icon: '💊' },
  { label: 'LOGISTICS', icon: '🚚' },
  { label: 'GROCERIES', icon: '🧺' },
  { label: 'KongaTV', icon: '📺' },
  { label: 'Konga Food', icon: '🍔' },
];

export const brands = [
  'Samsung', 'Apple', 'HP', 'Tecno', 'Infinix', 'Hisense', 'LG', 'Oraimo', 'Lenovo', 'Asus', 'Binatone', 'Starlink',
];
