import { createElement } from 'react';
import { SmartCollectionProvider } from "@findify/react-connect";
import { getQuery, setQuery, collectionPath, listenHistory } from '../../core/location';
import { Events } from '../../core/events';
import emitter from '../../core/emitter';
import { Items } from '../../test.components';
import { hideFallback, showFallback } from '../../helpers/fallbackNode';
import { Search, ZeroResults } from '@findify/react-components/src';

const applyState = (state, agent) => {
  agent.reset();
  for (const key in state) agent.set(key, state[key]);
}

export default (widget, render) => {
  const { agent, config, node } = widget;
  const apiKey = config.get('key');
  const props = { agent, apiKey, config };
  const state = getQuery();

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
      render('initial');
    } else {
      showFallback(node);
      render()
    }
  })

  /** Setup initial request */
  agent.defaults({ slot: collectionPath() });
  applyState(state, agent);
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
