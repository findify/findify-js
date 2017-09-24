import * as React from 'react';

const props = {
  isOpen: true,
  label: 'Colors',
  type: 'text',
  name: 'Colors',
  config: {
    mapping: {},
  },
};

export const values = [
  {
    value: 'Blue',
    count: 83,
    selected: false,
  },
  {
    value: 'Red',
    count: 75,
    selected: false,
  },
  {
    value: 'Multicolor',
    count: 73,
    selected: false,
  },
  {
    value: 'Yellow',
    count: 261,
    selected: false,
  },
];

export default ({ Component }) => (
  <div style={{ margin: 50, width: 400, position: 'relative' }}>
    <Component {...props} values={values} />
  </div>
);
