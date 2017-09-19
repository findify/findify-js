import * as React from 'react';

const props = {
  value: 1.5,
  count: 5,
};

export default ({ Component }) => (
  <div style={{ margin: 50, width: 400, position: 'relative' }}>
    <Component {...props} />
  </div>
);
