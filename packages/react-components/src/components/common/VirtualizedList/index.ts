import { Component, createElement, createFactory } from 'react';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized/dist/commonjs/CellMeasurer';
import view from 'components/common/VirtualizedList/view';
import styles from 'components/common/VirtualizedList/styles.css';
const viewFactory: any = createFactory(view);

class List extends Component<any, any>{
  autoSizer: any;
  list: any;
  cache = new CellMeasurerCache({ fixedWidth: true });

  static displayName = 'VirtualizedList'

  constructor(props) {
    super(props);
  }

  initAutoSizer = (ref) => {
    if (!ref || this.autoSizer) return;
    this.autoSizer = ref;
    ref._onResize();
  }

  initList = (ref) => {
    if (!ref || this.list) return;
    this.list = ref;
  }

  handleScroll = ({ target }) => {
    const { scrollTop, scrollLeft } = target;
    this.list.Grid.handleScrollEvent({ scrollTop, scrollLeft });
  }

  rowRenderer = ({ index, key, parent, style }) => {
    const { array, factory, ...rest } = this.props;
    const item = array.get(index)
    return createElement(
      CellMeasurer,
      {
        parent,
        key,
        cache: this.cache,
        columnIndex: 0,
        rowIndex: index
      },
      ({ measure }) => createElement(factory, { ...rest, item, style, key: item.hashCode() })
    )
  }

  render() {
    return viewFactory({
      ...this.props,
      theme: styles,
      rowRenderer: this.rowRenderer,
      initAutoSizer: this.initAutoSizer,
      initList: this.initList,
      handleScroll: this.handleScroll,
      cache: this.cache
    })
  }
};

export default List;
