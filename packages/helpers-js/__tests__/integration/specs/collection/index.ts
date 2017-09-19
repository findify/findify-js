import { createCollection } from '../../../../src';

import * as resultsEmit from '../results/emit';
import * as resultsGet from '../results/get';
import * as resultsSubscribe from '../results/subscribe';

const successResponse = {
  meta: {
    rid: 'testRid',
    filters: [
      {
        name: 'testFilterName',
        type: 'testFilterType',
        values: [
          {
            value: 'someTestValue',
          },
        ],
      },
    ],
    sort: [
      {
        field: 'testSortField',
        order: 'testSortOrder',
      },
    ],
    limit: 24,
    offset: 48,
    total: 96,
  },
  banner: {
    products: {
      image_url: 'testBannerImageUrl',
      target_url: 'testBannerTargetUrl',
    },
  },
  items: [
    {
      id: 'testProductId',
    },
  ],
  facets: [
    {
      name: 'testFacetName',
      type: 'testFacetType',
      sort_type: 'testFacetSortType',
      values: [
        {
          selected: true,
          value: 'someTestValue',
          count: 3,
          name: 'test',
          has_children: false,
        },
        {
          selected: false,
          value: 'someTestValue',
          count: 3,
          name: 'test2',
          has_children: false,
        },
      ],
    },
  ],
};

const collectionSpec = {
  createStore(args) {
    return createCollection('testCollection', args);
  },
  name: 'createCollection',
  searchApi: {
    endpoint: '/smart-collection/testCollection',
    successResponse,
  },
  events: {
    requestEvent: {
      name: 'request',
    },
    validEvent: {
      name: 'nextPage',
    },
  },
  emit: {
    validations: resultsEmit.validations(),
    requests: resultsEmit.requests(),
  },
  subscribe: {
    successEvents: resultsSubscribe.events(),
  },
  get: resultsGet.names(successResponse),
};

export { collectionSpec };
