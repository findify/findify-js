import * as React from 'react';
import {
  withKnobs,
  text,
  boolean,
  number,
} from '@kadira/storybook-addon-knobs';
import { host } from 'storybook-host';
const { storiesOf, action } = require('@kadira/storybook');

import { Product } from '../../src/widgets/Product';
const product = require('../data/raw.json').items[0];

storiesOf('Product', module)
  .addDecorator(withKnobs)
  .addDecorator(
    host({
      title: 'Single product item',
      align: 'left top',
      width: 200,
    }),
  )
  .addWithInfo('default', () => {
    const config = {
      currency: text('currency', 'USD'),
      image: {
        query: {},
      },
      title: {
        lines: number('title.lines', 3),
        display: boolean('title.display', true),
      },
      description: {
        lines: number('description.lines', 3),
        display: boolean('description.display', true),
      },
    };

    return (
      <Product
        {...product}
        config={config}
        onClick={action('Click on product')}
      />
    );
  });
