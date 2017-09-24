import * as React from 'react';
import {
  withKnobs,
  text,
  boolean,
  number,
} from '@kadira/storybook-addon-knobs';
const { storiesOf, action } = require('@kadira/storybook');
import { host } from 'storybook-host';

import { Pagination } from '../../src/widgets/Pagination';

storiesOf('Pagination', module)
  .addDecorator(withKnobs)
  .addDecorator(
    host({
      title: 'Pagination for products grid',
      align: 'center top',
    }),
  )
  .addWithInfo('default', () => {
    const config = {
      i18n: {
        previous: text('config.i18n.previous', 'previous'),
        next: text('config.i18n.next', 'next'),
      },
    };

    return (
      <Pagination
        total={number('Total pages', 20)}
        current={number('Current page', 4)}
        config={config}
        onChange={action('Change page')}
      />
    );
  });
