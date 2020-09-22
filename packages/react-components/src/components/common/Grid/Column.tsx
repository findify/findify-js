/**
 * @module components/common/Grid
 */

import React from 'react';
import cx from 'classnames';
import { setDisplayName } from 'recompose';

import styles from 'components/common/Grid/styles.css';

/** List of props that GridColumn accepts */
export interface IGridColumnProps {
  /** Custom className for column */
  className?: string;
  /** Column className */
  columnClass?: string;
  /** Column inline style */
  columnStyle?: React.CSSProperties;
  /** Contents of the column */
  children?: React.ReactChild;
}

/** Used to concatenate & build complete className from props */
const getClassName = (props: IGridColumnProps) =>
  cx(styles.column, props.className, props.columnClass);

const GridColumn = setDisplayName('GridColumn')((props: IGridColumnProps) => (
  <div className={getClassName(props)} style={props.columnStyle} role='listitem' tabIndex={0}>
    {props.children}
  </div>
));

export default GridColumn;
