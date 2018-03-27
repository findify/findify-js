import React from 'react';
import { compose, withHandlers } from 'recompose';
import cx from 'classnames';

export default ({ theme, onClick, children, active, size, className }) => (
  <button
    onClick={onClick}
    className={cx(
      theme.button,
      active && theme.active,
      theme[size],
      className
    )}
  >
  { children }
  </button>
);
