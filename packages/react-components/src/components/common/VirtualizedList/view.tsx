import React from 'react';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import { List } from 'react-virtualized/dist/commonjs/List';

export default ({
  initAutoSizer,
  array,
  cache,
  rowRenderer,
  theme,
  className,
}) =>
<div className={className}>
  <AutoSizer ref={initAutoSizer}>
    {
      ({ width, height }) =>
      <List
        width={width}
        height={height}
        rowCount={array.size}
        overscanRowCount={2}
        rowHeight={cache.rowHeight}
        rowRenderer={rowRenderer}
      />
    }
  </AutoSizer>
</div>
