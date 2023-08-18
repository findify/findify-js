import { RecommendationProvider } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';
import { createElement } from 'react';
import { Widget } from '../../core/widgets';
import { hideFallback } from '../../helpers/fallbackNode';
import lazy from '../../helpers/renderLazyComponent';

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
      return;
    }
    hideFallback(node);
  });

  /** Render */
  return createElement(RecommendationProvider, props, lazyRecommendation());
};
