import { Immutable } from '@findify/store-configuration';
import { getQuery, isSearch } from '../../core/location';
import { Widget } from '../../core/widgets';

export default (widget: Widget<Immutable.SearchConfig>) => {
  const { agent, config } = widget;
  const state = getQuery();

  /** Setup initial request */
  if (!config.get('disableAutoRequest') && isSearch()) {
    agent.defaults({
      ...config.get('defaultRequestParams').toJS(),
      offset: 0,
    });
    agent.applyState(state);
  }
};
