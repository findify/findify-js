import { createElement } from 'react';
import cx from 'classnames';

export default ({
  component = 'span',
  className,
  children,
  mode,
  theme,
  bold,
  style,
  inlineBlock,
  size,
  html: __html,
}) => createElement(component, {
  children,
  ...(__html && { dangerouslySetInnerHTML: { __html } }),
  style,
  className: cx(
    theme.root,
    mode && theme[mode] || theme[size],
    bold && theme.bold,
    inlineBlock && theme.inlineBlock,
    className,
  )
})
