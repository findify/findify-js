import { createElement } from 'react';
import { AutocompleteProvider } from "@findify/react-connect";
import { getQuery, setQuery } from '../../core/location';
import { Items } from '../../test.components';
import { registerHandlers } from './handlers';
import { Autocomplete } from '@findify/react-components/src';

export default async () => {
  const { default: Autocomplete } = await import(
    /* webpackChunkName: "autocomplete" */
    '@findify/react-components/src/layouts/Autocomplete'
  );
  
  return (widget, rerender) => {
    const { node, agent, config } = widget;
    const state: any = getQuery();
    const apiKey = config.get('key');
    const props = { apiKey, agent, config };

    if (state.q) node.value = state.q;

    registerHandlers(widget, rerender);

    /** Render */
    return createElement(AutocompleteProvider, props, createElement(Autocomplete));
  }
}
