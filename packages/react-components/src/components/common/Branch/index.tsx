import React from 'react';

export default ({ left, right, children, condition, ...props }: any) => {
  const Component = condition ? left : right || React.Fragment;
  return <Component {...((condition || right) && props)}>{children}</Component>
}
