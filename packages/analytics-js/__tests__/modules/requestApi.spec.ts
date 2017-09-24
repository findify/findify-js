import * as fauxJax from 'faux-jax';
import * as expect from 'expect';
import * as rewire from 'rewire';
import * as qs from 'qs';
import * as url from 'url';
import { setupJsDom, teardownJsDom } from '../jsdom-helper';
const r = rewire('../../src/modules/request');

const request = r.__get__('request');

describe('request', () => {
  const getQueryParams = (link: string) => qs.parse(url.parse(link).query);
  const makeGenericRequest = () =>
    request({
      event: 'click-item',
      properties: {
        item_id: 'itemId',
      },
      key: 'testKey',
      user: {
        uid: 'testUserId',
        sid: 'testSessionId',
      },
    });

  beforeEach(done => {
    fauxJax.install();
    setupJsDom(done);
  });

  afterEach(() => {
    fauxJax.restore();
    teardownJsDom();
  });

  it('should send proper request', done => {
    const restoreEnv = r.__set__('env', require('../../src/env/staging'));

    fauxJax.on('request', req => {
      expect(req.requestURL).toMatch(/t_client=[0-9]*/);
      expect(req.requestURL.replace(/&t_client=[0-9]*/, '')).toEqual(
        'https://search-staging.findify.io' +
          '/v3/feedback?' +
          'event=click-item&properties' +
          '%5Bitem_id%5D=itemId&key=testKey&user%5Buid%5D=testUserId&user%5Bsid%5D=testSessionId',
      );
      done();
    });

    makeGenericRequest();
    restoreEnv();
  });

  it('should send GET request to server', done => {
    fauxJax.on('request', req => {
      expect(req.requestMethod).toEqual('GET');
      done();
    });

    makeGenericRequest();
  });

  it('should send request to "https://search-staging.findify.io/v3" in staging mode', done => {
    const restoreEnv = r.__set__('env', require('../../src/env/staging'));

    fauxJax.on('request', req => {
      expect(req.requestURL).toMatch(/https:\/\/search-staging.findify.io/);
      expect(url.parse(req.requestURL).pathname).toBe('/v3/feedback');
      done();
    });

    makeGenericRequest();
    restoreEnv();
  });

  it('should send request to "https://api-v3.findify.io/v3" in production mode', done => {
    const restoreEnv = r.__set__('env', require('../../src/env/production'));

    fauxJax.on('request', req => {
      expect(req.requestURL).toMatch(/https:\/\/api-v3.findify.io/);
      expect(url.parse(req.requestURL).pathname).toBe('/v3/feedback');
      done();
    });

    makeGenericRequest();
    restoreEnv();
  });

  it('should send request to "/feedback" endpoint', done => {
    fauxJax.on('request', req => {
      expect(url.parse(req.requestURL).pathname.replace(/\/v3/, '')).toEqual(
        '/feedback',
      );
      done();
    });

    makeGenericRequest();
  });

  it('should add "t_client" param with timestamp', done => {
    fauxJax.on('request', req => {
      expect(url.parse(req.requestURL).query).toMatch(/t_client=[0-9]*/);
      done();
    });

    makeGenericRequest();
  });

  it('should convert data to query string', done => {
    const s =
      'event=click-item&' +
      'properties%5Bitem_id%5D=itemId&key=testKey&user%5Buid%5D=testUserId&user%5Bsid%5D=testSessionId';

    fauxJax.on('request', req => {
      const { query } = url.parse(req.requestURL);
      expect(query.replace(/&t_client=[0-9]*/, '')).toEqual(s);
      done();
    });

    makeGenericRequest();
  });
});
