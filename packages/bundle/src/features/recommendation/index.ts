import { createElement } from 'react';
import { RecommendationProvider } from "@findify/react-connect";
import { getQuery, setQuery } from '../../core/location';
import { hideFallback } from '../../helpers/fallbackNode';
import { getPayload } from './payload';
import { Recommendation } from '@findify/react-components/src';

export default (widget) => {
  const { node, agent, config } = widget;
  const props = { agent, config, apiKey: config.get('key') };

  agent.defaults(getPayload(config, __root.analytics.state));

  /** Remove entity and instance if nothing was found */
  agent.on('change:items', items => {
    if (items.isEmpty()) return __root.widgets.detach(widget);
    hideFallback(node);
  })

  /** Render */
  return createElement(RecommendationProvider, props, createElement(Recommendation));
}
