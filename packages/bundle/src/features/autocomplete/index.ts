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

export default (widget, rerender) => {
  const { node, agent, config } = widget;
  const state: any = getQuery();
  const apiKey = config.get('key');

  if (state.q) node.value = state.q;

  registerHandlers(widget, rerender);

  const props = { apiKey, agent, config, key: 'normalAutocomplete' };

  /** Render */
  return createElement(AutocompleteProvider, props, autocompleteComponent);
}
