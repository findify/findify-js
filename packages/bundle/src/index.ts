import 'core-js/es6/promise';
import loadJs from 'load-js';

/**
 * Create global namespace
 */
(global as any).findify = {};

/**
 * Load Dependencies
 */
Promise.all([
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
    '@findify/react-components'
  ),

  loadJs(
    /* Load polyfills if needed */
    __webpack_require__.p + 'polyfill.js'
  )

])
.then(([initialize, config]) => initialize.default(config));
