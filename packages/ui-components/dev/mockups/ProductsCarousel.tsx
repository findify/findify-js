import * as React from 'react';
import { camelizeKeys } from 'humps';

const props = {
  items: require('../data/raw.json').items.slice(0, 3),
  title: 'CUSTOMERS WHO VIEWED THIS ALSO VIEWED',
  config: {
    slidesToShow: 5,
    product: {},
    stickers: require('../data/config').stickers,
  },
};

export default ({ Component }) => (
  <div style={{ margin: 50, position: 'relative' }}>
    <Component {...props} />
  </div>
);
