import {
  Component,
  createElement,
  createFactory,
  useCallback,
  useRef,
} from 'react';
import {
  CellMeasurerCache,
  CellMeasurer,
} from 'react-virtualized/dist/commonjs/CellMeasurer';
import view from 'components/common/VirtualizedList/view';
import styles from 'components/common/VirtualizedList/styles.css';

const viewFactory: any = createFactory(view);

export default ({ array, factory, ...rest }) => {
  const cache = useRef(new CellMeasurerCache({ fixedWidth: true }));
  const autosizer = useRef(null);
  const list = useRef(null);

  const rowRenderer = useCallback(
    ({ index, key, parent, style }) => {
      const item = array.get(index);
      return createElement(
        CellMeasurer,
        { parent, key, cache: cache.current, columnIndex: 0, rowIndex: index },
        () =>
          createElement(factory, { ...rest, item, style, key: item.hashCode() })
      );
    },
    [array]
  );

  return viewFactory({
    ...rest,
    array,
    theme: styles,
    rowRenderer: rowRenderer,
    initAutoSizer: autosizer,
    initList: list,
    cache: cache.current,
  });
};
