import { Immutable } from '@findify/store-configuration';
import { Widget } from '../../core/widgets';
import { getPayload } from './payload';

export default (widget: Widget<Immutable.RecommendationConfig>) => {
  const { agent, config } = widget;

  if (!config.get('disableAutoRequest')) {
    agent.defaults(getPayload(widget, __root.analytics.state));
  }
};
