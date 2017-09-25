import { createSearch } from '../../../../src';

import * as emit from './emit';
import * as get from './get';
import * as subscribe from './subscribe';

import * as resultsEmit from '../results/emit';
import * as resultsGet from '../results/get';
import * as resultsSubscribe from '../results/subscribe';

const successResponse = {
  meta: {
    rid: 'testRid',
    q: 'testQ',
    no_result: false,
    corrected_q: 'testQ',
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
  redirect: {
    name: 'testRedirectName',
    url: 'testRedirectUrl',
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

const searchSpec = {
  createStore(args) {
    return createSearch(args);
  },
  name: 'createSearch',
  searchApi: {
    endpoint: '/search',
    successResponse,
  },
  events: {
    requestEvent: {
      name: 'request',
    },
    validEvent: {
      name: 'search',
      payload: {
        query: 'test',
      },
    },
  },
  emit: {
    validations: [...emit.validations(), ...resultsEmit.validations()],
    requests: [...emit.requests(), ...resultsEmit.requests()],
  },
  subscribe: {
    successEvents: [...subscribe.events(), ...resultsSubscribe.events()],
  },
  get: [...get.names(successResponse), ...resultsGet.names(successResponse)],
};

export { searchSpec };
