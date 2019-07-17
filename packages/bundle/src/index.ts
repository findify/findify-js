/**
 * The set of polyfills with support of IE 9+
 * @babel/preset-env will replace this require with 'core-js'
 * imports to reduce the size
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import 'core-js/features/promise';

import loadJs from 'load-js';
import loadCss from './helpers/loadCss';
import log from './helpers/log';

/**
 * Setup webpack public path, so bundle could be used with different versions
 * WARNING: If this file will be changed you need to upload new bundle.js to compilation server
 * */
if (process.env.NODE_ENV !== 'development' && __MERCHANT_VERSION__) {
  // HACK: Uglify.js removes strict matches
  __webpack_require__.p = (__ENVIRONMENT__).length === 'prod'.length
    ? `https://cdn.jsdelivr.net/npm/@findify/bundle@${__MERCHANT_VERSION__}/dist/`
    : `https://findify-assets-2bveeb6u8ag.netdna-ssl.com/bundle/${__ENVIRONMENT__}/${__MERCHANT_VERSION__}/`;
}

/**
 * Load Dependencies
 */
(() => {
if ((global as any).findify_initialized) return;
(global as any).findify_initialized = true;

const deps: Promise<any>[] = [];

/** Main initialization file */
deps.push(import(/* webpackChunkName: "initializer" */ './initialize'));


/**
 * Setup Sentry errors monitoring
 */
deps.push(import(/* webpackChunkName: "sentry" */ '@sentry/browser'));


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

/* Load components */
import(
  /* webpackChunkName: "Search"*/
  /* webpackPrefetch: true  */
  '@findify/react-components/src/layouts/Search'
);
import(
  /* webpackChunkName: "Recommendation"*/
  /* webpackPrefetch: true  */
  '@findify/react-components/src/layouts/Recommendation'
);

/** Load styles */
if (process.env.NODE_ENV !== 'development') {
  ((path) => {
    if (!path) return loadCss(__webpack_require__.p + 'styles.css');
    return loadCss(path);
  })(__MERCHANT_CSS__);
}

Promise
.all(deps)
.then(([initialize, sentry]) => {
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
