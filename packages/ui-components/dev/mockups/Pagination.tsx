import * as React from 'react';
import { withState } from 'recompose';

export default withState(
  'current',
  'setCurrentPage',
  4,
)(({ Component, current, setCurrentPage }: any) => (
  <div style={{ margin: 50, width: 400, position: 'relative' }}>
    <Component
      total={20}
      current={current}
      onChange={page => setCurrentPage(page)}
    />
  </div>
));
