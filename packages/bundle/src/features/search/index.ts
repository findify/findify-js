import { createElement } from 'react';
import { SearchProvider, RecommendationProvider } from "@findify/react-connect";
import { Recommendation as RecommendationAgent } from "@findify/agent";
import { getQuery, setQuery, isSearch, listenHistory, redirectToPage } from '../../core/location';
import { hideFallback, showFallback, hideLoader } from '../../helpers/fallbackNode';
import { Events } from '../../core/events';
import { scrollTo } from '../../helpers/scrollTo';
import lazy from '../../helpers/renderLazyComponent';

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

const lazySearchZeroResults = lazy(() => import(
  /* webpackChunkName: "search" */
  '@findify/react-components/src/layouts/ZeroResults'
  ));
  
const lazySearch = lazy(() => import(
  /* webpackChunkName: "search" */
  '@findify/react-components/src/layouts/Search'
));

export default (widget) => {
  const { agent, config, node } = widget;
  const state = getQuery();
  const apiKey = config.get('key');
  const props = { agent, apiKey, config };

  /** Setup initial request */
  if (!config.get('disableAutoRequest') && isSearch()) {
    agent.applyState(state);
  }

  return (render) => {
    let fallbackAgent;

    const renderZeroResults = () => {
      if (config.get('disableZeroResults')) return;
      if (!fallbackAgent) fallbackAgent = createFallbackAgent(config, node);
      return render(
        RecommendationProvider,
        { agent: fallbackAgent, apiKey, config },
        createElement(lazySearchZeroResults, getQuery())
      )
    }

    if (!isSearch()) {
      showFallback(node);
      hideLoader(node);
      __root.emit(Events.collectionNotFound, widget);
      return null;
    }
  
    /** Listen to changes */
    agent.on('change:query', (q, meta) => {
      setQuery(q.toJS())
      if (!meta.get('total')) return renderZeroResults();
      render('initial');
    });
 
    agent.on('change:redirect', redirectToPage);

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
        if (!config.getIn(['view', 'infinite']) && !config.get('disableScroll')) {
          scrollTo(config.get('cssSelector'), config.get('scrollOffset'))
        }
        return render('initial');
      }
      hideLoader(node);
      renderZeroResults();
    })

    /** Unsubscribe from events on instance destroy  */
    const unsubscribe = __root.listen((event, prop, ...args) => {
      if (event !== Events.detach || prop !== widget) return;
      stopListenLocation();
      unsubscribe();
    })

    /** Render */
    return createElement(SearchProvider, props, lazySearch())
  }
}
