import * as React from 'react';
import * as cx from 'classnames';
import {
  withHandlers,
  branch,
  renderComponent,
  withState,
  compose,
  withProps,
  renderNothing,
  withPropsOnChange,
  createEagerElement,
  defaultProps,
} from 'recompose';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import { List } from 'react-virtualized/dist/commonjs/List';
import {
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized/dist/commonjs/CellMeasurer';
import { Item } from './Checkbox';

const styles = require('./styles.css');
const customStyles = require('customStyles');

const StaticList = ({
  items,
  className,
  itemComponent = Item,
  showAll,
  ...rest,
}) => (
  <div className={cx(styles.list, className)}>
    {items.map(item =>
      createEagerElement(itemComponent, {
        ...rest,
        item,
        key: item.value,
        title: item.label || item.value,
      }),
    )}
  </div>
);

const VirtualizedList = compose(
  defaultProps({
    cache: new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 20,
    }),
  }),
  withProps(({ items, itemComponent = Item, cache, ...rest }) => ({
    rowRenderer: ({ index, key, parent, style }) => (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {({ measure }) =>
          createEagerElement(itemComponent, {
            ...rest,
            item: items[index],
            title: items[index].label || items[index].value,
            key,
            style,
          })}
      </CellMeasurer>
    ),
  })),
)(({ isMobile, items, rowRenderer, config, cache }: any) => (
  <AutoSizer disableHeight={!isMobile}>
    {({ width, height }) => (
      <List
        width={width}
        className={styles.list}
        height={isMobile ? height : config.maxItemsCount * config.rowHeight}
        rowCount={items.length}
        overscanRowCount={2}
        rowHeight={cache.rowHeight}
        rowRenderer={rowRenderer}
      />
    )}
  </AutoSizer>
));

export const ListRenderer: any = compose(
  withPropsOnChange(['slice', 'items'], ({ items, slice }) => ({
    items: !!slice ? [...items.slice(0, slice)] : items,
  })),
  branch(
    ({ isStatic }: any) => isStatic,
    renderComponent(StaticList),
    renderComponent(VirtualizedList),
  ),
)(renderNothing);
