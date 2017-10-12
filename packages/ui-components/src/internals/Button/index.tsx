import * as React from 'react';
import * as cx from 'classnames';
const styles = require('./styles.css');

export interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactChild;
  className?: string;
  isLoading: boolean;
}

const getClassName = (props: Props) =>
  cx(styles.root, props.className, {
    [styles.loading]: props.isLoading,
  });

export const Button = (props: Props) => (
  <button onClick={props.onClick} className={getClassName(props)}>
    {props.children}
  </button>
);

export default Button;
