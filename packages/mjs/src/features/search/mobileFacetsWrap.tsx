import * as React from 'react';
import { withHandlers } from 'recompose';

const wrapStyles = {
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.33)',
  zIndex: 99999,
};

const helperStyles = {
  position: 'fixed',
  right: 0,
  top: 0,
  bottom: 0,
  width: '30%',
};

export default withHandlers({
  onClick: ({ onMobileFacetsClose }) => onMobileFacetsClose,
})(({ children, onClick, motion }) => (
  <div style={wrapStyles}>
    <div style={helperStyles} onClick={onClick} />
    {children}
  </div>
));
