import * as React from 'react';
import {
  withKnobs,
  text,
  boolean,
  number,
} from '@kadira/storybook-addon-knobs';
import { host } from 'storybook-host';
const { storiesOf, action } = require('@kadira/storybook');

import { ProductsList } from '../../src/lists/ProductsList';
const products = require('../data/raw.json').items;

storiesOf('Products List', module)
  .addDecorator(withKnobs)
  .addDecorator(
    host({
      title: 'Products grid',
      align: 'center top',
      width: '70%',
    }),
  )
  .addWithInfo('default', () => {
    const config = {
      columns: number('config.columns', 3),
      product: {
        currency: text('config.product.currency', 'USD'),
        image: {
          query: {},
        },
        title: {
          lines: number('config.product.title.lines', 3),
          display: boolean('config.product.title.display', true),
        },
        description: {
          lines: number('config.product.description.lines', 3),
          display: boolean('config.product.description.display', true),
        },
      },
    };

    return (
      <ProductsList
        items={products}
        config={config}
        onProductClick={action('Click on product')}
      />
    );
  });
