/**
 * @module components/common/Branch
 */

import * as React from 'react';

/** Props that Branch component accepts */
export interface IBranchProps {
  /**
   * Use display-if to hide a component.
   * When property is not defined or is set to true - component is rendered,
   * when it is false - hidden
   */
  'display-if'?: boolean;
  /** Component to render in case **condition** is true */
  left?: React.ComponentType;
  /** Component to render in case **condition** is false */
  right?: React.ComponentType;
  /** Boolean value to test against */
  condition?: boolean;
  /** Rest props to be passed to rendered component */
  [x: string]: any;
}

const Branch = ({
  left,
  right,
  children,
  condition,
  ...props
}: IBranchProps) => {
  const Component = (condition
    ? left
    : right || React.Fragment) as React.ComponentType;
  return <Component {...((condition || right) && props)}>{children}</Component>;
};

export default Branch;
