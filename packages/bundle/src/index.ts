import 'core-js/es6/promise';
import loadJs from 'load-js';
import loadCss from './helpers/loadCss';
/**
 * Setup webpack public path, so bundle could be used with different versions
 * WARNING: If this file will be changed you need to upload new bundle.js to compilation server
 * */
if (process.env.NODE_ENV !== 'development' && __MERCHANT_VERSION__) {
  __webpack_require__.p =
    `https://findify-assets-2bveeb6u8ag.netdna-ssl.com/bundle/${__ENVIRONMENT__}/${__MERCHANT_VERSION__}/`;
}

/**
 * Create global namespace
 */
(global as any).findify = {};

/**
 * Load Dependencies
 */
const deps: Promise<any>[] = [];

/** Main initialization file */
deps.push(import(/* webpackChunkName: "initializer" */ './initialize'));

/** Split configuration to separated chunk */
const lazyConfig = () => import(
  /* webpackChunkName: "config" */
  /* webpackMode: "weak" */
  './config'
);
/** Configuration will be moved to separated file with real Merchant setup */
if(process.env.NODE_ENV !== 'development') {
  deps.push(loadJs(__MERCHANT_CONFIG_URL__));
} else {
  deps.push(lazyConfig());
}

deps.push(import(/* webpackChunkName: "components" */ '@findify/react-components/src'));

/** Load polyfill only for specific merchants */
if (process.env.NODE_ENV !== 'development' && __INCLUDE_POLYFILL__) {
  deps.push(loadJs(__webpack_require__.p + 'polyfill.js'));
}

/** Load styles */
if (process.env.NODE_ENV !== 'development') {
  loadCss(__MERCHANT_CSS__);
}

Promise.all(deps).then(([initialize]) => {
  initialize.default({ key: __MERCHANT_API_KEY__ })
});
