import * as expect from 'expect';
import * as fauxJax from 'faux-jax';
import * as rewire from 'rewire';
import * as qs from 'qs';
import * as url from 'url';
import { setupJsDom, teardownJsDom } from './jsdom-helper';
const r = rewire('../src/index');
r.__set__('env', require('../src/env/staging'));
const init = r;

import * as store from 'store';

describe('init', () => {
  const runInit = () => init({ key: 'testKey' });

  beforeEach(done => {
    fauxJax.install();
    store.clearAll();
    setupJsDom(done);
  });
  afterEach(() => {
    fauxJax.restore();
    teardownJsDom();
  });

  describe('getUser', () => {
    it('should return "undefined" ether user id or session id is "undefined"', () => {
      const analytics = runInit();

      store.clearAll();
      const user = analytics.user;
      expect(user.exist).toBe(true);
      expect(user.persist).toBe(false);
    });

    it('should return user object from storage', () => {
      const analytics = runInit();
      const user = analytics.user;

      expect(user.uid).toExist();
      expect(user.sid).toExist();
    });
  });

  describe('sendEvent', () => {
    const getQueryParams = (link: string) => qs.parse(url.parse(link).query);
    const key = 'testKey';
    it('should send "click-suggestion" event', done => {
      const analytics = runInit();
      const properties = {
        rid: 'testRid',
        suggestion: 'testSuggestion',
      };

      fauxJax.on('request', req => {
        const params = getQueryParams(req.requestURL);

        expect(params.t_client).toExist();
        expect(params).toContain({
          event: 'click-suggestion',
          properties,
          key,
        });

        done();
      });

      analytics.sendEvent('click-suggestion', properties);
    });

    it('should send "click-item" event', done => {
      const analytics = runInit();
      const properties = {
        rid: 'testRid',
        item_id: 'testItemId',
      };

      fauxJax.on('request', req => {
        const params = getQueryParams(req.requestURL);

        expect(params.t_client).toExist();
        expect(params).toContain({
          event: 'click-item',
          properties,
          key,
        });

        done();
      });

      analytics.sendEvent('click-item', properties);
    });

    it('should send "redirect" event', done => {
      const analytics = runInit();
      const properties = {
        rid: 'testRid',
        suggestion: 'testSuggestion',
      };

      fauxJax.on('request', req => {
        const params = getQueryParams(req.requestURL);

        expect(params.t_client).toExist();
        expect(params).toContain({
          event: 'redirect',
          properties,
          key,
        });

        done();
      });

      analytics.sendEvent('redirect', properties);
    });

    it('should send "purchase" event', done => {
      const analytics = runInit();
      const properties = {
        order_id: 'testOrderId',
        currency: 'testCurrency',
        revenue: 100,
        affiliation: 'testAffiliation',
        line_items: [
          {
            item_id: 'testItemId',
            unit_price: 100,
            quantity: 1,
          },
          {
            item_id: 'testItemId2',
            unit_price: 100,
            quantity: 1,
          },
        ],
      };

      fauxJax.on('request', req => {
        const params = getQueryParams(req.requestURL);

        expect(params.t_client).toExist();
        expect(params).toContain({
          event: 'purchase',
          properties: {
            order_id: 'testOrderId',
            currency: 'testCurrency',
            revenue: '100',
            affiliation: 'testAffiliation',
            line_items: [
              {
                item_id: 'testItemId',
                unit_price: '100',
                quantity: '1',
              },
              {
                item_id: 'testItemId2',
                unit_price: '100',
                quantity: '1',
              },
            ],
          },
          key,
        });

        done();
      });

      analytics.sendEvent('purchase', properties);
    });

    it('should send "add-to-cart" event', done => {
      const analytics = runInit();
      const properties = {
        item_id: 'testItemId',
        rid: 'testRid',
        quantity: 1,
      };

      fauxJax.on('request', req => {
        const params = getQueryParams(req.requestURL);

        expect(params.t_client).toExist();
        expect(params).toContain({
          event: 'add-to-cart',
          properties: {
            item_id: 'testItemId',
            rid: 'testRid',
            quantity: '1',
          },
          key,
        });

        done();
      });

      analytics.sendEvent('add-to-cart', properties);
    });

    it('should send "update-cart" event', done => {
      const analytics = runInit();
      const properties = {
        line_items: [
          {
            item_id: 'testItemId',
            unit_price: 100,
            quantity: 1,
          },
          {
            item_id: 'testItemId2',
            unit_price: 100,
            quantity: 1,
          },
        ],
      };

      fauxJax.on('request', req => {
        const params = getQueryParams(req.requestURL);

        expect(params.t_client).toExist();
        expect(params).toContain({
          event: 'update-cart',
          properties: {
            line_items: [
              {
                item_id: 'testItemId',
                unit_price: '100',
                quantity: '1',
              },
              {
                item_id: 'testItemId2',
                unit_price: '100',
                quantity: '1',
              },
            ],
          },
          key,
        });

        done();
      });

      analytics.sendEvent('update-cart', properties);
    });

    it('should send "view-page" event', done => {
      const analytics = runInit();
      const itemId = 'testItemId';

      fauxJax.on('request', req => {
        const params = getQueryParams(req.requestURL);

        expect(params.key).toBe(key);
        expect(params.event).toBe('view-page');
        expect(params.t_client).toExist();
        expect(params.properties).toContain({
          url: 'http://jsdom-url.com/',
          ref: 'http://jsdom-referrer-url.com',
          width: '0',
          height: '0',
          item_id: itemId,
        });

        done();
      });

      analytics.sendEvent('view-page', {
        item_id: itemId,
      });
    });

    it('should not throw an Error if "item_id" is not provided', () => {
      const analytics = runInit();

      expect(() => analytics.sendEvent('view-page')).toNotThrow();
      expect(() => analytics.sendEvent('view-page', {})).toNotThrow();
    });
  });
});
