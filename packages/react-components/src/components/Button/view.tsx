import React from 'react';
import { compose, withHandlers } from 'recompose';
import cx from 'classnames';

export default ({ theme, onClick, children, active, raw, className, disabled, ...rest }) => (
  <button
    {...rest}
    onClick={onClick}
    disabled={disabled}
    className={cx(theme.root, active && theme.active, raw && theme.raw, className)}
  >
  { children }
  </button>
);
