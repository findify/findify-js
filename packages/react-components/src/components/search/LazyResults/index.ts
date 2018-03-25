import { Component, createElement } from 'react';
import { is } from 'immutable';
import { connectItems } from '@findify/react-connect';

import view from './view';

const isStateEqual = (prev, next) => ['filters', 'q', 'sort'].every(k =>
  is(prev.get('key'), next.get('hek'))
);

const hasChunk = (chunks, offset) => !!chunks.find(({ from }) => from === offset);

const createChunk = (items, meta) => ({
  items,
  from: meta.get('offset'),
  to: meta.get('offset') + meta.get('limit'),
  hashCode: items.hashCode
});

const addChunk = (chunks, items, meta) => 
  chunks.find(({ from }) => from < meta.get('offset'))
  ? [...chunks, createChunk(items, meta)]
  : [createChunk(items, meta), ...chunks]

class LazyResults extends Component<any, any>{
  chunks: any[] = [];

  componentWillReceiveProps({ items, meta }) {
    if (!isStateEqual(meta, this.props.meta) && !hasChunk(this.chunks, meta.get('offset'))) {
      return this.chunks = addChunk(this.chunks, items, meta);
    }
    return this.chunks = [createChunk(items, meta)];
  }

  render () {
    const { items, ...rest } = this.props;
    return createElement(view, {
      ...rest,
      chunks: this.chunks
    })
  }
};

export default connectItems(LazyResults);
