import { Component, createElement } from 'react';
import { is, List, Map } from 'immutable';
import { connectItems } from '@findify/react-connect';
import { compose, withPropsOnChange } from 'recompose';
import withTheme from 'helpers/withTheme';
import sizeMe from 'react-sizeme';

import styles from "./styles.css";
import view from './view';

const isStateEqual = (prev, next) => ['filters', 'q', 'sort'].every(k =>
  is(prev.get(k), next.get(k))
);

const hasChunk = (chunks, offset) => !!chunks.find(({ from }) => from === offset);

const countProductsToShow = width => {
  if (width > 1000) return 2;
  if (width > 800) return 3;
  if (width > 600) return 4;
  if (width > 400) return 6;
  return 12;
};

const createChunk = (items, meta) => Map({
  items,
  from: meta.get('offset'),
  to: meta.get('offset') + meta.get('limit'),
  hashCode: items.hashCode
});

const addChunk = (chunks, items, meta) => 
  chunks.find((chunk) => chunk.get('from') < meta.get('offset'))
  ? chunks.push(createChunk(items, meta))
  : chunks.insert(0, createChunk(items, meta))

class LazyResults extends Component<any, any>{
  state = {
    chunks: List(),
    columns: '3',
    displayNextButton: false
  };

  onLoadNext = () => {
    const { update, meta } = this.props;
    const { chunks } = this.state;
    return update('offset', chunks.last().get('to') + meta.get('limit'));
  }

  onLoadPrev = () => {
    const { update, meta } = this.props;
    const { chunks } = this.state;
    return update('offset', chunks.first().get('from') - meta.get('limit'));
  }

  componentWillReceiveProps({ items, meta, size, config }) {    
    if (size.width !== this.props.size.width) {
      this.setState({ columns: String(config.get('columns') || countProductsToShow(size.width)) })
    }
    if (items.equals(this.props.items)) return;
    if (isStateEqual(meta, this.props.meta) && !hasChunk(this.state.chunks, meta.get('offset'))) {
      return this.setState({ chunks: addChunk(this.state.chunks, items, meta) });
    }
    return this.setState({ chunks: List([createChunk(items, meta)]) });
  }

  shouldComponentUpdate(props, state) {
    return this.state.columns !== state.columns || this.state.chunks !== state.chunks;
  }

  render () {
    const { config, theme, meta } = this.props;
    const lastChunk = this.state.chunks.last();
    const firstChunk = this.state.chunks.first();
    return createElement(view, {
      config,
      theme,
      ...this.state,
      displayPrevButton: firstChunk && firstChunk.get('from') > 0, 
      displayNextButton: lastChunk && lastChunk.get('to') < meta.get('total'), 
      onLoadNext: this.onLoadNext,
      onLoadPrev: this.onLoadPrev,
    })
  }
};

export default compose(
  withTheme(styles),
  connectItems,
  sizeMe(),
)(LazyResults);
