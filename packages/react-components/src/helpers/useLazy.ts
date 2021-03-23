import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { is, List, Map } from 'immutable';
import { useItems } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';

const hasRange = (ranges, offset) =>
  !!ranges.find((r) => r.get('from') === offset);

const createRange = (meta): Map<string, List<any>> =>
  Map({
    from: meta.get('offset'),
    to: meta.get('offset') + meta.get('limit'),
  });

const addItems = ({ ranges, items }, nextItems, meta) => {
  const append = ranges.find((r) => r.get('from') < meta.get('offset'));
  const newRange = createRange(meta);
  const _items = nextItems.filter((i) => !items.includes(i));
  return {
    ranges: append ? ranges.push(newRange) : ranges.insert(0, newRange),
    items: append ? items.concat(_items) : _items.concat(items),
  };
};

const initialState = {
  items: List(),
  ranges: List(),
};

export default (offset = 300) => {
  const { items, meta, update, config } = useItems<Immutable.SearchConfig>();
  const container = useRef(null);
  const autoLoadCount = useRef(
    config.getIn(['pagination', 'autoLoadTimes']) || 0
  );

  /**
   * State of request
   * If items has been updated from out of this component
   * then state will be reset
   */
  const pending = useRef(true);

  const [state, setState] = useState(initialState);

  const [displayPrevButton, displayNextButton] = useMemo(() => {
    const firstRange: any = state.ranges.first();
    const lastRange: any = state.ranges.last();
    return [
      firstRange && firstRange.get('from') > 0,
      lastRange &&
        lastRange.get('to') < meta.get('total') &&
        !autoLoadCount.current,
    ];
  }, [state]);

  const onLoadNext = useCallback(() => {
    pending.current = true;
    return update('offset', (state.ranges.last() as any).get('to'));
  }, [state]);

  const onLoadPrev = useCallback(() => {
    pending.current = true;
    return update(
      'offset',
      (state.ranges.first() as any).get('from') - meta.get('limit')
    );
  }, [state]);

  const trackPosition = () =>
    Promise.resolve().then(() => {
      if (pending.current || !autoLoadCount.current) return;

      const { bottom } = container.current.getBoundingClientRect();
      const height =
        window.innerHeight || document.documentElement.clientHeight;
      const inView = bottom - height <= offset;

      if (!inView) return;

      console.log(meta);
      setState((s) => {
        autoLoadCount.current -= 1;
        pending.current = true;

        if (!s.ranges.last()) return s;
        console.log(s.ranges.last().get('to'), meta);
        update('offset', (s.ranges.last() as any).get('to'));
        return s;
      });
    });

  useEffect(() => {
    if (container.current === null) return;
    window.addEventListener('scroll', trackPosition, true);
    pending.current = false;
    return () => window.removeEventListener('scroll', trackPosition);
  });

  useEffect(() => {
    if (!items.size) return;
    /**
     * Reset refs if update has come from outside of this component
     */
    if (!pending.current) {
      autoLoadCount.current =
        config.getIn(['pagination', 'autoLoadTimes']) || 0;
      return setState(addItems(initialState, items, meta));
    }
    /**
     * Check the new ranges and if there is difference update state
     */
    if (!hasRange(state.ranges, meta.get('offset'))) {
      pending.current = false;
      setState((s) => addItems(s, items, meta));
    }
  }, [items]);

  return useMemo(
    () => ({
      container,
      onLoadNext,
      onLoadPrev,
      displayPrevButton,
      displayNextButton,
      items: state.items,
    }),
    [state.items]
  );
};
