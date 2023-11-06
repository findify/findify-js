import { Recommendation as RecommendationAgent } from '@findify/agent';
import { RecommendationProvider, SearchProvider } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';
import { createElement } from 'react';
import { Events } from '../../core/events';
import {
  getQuery,
  isSearch,
  listenHistory,
  redirectToPage,
  setQuery,
} from '../../core/location';
import { Widget } from '../../core/widgets';
import {
  hideFallback,
  hideLoader,
  showFallback,
} from '../../helpers/fallbackNode';
import lazy from '../../helpers/renderLazyComponent';
import { maybeScrollTop } from '../../helpers/scrollTo';

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
    __root.emit(Events.collectionNotFound, widget);
    return null;
  }

  /** Listen to changes */
  agent.on('change:query', (q, meta) => {
    const query = q.toJS();
    setQuery(query);

    // Redirection from query submitted checking FE config
    const feConfigRedirections = config.get('redirections')?.toJS();
    const feConfigRedirectionKeyMatch =
      feConfigRedirections &&
      Object.keys(feConfigRedirections).find(
        (key) => key.toLowerCase() === query?.q?.toLowerCase()
      );
    if (!!feConfigRedirectionKeyMatch) {
      const feConfigRedirectionMatch = config.getIn([
        'redirections',
        feConfigRedirectionKeyMatch,
      ]);
      return redirectToPage(
        { name: feConfigRedirectionMatch, url: feConfigRedirectionMatch },
        meta
      );
    }

    if (!meta.get('total')) return renderZeroResults();
    render('initial');
  });

  /** Listen to location back/fwd */
  const stopListenLocation = listenHistory((history, action) => {
    if (history.action !== 'POP' && action !== 'POP') return;
    agent.applyState(getQuery());
    render('initial');
  });

  /** Switch to recommendation if query not present */
  agent.on('change:items', (items) => {
    if (!items.isEmpty()) {
      hideFallback(node);
      maybeScrollTop(config);
      return render('initial');
    }
    renderZeroResults();
  });

  const loadedItemsSize = agent.response.get('items')?.size;

  if (typeof loadedItemsSize === 'number') {
    if (loadedItemsSize > 0) {
      hideFallback(node);
    } else {
      hideLoader(node);
      setTimeout(renderZeroResults, 0);
    }
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
