import AddToBag from '@/app/components/AddToBag';
import CheckoutNow from '@/app/components/CheckOutNow';
import ImageGallery from '@/app/components/ImageGallery';
import { fullProduct } from '@/app/interface';
import { client } from '@/app/lib/sanity';
import { Button } from '@/components/ui/button';
import { Star, Truck } from 'lucide-react';

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
        _id,
          images,
          price,
          name,
          description,
          "slug": slug.current,
          "categoryName": category->name,
          price_id,
          discountPrice,
      }`;

  const data = await client.fetch(query);

  return data;
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullProduct = await getData(params.slug);
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gp-8 md:grid-cols-2">
          <div className="mb-5">
            <ImageGallery images={data.images} />
          </div>

          <div className=" md:py-8">
            <div className=" ml-3 mb-2 md:mb-3">
              <span className=" mb-0.5 inline-block text-gray-500">
                {data.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>
              <div className="mb-6 mt-2 flex items-center gap-3 md:mb-10">
                <Button
                  variant={'destructive'}
                  className="rounded-full gap-x-2  bg-coral-red"
                >
                  <span className="text-sm ">4.7</span>
                  <Star className="h-5 w-6" />
                </Button>
                <span className="text-sm text-gray-500 transition duration-100">
                  (56 ratings)
                </span>
              </div>
              <div className="mb-4">
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold text-gray-800 md:text-2xl">
                    ${data.price}
                  </span>
                  <span className="mb-0.5 text-coral-red line-through">
                    ${data.discountPrice}
                  </span>
                </div>
                <div className="mb-4">
                  <span className=" text-sm text-gray-500">
                    Incl. Vat plus shipping
                  </span>
                </div>
                <div className="mb-6 flex items-center gap-2 text-green-300">
                  <Truck className="w-6 h-6" />
                  <span className="text-sm">2-4 Day shipping</span>
                </div>
                <div className="flex gap-2.5">
                  <AddToBag
                    currency="USD"
                    description={data.description}
                    image={data.images[0]}
                    name={data.name}
                    price={data.price}
                    key={data._id}
                    price_id={data.price_id}
                  />

                  <CheckoutNow
                    currency="USD"
                    description={data.description}
                    image={data.images[0]}
                    name={data.name}
                    price={data.price}
                    key={data._id}
                    price_id={data.price_id}
                  />
                </div>
                <p className="mt-12 text-base text-gray-500 tracking-wide">
                  {data.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
