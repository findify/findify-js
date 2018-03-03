import { createElement } from 'react';
import { RecommendationProvider } from "@findify/react-connect";
import { getQuery, setQuery } from '../../core/location';
import { getPayload } from './payload';
import { Items } from '../../test.components';

export default (entity) => {
  const { node, agent, config } = entity;
  
  agent.defaults(getPayload(config, __root.analytics.state));

  /** Remove entity and instance if nothing was found */
  agent.on('change:items', items =>
    items.isEmpty() && __root.entities.detach(entity)
  )

  /** Render */
  return createElement(
    RecommendationProvider,
    { agent, apiKey: config.getIn(['api', 'key']) },
    Items
  );
}
