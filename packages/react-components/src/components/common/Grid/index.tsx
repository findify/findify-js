/**
 * @module components/common/Grid
 */

import React, { useMemo } from 'react';
import { Column, Placeholder } from 'components/common/Grid/Column';
import cx from 'classnames';
import { ThemedSFCProps } from 'types';
import useTheme from 'helpers/useTheme';
import useColumns from 'helpers/useColumns';

import styles from 'components/common/Grid/styles.css';

export interface IGridProps extends ThemedSFCProps {
  columns: string | { [x: number]: string | number };
  className?: string;
  style?: React.CSSProperties;
  /** eq: 12 = 12px | 1em = 1em */
  gutter?: number | string;
  columnClass?: string;
  columnStyle?: React.CSSProperties;
}

const usePlaceholders = (columns, gutter) => {
  if (columns.length !== 1) return null;
  return useMemo(() => Array.from(Array(Number(columns[0])).keys())
    .map(i =>
      <Placeholder key={i} size={columns[0]} gutter={gutter} />
    )
  , [columns]);
}

export default ({
  children: _children,
  theme: _theme,
  columns: _columns,
  gutter: _gutter,

  className,
  style,

  columnStyle,

  ...rest
}: IGridProps) => {
  const computedColumns = typeof _columns === 'string' ? _columns : useColumns(_columns);
  const theme = useTheme(_theme, styles);
  const columns = useMemo(() => computedColumns.split('|'), [computedColumns]);
  const gutter = useMemo(() => _gutter && (isNaN(Number(_gutter)) ? _gutter : `${_gutter}px`), [_gutter]);
  const placeholders = usePlaceholders(columns, gutter);
  
  const children = useMemo(() => React.Children.map(
    _children,
    (child: React.ReactElement<any>, index: number) =>
      child &&
      <Column
        key={child.key || index}
        gutter={gutter}
        order={child.props.order}
        size={child.props.size || columns[index] || columns[0]}
        className={child.props.columnClass}
        columnStyle={columnStyle}
      >
        { child }
      </Column>
  ), [_children, columns]);

  return (
    <div
      className={cx(theme.root, className)}
      style={{ ...style, marginLeft: `-${gutter}` }}
    >
      {children}
      {placeholders}
    </div>
  )
}
