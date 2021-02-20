import { getQuery, collectionPath } from '../../core/location';

export default (widget) => {
  const { agent, config } = widget;
  const apiKey = config.get('key');
  const state = getQuery();

  /** Setup initial request */
  if (!config.get('disableAutoRequest')) {
    agent.defaults({
      slot: collectionPath(),
      rules: config.get('includeRulesInCollection') ? __root.analytics.state.filters : void 0
    });
    agent.applyState(state);
  }
}
