import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import { List } from 'react-virtualized/dist/commonjs/List';
import cx from 'classnames';
import { useMemo } from 'react';

export default ({
  initAutoSizer,
  initList,
  array,
  cache,
  rowRenderer,
  className,
  theme,
  limit,
}) => {
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
