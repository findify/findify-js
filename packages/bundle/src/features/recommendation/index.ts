import { createElement } from 'react';
import { RecommendationProvider } from "@findify/react-connect";
import { getQuery, setQuery } from '../../core/location';
import { hideFallback, hideLoader } from '../../helpers/fallbackNode';
import { getPayload } from './payload';
import { Recommendation } from '@findify/react-components/src/';

export default (widget) => {
  const { node, agent, config } = widget;
  const props = { agent, config, apiKey: config.get('key') };

  if (!config.get('disableAutoRequest')) {
    agent.defaults(getPayload(config, __root.analytics.state));
  }

  /** Remove entity and instance if nothing was found */
  agent.on('change:items', items => {
    if (items.isEmpty()) return __root.widgets.detach(widget.key);
    hideFallback(node);
    hideLoader(node);
  })

  /** Render */
  return createElement(RecommendationProvider, props, createElement(Recommendation));
}
