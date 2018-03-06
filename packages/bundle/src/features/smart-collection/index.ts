import { createElement } from 'react';
import { SmartCollectionProvider } from "@findify/react-connect";
import { getQuery, setQuery } from '../../core/location';
import { Events } from '../../core/events';
import emmiter from '../../core/emmiter';
import { Items } from '../../test.components';
import { hideFallback, showFallback } from '../../helpers/fallbackNode';

export default (widget, render) => {
  const { agent, config, node } = widget;
  const apiKey = config.getIn(['api', 'key'])
  const props = { agent, apiKey, config };
  const state = getQuery();

  const handleFirstResponse = (items) => {
    agent.off(handleFirstResponse);
    if (!items.isEmpty()) {
      hideFallback(node);
      render('initial');
    } else {
      showFallback(node);
      emmiter.emit(Events.detach, widget);
    }
  }

  /** Setup initial request */
  for (const key in state) agent.set(key, state[key]);

  /** Listen to changes */
  agent.on('change:query', q => setQuery(q.toJS()));

  /** Switch to recommendation if query not present */
  agent.once('change:items', handleFirstResponse);
  
  /** Render */
  return createElement(SmartCollectionProvider, props, Items);
}
