import 'core-js/es6/promise';
import loadJs from 'load-js';
import loadCss from './helpers/loadCss';
/**
 * Setup webpack public path, so bundle could be used with different versions
 * WARNING: If this file will be changed you need to upload new bundle.js to compilation server
 * */
if (process.env.NODE_ENV !== 'development' && __MERCHANT_VERSION__) {
  __webpack_require__.p =
    __PUBLIC_PATH__.indexOf('jsdelivr') > 0
    ? `${__PUBLIC_PATH__}@${__MERCHANT_VERSION__}/dist`
    : `${__PUBLIC_PATH__}/${__ENVIRONMENT__}/${__MERCHANT_VERSION__}/`;
}

/**
 * Load Dependencies
 */
const deps: Promise<any>[] = [];

/** Main initialization file */
deps.push(import(/* webpackChunkName: "initializer" */ './initialize'));

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

deps.push(import(/* webpackChunkName: "components" */ '@findify/react-components/src'));

/** Load polyfill only for specific merchants */
if (process.env.NODE_ENV !== 'development' && __INCLUDE_POLYFILL__) {
  deps.push(loadJs(__webpack_require__.p + 'polyfill.js'));
}

/** Load styles */
if (process.env.NODE_ENV !== 'development') {
  ((path) => {
    if (path === false) return;
    if (!path) return loadCss(__webpack_require__.p + 'styles.css');
    return loadCss(path);
  })(__MERCHANT_CSS__);
}

Promise.all(deps).then(([initialize]) =>
  initialize.default({ key: __MERCHANT_API_KEY__ })
);
