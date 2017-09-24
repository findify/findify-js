import { compose, withHandlers, withPropsOnChange } from 'recompose';
import watchNode from '../../decorators/watchNode';
import renderForProps from '../../decorators/renderForProps';
import withWrapper from '../../decorators/withWrapper';

import wrapper from './mobileWrapper';

export default compose(
  watchNode({
    focus: ({ setVisible, visible }, hasFocus) => () =>
      hasFocus && !visible && setVisible(true),
  }),
  withHandlers({
    onSubmit: ({ node, onSearchSuggestionClick, location, setVisible }) => (
      suggestion,
      e,
    ) => {
      if (e) e.preventDefault();

      const query = {
        value: suggestion.value || suggestion,
        redirect: suggestion.redirect || void 0,
      };

      if (suggestion.value) {
        onSearchSuggestionClick(query);
        return setVisible(false);
      }

      location.searchFor(suggestion);
      node.instance.value = suggestion;

      setVisible(false);
      return;
    },

    onClearClick: ({ setStore, provider }) => () => setStore(void 0),

    onInput: ({ provider, setStore }) => value =>
      (!!value && provider.request(value)) || setStore(void 0),
  }),
  renderForProps(['visible']),
  withPropsOnChange(['meta'], ({ meta, node, location }) => ({
    query: (meta && meta.q) || location.state.q || node.value,
  })),
  withWrapper(wrapper),
);
