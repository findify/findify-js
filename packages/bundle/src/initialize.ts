import 'regenerator-runtime/runtime';
import 'raf/polyfill';

// tslint:disable-next-line:import-name
import Analytics from '@findify/analytics-dom';
import emmiter from './core/emmiter';


__root.listen = emmiter.listen;
__root.emit = emmiter.emit;

export default async (
  _config
) => {

  /* Load Dependencies in closure to support polyfills */
  const { fromJS } = require('immutable');
  const { documentReady } = require('./helpers/documentReady');
  const { createEntities } = require('./core/entities');
  const { renderEntities }  = require('./core/render');

  const cfg = _config.default;
  const config = __root.config = fromJS(cfg);
  const analytics = __root.analytics = Analytics({ ...cfg.api, ...cfg.platform });

  await documentReady;

  const entities = __root.entities = createEntities(cfg.selectors, config);
  renderEntities(entities);
}
