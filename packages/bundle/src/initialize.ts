import 'regenerator-runtime/runtime';
import { fromJS } from 'immutable';
import { documentReady } from './helpers/documentReady';
import { createEntities } from './core/entities';
import { renderEntities } from './core/render';
import { capitalize } from './helpers/capitalize';
import emmiter from './core/emmiter';

// tslint:disable-next-line:import-name
import Analytics from '@findify/analytics-dom';
import * as Agents from '@findify/agent';

__root.emmiter = emmiter;

export default async (
  _config
) => {
  const cfg = _config.default;
  const config = __root.config = fromJS(cfg);
  const analytics = __root.analytics = Analytics({ ...cfg.api, ...cfg.platform });
  
  await documentReady;

  const entries = __root.entries = createEntities(cfg.selectors, config);
  renderEntities(entries);
}
