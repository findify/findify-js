import createConnect from './createConnect';

type Suggestions = {
  /**
   * Returns suggestion specific props
   * @property index - index of suggestion
   */
  suggestions: Map<string, any>;
  getSuggestionProps: (
    index: number,
    widgetKey?: string
  ) => {
    key: string;
    onClick: (e: Event) => void;
  };
};

/**
 * Used to extract search suggestions from Search API response, enhance it with
 * analytics & MJS-specific click-handling logic and pass it down further
 */
const { hook, connect } = createConnect<Suggestions>({
  field: 'suggestions',
  handlers: {
    getSuggestionProps: ({ update, analytics, meta, suggestions }) => (
      index,
      widgetKey = ''
    ) => {
      const suggestion = suggestions.get(index);
      const value = suggestion.get('value');
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
          (window as any).findify.emit('search', widgetKey, suggestion);
        },
      };
    },
  },
});

export { hook, connect };
