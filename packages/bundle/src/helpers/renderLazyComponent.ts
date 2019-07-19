import { Suspense, lazy, createElement } from 'react';

export default (promise) => {
  const component = lazy(promise);
  return (props = {}) => createElement(
    Suspense, { fallback: null }, createElement(component, props)
  )
}
