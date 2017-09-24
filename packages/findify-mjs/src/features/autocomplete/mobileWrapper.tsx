import * as React from 'react';
import { compose, withHandlers } from 'recompose';

const wrapStyles = {
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: 99999,
  backgroundColor: 'rgba(0, 0, 0, 0.33)',
};

const helperStyles = {
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  width: '30%',
};

export default withHandlers({
  onClick: ({ setVisible }) => () => setVisible(false),
})(({ children, onClick, motion }) => (
  <div style={wrapStyles}>
    <div style={helperStyles} onClick={onClick} />
    {children}
  </div>
));
