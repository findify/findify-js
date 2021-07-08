import createConnect from './createConnect';
import { Suggestion } from '../immutable/suggestion';
import { List } from 'immutable';

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

const patchItems = (analytics, meta, config) => (item) =>
  new Suggestion(item, meta, analytics, config);

/**
 * Used to extract search suggestions from Search API response, enhance it with
 * analytics & MJS-specific click-handling logic and pass it down further
 */
const { hook, connect } = createConnect<Suggestions>({
  field: 'suggestions',
  mapProps: (items, meta, change, analytics, config) => ({
    suggestions:
      (items && items.map(patchItems(analytics, meta, config))) || List(),
  }),
  handlers: {
    getSuggestionProps: ({ update, analytics, meta, suggestions }) => (
      index,
      widgetKey = ''
    ) => {
      if (!suggestions) return {};
      const suggestion = suggestions.get(index);
      if (!suggestion) return {};

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
