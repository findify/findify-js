import { Immutable } from '@findify/store-configuration';
import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { useQuery } from '@findify/react-connect';
import { List } from 'immutable';

const reduceIndexCreator = (ref, cursor) => {
  const getValue = (state, action) => {
    if (!action) return -1;
    if (action > 0) {
      const newState = state + 1;
      return newState > cursor.current.items.size - 1 ? 0 : newState;
    }
    return state < 1 ? cursor.current.items.size - 1 : state - 1;
  };

  return (state, action) => (ref.current = getValue(state, action));
};

const createCursor = (meta, items = null) => ({
  hash: meta.hashCode(),
  items: items || List(),
});

export default () => {
  const { query, config } = useQuery<Immutable.AutocompleteConfig>();

  const actualIndex = useRef(0);
  const cursor = useRef(createCursor(query));
  const [highlightedIndex, setHighlightedIndex] = useReducer(
    reduceIndexCreator(actualIndex, cursor),
    0
  );

  const closeAutocomplete = useCallback(
    () =>
      (window as any).findify.emit(
        'autocompleteFocusLost',
        config.get('widgetKey')
      ),
    []
  );

  const registerItems = useCallback(
    (_items, limit) => {
      const hash = query.hashCode();
      const items = _items.slice(0, limit);
      if (hash !== cursor.current.hash) {
        return (cursor.current = createCursor(query, items));
      }
      if (!cursor.current.items.includes(items.get(0))) {
        cursor.current.items = cursor.current.items.concat(items);
      }
    },
    [query]
  );

  const clickItem = useCallback((e) => {
    if (actualIndex.current < 1) return;
    const item = cursor.current.items.get(actualIndex.current);
    e.preventDefault();
    e.stopPropagation();
    if (item.onClick) return item.onClick(e);
  }, []);

  const handleKey = useCallback((e) => {
    if (e.target !== config.get('node')) return;
    if (e.key === 'Escape') return closeAutocomplete();
    if (e.key === 'Enter') return clickItem(e);
    if (e.key === 'ArrowUp') return setHighlightedIndex(-1);
    if (e.key === 'ArrowDown') return setHighlightedIndex(1);
  }, []);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [query]);

  useEffect(() => {
    document
      .querySelector('body')
      ?.addEventListener('keydown', handleKey, true);

    return () =>
      document
        .querySelector('body')
        ?.removeEventListener('keydown', handleKey, true);
  }, [handleKey]);

  return useMemo(
    () => [
      !!~highlightedIndex && cursor.current.items.get(highlightedIndex),
      registerItems,
    ],
    [highlightedIndex]
  );
};
