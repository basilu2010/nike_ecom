import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartProviders from './components/Providers';
import ShoppingCartModal from './components/ShoppingCartModal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nike',
  description: 'Best shoes alround the world',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProviders>
          <Navbar />
          <ShoppingCartModal />
          {children}
          <Footer />
        </CartProviders>
      </body>
    </html>
  );
}
