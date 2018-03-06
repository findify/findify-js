import { createElement } from 'react';
import { SearchProvider, RecommendationProvider } from "@findify/react-connect";
import { Recommendation as RecommendationAgent } from "@findify/agent";
import { getQuery, setQuery } from '../../core/location';
import { Items } from '../../test.components';
import { hideFallback } from '../../helpers/fallbackNode';

const createFallbackAgent = (config, node) => new RecommendationAgent({
  key: config.getIn(['api', 'key']),
  immutable: true,
  user: __root.analytics.user
})
.defaults({ ...config.get('meta').toJS(), type: config.get('zeroResultsType') })
.on('change:items', () => hideFallback(node));

export default ({ agent, config, node }, render) => {
  const state = getQuery();
  const apiKey = config.getIn(['api', 'key'])
  const props = { agent, apiKey, config };

  /** Setup initial request */
  for (const key in state) agent.set(key, state[key]);

  /** Listen to changes */
  agent.on('change:query', q => setQuery(q.toJS()));

  /** Switch to recommendation if query not present */
  agent.on('change:items', (items) => {
    if (!items.isEmpty()) {
      hideFallback(node);
      return render('initial');
    }
    const agent = createFallbackAgent(config, node);
    return render(RecommendationProvider, { agent, apiKey }, Items);
  })
  
  /** Render */
  return createElement(SearchProvider, props, Items);
}
