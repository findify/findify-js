import { createElement } from 'react';
import { AutocompleteProvider } from "@findify/react-connect";
import { registerHandlers } from './handlers';
import { getAgent } from './preload';
import lazy from '../../helpers/renderLazyComponent';

const lazyAutocomplete = lazy(() => import(
  /* webpackChunkName: "autocomplete" */
  '@findify/react-components/src/layouts/Autocomplete'
));


export default (render, widget) => {
  const { node, agent: _agent, config } = widget;
  const agent = getAgent(_agent);
  const apiKey = config.get('key');

  registerHandlers(widget, agent, render);

  const props = { apiKey, agent, config, key: 'normalAutocomplete' };

  /** Render */
  return createElement(AutocompleteProvider, props, lazyAutocomplete());
}
