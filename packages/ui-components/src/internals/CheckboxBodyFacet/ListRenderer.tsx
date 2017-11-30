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
      React.createElement(itemComponent, {
        ...rest,
        item,
        key: item.value,
        title: item.label || item.value,
      })
    )}
  </div>
);

const VirtualizedList = compose(
  withHandlers({
    setAutoSizerRef: () => r => {
      if (!!r) {
        r._parentNode = r._autoSizer.parentNode;
        r._onResize();
      }
    },
  }),
  defaultProps({
    cache: new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 20,
    }),
  }),
  withPropsOnChange(
    ['items'],
    ({ items, itemComponent = Item, cache, ...rest }) => ({
      rowRenderer: ({ index, key, parent, style }) => (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          rowIndex={index}
          parent={parent}
        >
          {({ measure }) =>
            React.createElement(itemComponent, {
              ...rest,
              item: items[index],
              title: items[index].label || items[index].value,
              key,
              style,
            })}
        </CellMeasurer>
      ),
    })
  )
)(({ isMobile, items, rowRenderer, config, cache, setAutoSizerRef }: any) => (
  <AutoSizer disableHeight={!isMobile} ref={setAutoSizerRef}>
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
    renderComponent(VirtualizedList)
  )
)(renderNothing);
