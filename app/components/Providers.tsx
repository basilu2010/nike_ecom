'use client';
import { ReactNode } from 'react';
import { CartProvider as USCProdvider } from 'use-shopping-cart';

export default function CartProviders({ children }: { children: ReactNode }) {
  return (
    <div>
      <USCProdvider
        mode="payment"
        cartMode="client-only"
        stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
        successUrl="http://localhost:3000/stripe/success"
        cancelUrl="http://localhost:3000/"
        currency="AUD"
        billingAddressCollection={true}
        shouldPersist={true}
        language="en-US"
      >
        {children}
      </USCProdvider>
    </div>
  );
}
