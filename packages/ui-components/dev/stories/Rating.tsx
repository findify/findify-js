import * as React from 'react';
import {
  withKnobs,
  text,
  boolean,
  number,
} from '@kadira/storybook-addon-knobs';
import { host } from 'storybook-host';
const { storiesOf, action } = require('@kadira/storybook');

import { Rating } from '../../src/widgets/Rating';

storiesOf('Rating', module)
  .addDecorator(withKnobs)
  .addDecorator(
    host({
      title: 'Star Rating component',
      align: 'center top',
    }),
  )
  .addWithInfo('default', () => {
    return (
      <Rating
        value={number('Rating', 1.5)}
        count={number('Number of reviews', 5)}
      />
    );
  });
