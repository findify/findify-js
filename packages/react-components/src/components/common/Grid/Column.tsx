/**
 * @module components/common/Grid
 */

import React, { useMemo } from 'react';
import cx from 'classnames';

import styles from 'components/common/Grid/styles.css';

/** List of props that GridColumn accepts */
export interface IGridColumnProps {
  /** Custom className for column */
  className?: string;
  /** Column inline style */
  style?: React.CSSProperties;
  /** Contents of the column */
  children?: React.ReactChild;

  gutter?: string | number;

  size: string;

  order?: number,

  component: React.ComponentType<any> | string
}
const getWidth = (size, gutter?) => {
  const percents = 100 / 12 * Number(size);
  return !!gutter
    ? `calc(${percents}% - ${gutter})`
    : `${percents}%`
};

export const Column = ({
  className,
  style,
  children,
  gutter,
  order: _order,
  size: _size,

  component: Component = 'div'

}: IGridColumnProps) => {
  const composedClassName = useMemo(() =>
    cx(styles.column, className, styles[`column-${_size}`]),
    [className, _size]
  );

  const order = useMemo(() => !_order ? {} : ({
    webkitBoxOrdinalGroup: _order,
    mozBoxOrdinalGroup: _order,
    msFlexOrder: _order,
    webkitOrder: _order,
    order: _order
  }), [_order]);

  const size = useMemo(() => {
    const isFixed = !isNaN(Number(_size));
    return {
      flexBasis: isFixed && getWidth(_size, gutter),
      msFlexPreferredSize: isFixed && getWidth(_size, gutter),
      paddingLeft: `${gutter}`
    }
  }, [_size, gutter]);

  return (
    <Component
      className={composedClassName}
      style={{
        ...size,
        ...order,
        ...style
      }}
    >
      {children}
    </Component>
  )
};

export const Placeholder = ({ size }) => (
  <div
    className={styles.placeholder}
    style={{ flexBasis: getWidth(size) }}
  />
)
