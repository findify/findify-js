import { getQuery } from '../../core/location';

let _cache: any = void 0;
let initialRequested = false;

export const getAgent = (agent) => {
  if (_cache) return _cache;
  _cache = agent;
  return _cache;
}

export default (widget) => {
  const { node, agent: _agent, config } = widget;
  const agent = getAgent(_agent);
  const state: any = getQuery();

  if (!config.get('disableAutoRequest') && !initialRequested) {
    agent.set('q', !state.q ? '' : state.q);
    initialRequested = true;
  }

  if (state.q) node.value = state.q
};
