import { createElement } from 'react';
import { AutocompleteProvider } from "@findify/react-connect";
import { getQuery, setQuery } from '../../core/location';
import { registerHandlers } from './handlers';
import SignalCombinator from '../../helpers/SignalCombinator';
import { Autocomplete as AutocompleteAgent } from "@findify/agent";
import lazy from '../../helpers/renderLazyComponent';

const lazyAutocomplete = lazy(() => import(
  /* webpackChunkName: "autocomplete" */
  /* webpackPreload: true */
  '@findify/react-components/src/layouts/Autocomplete'
));

const empty = () => null

const createTrendingSearchesAgent = (config) => new AutocompleteAgent({
  key: config.get('key'),
  immutable: true,
  user: __root.analytics.user
})
.defaults({ ...config.get('meta').toJS() })

const autocompleteComponent = lazyAutocomplete()
const autocompleteTrendingComponent = lazyAutocomplete({ isTrendingSearches: true });

export default (widget, rerender) => {
  const { node, agent, config } = widget;
  const state: any = getQuery();
  const apiKey = config.get('key');
  let trendingSearchesAgent;

  if (state.q) node.value = state.q;

  const combinator = new SignalCombinator(['closed', 'trending', 'open'], 'closed');
  combinator.createSignal('trendingSearchesDisabled', empty, config.get('trendingSearchesDisabled', false));
  combinator.createSignal('visible', empty, false);
  combinator.createSignal('query', empty, '');
  combinator.createSignal('suggestionCount', empty, 0);

  const trending = combinator.createSignalSum(['query', 'suggestionCount'], (query, suggestionCount) => {
    if (query === '' || suggestionCount === 0) return ['closed', 'trending'];
    return ['closed', 'open'];
  })

  combinator.createSignalSum(
    ['visible', 'trendingSearchesDisabled', trending],
    (ui, noTs, { result }) => {
      const isTrendingMode = result.includes('trending');
      if ((isTrendingMode && noTs) || !ui) return ['closed'];
      return ['open', 'trending'];
    }
  )

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
      autocompleteTrendingComponent
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
  return createElement(AutocompleteProvider, props, autocompleteComponent);
}
