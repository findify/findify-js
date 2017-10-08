import 'dotenv/config';
import debug from 'debug';
import axios, { AxiosError } from 'axios';
import * as nock from 'nock';
import { Scope as NockScope, NockBackOptions, NockDefinition } from 'nock';
import httpAdapter = require('axios/lib/adapters/http');

import { Client, Config } from '..';
import { User, SortingOrder } from '../../common';
import * as Req from '../../request';
import * as Res from '../../response';

import {
  sanitizeRequestBody,
  sanitizeResponseBody,
  nockBackOptions,
  verifyRequest,
  users,
} from './__support__';

debug('sdk:tests:client')('TEST_API_HOST: ', process.env.TEST_API_HOST);
debug('sdk:tests:client')('TEST_API_KEY: ', process.env.TEST_API_KEY);
debug('sdk:tests:client')('NOCK_BACK_MODE: ', process.env.NOCK_BACK_MODE);

describe('Client', () => {
  beforeAll(async () => {
    // prevents OPTIONS requests, for more info see:
    // https://github.com/node-nock/nock/issues/699#issuecomment-272708264
    // https://github.com/axios/axios/issues/305#issuecomment-272162405
    axios.defaults.adapter = httpAdapter;
    nock.back.fixtures = __dirname + '/__fixtures__';
  });

  afterEach(() => {
    nock.cleanAll();
  });

  const config: Config = {
    url: process.env.TEST_API_HOST,
    key: process.env.TEST_API_KEY,
    method: Req.Method.POST,
    timeout: 5000,
    jsonpCallback: 'findifyCallback',
    retryCount: 1,
    user: users.user1,
  };

  const client = new Client(config);

  describe('autocomplete', () => {
    it('respects request parameters', async () => {
      const parameters: Req.Autocomplete.Params[] = [
        { q: 'tesl', item_limit: 2, suggestion_limit: 3 },
        { q: 'smok', item_limit: 3, suggestion_limit: 5, user: users.user2 },
        { q: 'fir', item_limit: 2, suggestion_limit: 10 },
      ];
      const requests: Req.Autocomplete.Request[] = parameters.map(params => ({
        type: Req.Type.Autocomplete,
        params,
      }));
      expect.assertions(requests.length);
      for (let request of requests) {
        const fixture = `autocomplete/${request.params.q}.json`;
        await verifyRequest({ client, request, fixture });
      }
    });
  });

  it('throws an error on empty query', async () => {
    expect.assertions(2);
    const request: Req.Autocomplete.Request = {
      type: Req.Type.Autocomplete,
      params: { q: '', item_limit: 1, suggestion_limit: 1 },
    };
    const fixture = 'autocomplete/empty.json';
    const { nockDone, context } = (await nock.back(
      fixture,
      nockBackOptions as any
    )) as any;
    try {
      const response = await client.send(request);
    } catch (err) {
      const error: AxiosError = err;
      expect(error.response.status).toBe(400);
      expect(error.response.data).toMatchSnapshot();
    }
    context.assertScopesFinished();
    nockDone();
  });

  describe('search', async () => {
    it('respects request parameters', async () => {
      const parameters: Req.Search.Params[] = [
        { q: 'dra', offset: 2, limit: 5 },
        { q: 'bla', offset: 0, limit: 2 },
        { q: 'spa' },
        {
          q: 'gal',
          filters: [
            {
              type: 'category',
              name: 'category1',
              values: [{ value: 'Katt' }],
            },
          ],
          sort: [
            {
              field: 'price',
              order: SortingOrder.Desc,
            },
          ],
        },
      ];
      expect.assertions(parameters.length);
      const requests: Req.Search.Request[] = parameters.map(params => ({
        type: Req.Type.Search,
        params,
      }));
      for (let request of requests) {
        const fixture = `search/${request.params.q}.json`;
        await verifyRequest({ client, request, fixture });
      }
    });
  });

  describe('smart collection', () => {
    it('respects request parameters', async () => {
      const parameters: Req.SmartCollection.Params[] = [
        { slot: 'collections/sdk-test-1', limit: 2 },
        { slot: 'collections/sdk-test-1', offset: 2, limit: 2 },
        {
          slot: 'collections/sdk-test-1',
          limit: 2,
          sort: [
            {
              field: 'price',
              order: 'asc',
            },
          ],
        },
        {
          slot: 'collections/sdk-test-1',
          limit: 2,
          sort: [
            {
              field: 'price',
              order: 'desc',
            },
          ],
        },
        {
          slot: 'collections/sdk-test-1',
          filters: [
            {
              type: 'text',
              name: 'custom_fields.height',
              values: [
                {
                  value: '10 Inches',
                },
              ],
            },
          ],
        },
      ];
      const requests: Req.SmartCollection.Request[] = parameters.map(
        params => ({
          type: Req.Type.SmartCollection,
          params,
        })
      );
      expect.assertions(requests.length);
      let index = 0;
      for (let request of requests) {
        const fixture = `smart-collection/${request.params.slot}-${index}.json`;
        await verifyRequest({ client, request, fixture });
        index++;
      }
    });
  });

  describe('recommendations', () => {
    describe(Req.Recommendations.Type.Slot, () => {
      it.skip('respects request parameters', async () => {
        const parameters: Req.Recommendations.Slot[] = [
          {
            slot: 'recommendations/sdk-test-1',
            item_ids: ['xxx'],
          },
          {
            slot: 'recommendations/sdk-test-1',
            item_ids: ['321', '543'],
            offset: 4,
          },
          {
            slot: 'recommendations/sdk-test-2',
            item_ids: ['xxx', 'yyy', 'zzz'],
            offset: 12,
          },
        ];
        expect.assertions(parameters.length);
        const requests: Req.Recommendations.Request[] = parameters.map(
          params => ({ type: Req.Type.Recommendations, params })
        );
        let index = 0;
        for (let request of requests) {
          const params = request.params as Req.Recommendations.Slot;
          const fixture = `recommendations/${params.slot}-${index}.json`;
          await verifyRequest({ client, request, fixture });
          index++;
        }
      });
    });

    describe(Req.Recommendations.Type.Newest, () => {
      it('respects request parameters', async () => {
        const parameters: Req.Recommendations.Newest[] = [
          {},
          { limit: 2 },
          { limit: 3, offset: 8 },
        ];
        expect.assertions(parameters.length);
        const requests: Req.Recommendations.Request[] = parameters.map(
          params => ({
            type: Req.Type.Recommendations,
            params: { type: Req.Recommendations.Type.Newest, ...params },
          })
        );
        let index = 0;
        for (let request of requests) {
          const params = request.params as Req.Recommendations.Newest;
          const fixture = `recommendations/${params.type}-${index}.json`;
          await verifyRequest({ client, request, fixture });
          index++;
        }
      });
    });

    describe(Req.Recommendations.Type.Trending, () => {
      it('respects request parameters', async () => {
        const parameters: Req.Recommendations.Trending[] = [
          {},
          { limit: 2, offset: 2 },
          { limit: 2, offset: 3 },
        ];
        expect.assertions(parameters.length);
        const requests: Req.Recommendations.Request[] = parameters.map(
          params => ({
            type: Req.Type.Recommendations,
            params: { type: Req.Recommendations.Type.Trending, ...params },
          })
        );
        let index = 0;
        for (let request of requests) {
          const params = request.params as Req.Recommendations.Trending;
          const fixture = `recommendations/${params.type}-${index}.json`;
          await verifyRequest({ client, request, fixture });
          index++;
        }
      });
    });

    describe(Req.Recommendations.Type.RecentlyViewed, () => {
      it('respects request parameters', async () => {
        const parameters: Req.Recommendations.RecentlyViewed[] = [
          {},
          { limit: 1 },
          // TODO: doesn't work (?)
          // { limit: 1, offset: 1 },
        ];
        expect.assertions(parameters.length);
        const requests: Req.Recommendations.Request[] = parameters.map(
          params => ({
            type: Req.Type.Recommendations,
            params: {
              type: Req.Recommendations.Type.RecentlyViewed,
              ...params,
            },
          })
        );
        let index = 0;
        for (let request of requests) {
          const params = request.params as Req.Recommendations.RecentlyViewed;
          const fixture = `recommendations/${params.type}-${index}.json`;
          await verifyRequest({ client, request, fixture });
          index++;
        }
      });
    });

    describe(Req.Recommendations.Type.AlsoViewed, () => {
      it.skip('respects request parameters', async () => {});
    });

    describe(Req.Recommendations.Type.AlsoBought, () => {
      it.skip('respects request parameters', async () => {});
    });

    describe(Req.Recommendations.Type.FrequentlyPurchasedTogether, () => {
      it.skip('respects request parameters', async () => {});
    });

    describe(Req.Recommendations.Type.Featured, () => {
      it.skip('respects request parameters', async () => {});
    });
  });

  describe('feedback', () => {});
});
