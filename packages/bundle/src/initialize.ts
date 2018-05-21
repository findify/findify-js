import 'regenerator-runtime/runtime';
import 'raf/polyfill';

// tslint:disable-next-line:import-name
import Analytics from '@findify/analytics-dom';
import emitter from './core/emitter';
import resolveCallback from './helpers/resolveCallback';

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
    emitter.emit('invalidate');
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

  // Inject custom components
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

  // Register custom components

  __root.config = fromJS(cfg);

  __root.analytics = Analytics({ ...cfg.platform, key: cfg.key, events: cfg.analytics || {} });

  await documentReady;

  __root.widgets = createWidgets(__root.config);

  await resolveCallback(__root);

  bulkAddWidgets(cfg.selectors);

  renderWidgets(__root.widgets);
}
