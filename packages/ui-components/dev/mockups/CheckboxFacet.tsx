import * as React from 'react';

export const props = {
  isOpen: true,
  label: 'Checkbox',
  type: 'text',
  name: 'Checkbox',
  onChange: console.log,
  config: {
    maxItemsCount: 3,
    rowHeight: 20,
    i18n: {
      search: 'Search',
      more: 'Show more',
      less: 'Less',
    },
  },
};

export const values = [
  {
    value: 'Aktiv',
    count: 83,
    selected: true,
  },
  {
    value: 'Light & Steriliserad',
    count: 75,
    selected: false,
  },
  {
    value: 'Mature & Senior',
    count: 73,
    selected: false,
  },
  {
    value: 'Valp & Junior',
    count: 261,
    selected: false,
  },
  {
    value: 'Vuxen1',
    count: 558,
    selected: false,
  },
  {
    value: 'Aktiv1',
    count: 83,
    selected: false,
  },
  {
    value:
      'Light & Steriliserad1 Light & Steriliserad1 Light & Steriliserad1 Light & Steriliserad1',
    count: 75,
    selected: false,
  },
  {
    value: 'Mature & Senior1',
    count: 73,
    selected: false,
  },
  {
    value: 'Valp & Junior1',
    count: 261,
    selected: false,
  },
  {
    value: 'Vuxen2',
    count: 558,
    selected: false,
  },
];
export default ({ Component }) => (
  <div style={{ margin: 50, width: 400, position: 'relative' }}>
    <Component {...props} values={values} />
  </div>
);
