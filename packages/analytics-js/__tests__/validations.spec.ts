import * as expect from 'expect';
import * as validations from '../src/validations';

const { validateInitParams, validateSendEventParams }: any = validations;

describe('validations', () => {
  const config = {
    key: 'test',
  };

  describe('validateInitParams', () => {
    it('should throw an Error if "key" is not provided', () => {
      expect(() => validateInitParams()).toThrow(/"key" param is required/);
      expect(() => validateInitParams({})).toThrow(/"key" param is required/);
    });
  });

  describe('validateSendEventParams', () => {
    it('should throw an Error if provided urecognized event', () => {
      expect(() =>
        validateSendEventParams('unrecognized', {
          suggestion: 'testSuggestion',
        }),
      ).toThrow(/Event not found/);
    });

    it('should throw an Error if "rid" is not provided at "click-suggestion" event', () => {
      expect(() =>
        validateSendEventParams('click-suggestion', {
          suggestion: 'testSuggestion',
        }),
      ).toThrow(/"rid" param is required/);
    });

    it('should throw an Error if "suggestion" is not provided at "click-suggestion" event', () => {
      expect(() =>
        validateSendEventParams('click-suggestion', {
          rid: 'testRid',
        }),
      ).toThrow(/"suggestion" param is required/);
    });

    it('should throw an Error if "item_id" is not provided at "click-item" event', () => {
      expect(() =>
        validateSendEventParams('click-item', {
          rid: 'testRid',
        }),
      ).toThrow(/"item_id" param is required/);

      expect(() => validateSendEventParams('click-item', {})).toThrow(
        /"item_id" param is required/,
      );
    });

    it('should throw an Error if "rid" is not provided at "redirect" event', () => {
      expect(() =>
        validateSendEventParams('redirect', {
          suggestion: 'testSuggestion',
        }),
      ).toThrow(/"rid" param is required/);
    });

    it('should throw an Error if "suggestion" is not provided at "redirect" event', () => {
      expect(() =>
        validateSendEventParams('redirect', {
          rid: 'testRid',
        }),
      ).toThrow(/"suggestion" param is required/);
    });

    it('should throw an Error if "order_id" is not provided at "purchase" event', () => {
      expect(() =>
        validateSendEventParams(
          'purchase',
          {
            currency: 'testCurrency',
            revenue: 100,
            line_items: [
              {
                item_id: 'testItemId',
                unit_price: 100,
                quantity: 2,
              },
            ],
          },
          config,
        ),
      ).toThrow(/"order_id" param is required/);
    });

    it('should throw an Error if "currency" is not provided at "purchase" event', () => {
      expect(() =>
        validateSendEventParams(
          'purchase',
          {
            order_id: 'testOrderId',
            revenue: 100,
            line_items: [
              {
                item_id: 'testItemId',
                unit_price: 100,
                quantity: 2,
              },
            ],
          },
          config,
        ),
      ).toThrow(/"currency" param is required/);
    });

    it('should throw an Error if "revenue" is not provided at "purchase" event', () => {
      expect(() =>
        validateSendEventParams(
          'purchase',
          {
            order_id: 'testOrderId',
            currency: 'testCurrency',
            line_items: [
              {
                item_id: 'testItemId',
                unit_price: 100,
                quantity: 2,
              },
            ],
          },
          config,
        ),
      ).toThrow(/"revenue" param is required/);
    });

    it('should throw an Error if "line_items" is not provided at "purchase" event', () => {
      expect(() =>
        validateSendEventParams(
          'purchase',
          {
            order_id: 'testOrderId',
            currency: 'testCurrency',
            revenue: 100,
          },
          config,
        ),
      ).toThrow(/"line_items" param is required/);
    });

    it('should throw an Error if "line_items[].item_id" is not provided at "purchase" event', () => {
      expect(() =>
        validateSendEventParams(
          'purchase',
          {
            order_id: 'testOrderId',
            currency: 'testCurrency',
            revenue: 100,
            line_items: [
              {
                item_id: 'testItemId',
                unit_price: 100,
                quantity: 2,
              },
              {
                unit_price: 100,
                quantity: 2,
              },
            ],
          },
          config,
        ),
      ).toThrow(/"line_items\[\]\.item_id" param is required/);
    });

    it('should throw an Error if "line_items[].unit_price" is not provided at "purchase" event', () => {
      expect(() =>
        validateSendEventParams(
          'purchase',
          {
            order_id: 'testOrderId',
            currency: 'testCurrency',
            revenue: 100,
            line_items: [
              {
                item_id: 'testItemId',
                unit_price: 100,
                quantity: 2,
              },
              {
                item_id: 'testItemId2',
                quantity: 2,
              },
            ],
          },
          config,
        ),
      ).toThrow(/"line_items\[\]\.unit_price" param is required/);
    });

    it('should throw an Error if "line_items[].quantity" is not provided at "purchase" event', () => {
      expect(() =>
        validateSendEventParams(
          'purchase',
          {
            order_id: 'testOrderId',
            currency: 'testCurrency',
            revenue: 100,
            line_items: [
              {
                item_id: 'testItemId',
                unit_price: 100,
                quantity: 2,
              },
              {
                item_id: 'testItemId2',
                unit_price: 100,
              },
            ],
          },
          config,
        ),
      ).toThrow(/"line_items\[\]\.quantity" param is required/);
    });

    it('should throw an Error if "item_id" is not provided at "add-to-cart" event', () => {
      expect(() => validateSendEventParams('add-to-cart', {})).toThrow(
        /"item_id" param is required/,
      );
      expect(() =>
        validateSendEventParams('add-to-cart', {
          rid: 'testRid',
          quantity: 1,
        }),
      ).toThrow(/"item_id" param is required/);
    });

    it('should throw an Error if "line_items[].item_id" is not provided at "update-cart" event', () => {
      expect(() =>
        validateSendEventParams('update-cart', {
          line_items: [
            {
              item_id: 'testItemId',
              unit_price: 100,
              quantity: 2,
            },
            {
              unit_price: 100,
              quantity: 2,
            },
          ],
        }),
      ).toThrow(/"line_items\[\]\.item_id" param is required/);
    });

    it('should throw an Error if "line_items[].unit_price" is not provided at "update-cart" event', () => {
      expect(() =>
        validateSendEventParams('update-cart', {
          line_items: [
            {
              item_id: 'testItemId',
              unit_price: 100,
              quantity: 2,
            },
            {
              item_id: 'testItemId2',
              quantity: 2,
            },
          ],
        }),
      ).toThrow(/"line_items\[\]\.unit_price" param is required/);
    });

    it('should throw an Error if "line_items[].quantity" is not provided at "update-cart" event', () => {
      expect(() =>
        validateSendEventParams('update-cart', {
          line_items: [
            {
              item_id: 'testItemId',
              unit_price: 100,
              quantity: 2,
            },
            {
              item_id: 'testItemId2',
              unit_price: 100,
            },
          ],
        }),
      ).toThrow(/"line_items\[\]\.quantity" param is required/);
    });
  });
});
