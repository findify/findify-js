import * as React from 'react';
import { compose, withState } from 'recompose';

const props = {
  onChange: console.log,
  options: [
    { field: 'default', order: '' },
    { field: 'price', order: 'desc' },
    { field: 'price', order: 'asc' },
    { field: 'created_at', order: 'desc' },
  ],
  config: {
    i18n: {
      title: 'Sort by:',
      options: {
        default: 'Relative',
        'price|desc': 'Price: from low to high',
        'price|asc': 'Price: from hight to low',
        'created_at|desc': 'Created: first new',
      },
    },
  },
};

export default compose(
  withState('value', 'setValue', props.options[0]),
)(({ Component, value, setValue }: any) => (
  <div style={{ margin: 50, width: 400, position: 'relative' }}>
    <Component {...props} value={value} onChange={option => setValue(option)} />
  </div>
));
