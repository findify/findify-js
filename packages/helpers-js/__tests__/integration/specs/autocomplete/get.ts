import * as expect from 'expect';

function names(successResponse) {
  return [
    {
      name: 'request',
      events: [
        {
          name: 'input',
          payload: {
            query: 'test',
          },
        },
        {
          name: 'request',
          payload: {
            item_limit: 1,
            suggestion_limit: 5,
            user: {
              uid: 'testUserId',
              sid: 'testSessionId',
            },
          },
        },
      ],
      result: {
        q: 'test',
        item_limit: 1,
        suggestion_limit: 5,
        user: {
          uid: 'testUserId',
          sid: 'testSessionId',
        },
      },
      successResponse,
    },
    {
      name: 'request',
      result: {},
    },
    {
      name: 'response',
      events: [
        {
          name: 'input',
          payload: {
            query: 'test',
          },
        },
        {
          name: 'request',
        },
      ],
      result: successResponse,
      successResponse,
    },
    {
      name: 'response',
      result: {},
    },
    {
      name: 'responseMeta',
      result: {
        isFetching: false,
      },
    },
    {
      name: 'responseMeta',
      events: [
        {
          name: 'input',
          payload: {
            query: 'test',
          },
        },
        {
          name: 'request',
        },
      ],
      result(result) {
        expect(result.lastUpdated).toBeA('number');
        expect(result.isFetching).toEqual(false);
        expect(result.error).toEqual(undefined);
      },
      successResponse,
    },
  ];
}

export { names };
