import createConnect from './createConnect';

/**
 * Used to extract search suggestions from Search API response, enhance it with
 * analytics & MJS-specific click-handling logic and pass it down further
 */
export default createConnect({
  field: 'suggestions',
  handlers: {
    getSuggestionProps: ({ update, analytics, meta, suggestions }) =>
      (index, widgetKey = '') => {
        const value = suggestions.getIn([index, 'value']);
        return {
          key: value,
          onClick: (e) => {
            if (e) e.preventDefault();
            update('q', value);
            analytics.sendEvent('click-suggestion', {
              suggestion: value,
              rid: meta.get('rid'),
            });
            (window as any).findify.emit('autocompleteFocusLost', widgetKey);
            (window as any).findify.emit('search', widgetKey, value);
          }
        }
      }
  }
})
