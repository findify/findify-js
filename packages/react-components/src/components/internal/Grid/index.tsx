import React from 'react';
import { compose, pure, withPropsOnChange, setDisplayName } from 'recompose';
import { memoize } from 'lodash';
import cx from 'classnames';
import styles from './styles.css'


import { Column } from './Column';



const getClassName = memoize(columns =>
  columns.split('|').map(value => styles[`column-${value}`])
);

export const Grid = compose(
  pure,
  setDisplayName('Grid'),
  withPropsOnChange(['columns', 'children'], ({ columns, children }: Props) => {
    const classNames = getClassName(columns);
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
)(({ children, className, style }) => (
  <div className={cx(styles.wrap, className)} style={style}>
    {children}
  </div>
));

export default Grid;
