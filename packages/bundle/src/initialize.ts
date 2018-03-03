import 'regenerator-runtime/runtime';
import { documentReady } from './helpers/documentReady';
import { createEntities } from './core/entities';
import { renderEntities } from './core/render';
import { capitalize } from './helpers/capitalize';
import { createConfigBase } from './helpers/createConfigBase';
import emmiter from './core/emmiter';

// tslint:disable-next-line:import-name
import Analytics from '@findify/analytics-dom';

__root.listen = emmiter.listen;
__root.emit = emmiter.emit;

export default async (
  _config
) => {
  const cfg = _config.default;
  const config = __root.config = createConfigBase(cfg);
  const analytics = __root.analytics = Analytics({ ...cfg.api, ...cfg.platform });

  await documentReady;

  const entities = __root.entities = createEntities(cfg.selectors, config);
  renderEntities(entities);
}
