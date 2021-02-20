
import { getPayload } from './payload';

export default (widget) => {
  const { node, agent, config } = widget;
  const props = { agent, config, apiKey: config.get('key') };

  if (!config.get('disableAutoRequest')) {
    agent.defaults(getPayload(config, node, __root.analytics.state));
  }

}
