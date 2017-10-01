import { SortingOrder } from '../../common';
import * as R from '../../request';
import * as V from '..';

describe('validation', () => {
  describe('validateConfig', () => {
    const validate = (cfg: any, browser: boolean = true) => () =>
      V.validateConfig(cfg, browser);

    it('throws an error if "key" is missing or invalid', () => {
      expect(validate({} as any)).toThrowErrorMatchingSnapshot();
      expect(validate({ key: 123 } as any)).toThrowErrorMatchingSnapshot();
      expect(validate({ key: true } as any)).toThrowErrorMatchingSnapshot();
      expect(validate({ key: '' })).toThrowErrorMatchingSnapshot();
      expect(validate({ key: '   ' })).toThrowErrorMatchingSnapshot();
    });

    it('throws an error if "method" is invalid', () => {
      expect(
        validate({ key: 'ab3213', method: 'unsupported' })
      ).toThrowErrorMatchingSnapshot();
    });

    it('throws an error if "log" is invalid', () => {
      [null, 321, 'string'].forEach(log =>
        expect(validate({ key: 'somekey', log })).toThrowErrorMatchingSnapshot()
      );
    });

    it('throws and error if trying to use jsonp when not in browser', () => {
      expect(
        validate({ key: 'key', method: R.Method.JSONP }, false)
      ).toThrowErrorMatchingSnapshot();
    });

    it('does not throw an error if config is correct', () => {
      expect(validate({ key: 'key1' })).not.toThrow();
      expect(validate({ key: 'key2', method: R.Method.JSONP })).not.toThrow();
      expect(validate({ key: 'good', method: R.Method.POST })).not.toThrow();
      expect(validate({ key: 'smth', log: false })).not.toThrow();
      expect(validate({ key: 'othr', log: true })).not.toThrow();
    });
  });

  describe('validateAutocomlete', () => {
    it('throws error if "q" is missing or invalid', () => {
      const allowedQueries = ['bar', 32, false, true];
      testValidatePresence(V.validateAutocomplete, 'q', allowedQueries);
    });
  });

  describe('validateSearch', () => {
    it('throws error if request parameters is invalid', () => {
      const allowedQueries = ['foo', 123, true, false];
      testValidatePresence(V.validateSearch, 'q', allowedQueries);
      testValidateList(V.validateSearch, { q: 'asics' });
    });
  });

  describe('validateSmartCollection', () => {
    it('throws error if request parameters is invalid', () => {
      const allowedSlots = ['bar', 456, false, true];
      testValidatePresence(V.validateSmartCollection, 'slot', allowedSlots);
      testValidateList(V.validateSmartCollection, { slot: 'slot-handle' });
    });
  });

  describe('validateRecommendations', () => {
    it('throws error if recommendations type is missing', () => {
      const invalidTypes = [{}, { type: null }, { type: '' }, { type: '  ' }];
      invalidTypes.forEach(req =>
        expect(() =>
          V.validateRecommendations(req as any)
        ).toThrowErrorMatchingSnapshot()
      );
    });

    it('throws error if recommendation type is invalid', () => {
      expect(() =>
        V.validateRecommendations({ type: 'unsupported' } as any)
      ).toThrowErrorMatchingSnapshot();
    });

    describe('slot', () => {
      it('throws error if "slot" is missing or invalid', () => {
        const allowedSlots = ['bar', 'baz-qux', 456];
        testValidatePresence(V.validateRecommendations, 'slot', allowedSlots, {
          type: R.Recommendations.Type.Slot,
        });
      });
    });

    describe('also viewed / bought', () => {
      it('throws error if "item_id" is missing or invalid', () => {
        const types = [
          R.Recommendations.Type.AlsoViewed,
          R.Recommendations.Type.AlsoBought,
        ];
        const allowedItemIds = ['foo', '812', 456];
        types.forEach(type =>
          testValidatePresence(
            V.validateRecommendations,
            'item_id',
            allowedItemIds,
            { type }
          )
        );
      });
    });

    describe('frequently purchased together', () => {
      it('throws error if "item_ids" is missing or empty', () => {
        const type = R.Recommendations.Type.FrequentlyPurchasedTogether;
        const allowedItemIds = [['bar'], [123, 'baz-qux'], [456, 111]];
        testValidatePresence(
          V.validateRecommendations,
          'item_ids',
          allowedItemIds,
          { type }
        );
      });
    });
  });

  describe('validateFeedback', () => {
    describe('click suggestion, redirect', () => {
      it('throws error if required params is missing or invalid', () => {
        const allowed = ['bar', 32];
        const events = [
          R.Feedback.Event.ClickSuggestion,
          R.Feedback.Event.Redirect,
        ];
        events.forEach(event => {
          testValidatePresence(V.validateFeedback, 'rid', allowed, {
            event,
            suggestion: 'ok',
          });
          testValidatePresence(V.validateFeedback, 'suggestion', allowed, {
            event,
            rid: 'ok',
          });
        });
      });
    });

    describe('click item, add to cart', () => {
      it('throws error if required params is missing or invalid', () => {
        const allowed = ['bar', 32];
        const events = [R.Feedback.Event.ClickItem, R.Feedback.Event.AddToCart];
        events.forEach(event => {
          testValidatePresence(V.validateFeedback, 'item_id', allowed, {
            event,
          });
        });
      });
    });

    describe('purchase', () => {
      const event = R.Feedback.Event.Purchase;
      const allowed = ['bar', 32];
      const line_items = [];
      const requests = [
        {
          key: 'revenue',
          data: { order_id: 123, currency: 'usd', line_items },
        },
        {
          key: 'currency',
          data: { order_id: 123, revenue: 432, line_items },
        },
        {
          key: 'order_id',
          data: { revenue: 432, currency: 'eur', line_items },
        },
      ];
      requests.forEach(({ key, data }) => {
        const params = { ...data, event };
        testValidatePresence(V.validateFeedback, key, allowed, params);
      });
    });

    describe('purchase, update cart', () => {
      const events = [R.Feedback.Event.Purchase, R.Feedback.Event.UpdateCart];
      events.forEach(event => {
        const params = { event, order_id: 123, currency: 'usd', revenue: 5123 };
        testValidateLineItems(V.validateFeedback, params);
      });
    });

    describe('view page', () => {
      const event = R.Feedback.Event.ViewPage;
      const allowed = ['anything', 413];
      const requests = [
        {
          key: 'height',
          data: {
            url: 'https://example.com',
            ref: 'http://localhost',
            width: 320,
          },
        },
        {
          key: 'width',
          data: {
            url: 'http://example.com',
            ref: 'https://localhost:3001',
            height: 320,
          },
        },
        {
          key: 'ref',
          data: {
            url: 'http://example.com:8081',
            width: '313',
            height: 320,
          },
        },
        {
          key: 'url',
          data: {
            ref: 'https://localhost/foo/bar',
            width: 320,
            height: '10',
          },
        },
      ];
      requests.forEach(({ key, data }) => {
        const params = { ...data, event };
        testValidatePresence(V.validateFeedback, key, allowed, params);
      });
    });
  });

  function testValidateLineItems(fn: (x: any) => void, params: object = {}) {
    const allowed = ['bar', 32];
    const prohibited = [undefined, null, '', '   ', []];
    const withoutQuantity = prohibited.map(quantity => [
      { item_id: '123', unit_price: 71, quantity },
    ]);
    const withoutUnitPrice = prohibited.map(unit_price => [
      { item_id: 953, unit_price, quantity: 32 },
    ]);
    const withoutItemId = prohibited.map(item_id => [
      { item_id, unit_price: 38, quantity: '32' },
    ]);
    const invalid = [
      [{}, { item_id: '23', unit_price: 821 }],
      [{ item_id: '123' }],
      ...withoutQuantity,
      ...withoutUnitPrice,
      ...withoutItemId,
    ];
    const withQuantity = allowed.map(quantity => [
      { item_id: '123', unit_price: 71, quantity },
    ]);
    const withUnitPrice = allowed.map(unit_price => [
      { item_id: 953, unit_price, quantity: 32 },
    ]);
    const withItemId = allowed.map(item_id => [
      { item_id, unit_price: 38, quantity: '32' },
    ]);
    const valid = [...withQuantity, ...withUnitPrice, ...withItemId];
    invalid.forEach(line_items =>
      expect(() => fn({ ...params, line_items })).toThrowErrorMatchingSnapshot()
    );
    valid.forEach(line_items =>
      expect(() => fn({ ...params, line_items })).not.toThrow()
    );
  }

  function testValidatePresence(
    fn: (x: any) => void,
    key: string,
    allowed: any[],
    params: object = {}
  ) {
    const prohibited = [undefined, null, '', '   ', []];
    const invalid = prohibited.map(v => ({ ...params, [key]: v }));
    const valid = allowed.map(v => ({ ...params, [key]: v }));
    invalid.forEach(v => expect(() => fn(v)).toThrowErrorMatchingSnapshot());
    valid.forEach(v => expect(() => fn(v)).not.toThrow());
  }

  function testValidateList(fn: (x: any) => void, params: object = {}) {
    const valid = [
      {},
      {
        filters: [{ name: 'foo', type: 'whatever' }],
        offset: 40,
      },
      {
        filters: [
          { type: 'qux', name: 'smth', values: [{ from: '100', to: '500' }] },
          { type: 'quux', name: 'anything' },
        ],
        sort: [
          { field: 'foo', order: SortingOrder.Asc },
          { field: 'bar', order: SortingOrder.Desc },
        ],
        offset: 10,
        limit: 20,
      },
      {
        sort: [
          { field: 'foo', order: SortingOrder.Asc },
          { field: 'bar', order: SortingOrder.Desc },
        ],
        limit: 10,
      },
    ];
    const invalid = [
      { filters: [{ name: 'foo' }] },
      { filters: [{ type: 'bar' }] },
      {
        filters: [
          { type: 'qux', values: [{ from: '100', to: '500' }] },
          { type: 'quux' },
        ],
        limit: 10,
      },
      { sort: [{ field: 'grault' }], offset: 20 },
      { sort: [{ order: SortingOrder.Asc }], limit: 40, offset: 30 },
      { sort: [{ field: 'corge', order: 'bad' }] },
      {
        filters: [
          { type: 'quux' },
          { name: 'bar', values: [{ value: '100500' }] },
        ],
      },
    ];
    invalid.forEach(req =>
      expect(() => fn({ ...params, ...req })).toThrowErrorMatchingSnapshot()
    );
    valid.forEach(req => expect(() => fn({ ...params, ...req })).not.toThrow());
  }
});
