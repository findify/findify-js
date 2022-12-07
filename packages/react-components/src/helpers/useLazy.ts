import { useCallback, useEffect, useMemo, useRef } from 'react';
import { List, Map } from 'immutable';
import { useItems } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';
import { emit } from './emmiter';
import { isActive } from 'nock';

const hasRange = (ranges, offset) =>
  !!ranges.find((r) => r.get('from') === offset);

const createRange = (meta): Map<string, List<any>> =>
  Map({
    from: meta.get('offset'),
    to: meta.get('offset') + meta.get('limit'),
  });

const updateItems = ({ ranges, items }, nextItems, meta) => {
  const append = ranges.find((r) => r.get('from') < meta.get('offset'));
  const newRange = createRange(meta);
  const _items = nextItems.filter((i) => !items.includes(i));
  return {
    ranges: append ? ranges.push(newRange) : ranges.insert(0, newRange),
    items: append ? items.concat(_items) : _items.concat(items),
    meta: meta,
  };
};

const initialState = {
  items: List(),
  ranges: List(),
  meta: Map<string, any>(),
};

export default (offset = 300) => {
  const { items, meta, update, config } = useItems<Immutable.SearchConfig>();
  const container = useRef(null);
  const pending = useRef(true);
  const state = useRef(initialState);
  const autoLoad = useRef(config.getIn(['pagination', 'autoLoadTimes']) || 0);

  const onLoadNext = useCallback(
    (e) => {
      e.preventDefault();
      pending.current = true;
      return update('offset', (state.current.ranges.last() as any).get('to'));
    },
    [meta]
  );

  const onLoadPrev = useCallback(
    (e) => {
      e.preventDefault();
      pending.current = true;
      return update(
        'offset',
        (state.current.ranges.first() as any).get('from') - meta.get('limit')
      );
    },
    [meta]
  );

  const trackPosition = () => {
    if (
      pending.current ||
      !autoLoad.current ||
      !state.current.items.size ||
      state.current.ranges.last().get('to') >= state.current.meta.get('total')
    )
      return;

    Promise.resolve().then(() => {
      if (!container.current || container.current?.clientHeight === 0) return;
      const { bottom } = container.current.getBoundingClientRect();
      const height =
        window.innerHeight || document.documentElement.clientHeight;

      const inView = bottom - height <= offset;

      if (!inView) return;

      autoLoad.current -= 1;
      pending.current = true;

      update('offset', (state.current.ranges.last() as any).get('to'));
    });
  };

  useEffect(() => {
    if (container.current === null) return;
    window.addEventListener('scroll', trackPosition, true);
    pending.current = false;
    return () => window.removeEventListener('scroll', trackPosition);
  }, [container]);

  /**
   * Handle items change
   */
  const getUpdate = () => {
    /**
     * Reset refs if update has come from outside of this component
     */
    if (!pending.current) {
      const update = updateItems(initialState, items, meta);
      autoLoad.current = config.getIn(['pagination', 'autoLoadTimes']) || 0;
      pending.current = true;

      /** Scroll to top on query change */
      emit('scrollTop');
      pending.current = false;

      state.current = update;
      return update;
    }
    /**
     * Check the new ranges and if there is difference update state
     */
    if (!hasRange(state.current.ranges, meta.get('offset'))) {
      const update = updateItems(state.current, items, meta);
      pending.current = false;
      state.current = update;
      return update;
    }

    return state.current;
  };

  return useMemo(() => {
    const update = getUpdate();
    const firstRange: any = update.ranges.first();
    const lastRange: any = update.ranges.last();
    return {
      container,
      onLoadNext,
      onLoadPrev,
      items: update.items,
      displayPrevButton: firstRange && firstRange.get('from') > 0,
      displayNextButton:
        lastRange &&
        lastRange.get('to') < meta.get('total') &&
        !autoLoad.current,
    };
  }, [items]);
};
