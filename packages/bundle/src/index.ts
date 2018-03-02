/**
 * Create global namespace
 */
(global as any).findify = {};

import 'core-js/es6/promise';
import loadJs from 'load-js';

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
    /* webpackChunkName: "polyfill" */
    '@babel/polyfill'
  )
])
.then(([initialize, config]) => {
  initialize.default(config)
});
