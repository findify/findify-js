import { createSearch, createCollection } from '@findify/helpers';
import {
  pick,
  defer,
  isArray,
  isEqual,
  mapValues,
  isEmpty,
  filter,
} from 'lodash';
import { RESPONSE_SUCCESS, RESPONSE_FAILURE, REQUEST } from 'helpers/constants';
import {
  createMetaNormalizer,
  pickRequestFromMeta,
  createFacetsUpdater,
} from './helpers';
import InstanceMemo from './InstanceMemo';

import jump from 'jump.js';

function resetMemoIfNeeded(memo, ctx) {
  const { response, view, location } = ctx;
  if (!view.infinite) return;

  const s1 = pick(response.meta, ['filters', 'sort', 'q']);
  const s2 = pick({ filters: [], ...location.state }, ['filters', 'sort', 'q']);

  if (!isEqual(s1, s2)) {
    memo.reset();
  }
}

export default ({
  analytics,
  location,
  node,
  config: {
    api,
    disableScroll = false,
    scrollOffset = 0,
    meta = {},
    view = {},
  },
}) => {
  let hasError = false;
  const memo = new InstanceMemo();

  const slot = location.collection;
  const normalizeMeta = createMetaNormalizer(meta);
  const instance: any = slot ? createCollection(slot, api) : createSearch(api);
  const updateFacet = createFacetsUpdater(instance);
  const request = payload =>
    instance
      .emit({ name: 'setRequestBody', payload })
      .emit({ name: 'request' });
  const commit = () => instance.emit({ name: 'request' });

  const subscriber = (callback, setLoading?) => async ({ name }) => {
    setLoading(true);
    if (name === RESPONSE_FAILURE) {
      hasError = true;
      return callback();
    }

    if (name === REQUEST) {
      if (!view.infinite && !disableScroll) {
        return jump(node.instance, { offset: scrollOffset });
      }
    }

    if (name !== RESPONSE_SUCCESS) return;
    const response = instance.get('response');
    const request = instance.get('request');

    const isStatesEqual = isEqual(
      request,
      normalizeMeta(slot ? { slot } : location.state)
    );

    resetMemoIfNeeded(memo, { response, view, location });

    if (response.redirect) {
      await analytics.sendEvent('redirect', {
        rid: response.meta.rid,
        suggestion: request.q,
      });
      location.navigate(response.redirect.url);
      return;
    }

    if (!isStatesEqual) location.state = request;

    if (slot) {
      const stateFromResponse = pickRequestFromMeta(response.meta);
      if (!isEqual({ ...stateFromResponse, slot }, request)) {
        instance.emit({
          name: 'setRequestBody',
          payload: {
            ...request,
            ...stateFromResponse,
            slot,
          },
        });
      }
    }

    hasError = false;
    setLoading(false);
    if (view.infinite) return callback(memo.merge(response));
    return callback(response);
  };

  const locationListener = location.listen(() => {
    const locationWithMeta = normalizeMeta(location.state);
    if (isEqual(locationWithMeta, instance.get('request'))) return;
    return request(locationWithMeta);
  });

  if (location.state.q !== void 0 || location.collection) {
    request(normalizeMeta(location.state));
  }

  return {
    request,

    hasError,

    // Will stop listening everything in listeners
    listeners: [locationListener],

    subscribe: (callback, setLoading) =>
      instance.subscribe(subscriber(callback, setLoading)),

    onPageChange: page =>
      instance
        .emit({ name: 'setPage', payload: { page } })
        .emit({ name: 'request' }),

    onLoadNext: () => {
      const req = instance.get('request');
      const { meta, items } = instance.get('response');
      if (meta.total < meta.offset + meta.limit) return;
      memo.memorize(1);
      const offset = memo.items[memo.items.length - 1].position + 1;

      return request({ ...req, offset });
    },

    onLoadPrev: () => {
      const req = instance.get('request');
      const res = instance.get('response');
      const { meta, items } = instance.get('response');
      memo.memorize(-1);
      const offset = memo.items[0].position - meta.limit;
      return request({ ...req, offset });
    },

    onClearAll: () =>
      instance.emit({ name: 'clearAllFilters' }).emit({ name: 'request' }),

    onSortChange: ({ order, field }) => {
      instance
        .get('response')
        .meta.sort.forEach(s =>
          instance.emit({ name: 'unsetSorting', payload: s })
        );
      if (order) {
        instance.emit({ name: 'setSorting', payload: { order, field } });
      }
      return instance.emit({ name: 'request' });
    },

    onBreadCrumbRemove: facet => {
      updateFacet({ ...facet, changes: { ...facet, selected: false } });
      return commit();
    },

    onFacetChange: facet => {
      updateFacet(facet);
      return commit();
    },

    onFacetsChange: facets => {
      facets.forEach(updateFacet);
      return commit();
    },
  };
};
