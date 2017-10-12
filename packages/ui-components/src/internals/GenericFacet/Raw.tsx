import * as React from 'react';
import * as cx from 'classnames';

const styles = require('./styles.css');

export interface Props {
  isMobile: boolean;
  children?: React.ReactChild;
}

export const Raw = ({ children, ...rest }: Props) => (
  <div className={cx(styles.content, rest.isMobile && styles.mobile)}>
    {React.Children.map(children, (child: React.ReactElement<any>) =>
      React.cloneElement(child, rest)
    )}
  </div>
);
