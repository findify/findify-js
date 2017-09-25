import * as React from 'react';
import {
  withKnobs,
  text,
  boolean,
  number,
} from '@kadira/storybook-addon-knobs';
import { host } from 'storybook-host';
const { storiesOf, action } = require('@kadira/storybook');

import { BreadCrumbs } from '../../src/widgets/BreadCrumbs';
const filters = require('../data/raw.json').meta.filters;
import cfg from '../data/config';

storiesOf('BreadCrumbs', module)
  .addDecorator(withKnobs)
  .addDecorator(
    host({
      title: 'BreadCrumbs',
      align: 'left top',
    }),
  )
  .addWithInfo('default', () => {
    const config = {
      facets: cfg.facets,
      i18n: {
        title: text(
          'config.i18n.title',
          'Showing ${ total } results for ${ query }:',
        ),
      },
    };

    return (
      <BreadCrumbs
        filters={filters}
        config={config}
        onChange={action('Breadcrumb has been removed')}
      />
    );
  });
