import 'core-js/features/promise';
import 'regenerator-runtime/runtime';

import loadJs from 'load-js';
import loadCss from './helpers/loadCss';
import log from './helpers/log';

if (window.__FINFIDY_PATH__) {
  __webpack_public_path__ = window.__FINFIDY_PATH__
}

if (!window.crypto) {
  window.crypto = window.msCrypto
}

// /**
//  * Load Dependencies
//  */
Promise.all(__webpack_require__.chunks.map(__webpack_require__.e)).then(() => {

if ((global as any).findify_initialized) return;
(global as any).findify_initialized = true;

  
let __sentry;

const deps: Promise<any>[] = [
  import(/* webpackChunkName: "polyfill" */ './polyfill'),

  /** Main initialization file */
  import(/* webpackChunkName: "initializer" */ './initialize'),

  /**  Setup Sentry errors monitoring */
  import(/* webpackChunkName: "initializer" */ '@sentry/browser'),

  import(/* webpackChunkName: "initializer" */ '@findify/agent'),

  /**  Prefetch components */
  import(
    /* webpackChunkName: "components" */
    '@findify/react-components/src/layouts/Autocomplete'
  ),

  import(
    /* webpackChunkName: "components" */
    '@findify/react-components/src/layouts/Search'
  ),

  import(
    /* webpackChunkName: "recommendation" */
    '@findify/react-components/src/layouts/Recommendation'
  )
];

/**
 * Split configuration to separated chunk
 * The real merchant configuration will be added there on Findify Compilation server
 * So we will load it by load.js ~_~
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
  .then(([_, initialize, sentry]) => {
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
    __sentry.captureException(e);
    log('error', 'color: #D9463F');
    log(e.stack);
    Promise
    .all(deps)
    .then(([_, initialize, sentry]) => {
      initialize.default({ key: __MERCHANT_API_KEY__ }, sentry);
    })
    .catch(e => {
      log('Please contact support team', 'color: #D9463F');
    })

    throw e;
  })
});
