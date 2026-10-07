import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Logo from './Logo';

const columns = [
  {
    title: 'About Konga',
    links: ['Contact Us', 'About Us', 'Careers', 'Our Blog', 'Forum', 'Terms & Conditions'],
  },
  {
    title: 'Payment',
    links: ['KongaPay', 'Wallet', 'Verve', 'Mastercard', 'Visa'],
  },
  {
    title: 'Buying on Konga',
    links: ['Buyer Safety Centre', 'FAQs', 'Delivery', 'Konga Return Policy', 'Digital Services', 'Bulk Purchase'],
  },
  {
    title: 'More Info',
    links: ['Site Map', 'Track My Order', 'Privacy Policy', 'Authentic Items Policy'],
  },
  {
    title: 'Make Money on Konga',
    links: ['Sell on Konga', 'Become a Konga Affiliate', 'Konga Logistics', 'Konga Business'],
  },
];

export default function Footer() {
  return (
    <footer className="mt-10">
      {/* Newsletter */}
      <div className="bg-konga">
        <div className="mx-auto flex max-w-site flex-col items-start gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
          <div className="text-white">
            <p className="text-lg font-bold">Get the latest deals first</p>
            <p className="text-sm text-white/85">Subscribe to our newsletter and never miss a promo.</p>
          </div>
          <form className="flex w-full max-w-md overflow-hidden rounded bg-white">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="min-w-0 flex-1 px-3 py-2.5 text-sm outline-none"
            />
            <button className="bg-konga-purple px-5 text-sm font-semibold text-white">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="bg-[#1F1F1F] text-white/75">
        <div className="mx-auto grid max-w-site grid-cols-2 gap-8 px-4 py-10 md:grid-cols-6">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-bold text-white">{col.title}</h4>
              <ul className="space-y-2 text-[13px]">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-konga">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 md:col-span-1">
            <h4 className="mb-3 text-sm font-bold text-white">Download &amp; Connect</h4>
            <div className="flex flex-col gap-2">
              {[
                ['🍎', 'App Store'],
                ['▶', 'Google Play'],
              ].map(([icon, label]) => (
                <a
                  key={label}
                  href="#"
                  className="flex items-center gap-2 rounded border border-white/25 px-3 py-1.5 text-xs hover:border-white"
                >
                  <span className="text-base">{icon}</span>
                  <span>
                    <span className="block text-[10px] text-white/60">Get it on</span>
                    <span className="font-semibold text-white">{label}</span>
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="rounded-full bg-white/10 p-2 hover:bg-konga" aria-label="Social link">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-site flex-col items-center justify-between gap-3 px-4 py-5 text-xs md:flex-row">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Logo />
              </Link>
              <span>Copyright © {new Date().getFullYear()} Konga.com. All rights reserved.</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['KongaPay', 'Verve', 'Mastercard', 'Visa', 'Pay on Delivery'].map((p) => (
                <span key={p} className="rounded bg-white px-2 py-1 text-[11px] font-bold text-konga-ink">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
