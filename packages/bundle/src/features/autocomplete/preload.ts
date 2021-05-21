import { Immutable } from '@findify/store-configuration';
import { getQuery } from '../../core/location';
import { Widget } from '../../core/widgets';

let _cache: any = void 0;
let initialRequested = false;

export const getAgent = (agent) => {
  if (_cache) return _cache;
  _cache = agent;
  return _cache;
};

export default (widget: Widget<Immutable.AutocompleteConfig>) => {
  const { node, agent: _agent, config } = widget;
  const agent = getAgent(_agent);
  const state: any = getQuery();

  if (!config.get('disableAutoRequest') && !initialRequested) {
    agent.defaults(config.get('defaultRequestParams').toJS());
    agent.set('q', !state.q ? '' : state.q);
    initialRequested = true;
  }

  if (state.q) node.value = state.q;
};
