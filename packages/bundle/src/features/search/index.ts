import { createElement } from 'react';
import { SearchProvider, RecommendationProvider } from '@findify/react-connect';
import { Recommendation as RecommendationAgent } from '@findify/agent';
import {
  getQuery,
  setQuery,
  isSearch,
  listenHistory,
  redirectToPage,
} from '../../core/location';
import {
  hideFallback,
  showFallback,
  hideLoader,
} from '../../helpers/fallbackNode';
import { Events } from '../../core/events';
import { maybeScrollTop } from '../../helpers/scrollTo';
import lazy from '../../helpers/renderLazyComponent';
import { Widget } from '../../core/widgets';
import { Immutable } from '@findify/store-configuration';

const createFallbackAgent = ({
  config,
  node,
}: Widget<Immutable.SearchConfig>) =>
  new RecommendationAgent({
    key: config.get('key'),
    immutable: true,
    user: __root.analytics.user,
  })
    .defaults({
      ...config.get('defaultRequestParams').toJS(),
      type: config.get('zeroResultsType'),
    })
    .on('change:items', () => {
      hideFallback(node);
      hideLoader(node);
    });

const lazySearchZeroResults = lazy(
  () =>
    import(
      /* webpackChunkName: "search" */
      '@findify/react-components/src/layouts/ZeroResults'
    )
);

const lazySearch = lazy(
  () =>
    import(
      /* webpackChunkName: "search" */
      '@findify/react-components/src/layouts/Search'
    )
);

export default (render, widget: Widget<Immutable.SearchConfig>) => {
  const { agent, config, node } = widget;
  const apiKey = config.get('key');
  const props = { agent, apiKey, config };

  let fallbackAgent;

  const renderZeroResults = () => {
    if (!config.get('zeroResultsType')) return;
    if (!fallbackAgent) fallbackAgent = createFallbackAgent(widget);
    return render(
      RecommendationProvider,
      { agent: fallbackAgent, apiKey, config },
      createElement(lazySearchZeroResults, getQuery())
    );
  };

  if (!isSearch()) {
    showFallback(node);
    hideLoader(node);
    __root.emit(Events.collectionNotFound, widget);
    return null;
  }

  /** Listen to changes */
  agent.on('change:query', (q, meta) => {
    setQuery(q.toJS());
    if (!meta.get('total')) return renderZeroResults();
    render('initial');
  });

  agent.on('change:redirect', redirectToPage);

  /** Listen to location back/fwd */
  const stopListenLocation = listenHistory(({ action }) => {
    if (action !== 'POP') return;
    agent.applyState(getQuery());
    render('initial');
  });

  /** Switch to recommendation if query not present */
  agent.on('change:items', (items) => {
    if (!items.isEmpty()) {
      hideFallback(node);
      hideLoader(node);
      maybeScrollTop(config);
      return render('initial');
    }
    hideLoader(node);
    renderZeroResults();
  });

  if (agent.response.get('items').size) {
    hideFallback(node);
    hideLoader(node);
  }

  /** Unsubscribe from events on instance destroy  */
  const unsubscribe = __root.listen((event, prop) => {
    if (event === Events.scrollTop) return maybeScrollTop(config, true);
    if (event !== Events.detach || prop !== widget) return;
    stopListenLocation();
    unsubscribe();
  });

  /** Render */
  return createElement(SearchProvider, props, lazySearch());
};
