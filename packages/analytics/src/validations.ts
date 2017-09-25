import has = require('lodash/has');

import { Config, EventName } from './types';

function validateInitParams(config: Config) {
  if (!has(config, 'key')) {
    throw new Error('"key" param is required');
  }
}

function validateSendEventParams(name: EventName, request, config: Config) {
  if (
    [
      'click-suggestion',
      'click-item',
      'redirect',
      'purchase',
      'add-to-cart',
      'update-cart',
      'view-page',
    ].indexOf(name) === -1
  ) {
    throw new Error('Event not found');
  }

  if (name === 'click-suggestion') {
    if (!has(request, 'rid')) {
      throw new Error('"rid" param is required');
    }

    if (!has(request, 'suggestion')) {
      throw new Error('"suggestion" param is required');
    }
  }

  if (name === 'click-item' && !has(request, 'item_id')) {
    throw new Error('"item_id" param is required');
  }

  if (name === 'redirect') {
    if (!has(request, 'rid')) {
      throw new Error('"rid" param is required');
    }

    if (!has(request, 'suggestion')) {
      throw new Error('"suggestion" param is required');
    }
  }

  if (name === 'purchase') {
    if (!has(request, 'order_id')) {
      throw new Error('"order_id" param is required');
    }

    if (!config.platform || !config.platform.bigcommerce) {
      if (!has(request, 'currency')) {
        throw new Error('"currency" param is required');
      }

      if (!has(request, 'revenue')) {
        throw new Error('"revenue" param is required');
      }

      if (!has(request, 'line_items')) {
        throw new Error('"line_items" param is required');
      }

      if (!request.line_items.every(item => !!item.item_id)) {
        throw new Error('"line_items[].item_id" param is required');
      }

      if (!request.line_items.every(item => !!item.unit_price)) {
        throw new Error('"line_items[].unit_price" param is required');
      }

      if (!request.line_items.every(item => !!item.quantity)) {
        throw new Error('"line_items[].quantity" param is required');
      }
    }
  }

  if (name === 'add-to-cart' && !has(request, 'item_id')) {
    throw new Error('"item_id" param is required');
  }

  if (name === 'update-cart') {
    if (!has(request, 'line_items')) {
      throw new Error('"line_items" param is required');
    }

    if (!request.line_items.every(item => !!item.item_id)) {
      throw new Error('"line_items[].item_id" param is required');
    }

    if (!request.line_items.every(item => !!item.unit_price)) {
      throw new Error('"line_items[].unit_price" param is required');
    }

    if (!request.line_items.every(item => !!item.quantity)) {
      throw new Error('"line_items[].quantity" param is required');
    }
  }
}

export { validateSendEventParams, validateInitParams };
