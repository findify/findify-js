import { createElement } from 'react';
import { AutocompleteProvider } from "@findify/react-connect";
import { getQuery, setQuery } from '../../core/location';
import { Items } from '../../test.components';
import { registerHandlers } from './handlers';
import SignalCombinator from '../../helpers/SignalCombinator';
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

  let trendingSearchesAgent;

  if (state.q) node.value = state.q;

  const combinator = new SignalCombinator(['closed', 'trending', 'open'], 'closed');
  combinator.createSignal('visible', (ui) => ui && ['trending', 'open'] || ['closed'], false);
  combinator.createSignal('query', query => query !== '' && ['closed', 'open', 'trending'] || ['closed', 'trending'], '');
  combinator.createSignal('suggestionCount', suggestionCount => suggestionCount > 0 && ['closed', 'open'] || ['closed', 'trending'], 0);
  combinator.createSignalSum(['query', 'suggestionCount'], (query, suggestionCount) => (
    (query === '' || suggestionCount === 0) ? ['closed', 'trending'] : ['closed', 'open']
  ));
  combinator.transitionTo('closed', () => rerender());
  combinator.transitionTo('open', () => rerender('initial'));
  combinator.transitionTo('trending', () => renderTrendingSearches());

  const renderTrendingSearches = () => {
    if (!trendingSearchesAgent) {
      trendingSearchesAgent = createTrendingSearchesAgent(config)
      trendingSearchesAgent.set('q', '')
    }
    rerender(
      AutocompleteProvider,
      { apiKey, config, agent: trendingSearchesAgent, isTrendingSearches: true },
      createElement(Autocomplete, { isTrendingSearches: true })
    )
  }

  registerHandlers(widget, combinator);

  agent.on('change:suggestions', (suggestions, meta) => {
    combinator.signal('suggestionCount', suggestions.size)
    combinator.signal('query', meta.get('q', ''))
    combinator.transition();
  })

  const props = { apiKey, agent, config, key: 'normalAutocomplete' };
  /** Render */
  return createElement(AutocompleteProvider, props, createElement(Autocomplete));
}
