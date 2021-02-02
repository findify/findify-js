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

let _cache;
let initialRequested = false;

const getAgent = (agent) => {
  if (_cache) return _cache;
  _cache = agent;
  return _cache;
}

export default (widget) => {
  const { node, agent: _agent, config } = widget;
  const agent = getAgent(_agent);
  const state: any = getQuery();
  const apiKey = config.get('key');

  if (!config.get('disableAutoRequest') && !initialRequested) {
    agent.set('q', !state.q ? '' : state.q);
    initialRequested = true;
  }
  

  if (state.q) node.value = state.q;

  return (rerender) => {

    registerHandlers(widget, agent, rerender);

    const props = { apiKey, agent, config, key: 'normalAutocomplete' };

    /** Render */
    return createElement(AutocompleteProvider, props, autocompleteComponent);
  }
}
