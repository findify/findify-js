import * as React from 'react';
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
} from '@kadira/storybook-addon-knobs';
import { host } from 'storybook-host';
const { storiesOf, action } = require('@kadira/storybook');

import { Autocomplete } from '../../src/widgets/Autocomplete';
const product = require('../data/raw.json').items[0];
const suggestions = require('../data/autocomplete.json').suggestions;
const items = require('../data/autocomplete.json').items;

storiesOf('Autocomplete', module)
  .addDecorator(withKnobs)
  .addDecorator(
    host({
      title: 'Search autocomplete variations',
      align: 'left top',
      width: '70%',
    }),
  )
  .addWithInfo('Desktop', () => {
    const config = {
      position: select(
        'Position',
        {
          left: 'left',
          right: 'right',
        },
        'left',
      ),
      i18n: {
        suggestionsTitle: text('Suggestions title', 'Search suggestions'),
        productMatchesTitle: text('Products title', 'Product matches'),
        tipTitle: text('Tip title', 'Press enter to search'),
      },
    };

    return (
      <Autocomplete
        meta={{ query: text('meta.query', 'fru') }}
        suggestions={suggestions}
        items={items}
        onTipClick={action('Click on Tip')}
        onSearchSuggestionClick={action('Click on suggestion')}
        config={config}
      />
    );
  })
  .addWithInfo('Mobile', () => {
    const config = {
      position: select(
        'Position',
        {
          left: 'left',
          right: 'right',
        },
        'left',
      ),
      i18n: {
        suggestionsTitle: text('Suggestions title', 'Search suggestions'),
        productMatchesTitle: text('Products title', 'Product matches'),
        tipTitle: text('Tip title', 'Press enter to search'),
      },
    };

    return (
      <Autocomplete
        meta={{ query: text('meta.query', 'fru') }}
        suggestions={suggestions}
        isMobile
        items={items}
        onTipClick={action('Click on Tip')}
        onSearchSuggestionClick={action('Click on suggestion')}
        config={config}
      />
    );
  })
  .addWithInfo('Small mobile', () => {
    const config = {
      position: select(
        'Position',
        {
          left: 'left',
          right: 'right',
        },
        'left',
      ),
      i18n: {
        suggestionsTitle: text('Suggestions title', 'Search suggestions'),
        productMatchesTitle: text('Products title', 'Product matches'),
        tipTitle: text('Tip title', 'Press enter to search'),
      },
    };

    return (
      <Autocomplete
        meta={{ query: text('meta.query', 'fru') }}
        suggestions={suggestions}
        isMobile
        isMobileSimple
        items={items}
        onTipClick={action('Click on Tip')}
        onSearchSuggestionClick={action('Click on suggestion')}
        config={config}
      />
    );
  });
