import Analytics from '@findify/analytics';
import AnalyticsDOM from '@findify/analytics-dom';
import debug from 'debug';
import { fromJS } from 'immutable';

import emitter from './core/emitter';
import { Events } from './core/events';
import { showFallback } from './helpers/fallbackNode';
import log from './helpers/log';
import resolveCallback from './helpers/resolveCallback';
import { scrollTo } from './helpers/scrollTo';
import setupPlatforms from './helpers/setupPlatforms';

import * as location from './core/location';
import { bulkAddWidgets, getWidgets } from './core/widgets';
import { observeDomNodes } from './helpers/observeDomNodes';
import { renderWidgets } from './helpers/renderWidgets';
import { injectComponents, injectStyles } from './utils/inject';

/**
 * Create global namespace
 */
const isReady = (() => {
  if (global.findify) return false;
  global.findify = {};
  __root.listen = emitter.listen;
  __root.emit = emitter.emit;
  __root.addListeners = emitter.addListeners;

  /** Remove modules cache from Webpack */
  __root.invalidate = async () => {
    if (!__webpack_require__.invalidate) {
      return debug('bundle')('Invalidation disabled');
    }
    __webpack_require__.invalidate();
    emitter.emit(Events.invalidate);
  };

  return true;
})();

const _analyticsPromise = (() => {
  let resolve;
  const promise = new Promise((_resolve) => (resolve = _resolve));
  return { promise, resolve };
})();

export default async (_config, sentry) => {
  if (!isReady) {
    return debug('bundle')('Findify instance already created. Skipping');
  }

  // We are loading config independently from webpack and this promise is always resolved
  const { default: asyncConfig } = await import(
    /* webpackMode: "weak" */ './config'
  );

  const cfg = {
    ..._config,
    ...asyncConfig,
  };

  if (cfg.components) {
    await injectComponents(cfg.components);
    delete cfg.components;
  }

  __root.config = fromJS(cfg);
  __root.sentry = sentry;

  /** Setup analytics */
  __root.analytics = AnalyticsDOM(
    {
      platform: cfg.platform,
      key: cfg.key,
      events: cfg.analytics,
      ...(cfg.context ? { context: cfg.context } : {}),
    },
    undefined,
    _analyticsPromise.resolve
  );

  /** Expose utils */
  __root.utils = {
    ...location,
    scrollTo,
    get history() {
      return location.getHistory();
    },
    set history(history) {
      location.setHistory(history);
    },
  };

  __root.widgets = getWidgets(__root.config);

  /** Predefined platforms setup */
  if (cfg.platform) setupPlatforms(cfg.platform, cfg.removeFindifyID);

  /** If store is disabled | paused we don't render widgets but tacking analytics */
  if (['paused', 'disabled'].includes(__root.config.get('status'))) {
    resolveCallback(__root, 'findifyForceCallbacks');
    log(`findify ${__root.config.get('status')}`, 'color: #D9463F');
    showFallback(document);
    return;
  }

  /**
   * Start widgets rendering
   */
  renderWidgets(__root.widgets); // <- Create tmp widgets renderer

  await resolveCallback(__root, 'findifyForceCallbacks'); // <- First callback

  const widgetsToPreload = Object.entries(cfg.selectors).reduce(
    (acc, [selector, widgetType]) => {
      if (widgetType !== 'recommendation') {
        acc[selector] = widgetType;
      }
      return acc;
    },
    {}
  );
  /** Create widgets before document.ready on Search and Collection page */
  bulkAddWidgets(
    widgetsToPreload,
    location.isSearch() || location.isCollection(cfg.collections)
  );

  /** Wait for document ready and analytics parse DOM */
  await _analyticsPromise.promise;

  /** Create rest of widgets */
  bulkAddWidgets(cfg.selectors);

  log('widgets:', '', __root.widgets.list());

  if (__root.config.get('observeDomChanges')) observeDomNodes(cfg.selectors);

  await resolveCallback(__root, 'findifyCallbacks'); // <- Callback after widgets are created

  if (
    /Chrome/.test(navigator.userAgent) &&
    /Google Inc/.test(navigator.vendor)
  ) {
    window.postMessage(
      {
        type: 'init',
        __findify: true,
        store: { version: cfg.mjs_version, id: cfg.merchantId },
      },
      window.location.origin
    );
    window.addEventListener('message', async ({ data }) => {
      const { type, response } = data;
      if (type === 'components') injectComponents(response);
      if (type === 'styles') injectStyles(response);
    });
  }

  global.FindifyAnalytics = Analytics;
};
