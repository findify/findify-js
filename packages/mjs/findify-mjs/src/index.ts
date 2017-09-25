if (__DEVELOPMENT__) {
  require('regenerator-runtime/runtime');
}

import getComponentNodes from './helpers/getComponentNodes';
import appendFeatureCreator from './helpers/appendFeature';
import handleAnalytics from './helpers/handleAnalytics';
import injectFeature from './helpers/injectFeature';
import { injectTags } from './helpers/createHTML';
import isBot from './helpers/isBot';

const prepareConfig = config => {
  const frameDisabled = config.frameDisabled || isBot;
  return {
    ...config,
    frameDisabled,
    css: [
      ...((frameDisabled && [
        require('!!file-loader?name=styles.css!findify-ui-components/dist/wrapped.css'),
      ]) || [
          'https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css',
          require('!!raw-loader!findify-ui-components/dist/styles.css'),
        ]),
      ...config.css,
    ],
  };
};

export const init = (cfg, analytics) => {
  const appendFeature = appendFeatureCreator(analytics);
  const config = prepareConfig(cfg);

  global.findifyCreateFeature = injectFeature(config, analytics);

  const initialize = () =>
    setImmediate(() => {
      handleAnalytics(analytics, config);
      if (['paused', 'disabled'].includes(config.status)) return;
      return getComponentNodes(config).forEach(appendFeature);
    });

  if (
    ['complete', 'loaded', 'interactive'].includes(document.readyState) &&
    document.body
  ) {
    initialize();
  } else {
    document.addEventListener('DOMContentLoaded', initialize, false);
  }
};

if (__DEVELOPMENT__) {
  const config = require('../dev/config').default;
  const analytics = require('findify-analytics/lib/index').default;
  const client = analytics({
    key: config.api.key,
    platform: { bigcommerce: true },
  });
  const api = { key: config.api.key, user: client.user };
  init({ ...config, api }, client);
}
