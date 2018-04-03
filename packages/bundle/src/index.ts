import 'core-js/es6/promise';
import loadJs from 'load-js';

const setup = {
  config: __MERCHANT_CONFIG_URL__,
  apiKey: __MERCHANT_API_KEY__,
  version: __MERCHANT_VERSION__,
  polyfill: __MERCHANT_POLYFILL__,
  css: __MERCHANT_CSS__,
  environment: __ENVIRONMENT__
};

// Set the path to files
if (process.env.NODE_ENV !== 'development' && setup.version) {
  __webpack_require__.p =
    `https://findify-assets-2bveeb6u8ag.netdna-ssl.com/bundle/${setup.environment}/${setup.version}`;
}

/**
 * Create global namespace
 */
(global as any).findify = { setup };

/**
 * Load Dependencies
 */
const deps = [
  import(
    /* webpackChunkName: "initializer" */
    './initialize'
  ),
];

if(process.env.NODE_ENV === 'development') {
  deps.push(import('./config'));
}

if (process.env.NODE_ENV !== 'development' && setup.polyfill) {
  deps.push(loadJs(__webpack_require__.p + 'polyfill.js'));
}

if (process.env.NODE_ENV !== 'development' && setup.config) {
  deps.push(loadJs(setup.config));
}

deps.push(import(
  /* webpackChunkName: "components" */
  '@findify/react-components/src'
));

Promise.all(deps).then(([initialize, config]) =>
  initialize.default(window.__FINDIFY_CONFIG__ || config)
);
