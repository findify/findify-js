import * as expect from 'expect';

function names(successResponse) {
  return [
    {
      name: 'response',
      events: [
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
      events: [
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
    {
      name: 'responseMeta',
      result: {
        isFetching: false,
      },
    },
  ];
}

export { names };
