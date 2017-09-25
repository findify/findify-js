import * as React from 'react';
import { camelizeKeys } from 'humps';

const props = {
  id: '1525387649',
  sku: ['SL-ANIM-CHA-JS-XS', 'SL-ANIM-CHA-JS-XXS'],
  title: '"The Swisscycler" Honeycomb to Swiss Perc Recycler',
  short_description: '',
  description:
    'Quick-Dry \r Mesh breathable fabric \r 100% polyester \r Machine wash \r Imported',
  price: [15, 15],
  discount: [40],
  image_url:
    'https://cdn.shopify.com/s/files/1/0282/4738/products/animal-charcoal-front_large.jpg?v=1473863036',
  product_url:
    'http://sleefs-2.myshopify.com/products/ripped-charcoal-camo-jersey-arm-sleeve',
  product_type: '',
  category: [
    {
      category1: 'Jersey',
      category2: '',
      category3: '',
      category4: '',
    },
  ],
  image_2_url:
    'https://cdn.shopify.com/s/files/1/0282/4738/products/animal-charoal-back_medium.jpg?v=1473863036',
  thumbnail_url:
    'https://cdn.shopify.com/s/files/1/0282/4738/products/animal-charcoal-front_small.jpg?v=1473863036',
  availability: true,
  material: [],
  brand: 'Sleefs',
  color: ['Gray'],
  size: ['XS', 'XXS'],
  seller: '',
  condition: '',
  shipping_cost: '',
  shipping_weight: '',
  delivery_time: '',
  quantity: 3,
  color_variants: 1,
  tags: [
    'Charcoal Jersey',
    'Digitalripped',
    'Jerseys',
    'Oldprod',
    'Onsale',
    'Promo',
  ],
  rating_score: -1,
  variants_ids: ['14860563591', '14860563911'],
  stickers: {
    'free-shipping': true,
    'out-of-stock': true,
  },
  reviews: {
    average_score: 3.5,
    total_reviews: 1,
  },
  variants: [],
  created_at: '2016-12-07T21:55:00.000Z',
  custom_fields: {
    barcode: ['SL-ANIM-CHA-JS-XS', 'SL-ANIM-CHA-JS-XXS'],
    old_colors: ['charcoal'],
    variant_image_url: [
      'https://cdn.shopify.com/s/files/1/0282/4738/products/animal-charcoal-front.jpg?v=1473863036',
    ],
    discount_present: ['yes'],
  },
  compare_at: 25,
  config: {
    title: {
      lines: 1,
    },
    description: {
      lines: 2,
    },
    stickers: {
      discount: {
        position: 'bottom-center',
        template: {
          single: '%s% off',
          multiple: 'Up to %s% off',
        },
        styles: {
          fontFamily: '‘Source Sans Pro’, sans-serif',
          fontSize: '12',
          fontWeight: '600',
          textTransform: 'none',
          color: '#ffffff ',
          background: '#D83751 ',
          opacity: '0.9',
        },
      },
      'free-shipping': {
        position: 'bottom-center',
        template: {
          single: 'Free shipping',
          multiple: 'Free shipping',
        },
        styles: {
          fontFamily: '‘Source Sans Pro’, sans-serif',
          fontSize: '12',
          fontWeight: '600',
          textTransform: 'none',
          color: '#ffffff ',
          background: '#D83751 ',
          opacity: '0.9',
        },
      },
    },
  },
};

export default ({ Component }) => (
  <div style={{ margin: 50, width: 191, position: 'relative' }}>
    <Component {...props} />
  </div>
);
