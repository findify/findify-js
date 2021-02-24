/**
 * @module components/common/Grid
 */

import React, { useMemo } from 'react';
import _Column, { IGridColumnProps } from 'components/common/Grid/Column';
import cx from 'classnames';
import { ThemedSFCProps } from 'types';
import useTheme from 'helpers/useTheme';
import useColumns from 'helpers/useColumns';

import styles from 'components/common/Grid/styles.css';

export interface IGridProps extends ThemedSFCProps {
  columns: string | { [x: number]: string | number };
  className?: string;
  style?: React.CSSProperties;
  gutter?: number;
  columnClass?: string;
  columnStyle?: React.CSSProperties;
}

export const Column = _Column;

export default ({
  children: _children,
  theme: _theme,
  columns: _columns,
  gutter: _gutter,

  className,
  style,

  columnClass,
  columnStyle
}: IGridProps) => {
  const computedColumns = typeof _columns === 'string' ? _columns : useColumns(_columns);
  const theme = useTheme(_theme, styles);
  const columns = useMemo(() => computedColumns.split('|'), [computedColumns]);
  const gutter = useMemo(() => {
    const g = _gutter || 12;
    return isNaN(Number(g)) ? g : `${g}px`
  }, [_gutter]);
  
  const children = useMemo(() => React.Children.map(
    _children,
    (child: React.ReactElement<any>, index: number) =>
      child &&
      <Column
        key={child.key || index}
        gutter={gutter}
        order={child.props.order}
        size={child.props.size ||columns[index] || columns[0]}
        className={child.props.columnClass}
        columnStyle={columnStyle}
      >
        { child }
      </Column>
  ), [_children, columns]);

  return (
    <div className={cx(theme.container, className)}>
      <div
        className={theme.root}
        style={{ ...style, margin: `-${gutter} 0 0 -${gutter}` }}
        role='list'
      >
      {children}
      </div>
    </div>
  )
}
