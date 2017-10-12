import * as React from 'react';
import * as cx from 'classnames';
import { createEagerFactory } from 'recompose';

const styles = require('./styles.css');

export interface Props {
  className?: string;
  columnClass?: string;
  columnStyle?: React.CSSProperties;
  children?: React.ReactChild;
}

const getClassName = (props: Props) =>
  cx(styles.column, props.className, props.columnClass);

export const Column = createEagerFactory((props: Props) => (
  <div className={getClassName(props)} style={props.columnStyle}>
    {props.children}
  </div>
));
