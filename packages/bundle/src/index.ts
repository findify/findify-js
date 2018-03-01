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
    /* webpackChunkName: "analytics" */
    '@findify/analytics-dom'
  ),
  import(
    /* webpackChunkName: "config" */
    './config'
  ),
  import(
    /* webpackChunkName: "agent" */
    '@findify/agent'
  ),
  import(
    /* webpackChunkName: "connect" */
    '@findify/react-connect'
  ),
  import(
    /* webpackChunkName: "polyfill" */
    '@babel/polyfill'
  )
])
.then(deps => require('./initialize').default(...deps));
