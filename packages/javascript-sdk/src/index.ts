import * as Promise from 'bluebird';
import * as assign from 'lodash/assign';
import * as omit from 'lodash/omit';

import { requestApi } from './modules/requestApi';

import {
  Config,
  RecommendationsType,
  FeedbackType,
  AutocompleteRequest,
  SearchRequest,
  CollectionRequest,
  RecommendationsRequest,
  PredefinedRecommendationsRequest,
  ViewedRecommendationsRequest,
  BoughtRecommendationsRequest,
  FrequentlyPurchasedRecommendationsRequest,
  FeedbackRequest,
  AutocompleteResponse,
  SearchResponse,
  CollectionResponse,
  RecommendationsResponse,
} from './types';

import {
  validateInitParams,
  validateAutocompleteParams,
  validateSearchParams,
  validateCollectionParams,
  validateRecommendationsParams,
  validateFeedbackParams,
} from './validations';

function init(config: Config) {
  validateInitParams(config);

  return {
    autocomplete(request: AutocompleteRequest) {
      validateAutocompleteParams(request);

      return requestApi('/autocomplete', request, config);
    },

    search(request: SearchRequest) {
      validateSearchParams(request);

      return requestApi('/search', request, config);
    },

    collection(request: CollectionRequest) {
      validateCollectionParams(request);

      const omittedRequest = omit(request, ['slot']);

      return requestApi(
        `/smart-collection/${request.slot}`,
        omittedRequest,
        config,
      );
    },

    recommendations(
      type: RecommendationsType,
      request?: RecommendationsRequest,
    ) {
      type ViewedOrBought =
        | ViewedRecommendationsRequest
        | BoughtRecommendationsRequest;

      const slot = request
        ? (request as PredefinedRecommendationsRequest).slot
        : undefined;
      const itemId = request ? (request as ViewedOrBought).item_id : undefined;

      validateRecommendationsParams(type, request);

      if (type === 'predefined') {
        const omittedRequest = omit(request, ['slot']);
        return requestApi(`/recommend/${slot}`, omittedRequest, config);
      }

      if (type === 'viewed') {
        const omittedRequest = omit(request, ['item_id']);
        return requestApi(
          `/recommend/items/${itemId}/viewed/viewed`,
          omittedRequest,
          config,
        );
      }

      if (type === 'bought') {
        const omittedRequest = omit(request, ['item_id']);
        return requestApi(
          `/recommend/items/${itemId}/viewed/bought`,
          omittedRequest,
          config,
        );
      }

      if (type === 'frequentlyPurchased') {
        const omittedRequest = omit(request, ['item_ids']);
        const itemIds = (request as FrequentlyPurchasedRecommendationsRequest)
          .item_ids;
        const itemIdsStr = itemIds.join(',');
        return requestApi(
          `/recommend/items/${itemIdsStr}/bought/bought`,
          omittedRequest,
          config,
        );
      }

      if (type === 'featured') {
        return requestApi('/recommend/items/featured', {}, config);
      }

      if (type === 'newest') {
        return requestApi('/recommend/items/newest', request, config);
      }

      if (type === 'trending') {
        return requestApi('/recommend/items/trending', request, config);
      }

      if (type === 'latest') {
        return requestApi('/recommend/items/viewed/latest', request, config);
      }
    },

    feedback(type: FeedbackType, request) {
      validateFeedbackParams(type, request);

      if (type === 'click-suggestion') {
        requestApi(
          '/feedback',
          {
            event: 'click-suggestion',
            properties: {
              rid: request.rid,
              suggestion: request.suggestion,
            },
          },
          config,
        );
      }

      if (type === 'click-item') {
        requestApi(
          '/feedback',
          {
            event: 'click-item',
            properties: {
              rid: request.rid,
              item_id: request.item_id,
            },
          },
          config,
        );
      }

      if (type === 'redirect') {
        requestApi(
          '/feedback',
          {
            event: 'redirect',
            properties: {
              rid: request.rid,
              suggestion: request.suggestion,
            },
          },
          config,
        );
      }

      if (type === 'purchase') {
        requestApi(
          '/feedback',
          {
            event: 'purchase',
            properties: {
              order_id: request.order_id,
              currency: request.currency,
              revenue: request.revenue,
              line_items: request.line_items,
              affiliation: request.affiliation,
            },
          },
          config,
        );
      }

      if (type === 'add-to-cart') {
        requestApi(
          '/feedback',
          {
            event: 'add-to-cart',
            properties: {
              rid: request.rid,
              item_id: request.item_id,
              quantity: request.quantity,
            },
          },
          config,
        );
      }

      if (type === 'update-cart') {
        requestApi(
          '/feedback',
          {
            event: 'update-cart',
            properties: {
              line_items: request.line_items,
            },
          },
          config,
        );
      }

      if (type === 'view-page') {
        requestApi(
          '/feedback',
          {
            event: 'view-page',
            properties: {
              url: request.url,
              ref: request.ref,
              width: request.width,
              height: request.height,
              item_id: request.item_id,
            },
          },
          config,
        );
      }
    },
  };
}

type Client = {
  autocomplete(request: AutocompleteRequest): Promise<AutocompleteResponse>;
  search(request: SearchRequest): Promise<SearchResponse>;
  collection(request: CollectionRequest): Promise<CollectionResponse>;
  recommendations(
    type: RecommendationsType,
    request?: RecommendationsRequest,
  ): Promise<RecommendationsResponse>;
  feedback(request: FeedbackRequest): Promise<void>;
};

export { init, Client };
