import * as expect from 'expect';

function names(successResponse) {
  return [
    {
      name: 'request',
      events: [
        {
          name: 'request',
        },
      ],
      result: {
        q: '',
        offset: 0,
        limit: 24,
      },
      successResponse,
    },
    {
      name: 'request',
      result: {
        q: '',
        offset: 0,
        limit: 24,
      },
    },
    {
      name: 'request',
      events: [
        {
          name: 'request',
        },
      ],
      result: {
        q: '',
        offset: 0,
        limit: 24,
      },
      successResponse,
    },
    {
      name: 'request',
      result: {
        q: '',
        offset: 0,
        limit: 24,
      },
    },
  ];
}

export { names };
