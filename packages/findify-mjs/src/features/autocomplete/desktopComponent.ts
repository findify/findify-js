import { compose, withState, lifecycle } from 'recompose';
import watchNode from '../../decorators/watchNode';
import watchClickOutside from '../../decorators/watchClickOutside';
import withStateOnChange from '../../decorators/withStateOnChange';

const returnUndefined = () => void 0;

export default compose(
  /**
   *  Track index of selected suggestion
   */
  withStateOnChange(
    'selectedSuggestion',
    'setSelectedSuggestion',
    void 0,
    'response',
    returnUndefined,
  ),
  watchNode({
    position: null,

    focus: (
      { setVisible, visible, response, provider, node, location: { state } },
      hasFocus,
    ) => () => {
      if (hasFocus && !response && state.q)
        provider.request(node.value || state.q);
      if (hasFocus && node.instance.value) setVisible(true);
      return;
    },

    onChange: ({ setVisible, provider, setStore }, value) => () => {
      setVisible(!!value);
      return !value ? setStore(void 0) : provider.request(value);
    },

    onFormSubmit: (
      { location, response, node, selectedSuggestion, setVisible },
      e,
    ) => {
      if (e) e.preventDefault();
      if (
        !response ||
        !response.suggestions.length ||
        selectedSuggestion === void 0
      ) {
        location.searchFor(node.value);
      } else {
        location.searchFor(response.suggestions[selectedSuggestion].value);
      }
      return setVisible(false);
    },

    onKeyPress: (
      {
        response,
        selectedSuggestion,
        setSelectedSuggestion,
        node,
        location,
        provider,
        setVisible,
      },
      key,
      e,
    ) => {
      const hasResponse = !!(response && response.suggestions.length);
      const isSuggestionSelected = selectedSuggestion !== void 0;
      const suggestion = isSuggestionSelected ? selectedSuggestion : -1;

      if (
        key === 'down' &&
        hasResponse &&
        suggestion < response.suggestions.length - 1
      ) {
        return setSelectedSuggestion(suggestion + 1);
      }

      if (key === 'up' && hasResponse && suggestion > 0) {
        return setSelectedSuggestion(suggestion - 1);
      }

      if (key === 'enter') {
        if (e) e.preventDefault();
        const query =
          (hasResponse &&
            isSuggestionSelected &&
            response.suggestions[selectedSuggestion].value) ||
          node.value;
        node.instance.value = query;
        location.searchFor(query);
        return setVisible(false);
      }
    },
  }),
  watchClickOutside(
    ({ node, setVisible }, e) =>
      e.target !== node.instance && setVisible(false),
  ),
);
