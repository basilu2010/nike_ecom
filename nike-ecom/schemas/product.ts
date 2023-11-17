export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'images',
      type: 'array',
      of: [{type: 'image'}],
      title: 'Image',
      options: {
        hotspot: true,
      },
    },

    {
      title: 'Description',
      name: 'description',
      type: 'text',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {source: 'name'},
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [
        {
          type: 'category',
        },
      ],
    },
    {
      name: 'discountPrice',
      type: 'number',
      title: 'Discount Price',
    },
    {
      name: 'price_id',
      type: 'string',
      title: 'Stripe Price Id',
    },
  ],
}
