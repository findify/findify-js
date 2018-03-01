import { fromJS } from 'immutable';
import { documentReady } from './helpers/documentReady';
import { createEntities } from './helpers/createEntities';
import { capitalize } from './helpers/capitalize';

export default async (
  _analytics,
  _config,
  _agents
) => {
  const cfg = _config.default;
  const config = fromJS(cfg);
  const analytics = _analytics.default({ ...cfg.api, ...cfg.platform });
  
  await documentReady;

  const entries = createEntities(cfg.selectors)
    .map(entity => {
      const agent = _agents[capitalize(entity.type)];
      if (!agent) throw new Error(`Feature ${entity.type} is not exists!`);
      return { ...entity, agent: new agent({ ...cfg.api }) }
    });
}
