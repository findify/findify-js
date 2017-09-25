import * as emit from './emit';
import * as get from './get';
import * as subscribe from './subscribe';

import { createAutocomplete } from '../../../../src';

const successResponse = {
  items: [
    {
      id: 'testId',
    },
  ],
  suggestions: [
    {
      value: 'test',
      redirect: {
        name: 'testName',
        url: 'testUrl',
      },
    },
  ],
  meta: {
    rid: 'testRid',
    q: 'testQuery',
    suggestion_limit: 1,
    item_limit: 1,
  },
};

const autocompleteQuery = 'testQuery';

const emittingEvents = [
  {
    name: 'input',
    payload: {
      query: autocompleteQuery,
    },
  },
  {
    name: 'request',
    payload: {
      item_limit: 1,
      suggestion_limit: 1,
    },
  },
];

const autocompleteSpec = {
  createStore(args) {
    return createAutocomplete(args);
  },
  name: 'createAutocomplete',
  searchApi: {
    endpoint: '/autocomplete',
    successResponse,
  },
  events: {
    requestEvent: {
      name: 'request',
    },
    validEvent: {
      name: 'input',
      payload: {
        query: 'test',
      },
    },
  },
  emit: {
    validations: emit.validations(),
    requests: emit.requests(),
  },
  subscribe: {
    successEvents: subscribe.events(),
  },
  get: get.names(successResponse),
};

export { autocompleteSpec };
