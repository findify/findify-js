import * as React from 'react';

import {
  withKnobs,
  text,
  boolean,
  number,
} from '@kadira/storybook-addon-knobs';
import { host } from 'storybook-host';
const { storiesOf, action } = require('@kadira/storybook');

import { CheckboxFacet } from '../../src/widgets/CheckboxFacet';
import { CategoryFacet } from '../../src/widgets/CategoryFacet';
import { ColorFacet } from '../../src/widgets/ColorFacet';
import { RangeFacet } from '../../src/widgets/RangeFacet';

import { values as checkboxValues } from '../mockups/CheckboxFacet';
import { values as categoryValues } from '../mockups/CategoryFacet';
import { values as colorValues } from '../mockups/ColorFacet';
import { values as rangeValues } from '../mockups/RangeFacet';

storiesOf('Facets', module)
  .addDecorator(withKnobs)
  .addDecorator(
    host({
      title: 'Default Findify UI facets',
      align: 'left top',
      width: 400,
    }),
  )
  .addWithInfo('CheckBoxFacet', () => {
    const props = {
      isOpen: boolean('Is Open?', true),
      label: text('Facet title', 'Checkbox'),
      type: 'text',
      name: 'Checkbox',
      onChange: action('Facet was changed'),
    };

    const config = {
      maxItemsCount: number('config.maxItemsCount', 6),
      rowHeight: number('config.rowHeight', 20),
      i18n: {
        search: text('config.i18n.search', 'Search'),
        more: text('config.i18n.more', 'Show more'),
        less: text('config.i18n.less', 'Less'),
      },
    };

    return <CheckboxFacet {...props} config={config} values={checkboxValues} />;
  })
  .addWithInfo('CategoryFacet', () => {
    const props = {
      isOpen: boolean('Is Open?', true),
      label: text('Facet title', 'Kategori'),
      type: 'category',
      name: 'Kategori',
      onChange: action('Facet was changed'),
    };

    const config = {
      maxItemsCount: number('config.maxItemsCount', 6),
      rowHeight: number('config.rowHeight', 20),
      i18n: {
        goBackTitle: text('config.i18n.goBackTitle', 'All categories'),
        more: text('config.i18n.more', 'Show more'),
        less: text('config.i18n.less', 'Less'),
      },
    };

    return <CategoryFacet {...props} config={config} values={categoryValues} />;
  })
  .addWithInfo('ColorFacet', () => {
    const props = {
      isOpen: boolean('Is Open?', true),
      label: text('Facet title', 'Colors'),
      type: 'text',
      name: 'color',
      onChange: action('Facet was changed'),
    };

    return <ColorFacet {...props} values={colorValues} />;
  })
  .addWithInfo('RangeFacet', () => {
    const props = {
      isOpen: boolean('Is Open?', true),
      label: text('Facet title', 'Range'),
      type: 'range',
      name: 'Range',
      onChange: action('Facet was changed'),
      min: number('Minimum value', 1),
      max: number('Maximum value', 20),
    };

    const config = {
      currency: text('config.currency', 'USD'),
      i18n: {
        submit: text('config.i18n.submit', 'Apply'),
      },
    };

    return <RangeFacet {...props} values={rangeValues} config={config} />;
  });
