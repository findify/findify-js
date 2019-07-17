import { Suspense, lazy, createElement } from 'react';

export default (promise) => (props = {}) => createElement(
  Suspense, { fallback: null }, createElement(lazy(promise), props)
)
