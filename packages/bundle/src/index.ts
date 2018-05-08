import 'core-js/es6/promise';
import loadJs from 'load-js';
import loadCss from './helpers/loadCss';
/**
 * Setup webpack public path, so bundle could be used with different versions
 * WARNING: If this file will be changed you need to upload new bundle.js to compilation server
 * */
if (process.env.NODE_ENV !== 'development' && __MERCHANT_VERSION__) {
  __webpack_require__.p =
  __ENVIRONMENT__ === 'staging'
    ? `https://cdn.jsdelivr.net/npm/@findify/bundle@${__MERCHANT_VERSION__}/dist/`
    : `https://findify-assets-2bveeb6u8ag.netdna-ssl.com/bundle/${__ENVIRONMENT__}/${__MERCHANT_VERSION__}/`;
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

/* Load components */
import(
  /* webpackChunkName: "search" */
  '@findify/react-components/src/layouts/Search'
)
import(
  /* webpackChunkName: "autocomplete" */
  '@findify/react-components/src/layouts/Autocomplete'
)
import(
  /* webpackChunkName: "zero-results" */
  '@findify/react-components/src/layouts/ZeroResults'
)
import(
  /* webpackChunkName: "recommendation" */
  '@findify/react-components/src/layouts/Recommendation'
)

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
