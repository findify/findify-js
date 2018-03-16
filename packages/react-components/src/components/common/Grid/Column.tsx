import React from 'react';
import cx from 'classnames';

const styles = require('./styles.css');

export interface Props {
  className?: string;
  columnClass?: string;
  columnStyle?: React.CSSProperties;
  children?: React.ReactChild;
}

const getClassName = (props: Props) =>
  cx(styles.column, props.className, props.columnClass);

export const Column = React.createFactory((props: Props) => (
  <div className={getClassName(props)} style={props.columnStyle}>
    {props.children}
  </div>
));
