import { simplifiedProduct } from '@/app/interface';
import { client } from '@/app/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
async function getData(category: string) {
  const query = `*[_type == "product" && category->name == "${category}"] {
          _id,
          price,
          name,
          "slug": slug.current,
          "categoryName": category->name,
          "imageUrl": images[0].asset->url,
          discountPrice,
}`;
  const data = await client.fetch(query);
  return data;
}
export default async function CategoryName({
  params,
}: {
  params: { category: string };
}) {
  const data: simplifiedProduct[] = await getData(params.category);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Products for{' '}
            <span className="text-coral-red">{params.category}</span>
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.imageUrl}
                  alt="Product image"
                  className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                  width={300}
                  height={300}
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-700">
                    <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.categoryName}
                  </p>
                </div>
                <p className="text-md  font-bold text-gray-700 ">
                  ${product.price}
                </p>
                <p className=" pl-2 text-sm text-coral-red  line-through font-light">
                  ${product.discountPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
