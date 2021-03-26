/**
 * @module components/Button
 */

import * as React from 'react';
import cx from 'classnames';
import { ClassnamedProps, ThemedSFCProps } from 'types';
import styles from 'components/Button/styles.css';

/** Props that Button accepts */
export interface IButtonProps extends ThemedSFCProps, ClassnamedProps {
  /** Event handler for a button */
  onClick?: (evt: Event) => any;
  /** Flag to show if the button is active */
  active?: boolean;
  /** Flag whether to use raw style */
  raw?: boolean;
  /** Flag whether the component is disabled */
  disabled?: boolean;
  /** Rest of the props for the button */
  [x: string]: any;
}

export default ({
  theme = styles,
  onClick,
  children,
  active,
  raw,
  className,
  disabled,
  href,
  ...rest
}: IButtonProps) =>
  React.createElement(href ? 'a' : 'button', {
    ...rest,
    onClick,
    disabled,
    children,
    href,
    className: cx(
      theme.root,
      {
        [theme.active]: active,
        [theme.raw]: raw,
        [theme.link]: !!href,
      },
      className
    ),
  });
