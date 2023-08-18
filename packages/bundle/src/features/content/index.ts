import { ContentProvider } from '@findify/react-connect';
import { createElement } from 'react';
import { Events } from '../../core/events';
import { getQuery, listenHistory } from '../../core/location';
import { hideFallback } from '../../helpers/fallbackNode';
import { maybeScrollTop } from '../../helpers/scrollTo';

import { Immutable } from '@findify/store-configuration';
import { Widget } from '../../core/widgets';
import lazy from '../../helpers/renderLazyComponent';

const lazyComponent = lazy(
  () => import('@findify/react-components/src/layouts/Content')
);

export default (render, widget: Widget<Immutable.ContentConfig>) => {
  const { agent, config, node } = widget;
  const apiKey = config.get('key');
  const { type } = node.dataset || {};
  const props = {
    agent,
    apiKey,
    config: config.mergeDeep(config.get(type)),
  };

  /** Listen to changes */
  agent.on('change:query', (q) => {
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
    if (items.isEmpty()) return;
    hideFallback(node);
    maybeScrollTop(config as any);
    return render('initial');
  });

  /** Unsubscribe from events on instance destroy  */
  const unsubscribe = __root.listen((event, prop) => {
    if (event !== Events.detach || prop !== widget) return;
    stopListenLocation();
    unsubscribe();
  });

  /** Render */
  return createElement(ContentProvider, props, lazyComponent());
};
