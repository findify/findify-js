/**
 * @module components/common/Grid
 */

import { useMemo, cloneElement, Children, memo } from 'react';

import { Column as _Column, Placeholder } from 'components/common/Grid/Column';
import cx from 'classnames';
import { ThemedSFCProps } from 'types';
import useColumns from 'helpers/useColumns';

import styles from 'components/common/Grid/styles.css';
import { Breakpoints, Immutable } from '@findify/store-configuration';

export interface IGridProps extends ThemedSFCProps {
  columns: Immutable.Factory<Breakpoints> | Breakpoints | string;
  className?: string;
  style?: React.CSSProperties;
  /** eq: 12 = 12px | 1em = 1em */
  gutter?: number | string;
  columnClass?: string;
  columnStyle?: React.CSSProperties;

  wrapperComponent?: React.ComponentType<any> | string;
  columnComponent?: React.ComponentType<any> | string;
}

const usePlaceholders = (columns, gutter) => {
  if (columns.length !== 1 || isNaN(Number(columns[0]))) return null;
  return useMemo(
    () =>
      Array.from(Array(Number(columns[0])).keys()).map((i) => (
        <Placeholder key={i} size={columns[0]} gutter={gutter} />
      )),
    [columns]
  );
};

export const Column = _Column;

export default memo(
  ({
    children: _children,
    theme = styles,
    columns: _columns,
    gutter: _gutter,

    className,
    style,

    wrapperComponent: WrapperComponent = 'div',
    columnComponent,

    ...rest
  }: IGridProps) => {
    const computedColumns =
      typeof _columns === 'string' ? _columns : useColumns(_columns);

    const columns = computedColumns.split('|');
    const gutter =
      _gutter && (isNaN(Number(_gutter)) ? _gutter : `${_gutter}px`);

    const placeholders = usePlaceholders(columns, gutter);

    const children = Children.map(
      _children,
      (child: React.ReactElement<any>, index: number) => {
        if (!child) return null;

        const { order, size, columnClass, columnStyle, ...props } = child.props;

        if (child.type === Column) {
          return cloneElement(child, {
            ...child.props,
            size: size || columns[index] || columns[0],
            component: columnComponent,
            key: child.key || index,
            gutter,
          });
        }

        return (
          <Column
            key={child.key || index}
            gutter={gutter}
            order={order || index + 2}
            size={size || columns[index] || columns[0]}
            className={columnClass}
            style={columnStyle}
            component={columnComponent}
          >
            {cloneElement(child, props)}
          </Column>
        );
      }
    );

    return (
      <WrapperComponent
        className={cx(theme.root, className)}
        style={{ ...style, marginLeft: `-${gutter}` }}
        {...rest}
      >
        {children}
        {placeholders}
      </WrapperComponent>
    );
  },
  (a, b) => a.children === b.children && a.columns === b.columns
);
