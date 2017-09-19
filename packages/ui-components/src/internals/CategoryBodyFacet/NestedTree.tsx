import * as React from 'react';
import * as cx from 'classnames';
import {
  branch,
  compose,
  defaultProps,
  renderComponent,
  renderNothing,
  withProps,
} from 'recompose';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer';
import { List } from 'react-virtualized/dist/commonjs/List';
import {
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized/dist/commonjs/CellMeasurer';
import Icon from 'internals/Icon';
const styles = require('./styles.css');

const NestingComponent = ({ isRoot, ...rest }) =>
  React.createElement('div', rest);
const customStyles = require('customStyles');

const cache = new CellMeasurerCache({
  defaultHeight: 30,
  fixedHeight: false,
});

const StaticList = ({
  withScroll,
  selected,
  Nested,
  children,
  ...rest,
}: any) => (
  <div className={cx(styles.list, withScroll && styles.scroll)}>
    {children.map((item, index) => (
      <Nested
        {...rest}
        {...item}
        key={item.value}
        title={item.value}
        index={index}
      />
    ))}
  </div>
);

const VirtualizedList = ({
  items,
  rowRenderer,
  rowHeight,
  itemsCount,
}: any) => (
  <div className={styles.list}>
    <AutoSizer disableHeight>
      {({ width }) => (
        <CellMeasurer
          cellRenderer={({ rowIndex, ...rest }) =>
            rowRenderer({ index: rowIndex, ...rest })}
          cache={cache}
          columnCount={1}
          rowCount={itemsCount}
          width={width}
        >
          {({ getRowHeight, setRef }) => (
            <List
              width={width}
              ref={setRef}
              height={itemsCount * rowHeight}
              rowCount={items.length}
              rowHeight={getRowHeight}
              rowRenderer={rowRenderer}
            />
          )}
        </CellMeasurer>
      )}
    </AutoSizer>
  </div>
);

const ListRenderer = compose(
  branch(({ selected }: any) => !selected, renderNothing),
  branch(
    ({ isExpanded }: any) => isExpanded,
    branch(
      ({ isMobile, childrenCount, hasSelectedSiblings }) =>
        !isMobile && !hasSelectedSiblings,
      defaultProps({ withScroll: true }),
    ),
    withProps(({ children, config }: any) => ({
      children: [...children.slice(0, config.maxItemsCount)],
    })),
  ),
)(StaticList);

export const NestedList = ({
  onClick,
  isRoot,
  title,
  count,
  className,
  selected,
  style,
  ...rest,
}: any) => (
  <NestingComponent
    isRoot={isRoot}
    style={style}
    className={cx(className || styles.nestedItem, isRoot && styles.rootItem)}
  >
    {!isRoot && (
      <div
        className={cx(
          styles.item,
          customStyles.facetItem,
          selected && styles.selected,
          selected && customStyles.facetItemSelected,
        )}
        onClick={onClick}
      >
        <p className={styles.title}>
          <Icon name="chevron-left" className={styles.prevIcon} />
          {title}
          <Icon
            name={`chevron-${selected ? 'down' : 'right'}`}
            className={styles.nextIcon}
          />
        </p>
        <span className={styles.count}>({count})</span>
      </div>
    )}
    <ListRenderer {...{ ...rest, parentTitle: title, selected }} />
  </NestingComponent>
);

const RootWrapper = (props: any) => (
  <NestingComponent
    isRoot
    style={props.style}
    className={cx(styles.nestedItem, styles.rootItem)}
  >
    <div
      className={cx(
        styles.item,
        styles.selected,
        customStyles.facetItemSelected,
      )}
      onClick={props.onClick}
    >
      <p className={styles.title}>
        <Icon name="chevron-left" className={styles.prevIcon} />
        {props.config.i18n.goBackTitle}
      </p>
    </div>
    <ul className={styles.list}>
      <NestedList {...props} />
    </ul>
  </NestingComponent>
);

export const NestedTree = branch(
  ({ cursor, selected, isRoot }: any) =>
    !isRoot && selected && cursor.size === 1,
  renderComponent(RootWrapper),
  renderComponent(NestedList),
)(renderNothing);
