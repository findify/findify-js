import 'regenerator-runtime/runtime';
import 'raf/polyfill';

// tslint:disable-next-line:import-name
import Analytics from '@findify/analytics-dom';
import emitter from './core/emitter';
import resolveCallback from './helpers/resolveCallback';

__root.listen = emitter.listen;
__root.emit = emitter.emit;
__root.addListeners = emitter.addListeners;

export default async (
  _config
) => {

  /* Load Dependencies in closure to support polyfills */
  const { fromJS } = require('immutable');
  const { documentReady } = require('./helpers/documentReady');
  const { createWidgets } = require('./core/widgets');
  const { renderWidgets }  = require('./core/render');

  // We loading config independently from webpack and this promise is always resolved
  const asyncConfig = await import(/* webpackMode: "weak" */'./config');

  const cfg = { ..._config, ...asyncConfig.default };
  const config = __root.config = fromJS(cfg);
  const analytics = __root.analytics = Analytics({ ...cfg.platform, key: cfg.key });

  await documentReady;

  const widgets = __root.widgets = createWidgets(cfg.selectors, __root.config);

  await resolveCallback(__root);

  renderWidgets(__root.widgets);
}
