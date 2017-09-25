import has = require('lodash/has');

import { eventsNames } from './constants/eventsNames';

function emit(event) {
  if (event.name === eventsNames.setPage && !has(event.payload, 'page')) {
    throw new Error('"page" param is required in "setPage" event');
  }

  if (event.name === eventsNames.setSorting && !has(event.payload, 'field')) {
    throw new Error('"field" param is required in "setSorting" event');
  }

  if (event.name === eventsNames.setSorting && !has(event.payload, 'order')) {
    throw new Error('"order" param is required in "setSorting" event');
  }

  if (event.name === eventsNames.unsetSorting && !has(event.payload, 'field')) {
    throw new Error('"field" param is required in "unsetSorting" event');
  }

  if (
    event.name === eventsNames.setNestedListFacet &&
    !has(event.payload, 'name')
  ) {
    throw new Error('"name" param is required in "setNestedListFacet" event');
  }

  if (
    event.name === eventsNames.setNestedListFacet &&
    !has(event.payload, 'value')
  ) {
    throw new Error('"value" param is required in "setNestedListFacet" event');
  }

  if (
    event.name === eventsNames.unsetNestedListFacet &&
    !has(event.payload, 'name')
  ) {
    throw new Error('"name" param is required in "unsetNestedListFacet" event');
  }

  if (
    event.name === eventsNames.unsetNestedListFacet &&
    !has(event.payload, 'value')
  ) {
    throw new Error(
      '"value" param is required in "unsetNestedListFacet" event',
    );
  }

  if (event.name === eventsNames.setTextFacet && !has(event.payload, 'name')) {
    throw new Error('"name" param is required in "setTextFacet" event');
  }

  if (event.name === eventsNames.setTextFacet && !has(event.payload, 'value')) {
    throw new Error('"value" param is required in "setTextFacet" event');
  }

  if (
    event.name === eventsNames.unsetTextFacet &&
    !has(event.payload, 'name')
  ) {
    throw new Error('"name" param is required in "unsetTextFacet" event');
  }

  if (
    event.name === eventsNames.unsetTextFacet &&
    !has(event.payload, 'value')
  ) {
    throw new Error('"value" param is required in "unsetTextFacet" event');
  }

  if (event.name === eventsNames.setRangeFacet && !has(event.payload, 'name')) {
    throw new Error('"name" param is required in "setRangeFacet" event');
  }

  if (
    event.name === eventsNames.setRangeFacet &&
    !has(event.payload, 'from') &&
    !has(event.payload, 'to')
  ) {
    throw new Error(
      'Either "from" or "to" param should be passed in "setRangeFacet" event',
    );
  }

  if (
    event.name === eventsNames.unsetRangeFacet &&
    !has(event.payload, 'name')
  ) {
    throw new Error('"name" param is required in "unsetRangeFacet" event');
  }

  if (
    event.name === eventsNames.unsetRangeFacet &&
    !has(event.payload, 'from') &&
    !has(event.payload, 'to')
  ) {
    throw new Error(
      'Either "from" or "to" param should be passed in "unsetRangeFacet" event',
    );
  }
}

export { emit };
