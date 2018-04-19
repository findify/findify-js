import 'regenerator-runtime/runtime';
import 'raf/polyfill';

// tslint:disable-next-line:import-name
import Analytics from '@findify/analytics-dom';
import emitter from './core/emitter';
import resolveCallback from './helpers/resolveCallback';

/**
 * Create global namespace
 */
(global as any).findify = {};
__root.listen = emitter.listen;
__root.emit = emitter.emit;
__root.addListeners = emitter.addListeners;
__root.invalidate = () =>  {
  for (const key in __webpack_require__.c) { delete __webpack_require__.c[key] }
  emitter.emit('invalidate');
};

export default async (
  _config
) => {

  /* Load Dependencies in closure to support polyfills */
  const { fromJS } = require('immutable');
  const { documentReady } = require('./helpers/documentReady');
  const { createWidgets, bulkAddWidgets } = require('./core/widgets');
  const { renderWidgets }  = require('./core/render');

  // We loading config independently from webpack and this promise is always resolved
  const asyncConfig = await import(/* webpackMode: "weak" */'./config');

  const cfg = { ..._config, ...asyncConfig.default };

  __root.config = fromJS(cfg);

  __root.analytics = Analytics({ ...cfg.platform, key: cfg.key });

  await documentReady;
  
  __root.widgets = createWidgets(__root.config);

  await resolveCallback(__root);

  bulkAddWidgets(cfg.selectors);

  renderWidgets(__root.widgets);
}
