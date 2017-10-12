import * as React from 'react';
import { compose, pure, withPropsOnChange, setDisplayName } from 'recompose';
import * as cx from 'classnames';
import { memoize } from 'lodash';

import { Column } from './Column';

const styles = require('./styles.css');

export interface Props {
  children?: React.ReactChild;
  columns: string;
  className?: string;
  style?: React.CSSProperties;
}

const getClassName = memoize(columns =>
  columns.split('|').map(value => styles[`column-${value}`])
);

export const Grid = compose<Props, Props>(
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
)(({ children, className, style }: Props) => (
  <div className={cx(styles.wrap, className)} style={style}>
    {children}
  </div>
));

export default Grid;
