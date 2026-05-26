import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Happy Valentine\'s Day',
  description: 'A special Valentine\'s Day proposal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-pink-50 via-red-50 to-pink-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
