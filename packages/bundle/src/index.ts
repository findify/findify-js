/**
 * The set of polyfills with support of IE 9+
 * @babel/preset-env will replace this require with 'core-js'
 * imports to reduce the size
 */
import 'regenerator-runtime/runtime';
import 'core-js/features/promise';

import loadJs from 'load-js';
import loadCss from './helpers/loadCss';
import log from './helpers/log';

/**
 * Load Dependencies
 */
(() => {
if ((global as any).findify_initialized) return;
(global as any).findify_initialized = true;

const deps: Promise<any>[] = [];

import(
  /* webpackChunkName: "autocomplete" */
  /* webpackPrefetch: true */
  '@findify/react-components/src/layouts/Autocomplete'
);

deps.push(import(/* webpackChunkName: "polyfill" */ './polyfill'));

/** Main initialization file */
deps.push(import(/* webpackChunkName: "initializer" */ './initialize'));

/**
 * Setup Sentry errors monitoring
 */
deps.push(import(/* webpackChunkName: "sentry" */ '@sentry/browser'));

/**
 * Preload large libs
 */
deps.push(import(/* webpackChunkName: "agent" */ '@findify/agent'));

/**
 * Import polyfills
 */

/**
 * Split configuration to separated chunk
 * The real merchant configuration will be added there on Findify Compilation server
 * So we will load it by load.js ~_~
 */
const loadConfig = () => import(/* webpackChunkName: "config" */ './config');

if(process.env.NODE_ENV !== 'development') {
  deps.push(loadJs(__MERCHANT_CONFIG_URL__));
} else {
  deps.push(loadConfig());
}

/** Load styles */
if (process.env.NODE_ENV !== 'development') {
  ((path) => {
    if (!path) return loadCss(__webpack_require__.p + 'styles.css');
    return loadCss(path);
  })(__MERCHANT_CSS__);
}

Promise
.all(deps)
.then(([_, initialize, sentry]) => {
  if (process.env.NODE_ENV !== 'development' && __SENTRY_ENABLED__ && sentry && sentry.init) {
    sentry.init({
      dsn: 'https://1db8972d9612483b96430ad56611be6e@sentry.io/1234846',
      version: __MERCHANT_VERSION__,
      environment: __ENVIRONMENT__,
      whitelistUrls: [__webpack_require__.p]
    })
    sentry.configureScope(scope => 
      scope.setExtra('version', __MERCHANT_VERSION__)
    );
  }
  initialize.default({ key: __MERCHANT_API_KEY__ });
  log('ready', 'color: #3DBC88');
  log(`version: ${__MERCHANT_VERSION__}`);
})
.catch(e => {
  log('error', 'color: #D9463F');
  log(e.stack);
  Promise
  .all(deps)
  .then(([initialize]) => {
    initialize.default({ key: __MERCHANT_API_KEY__ });
  })
  .catch(e => {
    log('Please contact support team', 'color: #D9463F');
  })
})
})();
