import * as expect from 'expect';

function validations() {
  const setPage = () => [
    {
      event: {
        name: 'setPage',
      },
      message: /"page" param is required in "setPage" event/,
    },
  ];

  const setSorting = () => [
    {
      event: {
        name: 'setSorting',
        payload: {
          order: 'desc',
        },
      },
      message: /"field" param is required in "setSorting" event/,
    },
    {
      event: {
        name: 'setSorting',
        payload: {
          field: 'someField',
        },
      },
      message: /"order" param is required in "setSorting" event/,
    },
  ];

  const unsetSorting = () => [
    {
      event: {
        name: 'unsetSorting',
        payload: {
          order: 'desc',
        },
      },
      message: /"field" param is required in "unsetSorting" event/,
    },
  ];

  const setNestedListFacet = () => [
    {
      event: {
        name: 'setNestedListFacet',
      },
      message: /"name" param is required in "setNestedListFacet" event/,
    },
    {
      event: {
        name: 'setNestedListFacet',
        payload: {
          name: 'test',
        },
      },
      message: /"value" param is required in "setNestedListFacet" event/,
    },
  ];

  const unsetNestedListFacet = () => [
    {
      event: {
        name: 'unsetNestedListFacet',
      },
      message: /"name" param is required in "unsetNestedListFacet" event/,
    },
    {
      event: {
        name: 'unsetNestedListFacet',
        payload: {
          name: 'test',
        },
      },
      message: /"value" param is required in "unsetNestedListFacet" event/,
    },
  ];

  const setTextFacet = () => [
    {
      event: {
        name: 'setTextFacet',
      },
      message: /"name" param is required in "setTextFacet" event/,
    },
    {
      event: {
        name: 'setTextFacet',
        payload: {
          name: 'test',
        },
      },
      message: /"value" param is required in "setTextFacet" event/,
    },
  ];

  const unsetTextFacet = () => [
    {
      event: {
        name: 'unsetTextFacet',
      },
      message: /"name" param is required in "unsetTextFacet" event/,
    },
    {
      event: {
        name: 'unsetTextFacet',
        payload: {
          name: 'test',
        },
      },
      message: /"value" param is required in "unsetTextFacet" event/,
    },
  ];

  const setRangeFacet = () => [
    {
      event: {
        name: 'setRangeFacet',
      },
      message: /"name" param is required in "setRangeFacet" event/,
    },
    {
      event: {
        name: 'setRangeFacet',
        payload: {
          name: 'test',
        },
      },
      message: /Either "from" or "to" param should be passed in "setRangeFacet" event/,
    },
  ];

  const unsetRangeFacet = () => [
    {
      event: {
        name: 'unsetRangeFacet',
      },
      message: /"name" param is required in "unsetRangeFacet" event/,
    },
    {
      event: {
        name: 'unsetRangeFacet',
        payload: {
          name: 'test',
        },
      },
      message: /Either "from" or "to" param should be passed in "unsetRangeFacet" event/,
    },
  ];

  return [
    ...setPage(),
    ...setSorting(),
    ...unsetSorting(),
    ...setNestedListFacet(),
    ...unsetNestedListFacet(),
    ...setTextFacet(),
    ...unsetTextFacet(),
    ...setRangeFacet(),
    ...unsetRangeFacet(),
  ];
}

function requests() {
  const clearAllFilters = () => [
    {
      events: [
        {
          name: 'setNestedListFacet',
          payload: {
            name: 'categories1',
            value: 'food',
          },
        },
        {
          name: 'setTextFacet',
          payload: {
            name: 'test',
            value: 'someValue',
          },
        },
        {
          name: 'clearAllFilters',
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        limit: 24,
        offset: 0,
        filters: undefined,
      },
    },
  ];

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
        limit: 2,
        offset: 0,
      },
    },
  ];

  const setPage = () => [
    {
      events: [
        {
          name: 'setPage',
          payload: {
            page: 10,
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        limit: 24,
        offset: 216,
      },
    },
    {
      events: [
        {
          name: 'setPage',
          payload: {
            page: 1,
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        limit: 24,
        offset: 0,
      },
    },
  ];

  const nextPage = () => [
    {
      events: [
        {
          name: 'nextPage',
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        limit: 24,
        offset: 24,
      },
    },
    {
      events: [
        {
          name: 'setPage',
          payload: {
            page: 10,
          },
        },
        {
          name: 'nextPage',
        },
        {
          name: 'request',
          payload: {
            limit: 12,
          },
        },
      ],
      requestBody: {
        limit: 12,
        offset: 120,
      },
    },
  ];

  const prevPage = () => [
    {
      events: [
        {
          name: 'setPage',
          payload: {
            page: 11,
          },
        },
        {
          name: 'prevPage',
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        limit: 24,
        offset: 216,
      },
    },
    {
      events: [
        {
          name: 'prevPage',
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        limit: 24,
        offset: 0,
      },
    },
  ];

  const setNestedListFacet = () => [
    {
      events: [
        {
          name: 'setNestedListFacet',
          payload: {
            name: 'categories1',
            value: 'food',
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        limit: 24,
        offset: 0,
        filters: [
          {
            name: 'categories1',
            type: 'category',
            values: [
              {
                value: 'food',
              },
            ],
          },
        ],
      },
    },
    {
      events: [
        {
          name: 'setNestedListFacet',
          payload: {
            name: 'categories1',
            value: 'food',
          },
        },
        {
          name: 'setNestedListFacet',
          payload: {
            name: 'categories1',
            value: 'test',
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        limit: 24,
        offset: 0,
        filters: [
          {
            name: 'categories1',
            type: 'category',
            values: [
              {
                value: 'test',
              },
            ],
          },
        ],
      },
    },
    {
      events: [
        {
          name: 'setNestedListFacet',
          payload: {
            name: 'categories1',
            value: 'food',
          },
        },
        {
          name: 'setNestedListFacet',
          payload: {
            name: 'categories2',
            value: 'test',
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        limit: 24,
        offset: 0,
        filters: [
          {
            name: 'categories1',
            type: 'category',
            values: [
              {
                value: 'food',
              },
            ],
          },
          {
            name: 'categories2',
            type: 'category',
            values: [
              {
                value: 'test',
              },
            ],
          },
        ],
      },
    },
    {
      events: [
        {
          name: 'setNestedListFacet',
          payload: {
            name: 'categories1',
            value: 'food',
          },
        },
        {
          name: 'setNestedListFacet',
          payload: {
            name: 'categories2',
            value: 'test',
          },
        },
        {
          name: 'setNestedListFacet',
          payload: {
            name: 'categories1',
            value: 'food2',
          },
        },
        {
          name: 'setNestedListFacet',
          payload: {
            name: 'categories2',
            value: 'test2',
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        limit: 24,
        offset: 0,
        filters: [
          {
            name: 'categories1',
            type: 'category',
            values: [
              {
                value: 'food2',
              },
            ],
          },
          {
            name: 'categories2',
            type: 'category',
            values: [
              {
                value: 'test2',
              },
            ],
          },
        ],
      },
    },
  ];

  const unsetNestedListFacet = () => [
    {
      events: [
        {
          name: 'setNestedListFacet',
          payload: {
            name: 'categories1',
            value: 'food',
          },
        },
        {
          name: 'setNestedListFacet',
          payload: {
            name: 'categories2',
            value: 'test',
          },
        },
        {
          name: 'unsetNestedListFacet',
          payload: {
            name: 'categories1',
            value: 'food',
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        limit: 24,
        offset: 0,
        filters: [
          {
            name: 'categories2',
            type: 'category',
            values: [
              {
                value: 'test',
              },
            ],
          },
        ],
      },
    },
    {
      events: [
        {
          name: 'setNestedListFacet',
          payload: {
            name: 'categories1',
            value: 'food',
          },
        },
        {
          name: 'unsetNestedListFacet',
          payload: {
            name: 'categories1',
            value: 'food',
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody(body) {
        expect(body.filters).toNotExist();
      },
    },
  ];

  const setSorting = () => [
    {
      events: [
        {
          name: 'setSorting',
          payload: {
            field: 'test',
            order: 'asc',
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        limit: 24,
        offset: 0,
        sort: [
          {
            field: 'test',
            order: 'asc',
          },
        ],
      },
    },
    {
      events: [
        {
          name: 'setSorting',
          payload: {
            field: 'test',
            order: 'desc',
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        limit: 24,
        offset: 0,
        sort: [
          {
            field: 'test',
            order: 'desc',
          },
        ],
      },
    },
    {
      events: [
        {
          name: 'setSorting',
          payload: {
            field: 'test',
            order: 'desc',
          },
        },
        {
          name: 'setSorting',
          payload: {
            field: 'test2',
            order: 'desc',
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        limit: 24,
        offset: 0,
        sort: [
          {
            field: 'test',
            order: 'desc',
          },
          {
            field: 'test2',
            order: 'desc',
          },
        ],
      },
    },
  ];

  const unsetSorting = () => [
    {
      events: [
        {
          name: 'setSorting',
          payload: {
            field: 'test',
            order: 'desc',
          },
        },
        {
          name: 'setSorting',
          payload: {
            field: 'test2',
            order: 'desc',
          },
        },
        {
          name: 'unsetSorting',
          payload: {
            field: 'test2',
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        limit: 24,
        offset: 0,
        sort: [
          {
            field: 'test',
            order: 'desc',
          },
        ],
      },
    },
    {
      events: [
        {
          name: 'setSorting',
          payload: {
            field: 'test',
            order: 'asc',
          },
        },
        {
          name: 'unsetSorting',
          payload: {
            field: 'test',
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody(body) {
        expect(body.sort).toNotExist();
      },
    },
  ];

  const setTextFacet = () => [
    {
      events: [
        {
          name: 'setTextFacet',
          payload: {
            name: 'test',
            value: 'someValue',
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        filters: [
          {
            name: 'test',
            type: 'text',
            values: [
              {
                value: 'someValue',
              },
            ],
          },
        ],
        offset: 0,
        limit: 24,
      },
    },
    {
      events: [
        {
          name: 'setTextFacet',
          payload: {
            name: 'test',
            value: 'someValue',
          },
        },
        {
          name: 'setTextFacet',
          payload: {
            name: 'test',
            value: 'someValue2',
          },
        },
        {
          name: 'setTextFacet',
          payload: {
            name: 'test2',
            value: 'someValue',
          },
        },
        {
          name: 'setTextFacet',
          payload: {
            name: 'test2',
            value: 'someValue2',
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        filters: [
          {
            name: 'test',
            type: 'text',
            values: [
              {
                value: 'someValue',
              },
              {
                value: 'someValue2',
              },
            ],
          },
          {
            name: 'test2',
            type: 'text',
            values: [
              {
                value: 'someValue',
              },
              {
                value: 'someValue2',
              },
            ],
          },
        ],
        offset: 0,
        limit: 24,
      },
    },
  ];

  const unsetTextFacet = () => [
    {
      events: [
        {
          name: 'unsetTextFacet',
          payload: {
            name: 'test',
            value: 'someValue',
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody(body) {
        expect(body.filters).toNotExist();
        expect(body).toContain({
          offset: 0,
          limit: 24,
        });
      },
    },
    {
      events: [
        {
          name: 'setTextFacet',
          payload: {
            name: 'test',
            value: 'someValue',
          },
        },
        {
          name: 'setTextFacet',
          payload: {
            name: 'test',
            value: 'someValue2',
          },
        },
        {
          name: 'setTextFacet',
          payload: {
            name: 'test',
            value: 'someValue3',
          },
        },
        {
          name: 'setTextFacet',
          payload: {
            name: 'test2',
            value: 'someValue',
          },
        },
        {
          name: 'unsetTextFacet',
          payload: {
            name: 'test',
            value: 'someValue',
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        offset: 0,
        limit: 24,
        filters: [
          {
            name: 'test',
            type: 'text',
            values: [
              {
                value: 'someValue2',
              },
              {
                value: 'someValue3',
              },
            ],
          },
          {
            name: 'test2',
            type: 'text',
            values: [
              {
                value: 'someValue',
              },
            ],
          },
        ],
      },
    },
    {
      events: [
        {
          name: 'setTextFacet',
          payload: {
            name: 'test',
            value: 'someValue',
          },
        },
        {
          name: 'unsetTextFacet',
          payload: {
            name: 'test',
            value: 'someValue',
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody(body) {
        expect(body.filters).toNotExist();
      },
    },
  ];

  const setRangeFacet = () => [
    {
      events: [
        {
          name: 'setRangeFacet',
          payload: {
            name: 'testRange',
            from: 10,
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        limit: 24,
        offset: 0,
        filters: [
          {
            name: 'testRange',
            type: 'range',
            values: [
              {
                from: 10,
              },
            ],
          },
        ],
      },
    },
    {
      events: [
        {
          name: 'setRangeFacet',
          payload: {
            name: 'testRange',
            to: 10,
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        limit: 24,
        offset: 0,
        filters: [
          {
            name: 'testRange',
            type: 'range',
            values: [
              {
                to: 10,
              },
            ],
          },
        ],
      },
    },
    {
      events: [
        {
          name: 'setRangeFacet',
          payload: {
            name: 'testRange',
            from: 15,
            to: 10,
          },
        },
        {
          name: 'setRangeFacet',
          payload: {
            name: 'testRange',
            from: 100,
            to: 200,
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        limit: 24,
        offset: 0,
        filters: [
          {
            name: 'testRange',
            type: 'range',
            values: [
              {
                from: 15,
                to: 10,
              },
              {
                from: 100,
                to: 200,
              },
            ],
          },
        ],
      },
    },
  ];

  const unsetRangeFacet = () => [
    {
      events: [
        {
          name: 'setRangeFacet',
          payload: {
            name: 'testRange',
            from: 3,
          },
        },
        {
          name: 'setRangeFacet',
          payload: {
            name: 'testRange',
            to: 90,
          },
        },
        {
          name: 'setRangeFacet',
          payload: {
            name: 'testRange',
            from: 15,
            to: 10,
          },
        },
        {
          name: 'setRangeFacet',
          payload: {
            name: 'testRange',
            from: 100,
            to: 200,
          },
        },
        {
          name: 'unsetRangeFacet',
          payload: {
            name: 'testRange',
            from: 100,
            to: 200,
          },
        },
        {
          name: 'unsetRangeFacet',
          payload: {
            name: 'testRange',
            from: 3,
          },
        },
        {
          name: 'unsetRangeFacet',
          payload: {
            name: 'testRange',
            to: 90,
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody: {
        limit: 24,
        offset: 0,
        filters: [
          {
            name: 'testRange',
            type: 'range',
            values: [
              {
                from: 15,
                to: 10,
              },
            ],
          },
        ],
      },
    },
    {
      events: [
        {
          name: 'setRangeFacet',
          payload: {
            name: 'test',
            from: 10,
          },
        },
        {
          name: 'unsetRangeFacet',
          payload: {
            name: 'test',
            from: 10,
          },
        },
        {
          name: 'request',
        },
      ],
      requestBody(body) {
        expect(body.filters).toNotExist();
      },
    },
  ];

  return [
    ...clearAllFilters(),
    ...request(),
    ...setPage(),
    ...nextPage(),
    ...prevPage(),
    ...setSorting(),
    ...unsetSorting(),
    ...setNestedListFacet(),
    ...unsetNestedListFacet(),
    ...setTextFacet(),
    ...unsetTextFacet(),
    ...setRangeFacet(),
    ...unsetRangeFacet(),
  ];
}

export { validations, requests };
