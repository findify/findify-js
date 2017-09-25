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
        limit: 1,
        offset: 2,
      },
    },
    {
      name: 'nextPage',
    },
    {
      name: 'prevPage',
    },
    {
      name: 'setPage',
      payload: {
        page: 20,
      },
    },
    {
      name: 'setSorting',
      payload: {
        field: 'newest',
        order: 'asc',
      },
    },
    {
      name: 'unsetSorting',
      payload: {
        field: 'newest',
        order: 'asc',
      },
    },
    {
      name: 'setNestedListFacet',
      payload: {
        name: 'categories3',
        value: 'food',
      },
    },
    {
      name: 'unsetNestedListFacet',
      payload: {
        name: 'categories3',
        value: 'food',
      },
    },
    {
      name: 'setTextFacet',
      payload: {
        name: 'categories3',
        value: 'food',
      },
    },
    {
      name: 'unsetTextFacet',
      payload: {
        name: 'categories3',
        value: 'food',
      },
    },
    {
      name: 'setRangeFacet',
      payload: {
        name: 'test',
        from: 10,
        to: 15,
      },
    },
    {
      name: 'unsetRangeFacet',
      payload: {
        name: 'test',
        from: 10,
        to: 15,
      },
    },
  ];
}

export { events };
