import { createElement } from 'react';
import { SmartCollectionProvider } from '@findify/react-connect';
import {
  getQuery,
  setQuery,
  listenHistory,
  redirectToPage,
} from '../../core/location';
import { Events } from '../../core/events';
import { maybeScrollTop, scrollTo } from '../../helpers/scrollTo';
import {
  hideFallback,
  showFallback,
  hideLoader,
} from '../../helpers/fallbackNode';
import lazy from '../../helpers/renderLazyComponent';
import { Widget } from '../../core/widgets';
import { Immutable } from '@findify/store-configuration';

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
      maybeScrollTop(config);
      render('initial');
    } else {
      showFallback(node);
      hideLoader(node);
      __root.emit(Events.collectionNotFound, widget);
      render();
    }
  });

  agent.on('change:redirect', redirectToPage);

  agent.on('error', () => {
    showFallback(node);
    hideLoader(node);
    render();
  });

  /** Listen to changes */
  agent.on('change:query', (q) => setQuery(q.toJS()));

  /** Switch to recommendation if query not present */
  // agent.on('change:items', handleFirstResponse);

  /** Unsubscribe from events on instance destroy  */
  const unsubscribe = __root.listen((event, prop) => {
    if (event !== Events.detach || prop !== widget) return;
    stopListenLocation();
    unsubscribe();
  });

  /** Render */
  return createElement(
    SmartCollectionProvider,
    props,
    lazySearch({ isCollection: true })
  );
};
