import { useEffect, createElement } from 'react';

export default (name) => (base) => {
  console.warn(
    `Component ${name} is deprecated. Please update customizations!`
  );
  return (props) => createElement(base, props);
};
