import React from 'react';
import { compose, withHandlers } from 'recompose';
import cx from 'classnames';

export default ({ theme, onClick, children, active, size }) => (
  <button
    onClick={onClick}
    className={cx(
      theme.button,
      active && theme.active,
      theme[size]
    )}
  >
  { children }
  </button>
);
