import { getQuery, collectionPath } from '../../core/location';

export default (widget) => {
  const { agent, config } = widget;
  const apiKey = config.get('key');
  const state = getQuery();

  /** Setup initial request */
  if (!config.get('disableAutoRequest')) {
    agent.defaults({
      offset: 0,
      slot: collectionPath(),
      rules: config.get('includeRules')
        ? __root.analytics.state.filters
        : void 0,
    });
    agent.applyState(state);
  }
};
