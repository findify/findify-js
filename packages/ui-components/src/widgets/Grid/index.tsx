import * as React from 'react';
import {
  compose,
  pure,
  withPropsOnChange,
  createEagerFactory,
  setDisplayName,
} from 'recompose';
import * as cx from 'classnames';
import { memoize } from 'lodash';

const styles = require('./styles.css');

const Column = createEagerFactory(
  ({ className, children, columnClass, columnStyle }: any) => (
    <div
      className={cx(styles.column, className, columnClass)}
      style={columnStyle}
    >
      {children}
    </div>
  ),
);

const getClassName = memoize(columns =>
  columns.split('|').map(value => styles[`column-${value}`]),
);

export const Grid: any = compose(
  pure,
  setDisplayName('Grid'),
  withPropsOnChange(
    ['columns', 'children'],
    ({ columns, children }: GridType) => {
      const classNames = getClassName(columns);
      return {
        children: React.Children.map(
          children,
          (child: any, index: number) =>
            child &&
            Column({
              key: child.key,
              children: child,
              className: classNames[index] || classNames[0],
              columnClass: child.props.columnClass,
              columnStyle: child.props.columnStyle,
            }),
        ),
      };
    },
  ),
)(({ children, className }: GridType) => (
  <div className={cx(styles.wrap, className)}>{children}</div>
));

type GridType = {
  children: any;
  columns: string;
  className?: string;
};
