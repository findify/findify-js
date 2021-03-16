import React from 'react';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import { List } from 'react-virtualized/dist/commonjs/List';
import cx from 'classnames';

export default ({
  initAutoSizer,
  initList,
  array,
  cache,
  handleScroll,
  rowRenderer,
  className,
  theme,
}) => (
  <div className={cx(className, theme.list)}>
    <AutoSizer ref={initAutoSizer}>
      {({ width, height }) => (
        <List
          className={theme.list}
          ref={initList}
          height={height}
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
