import 'dotenv/config';
import debug from 'debug';
import axios, { AxiosError } from 'axios';
import * as nock from 'nock';
import { Scope as NockScope, NockBackOptions, NockDefinition } from 'nock';
import httpAdapter = require('axios/lib/adapters/http');

import { Client, Config } from '..';
import { User } from '../../common';
import * as Req from '../../request';
import * as Res from '../../response';

import { sanitizeRequestBody, sanitizeResponseBody } from './support';

debug('sdk:tests:client')('TEST_API_HOST: ', process.env.TEST_API_HOST);
debug('sdk:tests:client')('TEST_API_KEY: ', process.env.TEST_API_KEY);
debug('sdk:tests:client')('NOCK_BACK_MODE: ', process.env.NOCK_BACK_MODE);

const user1: User = {
  lang: ['en-GB'],
  uid: 'test1',
  sid: 'ssid1',
  email: 'test2@test.com',
  ip: '192.168.0.1',
  ua:
    'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
};

const user2: User = {
  lang: ['en-GB'],
  uid: 'test2',
  sid: 'ssid2',
  email: 'test2@test.com',
  ip: '192.168.0.2',
  ua:
    'Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36',
};

function nockBackBeforeHook(scope: NockScope) {
  scope.filteringRequestBody = sanitizeRequestBody as any;
}

const nockBackOpts: NockBackOptions = {
  before: nockBackBeforeHook as any,
  afterRecord: (defs: NockDefinition[]) =>
    defs.map((def: NockDefinition) => ({
      ...def,
      response: sanitizeResponseBody(def.response),
    })),
};

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
    user: user1,
  };

  const client = new Client(config);

  describe('autocomplete', () => {
    it('respects request parameters', async () => {
      const requests: Req.Autocomplete.Request[] = [
        {
          type: Req.Type.Autocomplete,
          params: {
            q: 'tesl',
            item_limit: 2,
            suggestion_limit: 3,
          },
        },
        {
          type: Req.Type.Autocomplete,
          params: {
            q: 'smok',
            item_limit: 3,
            suggestion_limit: 5,
            user: user2,
          },
        },
        {
          type: Req.Type.Autocomplete,
          params: {
            q: 'fir',
            item_limit: 2,
            suggestion_limit: 10,
          },
        },
      ];

      expect.assertions(requests.length);
      for (let req of requests) {
        const fixture = `autocomplete-${req.params.q}.json`;
        const { nockDone, context } = (await nock.back(
          fixture,
          nockBackOpts as any
        )) as any;
        const response = await client.send(req);
        context.assertScopesFinished();
        expect(sanitizeResponseBody(response)).toMatchSnapshot();
        nockDone();
        nock.cleanAll();
      }
    });
  });

  it('throws an error on empty query', async () => {
    expect.assertions(2);
    const request: Req.Autocomplete.Request = {
      type: Req.Type.Autocomplete,
      params: { q: '', item_limit: 1, suggestion_limit: 1 },
    };
    const fixture = 'autocomplete-empty.json';
    const { nockDone, context } = (await nock.back(
      fixture,
      nockBackOpts as any
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
      const request: Req.Search.Request = {
        type: Req.Type.Search,
        params: {
          q: 'dra',
          offset: 2,
          limit: 5,
        },
      };
      const { nockDone, context } = await nock.back(
        'search.json',
        nockBackOpts
      );
      const response = await client.send(request);
      context.assertScopesFinished();
      expect(sanitizeResponseBody(response)).toMatchSnapshot();
      nockDone();
    });
  });

  describe('smart collection', () => {});

  describe('recommendations', () => {});

  describe('feedback', () => {});
});
