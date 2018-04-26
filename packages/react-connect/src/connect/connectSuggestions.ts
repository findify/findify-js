import createConnect from './createConnect';

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
            analytics.sendEvent('suggestion-click', {
              value,
              rid: meta.get('rid'),
            });
            (window as any).findify.emit('autocompleteFocusLost', widgetKey);
            (window as any).findify.emit('search', widgetKey, value);
          }
        }
      }
  }
})
