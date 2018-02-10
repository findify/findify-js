import createConnect from './createConnect';

export default createConnect({
  feature: 'Autocomplete',
  field: 'suggestions',
  handlers: {
    getSuggestionProps: ({ update, analytics, meta, suggestions }) => 
      (index) => {
        const value = suggestions.getIn([index, 'value']);
        return {
          key: value,
          onClick: (e) => {
            if (e) e.preventDefault();
            update('q', value);
            analytics.sendEvent('suggestion-click', {
              value,
              rid: meta.get('rid'),
            });
          }
        }
      }
  }
})
