'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import Image from 'next/image';
import React from 'react';
import { useShoppingCart } from 'use-shopping-cart';

import { Button } from '@/components/ui/button';

export default function ShoppingCartModal() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    redirectToCheckout,
  } = useShoppingCart();

  async function handleCheckoutClick(event: any) {
    event.preventDefault();
    try {
      const result = await redirectToCheckout();
      if (result?.error) {
        console.log('result');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
        <SheetContent className="ms:max-w-lg w-[90vw]">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
          </SheetHeader>
          <div className="h-full flex flex-col justify-between">
            <div className="mt-8 flex-1 overflow-y-auto">
              <ul className="-my-6 divide-y divide-gray-200">
                {cartCount === 0 ? (
                  <h1 className=" font-bold  py-6">
                    You do not have any items
                  </h1>
                ) : (
                  <>
                    {Object.values(cartDetails ?? {}).map((entry) => (
                      <li key={entry.id} className="flex py-6 ">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            priority
                            src={entry.image as string}
                            alt="Image"
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium">
                              <h3>{entry.name}</h3>
                              <p className="ml-4">${entry.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                              {entry.description}
                            </p>
                          </div>
                          <div className=" flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">
                              QTY: {entry.quantity}
                            </p>
                            <div className="flex ">
                              <button
                                onClick={() => removeItem(entry.id)}
                                type="button"
                                className="mr-1 font-medium text-coral-red hover:text-coral-red/80"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
            <div className="border-t mb-3 border-gray-200 px-4 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal: </p>
                <p>${totalPrice}</p>
              </div>
              <p className=" mt-0.5 text-sm text-gray-500">
                Shipping and taxes are calculated at Checkout
              </p>
              <div className="mt-5 mb-5">
                <Button
                  onClick={handleCheckoutClick}
                  variant={'destructive'}
                  className="bg-coral-red w-full"
                >
                  Check Out With Stripe
                </Button>
              </div>
              <div className="gap-2 mb-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  OR{' '}
                  <button
                    onClick={() => handleCartClick()}
                    className="font-medium text-coral-red hover:text-coral-red/80"
                  >
                    Continue Shopping
                  </button>
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
