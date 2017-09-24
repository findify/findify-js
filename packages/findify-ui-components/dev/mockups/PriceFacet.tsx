import * as React from 'react';

const props = {
  isOpen: true,
  label: 'price',
  type: 'price',
  name: 'Price',
  onChange: console.log,
  min: 1,
  max: 20,
  config: {
    currency: {
      code: 'USD',
    },
    i18n: {
      submit: 'Apply',
      under: '&amp; than',
      up: 'More than',
    },
  },
};
export const values = [
  {
    count: 83,
    selected: false,
    from: 10,
    to: 20,
  },
  {
    count: 75,
    selected: false,
    from: 30,
  },
  {
    count: 73,
    selected: false,
    to: 10,
  },
];

export default ({ Component }) => (
  <div style={{ margin: 50, width: 400, position: 'relative' }}>
    <Component {...props} values={values} />
  </div>
);
