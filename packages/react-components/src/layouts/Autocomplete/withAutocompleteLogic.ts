import {
  useCallback,
  useEffect,
  createFactory,
  useMemo,
  useState,
  useReducer,
} from 'react';
import { useSuggestions } from '@findify/react-connect';

const arrowCodes = ['ArrowUp', 'ArrowDown'];

export const useAutocompleteLogic = () => {
  const { suggestions, getSuggestionProps, config, meta } = useSuggestions();
  const node: HTMLInputElement = config.get('node');

  const reduceIndex = (state, e) => {
    if (!!e && !e.key) return e;

    if (e.key === 'Enter' && state !== -1) {
      e.stopPropagation();
      e.preventDefault();
      getSuggestionProps(state, config.get('widgetKey')).onClick();
      return state;
    }

    if (!arrowCodes.includes(e.key)) return state;

    e.preventDefault();

    const newSuggestionIndex = state + (e.key === 'ArrowUp' ? -1 : 1);
    const totalSuggestions = (suggestions && suggestions.size) || 0;

    if (newSuggestionIndex < 0) return totalSuggestions - 1;
    if (totalSuggestions - 1 < newSuggestionIndex) return 0;
    return newSuggestionIndex;
  };

  const [selectedSuggestion, setSuggestionIndex] = useReducer(reduceIndex, -1);

  const closeAutocomplete = useCallback(
    () =>
      (window as any).findify.emit(
        'autocompleteFocusLost',
        config.get('widgetKey')
      ),
    [config.get('widgetKey')]
  );

  useEffect(() => {
    node.autocomplete = 'off';

    const handleButtonClick = (e) => {
      if (e.target !== node) return;
      if (e.key === 'Escape') return closeAutocomplete();
      setSuggestionIndex(e);
    };

    // console.log('mount');
    document
      .querySelector('body')!
      .addEventListener('keydown', handleButtonClick, true);

    return () =>
      document
        .querySelector('body')!
        .removeEventListener('keydown', handleButtonClick, true);
  }, []);

  useEffect(() => setSuggestionIndex(-1), [meta.get('q')]);

  return useMemo(() => ({ selectedSuggestion, closeAutocomplete }), [
    selectedSuggestion,
  ]);
};

export default (BaseComponent) => {
  const factory = createFactory(BaseComponent);
  return (props) => {
    const logic = useAutocompleteLogic();
    return factory({ ...props, ...logic });
  };
};
