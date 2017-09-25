import omit = require('lodash/omit');

import { actionTypes } from '../constants/actionTypes';
import { makeObjectSafe } from '../../../generic/utils/makeObjectSafe';
import { cleanObject } from '../../../generic/utils/cleanObject';

const initialState = {
  limit: 24,
  offset: 0,
};

function reducer(state: State = initialState, action) {
  switch (action.type) {
    case actionTypes.CLEAR_ALL_FILTERS:
      return handleClearAllFilters(state);
    case actionTypes.SET_REQUEST_BODY:
      return handleSetRequestBody(state, action.payload);
    case actionTypes.NEXT_PAGE:
      return handleNextPage(state);
    case actionTypes.PREV_PAGE:
      return handlePrevPage(state);
    case actionTypes.SET_PAGE:
      return handleSetPage(state, action.payload);
    case actionTypes.SET_SORTING:
      return handleSetSorting(state, action.payload);
    case actionTypes.UNSET_SORTING:
      return handleUnsetSorting(state, action.payload);
    case actionTypes.SET_NESTED_LIST_FACET:
      return handleSetNestedListFacet(state, action.payload);
    case actionTypes.UNSET_NESTED_LIST_FACET:
      return handleUnsetNestedListFacet(state, action.payload);
    case actionTypes.SET_TEXT_FACET:
      return handleSetTextFacet(state, action.payload);
    case actionTypes.UNSET_TEXT_FACET:
      return handleUnsetTextFacet(state, action.payload);
    case actionTypes.SET_RANGE_FACET:
      return handleSetRangeFacet(state, action.payload);
    case actionTypes.UNSET_RANGE_FACET:
      return handleUnsetRangeFacet(state, action.payload);
    case actionTypes.REQUEST:
      return handleRequest(state, action.payload);
    default:
      return state;
  }
}

function handleClearAllFilters(state) {
  return omit(state, ['filters']);
}

function handleSetRequestBody(state, payload) {
  return {
    ...initialState,
    ...payload,
  };
}

function handleSearch(state, { query }) {
  return {
    ...initialState,
    q: query,
  };
}

function handleNextPage(state) {
  return {
    ...state,
    offset: state.offset + state.limit,
  };
}

function handlePrevPage(state) {
  return {
    ...state,
    offset: state.offset === 0 ? 0 : state.offset - state.limit,
  };
}

function handleSetPage(state, { page }) {
  return {
    ...state,
    offset: state.limit * (page - 1),
  };
}

function handleSetSorting(state, { field, order }) {
  const sort = state.sort || [];
  const item = { field, order };
  const isItemExists = sort.filter(el => el.field === field).length > 0;

  return {
    ...state,
    sort: !isItemExists
      ? [...sort, item]
      : sort.map(el => (el.field === field ? item : el)),
    offset: 0,
  };
}

function handleUnsetSorting(state, { field }) {
  const sort = (state.sort || []).filter(el => el.field !== field);

  return !sort.length
    ? omit(state, ['sort'])
    : {
        ...state,
        sort,
        offset: 0,
      };
}

function handleSetNestedListFacet(state, { name, value }) {
  const filters = state.filters || [];
  const isItemExists =
    filters.filter(f => f.name === name && f.type === 'category').length > 0;
  const item = {
    type: 'category',
    name,
    values: [{ value }],
  };

  return {
    ...state,
    filters: !isItemExists
      ? [...filters, item]
      : filters.map(f => (f.name === name && f.type === 'category' ? item : f)),
    offset: 0,
  };
}

function handleUnsetNestedListFacet(state, { name }) {
  const nextState = {
    ...state,
    filters: (state.filters || []).filter(
      f => !(f.type === 'category' && f.name === name),
    ),
    offset: 0,
  };

  return !nextState.filters.length ? omit(nextState, ['filters']) : nextState;
}

function handleSetTextFacet(state, { name, value }) {
  const isNeededFilter = filter =>
    filter.name === name &&
    filter.type === 'text' &&
    (!filter.values ||
      filter.values.filter(item => item.value === value).length === 0);
  const filters = state.filters || [];
  const isItemExists =
    filters.filter(f => f.name === name && f.type === 'text').length > 0;
  const item = {
    type: 'text',
    name,
    values: [{ value }],
  };

  return {
    ...state,
    filters: !isItemExists
      ? [...filters, item]
      : filters.map(
          f =>
            isNeededFilter(f)
              ? {
                  ...f,
                  values: [...(f.values || []), { value }],
                }
              : f,
        ),
    offset: 0,
  };
}

function handleUnsetTextFacet(state, { name, value }) {
  const filters = state.filters || [];

  const nextState = {
    ...state,
    filters: filters
      .map(
        el =>
          el.name === name && el.type === 'text'
            ? {
                ...el,
                values: el.values.filter(v => String(v.value) !== value),
              }
            : el,
      )
      .filter(el => el.values && el.values.length),
    offset: 0,
  };

  return !nextState.filters.length ? omit(nextState, ['filters']) : nextState;
}

function handleSetRangeFacet(state, { name, from, to }) {
  const isNeededFilter = filter =>
    filter.name === name &&
    filter.type === 'range' &&
    (!filter.values ||
      filter.values.filter(item => item.from === from && item.to === to)
        .length === 0);
  const filters = state.filters || [];
  const isItemExists =
    filters.filter(f => f.name === name && f.type === 'range').length > 0;
  const item = {
    type: 'range',
    name,
    values: [
      cleanObject({
        from,
        to,
      }),
    ],
  };

  return {
    ...state,
    filters: !isItemExists
      ? [...filters, item]
      : filters.map(
          f =>
            isNeededFilter(f)
              ? {
                  ...f,
                  values: [...(f.values || []), { from, to }],
                }
              : f,
        ),
    offset: 0,
  };
}

function handleUnsetRangeFacet(state, { name, from, to }) {
  const filters = state.filters || [];

  const nextState = {
    ...state,
    filters: filters
      .map(
        el =>
          el.name === name && el.type === 'range'
            ? {
                ...el,
                values: el.values.filter(
                  v => !(v.from === from && v.to === to),
                ),
              }
            : el,
      )
      .filter(el => el.values && el.values.length),
    offset: 0,
  };

  return !nextState.filters.length ? omit(nextState, ['filters']) : nextState;
}

function handleRequest(state, { limit, user, slot }: any = {}) {
  const currentPage = state.offset / state.limit;

  const data: any = makeObjectSafe({
    limit: () => limit,
    user: () => user,
  });

  const l = data.limit || state.limit;
  const offset = l * currentPage;

  return cleanObject({
    ...state,
    limit: l,
    offset,
    slot,
    user: data.user,
  });
}

type State = any;

export { State, reducer };
