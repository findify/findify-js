import 'dotenv/config';
import debug from 'debug';
import talkback = require('talkback');
import axios from 'axios';
import httpAdapter = require('axios/lib/adapters/http');

import { Client, Config } from '..';
import { User } from '../../common';
import * as Req from '../../request';
import * as Res from '../../response';

const recordTape = process.env.TEST_RECORD_TAPE === 'true';

debug('sdk:tests:client')('TEST_API_HOST: ', process.env.TEST_API_HOST);
debug('sdk:tests:client')('TEST_API_KEY: ', process.env.TEST_API_KEY);
debug('sdk:tests:client')('TEST_RECORD_TAPE: ', recordTape);

const proxy = talkback({
  path: __dirname + '/__tapes__',
  host: process.env.TEST_API_HOST,
  record: recordTape,
});

const user: User = {
  lang: ['en-GB'],
  uid: 'test1',
  sid: 'ssid',
  email: 'test@test.com',
  ip: '192.168.0.1',
  ua:
    'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
};

describe('Client', () => {
  beforeAll(async () => {
    axios.defaults.adapter = httpAdapter;
    await proxy.start();
  });
  afterAll(() => proxy.close());

  const config: Config = {
    url: 'http://localhost:8080',
    timeout: 5000,
    jsonpCallback: 'findifyCallback',
    retryCount: 1,
    key: process.env.TEST_API_KEY,
    method: Req.Method.POST,
  };
  const client = new Client(config);

  describe('autocomplete', () => {
    test('blahbha', async () => {
      const request: Req.Autocomplete.Request = {
        type: Req.Type.Autocomplete,
        params: {
          user,
          q: 'test',
          item_limit: 5,
          suggestion_limit: 5,
        },
      };
      const response = await client.send(request);
    });
  });

  describe('search', () => {});

  describe('smart collection', () => {});

  describe('recommendations', () => {});

  describe('feedback', () => {});
});
