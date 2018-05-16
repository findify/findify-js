import React from 'react';
import cx from 'classnames';
import { setDisplayName } from 'recompose';

import styles from 'components/common/Grid/styles.css';

export interface Props {
  className?: string;
  columnClass?: string;
  columnStyle?: React.CSSProperties;
  children?: React.ReactChild;
}

const getClassName = (props: Props) =>
  cx(styles.column, props.className, props.columnClass);

export default setDisplayName('Column')((props: Props) => (
  <div className={getClassName(props)} style={props.columnStyle}>
    {props.children}
  </div>
));
