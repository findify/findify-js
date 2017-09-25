import createAutocomplete from './features/autocomplete';
import createRecommendations from './features/recommendations';
import createSearch from './features/search';

export const Autocomplete = createAutocomplete({
  type: 'autocomplete',
  inline: true,
});
export const Recommendations = createRecommendations({
  type: 'recommendations',
  inline: true,
});
export const Search = createSearch({ type: 'search', inline: true });
