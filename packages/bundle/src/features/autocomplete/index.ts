import { createElement } from 'react';
import { AutocompleteProvider } from '@findify/react-connect';
import { registerHandlers } from './handlers';
import { getAgent } from './preload';
import lazy from '../../helpers/renderLazyComponent';
import { Widget } from '../../core/widgets';
import { Immutable } from '@findify/store-configuration';

const lazyAutocomplete = lazy(
  () =>
    import(
      /* webpackChunkName: "autocomplete" */
      '@findify/react-components/src/layouts/Autocomplete'
    )
);

export default (render, widget: Widget<Immutable.AutocompleteConfig>) => {
  const { agent: _agent, config } = widget;
  const agent = getAgent(_agent);
  const apiKey = config.get('key');

  registerHandlers(widget, agent, render);

  const props = { apiKey, agent, config, key: 'normalAutocomplete' };

  /** Render */
  return createElement(AutocompleteProvider, props, lazyAutocomplete());
};
