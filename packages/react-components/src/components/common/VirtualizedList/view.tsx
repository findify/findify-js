import { createElement, useCallback, useRef } from 'react';
import {
  CellMeasurerCache,
  CellMeasurer,
} from 'react-virtualized/dist/commonjs/CellMeasurer';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import { List } from 'react-virtualized/dist/commonjs/List';
import cx from 'classnames';
import { useMemo } from 'react';
import styles from 'components/common/VirtualizedList/styles.css';

const View = ({
  initAutoSizer,
  initList,
  array,
  cache,
  rowRenderer,
  className,
  theme,
  limit,
}: any) => {
  const height = useMemo(
    () =>
      cache &&
      Array.from(Array(limit).keys()).reduce(
        (acc, i) => acc + cache.rowHeight(i),
        0
      ),
    [cache]
  );
  return (
    <div className={cx(className, theme.list)}>
      <AutoSizer ref={initAutoSizer} disableHeight>
        {({ width }) => (
          <List
            className={theme.list}
            ref={initList}
            height={height || 100}
            width={width}
            rowCount={array.size}
            overscanRowCount={2}
            rowHeight={cache.rowHeight}
            rowRenderer={rowRenderer}
            style={{ overflowX: 'hidden' }}
          />
        )}
      </AutoSizer>
    </div>
  );
};

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

  return createElement(View, {
    ...rest,
    array,
    theme: styles,
    rowRenderer: rowRenderer,
    initAutoSizer: autosizer,
    initList: list,
    cache: cache.current,
  });
};
