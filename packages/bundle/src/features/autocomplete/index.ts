import { createElement } from 'react';
import { AutocompleteProvider } from "@findify/react-connect";
import { getQuery, setQuery } from '../../core/location';
import { Items } from '../../test.components';
import { registerHandlers } from './handlers';

export default (widget, rerender) => {
  const { node, agent, config } = widget;
  const state: any = getQuery();
  const apiKey = config.getIn(['api', 'key']);

  const props = { apiKey, agent };

  if (state.q) node.value = state.q;

  registerHandlers(widget, rerender);

  /** Render */
  return createElement(AutocompleteProvider, props, Items);
}
