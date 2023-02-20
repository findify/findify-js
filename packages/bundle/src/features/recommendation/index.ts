import { createElement } from 'react';
import { RecommendationProvider } from '@findify/react-connect';
import { hideFallback, hideLoader } from '../../helpers/fallbackNode';
import { getPayload } from './payload';
import lazy from '../../helpers/renderLazyComponent';
import { Widget } from '../../core/widgets';
import { Immutable } from '@findify/store-configuration';

const lazyRecommendation = lazy(
  () =>
    import(
      /* webpackChunkName: "recommendation" */
      '@findify/react-components/src/layouts/Recommendation'
    )
);

export default (_, widget: Widget<Immutable.RecommendationConfig>) => {
  const { node, agent, config } = widget;
  const props = { agent, config, apiKey: config.get('key') };
  /** Remove entity and instance if nothing was found */
  agent.on('change:items', (items) => {
    if (items.isEmpty()) {
      __root.widgets.detach(widget.key);
      hideLoader(node);
      return;
    }
    hideFallback(node);
    hideLoader(node);
  });

  /** Render */
  return createElement(RecommendationProvider, props, lazyRecommendation());
};
