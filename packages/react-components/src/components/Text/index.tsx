/**
 * @module components/Text
 */

import { createElement, memo } from 'react';
import cx from 'classnames';
import { ThemedSFCProps, ClassnamedProps } from 'types';
import styles from 'components/Text/styles.css';

const options = ['title', 'primary', 'secondary', 'uppercase', 'lowercase'];
const getSize = (props) =>
  options
    .filter((i) => Boolean(props[i]))
    .map((i, index) => (index ? i.charAt(0).toUpperCase() + i.slice(1) : i))
    .join('');

/** Props that Text component accepts */
export interface ITextProps extends ThemedSFCProps, ClassnamedProps {
  /** Either an html tag name or a React.Component */
  component?: string | React.ElementType;
  /** One of modes specified in styles.css */
  mode?: string;
  /** Flag to show text as bold */
  bold?: boolean;
  secondary?: boolean;
  primary?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  /** Custom inline styles */
  style?: { [x: string]: string };
  /** Flag to show text as inline block */
  inlineBlock?: boolean;
  /** One of sizes specified in styles.css */
  size?: string;
  /** Custom HTML */
  html?: string;
}

export default memo<ITextProps>(
  ({
    component = 'span',
    className,
    children,
    mode,
    theme = styles,
    style,
    inlineBlock,
    html: __html,
    bold,
    ...rest
  }) =>
    createElement(component, {
      children,
      ...(__html && { dangerouslySetInnerHTML: { __html } }),
      style,
      className: cx(
        theme.root,
        (mode && theme[mode!]) || theme[getSize(rest)],
        bold && theme.bold,
        inlineBlock && theme.inlineBlock,
        className
      ),
    })
);
