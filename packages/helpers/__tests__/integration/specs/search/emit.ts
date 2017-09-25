import * as expect from 'expect';

function validations() {
  const search = () => [
    {
      event: {
        name: 'search',
      },
      message: /"query" param is required in "search" event/,
    },
  ];

  return [...search()];
}

function requests() {
  const request = () => [
    {
      events: [
        {
          name: 'request',
          payload: {
            limit: 2,
          },
        },
      ],
      requestBody: {
        q: '',
        limit: 2,
        offset: 0,
      },
    },
  ];

  const search = () => [
    {
      events: [
        {
          name: 'search',
          payload: {
            query: 'test',
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        q: 'test',
        limit: 24,
        offset: 0,
      },
    },
  ];

  return [...request(), ...search()];
}

export { validations, requests };
