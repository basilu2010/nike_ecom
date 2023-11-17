'use client';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useShoppingCart } from 'use-shopping-cart';
const links = [
  { label: 'Home', href: '/' },
  { label: 'Men', href: '/category/Men' },
  { label: 'Women', href: '/category/Women' },
  { label: 'Kids', href: '/category/Kids' },
  {
    className: 'text-red-500',
    label: '🔥 Sale 🔥',
    href: '/category/Sale',
  },
];

export default function Navbar() {
  const { handleCartClick } = useShoppingCart();
  const pathName = usePathname();
  return (
    <header className="  padding-x py-8 z-10 w-full">
      <nav className="flex justify-between items-center max-container">
        <Link href="/">
          <Image
            className="ml-5"
            src="/header-logo.svg"
            alt="Logo"
            width={130}
            height={29}
          />
        </Link>
        <ul className="flex flex-1 justify-center items-center gap-16 max-lg:hidden">
          {links.map((link, idx) => (
            <li className={link.className} key={idx}>
              {pathName === link.href ? (
                <Link className="text-[#FF6452]" href={link.href}>
                  {link.label}
                </Link>
              ) : (
                <Link
                  className=" text-gray-500 transition duration-150 hover:text-[#FF6452]"
                  href={link.href}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="flex divide-x">
          <Button
            onClick={() => handleCartClick()}
            variant="secondary"
            className=" flex flex-col mr-none bg-transparent gap-y h-12 w-12 sm:w-20 md:h-14 md:w-14 "
          >
            <ShoppingBag className="text-gray-500" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
