/**
 * @module components/Text
 */

import { createElement } from 'react';
import cx from 'classnames';
import { ThemedSFCProps, ClassnamedProps } from 'types';

/** Props that Text component accepts */
export interface ITextProps extends ThemedSFCProps, ClassnamedProps {
  /** Either an html tag name or a React.Component */
  component?: string | React.ElementType;
  /** One of modes specified in styles.css */
  mode?: string;
  /** Flag to show text as bold */
  bold?: boolean;
  /** Custom inline styles */
  style?: { [x: string]: string };
  /** Flag to show text as inline block */
  inlineBlock?: boolean;
  /** One of sizes specified in styles.css */
  size?: string;
  /** Custom HTML */
  html?: string;
}

const TextView = ({
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
}: ITextProps) =>
  createElement(component, {
    children,
    ...(__html && { dangerouslySetInnerHTML: { __html } }),
    style,
    className: cx(
      theme.root,
      (mode && theme[mode!]) || theme[size!],
      bold && theme.bold,
      inlineBlock && theme.inlineBlock,
      className
    ),
  });

export default TextView;
