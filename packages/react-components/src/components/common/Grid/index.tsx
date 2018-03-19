import React from 'react';
import { compose, withPropsOnChange, setDisplayName, defaultProps } from 'recompose';
import { memoize } from 'lodash';
import cx from 'classnames';
import styles from './styles.css'

import { Column } from './Column';

type Props = {
  columns: string,
  style?: React.StyleHTMLAttributes<any>,
  children: any,
  theme?: { [className: string]: string }
}

type OwnProps = Props & {
  theme: { [className: string]: string }
}

const getClassName = memoize((columns, theme) =>
  columns.split('|').map(value => theme[`column-${value}`])
);

export const Grid = compose<OwnProps, Props>(
  setDisplayName('Grid'),
  defaultProps({ theme: styles }),
  withPropsOnChange(['columns', 'children'], ({ columns, children, theme }) => {
    const classNames = getClassName(columns, theme);
    return {
      children: React.Children.map(
        children,
        (child: React.ReactChild, index: number) =>
          child &&
          Column({
            key: child.key,
            children: child,
            className: classNames[index] || classNames[0],
            columnClass: child.props.columnClass,
            columnStyle: child.props.columnStyle,
          })
      ),
    };
  })
)(({ children, theme, style }) => (
  <div className={theme.root} style={style}>
    {children}
  </div>
));

export default Grid;
