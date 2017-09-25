function validations() {
  return [
    {
      event: {
        name: 'input',
      },
      message: /"query" param is required in "input" event/,
    },
    {
      event: {
        name: 'input',
        payload: {},
      },
      message: /"query" param is required in "input" event/,
    },
  ];
}

function requests() {
  return [
    {
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
            suggestion_limit: 2,
          },
        },
      ],
      requestBody: {
        q: 'test',
        item_limit: 1,
        suggestion_limit: 2,
      },
    },
  ];
}

export { validations, requests };
