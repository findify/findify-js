import React from 'react';
import { compose, withPropsOnChange, setDisplayName, defaultProps } from 'recompose';
import cx from 'classnames';
import Column from './Column';

import styles from './styles.css'

type Props = {
  columns: string,
  style?: React.StyleHTMLAttributes<any>,
  children: any,
  theme?: { [className: string]: string }
}

type OwnProps = Props & {
  theme: { [className: string]: string }
}

const getClassName = (columns, theme) =>
  columns.split('|').map(value => theme[`column-${value}`]);

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
          React.createElement(Column,
            {
              key: child.key,
              className: classNames[index] || classNames[0],
              columnClass: child.props.columnClass,
              columnStyle: child.props.columnStyle,
            }, child
          )
      ),
    };
  })
)(({ children, theme, style }) => (
  <div className={theme.root} style={style}>
    {children}
  </div>
));

export default Grid;
