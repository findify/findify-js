import * as fauxJax from 'faux-jax';
import * as expect from 'expect';
import * as assign from 'lodash/assign';
import * as omit from 'lodash/omit';

import * as FindifySDK from '../src/index';

const initSdk = () =>
  FindifySDK.init({
    key: 'testApiKey',
    user: {
      uid: 'testUserId',
      sid: 'testSessionId',
    },
  });

describe('FindifySDK', () => {
  beforeEach(() => {
    fauxJax.install();
  });

  afterEach(() => {
    fauxJax.restore();
  });

  describe('generic', () => {
    it('should be instantiated', () => {
      const sdk = initSdk();
    });

    // it('should throw validation error if "key" param is not string', () => {
    //   expect(() => FindifySDK.init({ key: 1 })).toThrow(/"key" param should be a string/);
    // });
  });

  describe('search', () => {
    it('should add passed request params to request body', done => {
      const request = {
        q: 'test',
        filters: [
          {
            name: 'testFilter',
            type: 'testType',
          },
        ],
        sort: [
          {
            field: 'testField',
            order: 'asc',
          },
        ],
        offset: 10,
        limit: 15,
      };

      fauxJax.on('request', req => {
        const requestBody = JSON.parse(req.requestBody);

        expect(requestBody).toContain(request);

        done();
      });

      const sdk = initSdk();

      sdk.search(request);
    });

    it('should send request to /search endpoint', done => {
      fauxJax.on('request', req => {
        expect(req.requestURL.indexOf('/search') > -1).toBe(true);
        done();
      });

      const sdk = initSdk();

      sdk.search({
        q: 'test',
      });
    });
  });

  describe('collection', () => {
    it('should add passed request params to request body', done => {
      const request = {
        filters: [
          {
            name: 'testFilter',
            type: 'testType',
          },
        ],
        sort: [
          {
            field: 'testField',
            order: 'asc',
          },
        ],
        offset: 10,
        limit: 15,
      };

      fauxJax.on('request', req => {
        const requestBody = JSON.parse(req.requestBody);

        expect(requestBody).toContain(request);

        done();
      });

      const sdk = initSdk();

      sdk.collection(
        assign({}, request, {
          slot: 'test',
        }),
      );
    });

    it('should send request to /smart-collection endpoint', done => {
      fauxJax.on('request', req => {
        expect(req.requestURL.indexOf('/smart-collection') > -1).toBe(true);
        done();
      });

      const sdk = initSdk();

      sdk.collection({
        slot: 'test',
      });
    });

    it('should send collection "slot" param in url', done => {
      fauxJax.on('request', req => {
        expect(req.requestURL.indexOf('/smart-collection/test_slot') > -1).toBe(
          true,
        );
        done();
      });

      const sdk = initSdk();

      sdk.collection({
        slot: 'test_slot',
      });
    });
  });

  describe('autocomplete', () => {
    it('should add passed request params to request body', done => {
      const request = {
        q: 'test',
        suggestion_limit: 10,
        item_limit: 15,
      };

      fauxJax.on('request', req => {
        const requestBody = JSON.parse(req.requestBody);

        expect(requestBody).toContain(request);

        done();
      });

      const sdk = initSdk();

      sdk.autocomplete(request);
    });

    it('should send request to /autocomplete endpoint', done => {
      fauxJax.on('request', req => {
        expect(req.requestURL.indexOf('/autocomplete') > -1).toBe(true);
        done();
      });

      const sdk = initSdk();

      sdk.autocomplete({
        q: 'test',
      });
    });
  });

  describe('feedback', () => {
    it('should send request to /feedback endpoint', done => {
      fauxJax.on('request', req => {
        expect(req.requestURL.indexOf('/feedback') > -1).toBe(true);
        done();
      });

      const sdk = initSdk();

      sdk.feedback('click-suggestion', {
        rid: 'testRequestId',
        suggestion: 'testSuggestion',
      });
    });

    it('should send "click-suggestion" event', done => {
      const sdk = initSdk();
      const properties = {
        rid: 'testRid',
        suggestion: 'testSuggestion',
      };

      fauxJax.on('request', req => {
        const requestBody = JSON.parse(req.requestBody);

        expect(requestBody).toContain({
          event: 'click-suggestion',
          properties,
        });

        done();
      });

      sdk.feedback('click-suggestion', properties);
    });

    it('should send "click-item" event', done => {
      const sdk = initSdk();
      const properties = {
        rid: 'testRid',
        item_id: 'testItemId',
      };

      fauxJax.on('request', req => {
        const requestBody = JSON.parse(req.requestBody);

        expect(requestBody).toContain({
          event: 'click-item',
          properties,
        });

        done();
      });

      sdk.feedback('click-item', properties);
    });

    it('should send "redirect" event', done => {
      const sdk = initSdk();
      const properties = {
        rid: 'testRid',
        suggestion: 'testSuggestion',
      };

      fauxJax.on('request', req => {
        const requestBody = JSON.parse(req.requestBody);

        expect(requestBody).toContain({
          event: 'redirect',
          properties,
        });

        done();
      });

      sdk.feedback('redirect', properties);
    });

    it('should send "purchase" event', done => {
      const sdk = initSdk();
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
        const requestBody = JSON.parse(req.requestBody);

        expect(requestBody).toContain({
          event: 'purchase',
          properties,
        });

        done();
      });

      sdk.feedback('purchase', properties);
    });

    it('should send "add-to-cart" event', done => {
      const sdk = initSdk();
      const properties = {
        item_id: 'testItemId',
        rid: 'testRid',
        quantity: 1,
      };

      fauxJax.on('request', req => {
        const requestBody = JSON.parse(req.requestBody);

        expect(requestBody).toContain({
          event: 'add-to-cart',
          properties,
        });

        done();
      });

      sdk.feedback('add-to-cart', properties);
    });

    it('should send "update-cart" event', done => {
      const sdk = initSdk();
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
        const requestBody = JSON.parse(req.requestBody);

        expect(requestBody).toContain({
          event: 'update-cart',
          properties,
        });

        done();
      });

      sdk.feedback('update-cart', properties);
    });

    it('should send "view-page" event', done => {
      const sdk = initSdk();
      const properties = {
        url: 'http://jsdom-url.com/',
        ref: 'http://jsdom-referrer-url.com',
        width: 1200,
        height: 800,
        item_id: 'testItemId',
      };

      fauxJax.on('request', req => {
        const requestBody = JSON.parse(req.requestBody);

        expect(requestBody).toContain({
          event: 'view-page',
          properties,
        });

        done();
      });

      sdk.feedback('view-page', properties);
    });
  });

  describe('recommendations', () => {
    describe('predefined', () => {
      it('should send request to "/recommend/{slot}" endpoint', done => {
        fauxJax.on('request', req => {
          expect(req.requestURL.indexOf('/recommend/test') > -1).toBe(true);
          done();
        });

        const sdk = initSdk();

        sdk.recommendations('predefined', {
          slot: 'test',
        });
      });

      it('should send provided request data as request body', done => {
        const slot = 'test';
        const itemId = 1;
        const request = {
          slot,
          item_id: itemId,
        };

        fauxJax.on('request', req => {
          expect(JSON.parse(req.requestBody))
            .toContain({
              item_id: itemId,
            })
            .toNotContain({ slot });
          done();
        });

        const sdk = initSdk();

        sdk.recommendations('predefined', request);
      });
    });

    describe('newest', () => {
      it('should send request to "/recommend/items/newest" endpoint', done => {
        fauxJax.on('request', req => {
          expect(req.requestURL.indexOf('/recommend/items/newest') > -1).toBe(
            true,
          );
          done();
        });

        const sdk = initSdk();

        sdk.recommendations('newest');
      });

      it('should send provided request data as request body', done => {
        const request = {
          offest: 5,
          limit: 10,
        };

        fauxJax.on('request', req => {
          expect(JSON.parse(req.requestBody)).toContain(request);
          done();
        });

        const sdk = initSdk();

        sdk.recommendations('newest', request);
      });
    });

    describe('trending', () => {
      it('should send request to "/recommend/items/trending" endpoint', done => {
        fauxJax.on('request', req => {
          expect(req.requestURL.indexOf('/recommend/items/trending') > -1).toBe(
            true,
          );
          done();
        });

        const sdk = initSdk();

        sdk.recommendations('trending');
      });

      it('should send provided request data as request body', done => {
        const request = {
          offest: 5,
          limit: 10,
        };

        fauxJax.on('request', req => {
          expect(JSON.parse(req.requestBody)).toContain(request);
          done();
        });

        const sdk = initSdk();

        sdk.recommendations('trending', request);
      });
    });

    describe('featured', () => {
      it('should send request to "/recommend/items/featured" endpoint', done => {
        fauxJax.on('request', req => {
          expect(req.requestURL.indexOf('/recommend/items/featured') > -1).toBe(
            true,
          );
          done();
        });

        const sdk = initSdk();

        sdk.recommendations('featured');
      });
    });

    describe('latest', () => {
      it('should send request to "/recommend/items/viewed/latest" endpoint', done => {
        fauxJax.on('request', req => {
          expect(
            req.requestURL.indexOf('/recommend/items/viewed/latest') > -1,
          ).toBe(true);
          done();
        });

        const sdk = initSdk();

        sdk.recommendations('latest');
      });

      it('should send provided request data as request body', done => {
        const request = {
          offest: 5,
          limit: 10,
        };

        fauxJax.on('request', req => {
          expect(JSON.parse(req.requestBody)).toContain(request);
          done();
        });

        const sdk = initSdk();

        sdk.recommendations('latest', request);
      });
    });

    describe('viewed', () => {
      it('should send request to "/recommend/items/{item_id}/viewed/viewed" endpoint', done => {
        fauxJax.on('request', req => {
          expect(
            req.requestURL.indexOf('/recommend/items/1/viewed/viewed') > -1,
          ).toBe(true);
          done();
        });

        const sdk = initSdk();

        sdk.recommendations('viewed', {
          item_id: 1,
        });
      });

      it('should send provided request data as request body', done => {
        const itemId = 1;
        const request = {
          item_id: itemId,
          offest: 5,
          limit: 10,
        };

        fauxJax.on('request', req => {
          expect(JSON.parse(req.requestBody))
            .toContain(omit(request, ['item_id']))
            .toNotContain({
              item_id: itemId,
            });
          done();
        });

        const sdk = initSdk();

        sdk.recommendations('viewed', request);
      });
    });

    describe('bought', () => {
      it('should send request to "/recommend/items/{item_id}/viewed/bought" endpoint', done => {
        fauxJax.on('request', req => {
          expect(
            req.requestURL.indexOf('/recommend/items/1/viewed/bought') > -1,
          ).toBe(true);
          done();
        });

        const sdk = initSdk();

        sdk.recommendations('bought', {
          item_id: 1,
        });
      });

      it('should send provided request data as request body', done => {
        const itemId = 1;
        const request = {
          item_id: itemId,
          offest: 5,
          limit: 10,
        };

        fauxJax.on('request', req => {
          expect(JSON.parse(req.requestBody))
            .toContain(omit(request, ['item_id']))
            .toNotContain({
              item_id: itemId,
            });
          done();
        });

        const sdk = initSdk();

        sdk.recommendations('bought', request);
      });
    });

    describe('frequentlyPurchased', () => {
      it('should send request to "/recommend/items/{item_ids}/bought/bought" endpoint', done => {
        fauxJax.on('request', req => {
          expect(
            req.requestURL.indexOf('/recommend/items/1,2,3,4/bought/bought') >
              -1,
          ).toBe(true);
          done();
        });

        const sdk = initSdk();

        sdk.recommendations('frequentlyPurchased', {
          item_ids: [1, 2, 3, 4],
        });
      });

      it('should send provided request data as request body', done => {
        const itemIds = [1, 2];
        const request = {
          item_ids: itemIds,
          offest: 5,
          limit: 10,
        };

        fauxJax.on('request', req => {
          expect(JSON.parse(req.requestBody))
            .toContain(omit(request, ['item_ids']))
            .toNotContain({
              item_ids: itemIds,
            });
          done();
        });

        const sdk = initSdk();

        sdk.recommendations('frequentlyPurchased', request);
      });
    });
  });
});
