import * as FindifySDK from '@findify/sdk';
import has = require('lodash/has');

import { Event } from './types';

function init(type: FindifySDK.RecommendationsType) {
  if (
    [
      'predefined',
      'newest',
      'trending',
      'featured',
      'latest',
      'viewed',
      'bought',
      'frequentlyPurchased',
    ].indexOf(type) === -1
  ) {
    throw new Error('Recommendations "type" not found');
  }
}

function emit(type: FindifySDK.RecommendationsType, event: Event) {
  if (
    type === 'predefined' &&
    event.name === 'request' &&
    !has(event.payload, 'slot')
  ) {
    throw new Error('"slot" param is required');
  }

  if (
    (type === 'viewed' || type === 'bought') &&
    event.name === 'request' &&
    !has(event.payload, 'item_id')
  ) {
    throw new Error('"item_id" param is required');
  }

  if (type === 'frequentlyPurchased' && !has(event.payload, 'item_ids')) {
    throw new Error('"item_ids" param is required');
  }
}

export { init, emit };
