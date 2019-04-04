import './polyfill';
import 'core-js/es6/promise';

import loadJs from 'load-js';
import loadCss from './helpers/loadCss';
import log from './helpers/log';

/**
 * Setup webpack public path, so bundle could be used with different versions
 * WARNING: If this file will be changed you need to upload new bundle.js to compilation server
 * */
if (process.env.NODE_ENV !== 'development' && __MERCHANT_VERSION__) {
  // HACK: Uglify.js removes strict matches
  __webpack_require__.p =
  (__ENVIRONMENT__).length === 'prod'.length
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
if (process.env.NODE_ENV !== 'development' && __SENTRY_ENABLED__) {
  deps.push(import(/* webpackChunkName: "sentry" */ '@sentry/browser'));
}


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
deps.push(import(/* webpackChunkName: "components" */ '@findify/react-components/src'));

// /** Load polyfill only for specific merchants */
// if (process.env.NODE_ENV !== 'development' && __INCLUDE_POLYFILL__) {
//   deps.push(loadJs(__webpack_require__.p + 'polyfill.js'));
// }


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
  if (sentry && sentry.init) {
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
