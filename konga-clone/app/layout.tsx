import type { Metadata } from 'next';
import { Nunito_Sans, Nunito } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/components/CartProvider';

const sans = Nunito_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap', adjustFontFallback: false });
const logo = Nunito({ subsets: ['latin'], weight: ['900'], variable: '--font-logo', display: 'swap' });

export const metadata: Metadata = {
  title: 'Konga Clone | Buy Phones, Fashion, Electronics in Nigeria',
  description: 'A Konga.com storefront clone built with Next.js and Tailwind CSS.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${logo.variable}`}>
      <body className="min-h-screen font-sans">
        <CartProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
