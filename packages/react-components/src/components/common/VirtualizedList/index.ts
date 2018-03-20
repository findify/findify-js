import { Component, createElement, createFactory } from 'react';
import { compose, defaultProps } from 'recompose';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized/dist/commonjs/CellMeasurer';

import view from './view';
const viewFactory: any = createFactory(view);

export default class List extends Component<any, any>{
  autoSizer: any;
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
      rowRenderer: this.rowRenderer,
      initAutoSizer: this.initAutoSizer,
      cache: this.cache
    })
  }
};
