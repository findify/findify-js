import * as React from 'react';
import { withMJS } from '../helpers/withMJS';

export default withMJS(({ Component, ...props }: any) => (
  <div style={{ margin: 50, width: '70%', position: 'relative' }}>
    <Component {...props} isMobile />
  </div>
));
