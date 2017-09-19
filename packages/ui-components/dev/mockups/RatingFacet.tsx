import * as React from 'react';

const props = {
  isOpen: true,
  label: 'Range',
  type: 'range',
  name: 'Rating',
  onChange: console.log,
  min: 1,
  max: 20,
  config: {
    currency: {
      code: 'USD',
    },
    i18n: {
      up: '&amp; up',
    },
  },
};
export const values = [
  {
    count: 83,
    selected: false,
    from: 1,
  },
  {
    count: 75,
    selected: false,
    from: 2,
  },
  {
    count: 73,
    selected: false,
    from: 3,
  },
  {
    count: 73,
    selected: false,
    from: 4,
  },
  {
    count: 73,
    selected: false,
    from: 5,
  },
];

export default ({ Component }) => (
  <div style={{ margin: 50, width: 400, position: 'relative' }}>
    <Component {...props} values={values} />
  </div>
);
