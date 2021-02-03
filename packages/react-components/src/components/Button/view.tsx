/**
 * @module components/Button
 */

import React from 'react';
import { compose, withHandlers } from 'recompose';
import cx from 'classnames';
import { ClassnamedProps, ThemedSFCProps } from 'types';

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

const ButtonView: React.SFC<IButtonProps> = ({
  theme,
  onClick,
  children,
  active,
  raw,
  className,
  disabled,
  href,
  ...rest
}: IButtonProps) => React.createElement(
  !!href ? 'a' : 'button',
  {
    ...rest,
    onClick,
    disabled,
    children,
    href,
    className: cx(
      theme.root,
      active && theme.active,
      raw && theme.raw,
      className,
      !!href && theme.link
    )
  }
);


export default ButtonView;
