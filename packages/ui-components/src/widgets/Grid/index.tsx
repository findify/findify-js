import * as React from 'react';
import {
  compose,
  pure,
  defaultProps,
  withPropsOnChange,
  createEagerElement,
  setDisplayName,
} from 'recompose';
import * as cx from 'classnames';
import { memoize } from 'lodash';

const styles = require('./styles.css');

export type ColumnElement = React.SFC<any> | React.ComponentClass<any> | string;

const getClassName = memoize(columns =>
  columns.split('|').map(value => styles[`column-${value}`])
);

export const Grid: any = compose(
  pure,
  setDisplayName('Grid'),
  defaultProps({ columnElement: 'div' }),
  withPropsOnChange(
    ['columns', 'children'],
    ({ columns, children, columnElement }: GridType) => {
      const classNames = getClassName(columns);
      return {
        children: React.Children.map(
          children,
          (child: any, index: number) =>
            child &&
            createEagerElement(
              child.props.columnElement || columnElement,
              {
                key: child.key,
                style: child.props.columnStyle,
                className: cx(
                  styles.column,
                  classNames[index] || classNames[0],
                  child.props.columnClass
                ),
              },
              child
            )
        ),
      };
    }
  )
)(({ children, className }: GridType) => (
  <div className={cx(styles.wrap, className)}>{children}</div>
));

type GridType = {
  children: any;
  columns: string;
  columnElement: ColumnElement;
  className?: string;
};
