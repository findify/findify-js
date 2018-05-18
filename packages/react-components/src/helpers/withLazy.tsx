import { Component, createFactory } from 'react';
import { is, List, Map } from 'immutable';
import { compose, withPropsOnChange, setDisplayName } from 'recompose';

const isStateEqual = (prev, next) => ['filters', 'q', 'sort'].every(k =>
  is(prev.get(k), next.get(k))
);

const hasRange = (ranges, offset) => !!ranges.find(r => r.valueSeq().includes(offset));

const createRange = meta => Map({
  from: meta.get('offset'),
  to: meta.get('offset') + meta.get('limit'),
});

const addItems = ({ ranges, items }, nextItems, meta) => {
  const append = ranges.find(r => r.get('from') < meta.get('offset'));
  const newRange = createRange(meta);
  const _items = nextItems.filter(i => !items.includes(i));
  return {
    ranges: append ? ranges.push(newRange) : ranges.insert(0, newRange),
    items: append ? items.concat(_items) : _items.concat(items)
  }
}

/**
 * withLazy() returns a HOC for wrapping around component you want to include lazy loading to
 * @returns HOC, accepting a view you want to add lazy loading to
 */
export default function withLazy() {
  /**
   * withLazy HOC allows you to add LazyLoading functionality to your Search views, for example.
   * It controls items displaying correct range in the LazyView and automatically requests for more data if needed
   * @param LazyView view you will be adding lazy loading to
   * @returns LazyLoading HOC
   */
  return BaseComponent => {
    const factory = createFactory(BaseComponent);
    return class Lazy extends Component<any, any>{

      constructor(props) {
        super(props);
        this.state = {
          items: props.items,
          ranges:  List([createRange(props.meta)]),
          columns: '3',
        };
      }

      onLoadNext = () => {
        const { update, meta } = this.props;
        const { ranges } = this.state;
        return update('offset', ranges.last().get('to'));
      }

      onLoadPrev = () => {
        const { update, meta } = this.props;
        const { ranges } = this.state;
        return update('offset', ranges.first().get('from') - meta.get('limit'));
      }

      componentWillReceiveProps({ items, meta, config }) {
        // Do nothing if items are equal
        if (items.equals(this.props.items)) return;

        // Prepend or append new items
        if (isStateEqual(meta, this.props.meta) && !hasRange(this.state.ranges, meta.get('offset'))) {
          return this.setState({ ...addItems(this.state, items, meta) });
        }

        // Reset items
        return this.setState({
          items,
          ranges: List([createRange(meta)]),
        });
      }

      shouldComponentUpdate(props, state) {
        return !this.state.items.equals(state.items) ||
          !!Object.keys(props).find(k => !is(this.props[k], props[k]))
      }

      render () {
        const { ranges, items, columns } = this.state;
        const { meta } = this.props;
        const firstRange = ranges.first();
        const lastRange = ranges.last();

        return factory({
          ...this.props,
          items,
          displayPrevButton: firstRange && firstRange.get('from') > 0,
          displayNextButton: lastRange && lastRange.get('to') < meta.get('total'),
          onLoadNext: this.onLoadNext,
          onLoadPrev: this.onLoadPrev,
        })
      }
    };
  }
}
