import { createElement } from 'react';
import { SmartCollectionProvider } from "@findify/react-connect";
import { getQuery, setQuery, collectionPath, listenHistory } from '../../core/location';
import { Events } from '../../core/events';
import emitter from '../../core/emitter';
import { Items } from '../../test.components';
import { scrollTo } from '../../helpers/scrollTo';
import { hideFallback, showFallback, hideLoader } from '../../helpers/fallbackNode';
import { Search, ZeroResults } from '@findify/react-components/src/';


export default (widget, render) => {
  const { agent, config, node } = widget;
  const apiKey = config.get('key');
  const props = { agent, apiKey, config };
  const state = getQuery();

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
      render('initial');
    } else {
      showFallback(node);
      hideLoader(node);
      render();
    }
  })

  agent.on('error', () => {
    showFallback(node);
    hideLoader(node);
    render();
  })

  /** Setup initial request */
  agent.defaults({ slot: collectionPath() });
  agent.applyState(state);
  /** Listen to changes */
  agent.on('change:query', q => setQuery(q.toJS()));

  /** Switch to recommendation if query not present */
  // agent.on('change:items', handleFirstResponse);

  /** Unsubscribe from events on instance destroy  */
  const unsubscribe = __root.listen((event, prop, ...args) => {
    if (event !== Events.detach || prop !== widget) return;
    stopListenLocation();
    unsubscribe();
  });

  /** Render */
  return createElement(SmartCollectionProvider, props, createElement(Search, { isCollection: true }));
}
