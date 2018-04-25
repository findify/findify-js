import { createElement } from 'react';
import { SearchProvider, RecommendationProvider } from "@findify/react-connect";
import { Recommendation as RecommendationAgent } from "@findify/agent";
import { Search, ContentSearch, ZeroResults } from '@findify/react-components/src';
import { getQuery, setQuery, listenHistory } from '../../core/location';
import { hideFallback } from '../../helpers/fallbackNode';
import { Events } from '../../core/events';
import { scrollTo } from '../../helpers/scrollTo';

const applyState = (state, agent) => {
  agent.reset();
  for (const key in state) agent.set(key, state[key]);
}
const createFallbackAgent = (config, node) => new RecommendationAgent({
  key: config.get('key'),
  immutable: true,
  user: __root.analytics.user
})
.defaults({ ...config.get('meta').toJS(), type: config.get('zeroResultsType') })
.on('change:items', () => hideFallback(node));

export default (widget, render) => {
  const { agent, config, node } = widget;
  const state = getQuery();
  const apiKey = config.get('key');
  const props = { agent, apiKey, config };

  /** Setup initial request */
  applyState(state, agent);

  /** Listen to changes */
  agent.on('change:query', q => setQuery(q.toJS()));

  /** Listen to location back/fwd */
  const stopListenLocation = listenHistory((_, action) => {
    if (action !== 'POP') return;
    applyState(getQuery(), agent);
    render('initial');
  });

  /** Switch to recommendation if query not present */
  agent.on('change:items', (items) => {
    if (!items.isEmpty()) {
      hideFallback(node);
      if (!config.getIn(['view', 'infinite']) && config.get('scrollTo') !== false) {
        scrollTo(config.get('cssSelector'), config.get('scrollTo'))
      }
      return render('initial');
    }
    const agent = createFallbackAgent(config, node);

    return render(
      RecommendationProvider,
      { agent, apiKey, config },
      createElement(ZeroResults, getQuery())
    );
  })

  /** Unsubscribe from events on instance destroy  */
  const unsubscribe = __root.listen((event, prop, ...args) => {
    if (event !== Events.detach || prop !== widget) return;
    stopListenLocation();
    unsubscribe();
  })

  /** Render */

  return (
    config.getIn(['contentSearch', 'enabled'], false) ?
      createElement(SearchProvider, props, createElement(ContentSearch)) :
      createElement(SearchProvider, props, createElement(Search))
  )
}
