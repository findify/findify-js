import { createElement } from 'react';
import { SearchProvider } from "@findify/react-connect";
import { getQuery } from '../../core/location';
import { Items } from '../../test.components';

export default (entity) => {
  const state = getQuery();
  entity.agent.defaults(state);
  console.log(entity.agent);
  
  return createElement(
    SearchProvider,
    { agent: entity.agent, apiKey: entity.config.getIn(['api', 'key']) },
    Items
  );
}
