import 'regenerator-runtime/runtime';
import 'raf/polyfill';

// tslint:disable-next-line:import-name
import AnalyticsDOM from '@findify/analytics-dom';
// tslint:disable-next-line:import-name
import Analytics from '@findify/analytics';
import emitter from './core/emitter';
import resolveCallback from './helpers/resolveCallback';
import setupPlatforms from './helpers/setupPlatforms';
import { Events } from './core/events';

/**
 * Create global namespace
 */
const isReady = (() => {
  if ((global as any).findify) return false;
  (global as any).findify = {};
  __root.listen = emitter.listen;
  __root.emit = emitter.emit;
  __root.addListeners = emitter.addListeners;
  __root.invalidate = () =>  {
    for (const key in __webpack_require__.c) { delete __webpack_require__.c[key] }
    emitter.emit(Events.invalidate);
  };
  return true;
})();

export default async (
  _config
) => {
  if (!isReady) return;

  // We loading config independently from webpack and this promise is always resolved
  const asyncConfig = await import(/* webpackMode: "weak" */'./config');
  const cfg = { ..._config, ...asyncConfig.default };

  // Register custom components
  if (cfg.components) {
    const extra = Object.keys(cfg.components).reduce(
      (acc, k) => ({ ...acc, [k]: eval(cfg.components[k]) }), {}
    )
    __root.invalidate();
    window.findifyJsonp.push([['extra'], extra]);
    delete cfg.components;
  }


  /* Load Dependencies in closure to support polyfills */
  const { fromJS } = require('immutable');
  const { documentReady } = require('./helpers/documentReady');
  const { createWidgets, bulkAddWidgets } = require('./core/widgets');
  const { renderWidgets } = require('./core/render');

  __root.config = fromJS(cfg);

  /** Setup analytics */
  __root.analytics = AnalyticsDOM({ ...cfg.platform, key: cfg.key, events: cfg.analytics || {} });
  if (cfg.platform) setupPlatforms(cfg.platform, cfg.removeFindifyID);

  await documentReady;

  const widgetsRenderNeeded = !['paused', 'disabled'].includes(__root.config.get('status'));

  if (widgetsRenderNeeded) {
    __root.widgets = createWidgets(__root.config);
  }

  await resolveCallback(__root);

  if (widgetsRenderNeeded) {
    bulkAddWidgets(cfg.selectors);
    renderWidgets(__root.widgets);
  }

  (global as any).FindifyAnalytics = Analytics;
}
