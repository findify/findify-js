import { createElement } from 'react';
import { ContentProvider } from "@findify/react-connect";
import { getQuery, setQuery, isSearch, listenHistory } from '../../core/location';
import { hideFallback, hideLoader } from '../../helpers/fallbackNode';
import { Events } from '../../core/events';
import { scrollTo } from '../../helpers/scrollTo';
import Content from '@findify/react-components/src/layouts/Content';
import isNumeric from '../../helpers/isNumeric';

const parseSortHTMLAttribute = sort => {
  try {
    if (!sort) {
      return [];
    }
    const parsedSort = JSON.parse(sort);
    return [parsedSort];
  } catch (err) {
    return [];
  }
}

export default (widget) => {
  const { agent, config, node } = widget;
  const apiKey = config.get('key');
  const { q } = getQuery();
  const { type, sort } = node.dataset;
  const props = { agent, apiKey, config };

  agent.defaults({ type: [type], sort: parseSortHTMLAttribute(sort) });
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
        if (!config.getIn(['view', 'infinite']) && isNumeric(config.get('scrollTop'))) {
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
