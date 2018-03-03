import { createElement } from 'react';
import { SearchProvider } from "@findify/react-connect";
import { getQuery, setQuery } from '../../core/location';
import { Items } from '../../test.components';

export default ({ agent, config }, rerender) => {
  const state = getQuery();
  const props = { agent, apiKey: config.getIn(['api', 'key']) };

  /** Setup initial request */
  for (const key in state) agent.set(key, state[key]);

  /** Listen to changes */
  agent.on('change:query', q => setQuery(q.toJS()));
  
  /** Render */
  return createElement(SearchProvider, props, Items);
}
