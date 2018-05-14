import { createElement } from 'react';
import { AutocompleteProvider } from "@findify/react-connect";
import { getQuery, setQuery } from '../../core/location';
import { Items } from '../../test.components';
import { registerHandlers } from './handlers';
import { Autocomplete } from '@findify/react-components/src/';
import { Autocomplete as AutocompleteAgent } from "@findify/agent";

const createTrendingSearchesAgent = (config) => new AutocompleteAgent({
  key: config.get('key'),
  immutable: true,
  user: __root.analytics.user
})
.defaults({ ...config.get('meta').toJS() })

export default (widget, rerender) => {
  const { node, agent, config } = widget;
  const state: any = getQuery();
  const apiKey = config.get('key');

  const trendingSearchesAgent = createTrendingSearchesAgent(config)
  trendingSearchesAgent.set('q', '')

  if (state.q) node.value = state.q;

  registerHandlers(widget, rerender);

  agent.on('change:suggestions', (suggestions, meta) => {
    if (meta.get('q') === '' || suggestions.isEmpty()) {
      rerender(
        AutocompleteProvider,
        { apiKey, config, agent: trendingSearchesAgent, isTrendingSearches: true },
        createElement(Autocomplete, { isTrendingSearches: true })
      )
    } else rerender('initial')
  })

  const props = { apiKey, agent, config, key: 'normalAutocomplete' };
  /** Render */
  return createElement(AutocompleteProvider, props, createElement(Autocomplete));
}
