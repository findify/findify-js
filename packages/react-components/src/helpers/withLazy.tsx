import { Component, createElement } from 'react';
import { is, List, Map } from 'immutable';
import { compose, withPropsOnChange, setDisplayName } from 'recompose';
import sizeMe from 'react-sizeme';


const isStateEqual = (prev, next) => ['filters', 'q', 'sort'].every(k =>
  is(prev.get(k), next.get(k))
);

const hasRange = (ranges, offset) => !!ranges.find(r => r.valueSeq().includes(offset));

/**
 * This function is used to calculate products to show in a line of a Slider according to its width
 * @param width Width of slider
 * @returns Number of items to show in a Slider
 */
const countProductsToShow = width => {
  if (width > 1000) return 2;
  if (width > 800) return 3;
  if (width > 600) return 4;
  if (width > 400) return 6;
  return 12;
};

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
  return LazyView => {
    class Lazy extends Component<any, any>{

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
        return update('offset', ranges.last().get('to') + meta.get('limit'));
      }

      onLoadPrev = () => {
        const { update, meta } = this.props;
        const { ranges } = this.state;
        return update('offset', ranges.first().get('from') - meta.get('limit'));
      }

      componentWillReceiveProps({ items, meta, size, config }) {

        if (size.width !== this.props.size.width) {
          this.setState({ columns: String(config.get('columns') || countProductsToShow(size.width)) })
        }

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
        return this.state.columns !== state.columns || !this.state.items.equals(state.items);
      }

      render () {
        const { ranges, items, columns } = this.state;
        const { meta } = this.props;
        const firstRange = ranges.first();
        const lastRange = ranges.last();

        return createElement(LazyView, {
          ...this.props,
          items,
          columns,
          displayPrevButton: firstRange && firstRange.get('from') > 0,
          displayNextButton: lastRange && lastRange.get('to') < meta.get('total'),
          onLoadNext: this.onLoadNext,
          onLoadPrev: this.onLoadPrev,
        })
      }
    };

    return compose(
      setDisplayName('withLazy'),
      sizeMe()
    )(Lazy)

  }
}
