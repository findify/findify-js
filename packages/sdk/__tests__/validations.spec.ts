import * as expect from 'expect';
import * as validations from '../src/validations';

const {
  validateInitParams,
  validateAutocompleteParams,
  validateResultsParams,
  validateSearchParams,
  validateCollectionParams,
  validateRecommendationsParams,
  validateFeedbackParams,
  validateUserParams,
}: any = validations;

describe('validations', () => {
  describe('validateInitParams', () => {
    it('should throw an Error if "key" is not provided', () => {
      expect(() => validateInitParams()).toThrow(/"key" param is required/);
      expect(() => validateInitParams({})).toThrow(/"key" param is required/);
    });

    it('should throw an Error if type of "key" is not a string', () => {
      expect(() =>
        validateInitParams({
          key: true,
        }),
      ).toThrow(/"key" param should be a string/);
    });

    it('should throw an Error if wrong "method" param was provided', () => {
      expect(() =>
        validateInitParams({
          key: 'testKey',
          method: 'wrongMethod',
        }),
      ).toThrow(/"method" param should be either "post" or "jsonp"/);
    });

    it('should throw an Error if wrong "log" param was provided', () => {
      expect(() =>
        validateInitParams({
          key: 'testKey',
          log: 'string',
        }),
      ).toThrow(/"log" param should be "boolean" type/);
    });

    it('should not throw an Error if correct params are provided', () => {
      expect(() =>
        validateInitParams({
          key: 'testKey',
          method: 'post',
          log: true,
        }),
      ).toNotThrow();

      expect(() =>
        validateInitParams({
          key: 'testKey',
          method: 'jsonp',
          log: false,
        }),
      ).toNotThrow();
    });
  });

  describe('validateAutocompleteParams', () => {
    it('should throw validation Error if "q" param is not provided', () => {
      expect(() => validateAutocompleteParams()).toThrow(
        /"q" param is required/,
      );
      expect(() => validateAutocompleteParams({})).toThrow(
        /"q" param is required/,
      );
    });
  });

  describe('validateResultsParams', () => {
    it('should throw validation Error if "filters.name" param is not provided', () => {
      expect(() =>
        validateResultsParams({
          q: 'test',
          filters: [
            {
              type: 'testType',
            } as any,
          ],
        }),
      ).toThrow(/"filters.name" param is required/);
    });

    it('should throw validation Error if "filters.type" param is not provided', () => {
      expect(() =>
        validateResultsParams({
          q: 'test',
          filters: [
            {
              name: 'testFilter',
            } as any,
          ],
        }),
      ).toThrow(/"filters.type" param is required/);
    });

    it('should throw validation Error if "sort.field" param is not provided', () => {
      expect(() =>
        validateResultsParams({
          q: 'test',
          sort: [
            {
              order: 'testOrder',
            } as any,
          ],
        }),
      ).toThrow(/"sort.field" param is required/);
    });

    it('should throw validation Error if "sort.order" param is not provided', () => {
      expect(() =>
        validateResultsParams({
          q: 'test',
          sort: [
            {
              field: 'testField',
            } as any,
          ],
        }),
      ).toThrow(/"sort.order" param is required/);
    });
  });

  describe('validateSearchParams', () => {
    it('should throw an Error if "q" param is not provided', () => {
      expect(() => validateSearchParams()).toThrow(/"q" param is required/);
      expect(() => validateSearchParams({})).toThrow(/"q" param is required/);
    });
  });

  describe('validateCollectionParams', () => {
    it('should throw validation Error if "slot" param is not provided', () => {
      expect(() => validateCollectionParams()).toThrow(
        /"slot" param is required/,
      );
      expect(() => validateCollectionParams({})).toThrow(
        /"slot" param is required/,
      );
    });
  });

  describe('validateRecommendationsParams', () => {
    describe('generic', () => {
      it('should throw an Error if unrecognized recommendations type was provided', () => {
        const regex = /Recommendations "type" not found/;
        expect(() => validateRecommendationsParams('unrecognized')).toThrow(
          regex,
        );
        expect(() => validateRecommendationsParams('unrecognized', {})).toThrow(
          regex,
        );
      });
    });

    describe('predefined', () => {
      it('should throw validation Error if "slot" param is not provided', () => {
        expect(() => validateRecommendationsParams('predefined')).toThrow(
          /"slot" param is required/,
        );
        expect(() => validateRecommendationsParams('predefined', {})).toThrow(
          /"slot" param is required/,
        );
      });

      it('should not throw if all required params are provided', () => {
        expect(() =>
          validateRecommendationsParams('predefined', {
            slot: 'test',
          }),
        ).toNotThrow();
      });
    });

    describe('viewed', () => {
      it('should throw validation Error if "item_id" param is not provided', () => {
        expect(() => validateRecommendationsParams('viewed')).toThrow(
          /"item_id" param is required/,
        );
        expect(() => validateRecommendationsParams('viewed', {})).toThrow(
          /"item_id" param is required/,
        );
      });

      it('should not throw if all required params are provided', () => {
        expect(() =>
          validateRecommendationsParams('viewed', {
            item_id: 'test',
          }),
        ).toNotThrow();
      });
    });

    describe('bought', () => {
      it('should throw validation Error if "item_id" param is not provided', () => {
        expect(() => validateRecommendationsParams('bought')).toThrow(
          /"item_id" param is required/,
        );
        expect(() => validateRecommendationsParams('bought', {})).toThrow(
          /"item_id" param is required/,
        );
      });

      it('should not throw if all required params are provided', () => {
        expect(() =>
          validateRecommendationsParams('bought', {
            item_id: 'test',
          }),
        ).toNotThrow();
      });
    });

    describe('featured', () => {
      it('should not throw', () => {
        expect(() => validateRecommendationsParams('featured')).toNotThrow();
      });
    });

    describe('newest', () => {
      it('should not throw', () => {
        expect(() => validateRecommendationsParams('newest')).toNotThrow();
      });
    });

    describe('trending', () => {
      it('should not throw', () => {
        expect(() => validateRecommendationsParams('trending')).toNotThrow();
      });
    });

    describe('latest', () => {
      it('should not throw', () => {
        expect(() => validateRecommendationsParams('latest')).toNotThrow();
      });
    });

    describe('frequentlyPurchased', () => {
      it('should not throw', () => {
        expect(() =>
          validateRecommendationsParams('frequentlyPurchased', {
            item_ids: [1, 2, 3, 4],
          }),
        ).toNotThrow();
      });

      it('should throw if "item_ids" param is not provided', () => {
        expect(() =>
          validateRecommendationsParams('frequentlyPurchased'),
        ).toThrow(/"item_ids" param is required/);
        expect(() =>
          validateRecommendationsParams('frequentlyPurchased', {}),
        ).toThrow(/"item_ids" param is required/);
      });
    });
  });

  describe('validateFeedbackParams', () => {
    it('should throw an Error if provided urecognized event', () => {
      expect(() =>
        validateFeedbackParams('unrecognized', {
          suggestion: 'testSuggestion',
        }),
      ).toThrow(/Event not found/);

      expect(() => validateFeedbackParams('unrecognized')).toThrow(
        /Event not found/,
      );
    });

    it('should throw an Error if "rid" is not provided at "click-suggestion" event', () => {
      expect(() =>
        validateFeedbackParams('click-suggestion', {
          suggestion: 'testSuggestion',
        }),
      ).toThrow(/"rid" param is required/);
    });

    it('should throw an Error if "suggestion" is not provided at "click-suggestion" event', () => {
      expect(() =>
        validateFeedbackParams('click-suggestion', {
          rid: 'testRid',
        }),
      ).toThrow(/"suggestion" param is required/);
    });

    it('should throw an Error if "item_id" is not provided at "click-item" event', () => {
      expect(() =>
        validateFeedbackParams('click-item', {
          rid: 'testRid',
        }),
      ).toThrow(/"item_id" param is required/);

      expect(() => validateFeedbackParams('click-item', {})).toThrow(
        /"item_id" param is required/,
      );
    });

    it('should throw an Error if "rid" is not provided at "redirect" event', () => {
      expect(() =>
        validateFeedbackParams('redirect', {
          suggestion: 'testSuggestion',
        }),
      ).toThrow(/"rid" param is required/);
    });

    it('should throw an Error if "suggestion" is not provided at "redirect" event', () => {
      expect(() =>
        validateFeedbackParams('redirect', {
          rid: 'testRid',
        }),
      ).toThrow(/"suggestion" param is required/);
    });

    it('should throw an Error if "order_id" is not provided at "purchase" event', () => {
      expect(() =>
        validateFeedbackParams('purchase', {
          currency: 'testCurrency',
          revenue: 100,
          line_items: [
            {
              item_id: 'testItemId',
              unit_price: 100,
              quantity: 2,
            },
          ],
        }),
      ).toThrow(/"order_id" param is required/);
    });

    it('should throw an Error if "currency" is not provided at "purchase" event', () => {
      expect(() =>
        validateFeedbackParams('purchase', {
          order_id: 'testOrderId',
          revenue: 100,
          line_items: [
            {
              item_id: 'testItemId',
              unit_price: 100,
              quantity: 2,
            },
          ],
        }),
      ).toThrow(/"currency" param is required/);
    });

    it('should throw an Error if "revenue" is not provided at "purchase" event', () => {
      expect(() =>
        validateFeedbackParams('purchase', {
          order_id: 'testOrderId',
          currency: 'testCurrency',
          line_items: [
            {
              item_id: 'testItemId',
              unit_price: 100,
              quantity: 2,
            },
          ],
        }),
      ).toThrow(/"revenue" param is required/);
    });

    it('should throw an Error if "line_items" is not provided at "purchase" event', () => {
      expect(() =>
        validateFeedbackParams('purchase', {
          order_id: 'testOrderId',
          currency: 'testCurrency',
          revenue: 100,
        }),
      ).toThrow(/"line_items" param is required/);
    });

    it('should throw an Error if "line_items[].item_id" is not provided at "purchase" event', () => {
      expect(() =>
        validateFeedbackParams('purchase', {
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
        }),
      ).toThrow(/"line_items\[\]\.item_id" param is required/);
    });

    it('should throw an Error if "line_items[].unit_price" is not provided at "purchase" event', () => {
      expect(() =>
        validateFeedbackParams('purchase', {
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
        }),
      ).toThrow(/"line_items\[\]\.unit_price" param is required/);
    });

    it('should throw an Error if "line_items[].quantity" is not provided at "purchase" event', () => {
      expect(() =>
        validateFeedbackParams('purchase', {
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
        }),
      ).toThrow(/"line_items\[\]\.quantity" param is required/);
    });

    it('should throw an Error if "item_id" is not provided at "add-to-cart" event', () => {
      expect(() => validateFeedbackParams('add-to-cart', {})).toThrow(
        /"item_id" param is required/,
      );
      expect(() =>
        validateFeedbackParams('add-to-cart', {
          rid: 'testRid',
          quantity: 1,
        }),
      ).toThrow(/"item_id" param is required/);
    });

    it('should throw an Error if "line_items[].item_id" is not provided at "update-cart" event', () => {
      expect(() =>
        validateFeedbackParams('update-cart', {
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
        validateFeedbackParams('update-cart', {
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
        validateFeedbackParams('update-cart', {
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

    it('should throw an Error if "url" is not provided at "view-page" event', () => {
      expect(() =>
        validateFeedbackParams('view-page', {
          ref: 'testRef',
          width: 1366,
          height: 768,
        }),
      ).toThrow(/"url" param is required/);
    });

    it('should throw an Error if "ref" is not provided at "view-page" event', () => {
      expect(() =>
        validateFeedbackParams('view-page', {
          url: 'testUrl',
          width: 1366,
          height: 768,
        }),
      ).toThrow(/"ref" param is required/);
    });

    it('should throw an Error if "width" is not provided at "view-page" event', () => {
      expect(() =>
        validateFeedbackParams('view-page', {
          url: 'testUrl',
          ref: 'testRef',
          height: 768,
        }),
      ).toThrow(/"width" param is required/);
    });

    it('should throw an Error if "height" is not provided at "view-page" event', () => {
      expect(() =>
        validateFeedbackParams('view-page', {
          url: 'testUrl',
          ref: 'testRef',
          width: 1366,
        }),
      ).toThrow(/"height" param is required/);
    });
  });

  describe('validateUserParams', () => {
    it('should throw an Error if "user" prop is not provided', () => {
      const regex = /`user` param should be provided either at request or at library config/;
      expect(() => validateUserParams()).toThrow(regex);
    });

    it('should throw an Error if "user.uid" prop is not provided at "request"', () => {
      expect(() =>
        validateUserParams({
          sid: 'testSessionId',
        }),
      ).toThrow(/"user.uid" param is required/);
    });

    it('should throw an Error if "user.sid" prop is not provided at "request"', () => {
      expect(() =>
        validateUserParams({
          uid: 'testUserId',
        }),
      ).toThrow(/"user.sid" param is required/);
    });
  });
});
