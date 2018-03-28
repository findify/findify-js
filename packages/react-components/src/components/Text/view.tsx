import { createElement } from 'react';
import cx from 'classnames';

export default ({
  component = 'p',
  className,
  children,
  mode,
  theme,
  bold,
  size,
}) => createElement(component, {
  children,
  className: cx(
    theme.root,
    mode && theme[mode] || theme[size],
    bold && theme.bold,
    className,
  )
})
