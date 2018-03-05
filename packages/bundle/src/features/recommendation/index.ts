import { createElement } from 'react';
import { RecommendationProvider } from "@findify/react-connect";
import { getQuery, setQuery } from '../../core/location';
import { hideFallback } from '../../helpers/fallbackNode';
import { getPayload } from './payload';
import { Items } from '../../test.components';

export default (widget) => {
  const { node, agent, config } = widget;
  
  agent.defaults(getPayload(config, __root.analytics.state));

  /** Remove entity and instance if nothing was found */
  agent.on('change:items', items => {
    if (items.isEmpty()) return __root.widgets.detach(widget);
    hideFallback(node);
  })

  /** Render */
  return createElement(
    RecommendationProvider,
    { agent, apiKey: config.getIn(['api', 'key']) },
    Items
  );
}
