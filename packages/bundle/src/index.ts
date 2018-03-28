import 'core-js/es6/promise';
import loadJs from 'load-js';

/**
 * Create global namespace
 */
(global as any).findify = {};

/**
 * Load Dependencies
 */
const deps = [
  import(
    /* webpackChunkName: "initializer" */
    './initialize'
  ),

  import(
    /* webpackChunkName: "config" */
    './config'
  ),

  import(
    /* webpackChunkName: "components" */
    '@findify/react-components/src'
  ),
];

if (process.env.NODE_ENV !== 'development') {
  loadJs(__webpack_require__.p + 'polyfill.js');
}

Promise.all(deps).then(([initialize, config]) => initialize.default(config));
