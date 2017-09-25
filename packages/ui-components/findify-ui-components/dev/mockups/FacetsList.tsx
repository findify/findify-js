import * as React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import { withFacets } from '../helpers/withFacets';
const rootStyle = {
  position: 'fixed',
  backgroundColor: 'rgba(0,0,0,.75)',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: 2,
};

const containerStyle = {
  position: 'absolute',
  left: 0,
  width: '75%',
  top: 0,
  bottom: 0,
};

const props = {
  facets: require('../data/raw.json').facets,
};

export default withState(
  'isOpen',
  'toggleOpen',
  false,
)(({ Component, toggleOpen, isOpen }: any) => {
  const Container = withFacets(Component);
  return (
    <div>
      {/*<button onClick={() => toggleOpen(true)}>Open Mobile popup</button>*/}
      {
        <div style={rootStyle}>
          <div style={containerStyle}>
            <Container {...props} {...{ toggleOpen, isMobile: true }} />
          </div>
        </div>
      }
      {/*<div style={{ margin: 50, width: 400, position: 'relative' }}>
        <Container {...props} />
      </div>*/}
    </div>
  );
});
