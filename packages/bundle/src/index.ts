import 'core-js/features/promise';

import loadJs from 'load-js';
import loadCss from './helpers/loadCss';
import log from './helpers/log';

/**
 * Development setup
 */
if (process.env.HOT) require('react-hot-loader')
if (window.__FINFIDY_PATH__) __webpack_public_path__ = window.__FINFIDY_PATH__;

/**
 *  Crypto Support in IE (required in many places)
 */
if (!window.crypto) window.crypto = window.msCrypto;

/**
 * Load Dependencies
 */
const loadDependencies = () => {

// Do not initialize App twice
if ((global as any).findify_initialized) return;
(global as any).findify_initialized = true;
  
let __sentry;

const deps: Promise<any>[] = [
  /** Main initialization file */
  import(/* webpackChunkName: "initializer" */ './initialize'),
];

/** Optional sentry */
if (__SENTRY_ENABLED__) {
  deps.push(import(/* webpackChunkName: "sentry" */ '@sentry/browser'))
}

/**
 * Split configuration to separated chunk
 * The real merchant configuration will be added there on Findify Compilation server
 * So we will load it by load.js
 */
if(process.env.NODE_ENV !== 'development') {
  deps.push(loadJs(__MERCHANT_CONFIG_URL__));
} else {
  deps.push(import(/* webpackChunkName: "config" */ './config'));
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
  .then(([initialize, __, sentry]) => {
    if (process.env.NODE_ENV !== 'development' && __SENTRY_ENABLED__ && sentry && sentry.init) {
      sentry.init({
        dsn: 'https://0815ca0746cb49a4abdc89a6d3821eb3@sentry.io/4580512',
        version: __MERCHANT_VERSION__,
        environment: __ENVIRONMENT__,
        whitelistUrls: [__webpack_require__.p, 'https://findify-assets-2bveeb6u8ag.netdna-ssl.com'],
        defaultIntegrations: false
      })
      sentry.configureScope(scope => 
        scope.setExtra('version', __MERCHANT_VERSION__)
      );
    }

    __sentry = sentry;

    initialize.default({ key: __MERCHANT_API_KEY__ }, sentry);
    log('ready', 'color: #3DBC88');
    log(`version: ${__MERCHANT_VERSION__}`);
  })
  .catch(e => {
    if (__sentry) __sentry.captureException(e);
  
    log('error', 'color: #D9463F');
    log(e.stack);

    Promise
    .all(deps)
    .then(([initialize, sentry]) => {
      initialize.default({ key: __MERCHANT_API_KEY__ }, sentry);
    })
    .catch(e => {
      log('Please contact support team', 'color: #D9463F');
    })

    throw e;
  })
};

const init = () => 
  window && /MSIE|Trident/.test(window.navigator.userAgent)
  ? Promise.all(__webpack_require__.chunks.map(__webpack_require__.e)).then(loadDependencies)
  : loadDependencies()

if (typeof Symbol === "undefined" || typeof Map === "undefined") {
  import(/* webpackChunkName: "polyfill" */ './polyfill').then(init)
} else {
  init()
}
