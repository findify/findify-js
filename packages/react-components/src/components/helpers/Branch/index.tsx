import React from 'react';

export default ({ left, right = React.Fragment, children, condition, ...props }) => {
  const Component = condition ? left : right;
  return <Component {...props}>{children}</Component>
}
