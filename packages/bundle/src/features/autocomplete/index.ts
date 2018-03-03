import { createElement } from 'react';
import { AutocompleteProvider } from "@findify/react-connect";
import { getQuery, setQuery } from '../../core/location';
import { Items } from '../../test.components';
import { registerHandlers } from './handlers';

export default (entity, rerender) => {
  const { node, agent, config } = entity;
  const state: any = getQuery();
  const apiKey = entity.config.getIn(['api', 'key']);
  const props = { apiKey, agent };

  if (state.q) node.value = state.q;

  registerHandlers(entity, rerender);

  /** Render */
  return createElement(AutocompleteProvider, props, Items);
}
