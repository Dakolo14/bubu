import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopBanner from '@/components/TopBanner';
import FloatingWidgets from '@/components/FloatingWidgets';
import { CartProvider } from '@/components/CartProvider';

const sans = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Konga Clone | Buy Phones, Fashion, Electronics in Nigeria',
  description: 'A Konga.com storefront clone built with Next.js and Tailwind CSS.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="min-h-screen font-sans">
        <CartProvider>
          <TopBanner />
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <FloatingWidgets />
        </CartProvider>
      </body>
    </html>
  );
}
