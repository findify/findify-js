import { Config, EventName } from './types';

function validateInitParams(config: Config) {
  if (!('key' in config)) {
    throw new Error('"key" param is required');
  }
}

function validateSendEventParams(name: EventName, request, config: Config) {
  if (!(name in EventName)) {
    throw new Error('Event not found');
  }

  if (name === EventName.clickSuggestion) {
    if (!('rid' in request)) {
      throw new Error('"rid" param is required');
    }

    if (!('suggestion' in request)) {
      throw new Error('"suggestion" param is required');
    }
  }

  if (name === EventName.clickItem && !('item_id' in request)) {
    throw new Error('"item_id" param is required');
  }

  if (name === EventName.redirect) {
    if (!('rid' in request)) {
      throw new Error('"rid" param is required');
    }

    if (!('suggestion' in request)) {
      throw new Error('"suggestion" param is required');
    }
  }

  if (name === EventName.purchase) {
    if (!('order_id' in request)) {
      throw new Error('"order_id" param is required');
    }

    if (!config.platform || !config.platform.bigcommerce) {
      if (!('currency' in request)) {
        throw new Error('"currency" param is required');
      }

      if (!('revenue' in request)) {
        throw new Error('"revenue" param is required');
      }

      if (!('line_items' in request)) {
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

  if (name === EventName.addToCart && !('item_id' in request)) {
    throw new Error('"item_id" param is required');
  }

  if (name === EventName.updateCart) {
    if (!('line_items' in request)) {
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
