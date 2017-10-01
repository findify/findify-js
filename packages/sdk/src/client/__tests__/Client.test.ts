import 'dotenv/config';
import debug from 'debug';
import axios from 'axios';
import * as nock from 'nock';
import { Scope as NockScope, NockBackOptions } from 'nock';
import httpAdapter = require('axios/lib/adapters/http');

import { Client, Body, Config } from '..';
import { User } from '../../common';
import * as Req from '../../request';
import * as Res from '../../response';

debug('sdk:tests:client')('TEST_API_HOST: ', process.env.TEST_API_HOST);
debug('sdk:tests:client')('TEST_API_KEY: ', process.env.TEST_API_KEY);
debug('sdk:tests:client')('NOCK_BACK_MODE: ', process.env.NOCK_BACK_MODE);

const user: User = {
  lang: ['en-GB'],
  uid: 'test1',
  sid: 'ssid',
  email: 'test@test.com',
  ip: '192.168.0.1',
  ua:
    'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
};

/**
 * Set random and time-dependent data to be the same as in recorded body.
 */
function sanitizeRequestBody(body: string, recordedBody: Body): string {
  const currentBody = JSON.parse(body);
  currentBody.t_client = recordedBody.t_client;
  return JSON.stringify(currentBody);
}

function nockBackBeforeHook(scope: NockScope) {
  scope.filteringRequestBody = sanitizeRequestBody as any;
}

const nockBackOpts: NockBackOptions = {
  before: nockBackBeforeHook as any,
};

describe('Client', () => {
  beforeAll(async () => {
    // prevents OPTIONS requests, for more info see:
    // https://github.com/node-nock/nock/issues/699#issuecomment-272708264
    // https://github.com/axios/axios/issues/305#issuecomment-272162405
    axios.defaults.adapter = httpAdapter;
    nock.back.fixtures = __dirname + '/__fixtures__';
  });

  const config: Config = {
    url: process.env.TEST_API_HOST,
    key: process.env.TEST_API_KEY,
    method: Req.Method.POST,
    timeout: 5000,
    jsonpCallback: 'findifyCallback',
    retryCount: 1,
  };
  const client = new Client(config);

  describe('autocomplete', () => {
    test('respects request parameters', () => {
      const request: Req.Autocomplete.Request = {
        type: Req.Type.Autocomplete,
        params: {
          user,
          q: 'test',
          item_limit: 5,
          suggestion_limit: 5,
        },
      };

      nock.back('autocomplete.json', nockBackOpts, async function(nockDone) {
        const response = await client.send(request);
        nockDone();

        console.log('response: ', response);
        this.assertScopesFinished();
      });
    });
  });

  describe('search', () => {});

  describe('smart collection', () => {});

  describe('recommendations', () => {});

  describe('feedback', () => {});
});
