import * as fauxJax from 'faux-jax';
import * as expect from 'expect';
import * as qs from 'qs';
import * as url from 'url';
import * as rewire from 'rewire';
import { toPlainObject } from 'lodash';
import { setupJsDom, teardownJsDom } from '../jsdom-helper';

const r = rewire('../../src/modules/requestApi');

const requestApi = r.__get__('requestApi');
const makeSettings = r.__get__('makeSettings');
const extendRequest = r.__get__('extendRequest');

describe('requestApi', () => {
  const path = '/test-path';
  const key = 'testApiKey';
  const user = {
    uid: 'testUserId',
    sid: 'testSessionId',
  };

  beforeEach(() => {
    fauxJax.install();
  });

  afterEach(() => {
    fauxJax.restore();
  });

  describe('generic', () => {
    describe('jsonp method in browser', () => {
      const requestData = { value: 'testValue' };
      const method = 'jsonp';
      const makeRequestApi = () =>
        requestApi(path, requestData, { key, user, method });
      const getQueryParams = (link: string) => qs.parse(url.parse(link).query);

      beforeEach(done => {
        setupJsDom(() => done());
      });

      afterEach(() => {
        teardownJsDom();
      });

      it('should use jsonp method in browser by default', done => {
        fauxJax.on('request', req => {
          expect(req.requestMethod).toBe('GET');
          done();
        });

        requestApi(path, requestData, { key, user });
      });

      it('should use jsonp when { method: "jsonp" } is provided', done => {
        fauxJax.on('request', req => {
          expect(req.requestMethod).toBe('GET');
          done();
        });

        makeRequestApi();
      });

      it('should send `x-key` param in request params', done => {
        fauxJax.on('request', req => {
          const queryParams = getQueryParams(req.requestURL);

          expect(queryParams.key).toBe(key);

          done();
        });

        makeRequestApi();
      });

      it('should send `requestData` variable as request params', done => {
        fauxJax.on('request', req => {
          const queryParams = getQueryParams(req.requestURL);

          expect(queryParams.value).toBe(requestData.value);

          done();
        });

        makeRequestApi();
      });

      it('should resolve server response body object', done => {
        const responseBody = {
          value: 'test response body value',
          value2: 'test response body value2',
          value3: 'test response body value3',
        };

        fauxJax.on('request', req => {
          const { callback } = getQueryParams(req.requestURL);

          req.respond(
            200,
            {},
            `typeof ${callback} === 'function' && ${callback}(${JSON.stringify(
              responseBody,
            )})`,
          );
        });

        makeRequestApi()
          .then(response => {
            expect(response).toEqual(responseBody);
            done();
          })
          .catch(done);
      });

      it('should resolve "undefined" if server response is not an object', done => {
        fauxJax.on('request', req => {
          const { callback } = getQueryParams(req.requestURL);

          req.respond(
            200,
            {},
            `typeof ${callback} === 'function' && ${callback}('test')`,
          );
        });

        makeRequestApi()
          .then(response => {
            expect(response).toBe(undefined);
            done();
          })
          .catch(done);
      });
    });

    describe('post method in browser', () => {
      beforeEach(done => {
        setupJsDom(() => done());
      });

      afterEach(() => {
        teardownJsDom();
      });

      it('should use POST for requests bigger than 4096 bytes when { method: "jsonp" } is provided', done => {
        const requestData = { value: new Array(4097).join('.') };
        const method = 'jsonp';

        fauxJax.on('request', req => {
          expect(req.requestMethod).toBe('POST');

          done();
        });

        requestApi(path, requestData, { key, method, user });
      });

      it('should use POST when { method: "post" } option is provided', done => {
        const requestData = { value: 'testValue' };
        const method = 'post';

        fauxJax.on('request', req => {
          expect(req.requestMethod).toBe('POST');

          done();
        });

        requestApi(path, requestData, { key, method, user });
      });
    });

    describe('post method in node', () => {
      const requestData = { value: 'testValue' };
      const method = 'post';
      const makeRequestApi = () =>
        requestApi(path, requestData, { key, method, user });

      it('should use POST in node environment by default', done => {
        fauxJax.on('request', req => {
          expect(req.requestMethod).toBe('POST');
          done();
        });

        requestApi(path, {}, { key, user });
      });

      it('should use POST in node environment when { method: "post" } is provided', done => {
        fauxJax.on('request', req => {
          expect(req.requestMethod).toBe('POST');
          done();
        });

        requestApi(path, {}, { key, method, user });
      });

      it('should send `x-key` param in request headers', done => {
        fauxJax.on('request', req => {
          expect(req.requestHeaders['x-key']).toBe(key);
          done();
        });

        makeRequestApi();
      });

      it('should send `requestData` variable as request body', done => {
        fauxJax.on('request', req => {
          expect(JSON.parse(req.requestBody)).toInclude(requestData);
          done();
        });

        makeRequestApi();
      });

      it('should set `content-type: application/json` in request headers', done => {
        fauxJax.on('request', req => {
          expect(req.requestHeaders['content-type']).toBe('application/json');
          done();
        });

        makeRequestApi();
      });

      it('should resolve server response body', done => {
        const responseBody = {
          value: 'test response body value',
        };

        fauxJax.on('request', req => {
          req.respond(
            200,
            {
              'Content-Type': 'application/json',
            },
            JSON.stringify(responseBody),
          );
        });

        makeRequestApi()
          .then(response => {
            expect(response).toEqual(responseBody);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('makeSettings', () => {
    it('should throw an Error when { method: "jsonp" } option is provided in "config"', () => {
      const requestData = { value: 'testValue' };
      const method = 'jsonp';

      expect(() =>
        makeSettings({
          key,
          method,
          user,
        }),
      ).toThrow(/jsonp method is not allowed in node environment/);
    });

    it('should add "host" as "https://search-staging.findify.io/v3"', () => {
      const restoreEnv = r.__set__('env', require('../../src/env/staging'));

      expect(makeSettings({ key })).toContain({
        host: 'https://search-staging.findify.io/v3',
      });

      restoreEnv();
    });

    it('should add "jsonpCallbackPrefix" as "findifyCallback"', () => {
      expect(makeSettings({ key })).toContain({
        jsonpCallbackPrefix: 'findifyCallback',
      });
    });

    it('should add "method" as provided "method" value', () => {
      expect(makeSettings({ key, method: 'post' })).toContain({
        method: 'post',
      });
    });

    it('should add "method" as "jsonp" by default if nothing was provided in browser', done => {
      setupJsDom(() => {
        expect(makeSettings({ key })).toContain({
          method: 'jsonp',
        });
        teardownJsDom();
        done();
      });
    });

    it('should add "method" as "post" by default if nothing was provided in node', () => {
      expect(makeSettings({ key })).toContain({
        method: 'post',
      });
    });

    it('should add "key" as provided "key" value', () => {
      expect(makeSettings({ key })).toContain({ key });
    });
  });

  describe('extendRequest', () => {
    const q = 'test';

    it('should add props from "request" to result', () => {
      const requestData = {
        someProp: 'test2',
        otherProp: 'test3',
        q,
      };

      const extendedRequest = extendRequest(requestData, {
        user,
        key,
      });

      expect(extendedRequest).toInclude(requestData);
    });

    it('should add "log" from "configData" to result', () => {
      expect(
        extendRequest(
          {
            q,
            user,
          },
          {
            key,
            log: true,
          },
        ),
      ).toInclude({
        log: true,
      });
    });

    it('should add "user" from "configData" to result', () => {
      expect(extendRequest({ q }, { key, user })).toInclude({ user });
    });

    it('should add "user" from "request" to result', () => {
      expect(extendRequest({ q, user }, { key })).toInclude({ user });
    });

    it('should overwrite "user" from "configData" if another is provided at "request"', () => {
      const user2 = {
        uid: 'testUserId2',
        sid: 'testSessionId2',
      };

      expect(extendRequest({ q, user }, { key, user: user2 }))
        .toInclude({ user })
        .toExclude({ user: user2 });
    });

    it('should add "t_client" prop to result with current timestamp', () => {
      const extendedRequest = extendRequest({ q, user }, { key });
      expect(extendedRequest.t_client).toBeA('number');
    });

    it('should throw an Error if "user" prop is not provided neither at "configData" nor at "request"', () => {
      expect(() =>
        extendRequest(
          {
            q,
          },
          { key },
        ),
      ).toThrow(
        /`user` param should be provided either at request or at library config/,
      );
    });

    it('should throw an Error if "user.uid" prop is not provided at "request"', () => {
      expect(() =>
        extendRequest(
          {
            q,
            user: {
              sid: 'testSessionId',
            } as any,
          },
          { key },
        ),
      ).toThrow(/"user.uid" param is required/);
    });

    it('should throw an Error if "user.sid" prop is not provided at "request"', () => {
      expect(() =>
        extendRequest(
          {
            q,
            user: {
              uid: 'testUserId',
            } as any,
          },
          { key },
        ),
      ).toThrow(/"user.sid" param is required/);
    });

    it('should throw an Error if "user.uid" prop is not provided at "configData"', () => {
      expect(() =>
        extendRequest(
          { q },
          {
            user: {
              sid: 'testSessionId',
            } as any,
            key,
          },
        ),
      ).toThrow(/"user.uid" param is required/);
    });

    it('should throw an Error if "user.sid" prop is not provided at "configData"', () => {
      expect(() =>
        extendRequest(
          { q },
          {
            user: {
              uid: 'testUserId',
            } as any,
            key,
          },
        ),
      ).toThrow(/"user.sid" param is required/);
    });
  });
});
