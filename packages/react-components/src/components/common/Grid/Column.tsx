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
  columnStyle?: React.CSSProperties;
  /** Contents of the column */
  children?: React.ReactChild;

  gutter?: string | number;

  size: string;

  order?: number
}
const getWidth = (size, gutter) => {
  const percents = 100 / 12 * Number(size);
  return !!gutter
    ? `calc(${percents}%${gutter ? ' - ' + gutter : ''})`
    : `${percents}%`
};

export const Column = ({
  className,
  columnStyle,
  children,
  gutter,
  order: _order,
  size: _size
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
      paddingLeft: `${gutter}`
    }
  }, [_size]);

  return (
    <div
      role='listitem'
      tabIndex={0}
      className={composedClassName}
      style={{
        ...size,
        ...order,
        ...columnStyle
      }}
    >
      {children}
    </div>
  )
};

export const Placeholder = ({ size, gutter }) => (
  <div
    className={styles.placeholder}
    style={{ flexBasis: getWidth(size, gutter) }}
  />
)
