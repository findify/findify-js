/**
 * @module components/common/Grid
 */

import { useMemo } from 'react';
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

  size?: string;

  order?: number | false;

  component?: React.ComponentType<any> | string;
}

const getWidth = (size, gutter?) => {
  const percents = (100 / 12) * Number(size);
  return gutter ? `calc(${percents}% - ${gutter})` : `${percents}%`;
};

export const Column = ({
  className,
  style,
  children,
  gutter,
  order: _order,
  size: _size,

  component: Component = 'div',
}: IGridColumnProps) => {
  const composedClassName = useMemo(
    () => cx(styles.column, className, styles[`column-${_size}`]),
    [className, _size]
  );

  const order = useMemo(
    () =>
      !_order
        ? {}
        : {
            WebkitBoxOrdinalGroup: _order,
            MozBoxOrdinalGroup: _order,
            MsFlexOrder: _order,
            WebkitOrder: _order,
            order: _order,
          },
    [_order]
  );

  const size = useMemo(() => {
    const basis = !isNaN(Number(_size)) && getWidth(_size, gutter);
    return {
      flexBasis: basis,
      msFlexPreferredSize: basis,
      paddingLeft: `${gutter}`,
    };
  }, [_size, gutter]);

  return (
    <Component
      className={composedClassName}
      style={{
        ...size,
        ...order,
        ...style,
      }}
    >
      {children}
    </Component>
  );
};

export const Placeholder = ({ size, gutter }) => (
  <div
    className={styles.placeholder}
    style={{ flexBasis: getWidth(size, gutter), paddingLeft: `${gutter}` }}
  />
);
