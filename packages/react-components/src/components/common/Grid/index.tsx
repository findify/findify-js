/**
 * @module components/common/Grid
 */

import React from 'react';
import { compose, withPropsOnChange, setDisplayName, defaultProps } from 'recompose';
import cx from 'classnames';
import Column, { IGridColumnProps } from 'components/common/Grid/Column';

import styles from 'components/common/Grid/styles.css';
import { ThemedSFCProps } from 'types';


export interface IGridProps extends ThemedSFCProps {
  columns: string;
  style?: React.StyleHTMLAttributes<any>,
}

const getClassName = (columns, theme) =>
  columns.split('|').map(value => theme[`column-${value}`]);

export default compose<IGridProps, IGridProps>(
  setDisplayName('Grid'),
  defaultProps({ theme: styles }),
  withPropsOnChange(['columns', 'children'], ({ columns, children, theme }) => {
    const classNames: string[] = getClassName(columns, { ...styles, ...theme });
    return {
      children: React.Children.map(
        children,
        (child: React.ReactElement<any>, index: number) => {
          if (!child) return null;
          const props: IGridColumnProps & {key: string | number | undefined}= {
            key: child.key!,
            className: classNames[index] || classNames[0] as string,
            columnClass: child.props.columnClass as string,
            columnStyle: child.props.columnStyle as React.CSSProperties,
          }
          return React.createElement(Column, props, child)
        }
      ),
    };
  })
)(({ children, theme, style }) => (
  <div className={theme.root} style={style} role='list'>
    {children}
  </div>
));
