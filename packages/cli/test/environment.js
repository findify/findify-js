const jsdom = require("jsdom");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const signale = require('signale');

const cache = {};

class ResourceLoader extends jsdom.ResourceLoader {
  fetch(url, options) {
    if (!url.includes('__LOCAL__')) return super.fetch(url, options);
    return new Promise(resolve =>
      fs.readFile(path.resolve(__dirname, url.replace('__LOCAL__', '../../bundle')), (_, data) => resolve(data))
    )
  }
}

const _config = {
  runScripts: "dangerously",
  resources: new ResourceLoader()
}

const getBundle = async version => {
  const interactive = new signale.Signale({ interactive: true, scope: 'bundle' });
  interactive.await('fetching bundle');
  if (cache[version]) {
    interactive.success('Using cached version');
    return cache[version];
  }

  const res = await (version
    && axios.get(`https://cdn.jsdelivr.net/npm/@findify/bundle@${version}/dist/bundle.js`).then(({ data }) => data)
    || new Promise((resolve, reject) =>
      fs.readFile(path.resolve(__dirname, '../../bundle/dist/bundle.js'), (err, data) => {
        if (!data) {
          interactive.error('Local version of bundle not found, build it first!');
          process.exit(0);
        }
        return err && reject(err) || resolve(data.toString())
      })
    )
  );

  interactive.success('Bundle fetched');

  const normalized = version
    && res.replace(/__MERCHANT_VERSION_RAW__/, version)
    || res.replace('https://cdn.jsdelivr.net/npm/@findify/bundle@__MERCHANT_VERSION_RAW__', '__LOCAL__')
  
  cache[version] = normalized;
  return normalized;
}

const getVariables = ({ merchantName, merchantID, apiKeys }) => {
  const config = {
    __MERCHANT_CONFIG_URL__: `https://findify-assets-2bveeb6u8ag.netdna-ssl.com/search/prod/${merchantName}-config.min.js`,
    __MERCHANT_API_KEY__: apiKeys[0].apiKey,
    __MERCHANT_VERSION__: 'test',
    __MERCHANT_CSS__: `https://findify-assets-2bveeb6u8ag.netdna-ssl.com/search/prod/${merchantName}.min.css`,
    __INCLUDE_POLYFILL__: true,
    __ENVIRONMENT__: 'prod',
    __DISABLE_SENTRY__: true,
    __SENTRY_ENABLED__: false,
    __MERCHANT_ID__: merchantID,
  }
  return Object.keys(config).map(k => `window.${k} = ${JSON.stringify(config[k])}`).join(';')
}

const createHTML = (merchant, bundle) => `
<html>
  <head>
    <script
      src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
      integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8="
      crossorigin="anonymous"></script>
    <script>${getVariables(merchant)}</script>
    <script>window.matchMedia = function(){ return { matches: true }}</script>
    <script>${bundle}</script>
  </head>
  <body style='width: 1000px'></body>
</html>
`

const waitForFindify = (window) => new Promise(resolve => window.findifyCallbacks = [resolve]);

module.exports = async (version, merchant) => {
  const bundle = await getBundle(version);
  let error = void 0;

  const virtualConsole = new jsdom.VirtualConsole();
  virtualConsole.once('error', (e) => error = e);

  const dom = new jsdom.JSDOM(createHTML(merchant, bundle), { ..._config, virtualConsole });
  const findify = await waitForFindify(dom.window);

  return { findify, dom, getError: () => error };
}