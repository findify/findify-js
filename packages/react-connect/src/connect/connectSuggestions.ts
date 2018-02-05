import createConnect from './createConnect';

export default createConnect({
  feature: 'autocomplete',
  field: 'suggestions',
  handlers: {
    getSuggestionProps: ({ change, analytics, meta }) =>
      (suggestion) => ({
        key: suggestion.get('value'),
        onClick: (e) => {
          if (e) e.preventDefault();
          change('q', suggestion.get('value'));
          analytics.sendEvent('suggestion-click', {
            rid: meta.get('rid'),
            value: suggestion.get('value')
          });
        }
      })
  }
})
