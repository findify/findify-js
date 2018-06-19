import { createElement } from 'react';
import { SearchProvider, RecommendationProvider, ContentProvider } from "@findify/react-connect";
import { Recommendation as RecommendationAgent } from "@findify/agent";
import { getQuery, setQuery, isSearch, listenHistory } from '../../core/location';
import { hideFallback, showFallback, hideLoader } from '../../helpers/fallbackNode';
import { Events } from '../../core/events';
import { scrollTo } from '../../helpers/scrollTo';
import { Search, ZeroResults } from '@findify/react-components/src/';

const createFallbackAgent = (config, node) => new RecommendationAgent({
  key: config.get('key'),
  immutable: true,
  user: __root.analytics.user
})
.defaults({ ...config.get('meta').toJS(), type: config.get('zeroResultsType') })
.on('change:items', () => {
  hideFallback(node);
  hideLoader(node);
});

export default (widget, render) => {
  const { agent, config, node } = widget;
  const state = getQuery();
  const apiKey = config.get('key');
  const props = { agent, apiKey, config };
  let fallbackAgent;

  const renderZeroResults = () => {
    if (!fallbackAgent) fallbackAgent = createFallbackAgent(config, node);
    return render(
      RecommendationProvider,
      { agent: fallbackAgent, apiKey, config },
      createElement(ZeroResults, getQuery())
    )
  }

  if (!isSearch()) {
    showFallback(node);
    hideLoader(node);
    __root.emit(Events.collectionNotFound, widget);
    return null;
  }

  /** Setup initial request */
  agent.applyState(state);

  /** Listen to changes */
  agent.on('change:query', (q, meta) => {
    setQuery(q.toJS())
    if (meta.get('total') === 0) return renderZeroResults();
  });
  agent.on('change:redirect', async (redirect, meta) => {
    render();
    await __root.analytics.sendEvent('redirect', {
      ...redirect.toJS(),
      rid: meta.get('rid'),
      suggestion: meta.get('q')
    });
    document.location.href = redirect.get('url');
  });

  /** Listen to location back/fwd */
  const stopListenLocation = listenHistory((_, action) => {
    if (action !== 'POP') return;
    agent.applyState(getQuery());
    render('initial');
  });

  /** Switch to recommendation if query not present */
  agent.on('change:items', (items) => {
    if (!items.isEmpty()) {
      hideFallback(node);
      hideLoader(node);
      if (!config.getIn(['view', 'infinite']) && config.get('scrollTop') !== false) {
        scrollTo(config.get('cssSelector'), config.get('scrollTop'))
      }
      return render('initial');
    }
    hideLoader(node);
    return renderZeroResults();
  })

  /** Unsubscribe from events on instance destroy  */
  const unsubscribe = __root.listen((event, prop, ...args) => {
    if (event !== Events.detach || prop !== widget) return;
    stopListenLocation();
    unsubscribe();
  })

  /** Render */

  return createElement(SearchProvider, props, createElement(Search))
}
