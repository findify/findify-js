function events() {
  return [
    {
      name: 'request',
    },
    {
      name: 'request',
      payload: {
        user: {
          uid: 'testUserId',
          sid: 'testSessionId',
        },
      },
    },
    {
      name: 'request',
      payload: {
        item_limit: 1,
        suggestion_limit: 2,
      },
    },
    {
      name: 'input',
      payload: {
        query: 'test',
      },
    },
  ];
}

export { events };
