// import { createChangeEmitter } from 'change-emitter';
import { init } from '@findify/sdk';
import { Client } from '@findify/sdk/types/client';
import { Type as RequestType } from '@findify/sdk/types/request';
import {
  defaults,
  isArray,
  isObject,
  isString,
  isFunction,
  pick,
  debounce,
  get,
  mergeWith,
} from 'lodash/fp';
import { Cache } from './core/Cache';
import { normalizeFilters, getFacetType } from './utils/filters';

const normalize = defaults({
  debug: false,
  debounce: false,
  cache: false,
  method: 'jsonp',
  log: false,
});

const pickFilters = get('filters');
const deepMerge = mergeWith(
  (obj, src) => (isObject(obj) ? { ...obj, ...src } : src)
);

const isValidField = (values, key) =>
  values.every((value, i) => {
    const match =
      !i ||
      (typeof value === typeof values[i - 1] &&
        value.isArray === values[i - 1].isArray);
    if (!match)
      console.error(
        `Filter "${key}" has mixed values: [${values
          .map(getFacetType)
          .join(', ')}]`
      );
    return match;
  });

const getChangedFields = (prev, next) => {
  if (prev === next) return undefined;
  if (!prev || isString(next)) return next;
  return Object.keys(next).reduce((acc, key) => {
    if (prev[key] === next[key]) return acc;
    return isArray(next[key]) && isValidField(next[key], key)
      ? { ...acc, [key]: next[key] }
      : acc;
  }, undefined);
};

export enum Field {
  Filters = 'filters',
  Query = 'q',
  Sort = 'sort',
  Offset = 'offset',
  Limit = 'limit',
}

declare function stateUpdater(state: () => string | number | any);

export class Agent {
  type: RequestType;
  _defaults: any;
  _state: any;

  provider: Client;
  cache: Cache;

  constructor(private config) {
    this.type = RequestType.Autocomplete;
    this.cache = new Cache(this.request.bind(this));
    this.provider = init({ ...config });
  }

  get state() {
    return deepMerge(this._defaults, this._state);
  }

  set state(state) {
    this._state = state;
  }

  public defaults(state) {
    this._defaults = state;
    return this;
  }

  public on(action, callback) {
    // const [action, field] = action.split(':');
    return this;
  }

  public off(action) {
    return this;
  }

  public set(field: Field, update: ((_: any) => any) | string) {
    const value = isFunction(update) ? update(this.state[field]) : update;
    const changes = getChangedFields(this.state[field], value);
    if (changes) this.cache.set(field, changes);
    return this;
  }

  request(cache) {
    this.state = { ...this._state, ...cache };
    const request = this.sanitizeRequest(this.state);
    this.provider.send({
      ...request,
      type: this.type,
    });
  }

  sanitizeRequest(s) {
    return {
      ...s,
      filters:
        s.filters &&
        Object.keys(s.filters)
          .filter(name => !!s.filters[name] && !!s.filters[name].length)
          .map(name => ({
            name,
            type: getFacetType(s.filters[name][0]),
            values: s.filters[name].map(value => ({ value })),
          })),
    };
  }
}

const core = new Agent({ key: '8a2c6a1e-1aac-4047-8514-f284203c4b59' });
core
  .defaults({ q: 'awfawfawf', filters: { filter1: ['foo'], filter2: ['bar'] } })
  .set(Field.Filters, state => ({
    ...state,
    filter1: [...state.filter1, 'baz'],
  }))
  .set(Field.Query, 'trololo');

setTimeout(() => {
  core.set(Field.Filters, 3);
}, 100);
