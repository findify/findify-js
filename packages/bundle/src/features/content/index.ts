import { createElement } from 'react';
import { ContentProvider } from "@findify/react-connect";
import { getQuery, setQuery, isSearch, listenHistory } from '../../core/location';
import { hideFallback, hideLoader } from '../../helpers/fallbackNode';
import { Events } from '../../core/events';
import { scrollTo } from '../../helpers/scrollTo';
import Content from '@findify/react-components/src/layouts/Content';

export default (widget) => {
  const { agent, config, node } = widget;
  const apiKey = config.get('key');
  const { q } = getQuery();
  const { type } = node.dataset;
  const props = { agent, apiKey, config };

  agent.defaults({ type: [type] });
  agent.set('q', q);

  return (render) => {
    /** Listen to changes */
    agent.on('change:query', (q, meta) => {
      setQuery(q.toJS())
      render('initial');
    });

    /** Listen to location back/fwd */
    const stopListenLocation = listenHistory((_, action) => {
      if (action !== 'POP') return;
      const { q } = getQuery();
      agent.applyState({ q });
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
    })

    /** Unsubscribe from events on instance destroy  */
    const unsubscribe = __root.listen((event, prop, ...args) => {
      if (event !== Events.detach || prop !== widget) return;
      stopListenLocation();
      unsubscribe();
    })

    /** Render */

    return createElement(ContentProvider, props, createElement(Content))
  }
}
