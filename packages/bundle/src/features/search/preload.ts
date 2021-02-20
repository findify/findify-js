import { getQuery, isSearch } from '../../core/location';

export default (widget) => {
  const { agent, config } = widget;
  const state = getQuery();
  const apiKey = config.get('key');

  /** Setup initial request */
  if (!config.get('disableAutoRequest') && isSearch()) {
    agent.applyState(state);
  }
}
