import * as React from 'react';

const props = {
  style: {
    borderWidth: '1px',
    borderColor: 'black',
    borderStyle: 'solid',
    padding: '10px',
  },
};

export default ({ Component }: any) => (
  <div style={{ margin: 50, width: 400, position: 'relative' }}>
    <Component columns="2">
      {[...Array(6).keys()].map(key => (
        <div key={key} {...props}>
          {key}
        </div>
      ))}
    </Component>
    <Component columns="2|4|1|5">
      {[...Array(4).keys()].map(key => (
        <div key={key} {...props}>
          {key}
        </div>
      ))}
    </Component>
  </div>
);
