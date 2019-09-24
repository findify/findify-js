import { createElement } from 'react';
import { AutocompleteProvider } from "@findify/react-connect";
import { getQuery, setQuery } from '../../core/location';
import { registerHandlers } from './handlers';
import lazy from '../../helpers/renderLazyComponent';

const lazyAutocomplete = lazy(() => import(
  /* webpackChunkName: "autocomplete" */
  '@findify/react-components/src/layouts/Autocomplete'
));

const autocompleteComponent = lazyAutocomplete();

let agentCache;
let initialRequested = false;

export default (widget, rerender) => {
  const { node, agent: _agent, config } = widget;
  const agent = agentCache || (agentCache = _agent);
  const state: any = getQuery();
  const apiKey = config.get('key');

  if (!initialRequested) {
    agent.set('q', state.q);
    initialRequested = true;
  }

  if (state.q) node.value = state.q;

  registerHandlers(widget, rerender);

  const props = { apiKey, agent, config, key: 'normalAutocomplete' };

  /** Render */
  return createElement(AutocompleteProvider, props, autocompleteComponent);
}
