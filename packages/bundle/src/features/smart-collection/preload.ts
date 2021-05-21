import { Immutable } from '@findify/store-configuration';
import { getQuery, collectionPath } from '../../core/location';
import { Widget } from '../../core/widgets';

export default (widget: Widget<Immutable.SearchConfig>) => {
  const { agent, config } = widget;
  const state = getQuery();

  /** Setup initial request */
  if (!config.get('disableAutoRequest')) {
    agent.defaults({
      ...config.get('defaultRequestParams').toJS(),
      offset: 0,
      slot: collectionPath(),
      rules: config.get('includeRules')
        ? __root.analytics.state.filters
        : void 0,
    });
    agent.applyState(state);
  }
};
