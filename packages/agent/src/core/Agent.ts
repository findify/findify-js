import * as Types from '../types';

import shallowequal from 'shallowequal';
import { init } from '@findify/sdk';

import { Cache } from './Cache';
import { getChangedFields } from '../utils/changes';
import { deepMerge } from '../utils/merge';
import { stateToQuery, queryToState } from '../utils/format';
import { getFacetType } from '../utils/filters';

const get = require('lodash/fp/get');
const pick = require('lodash/fp/pick');
const isFunction = require('lodash/isFunction');
const isObject = require('lodash/isObject');
const debounce = require('lodash/debounce');

const pickFilters = get('filters');
const pickConfigProps = pick(['debounce', 'onError']);

export class Agent {
  type: Types.RequestType = Types.RequestType.Search;
  _defaults: any;
  state: Types.State = {};
  handlers: Types.Handler[] = [];
  response: Types.ResponseBody | any = {};
  config: Types.AgentConfig;
  onError: (error: Error) => void;

  provider: Types.SDKClient;
  cache: Cache;

  constructor(config: Types.Config) {
    const request = this.request.bind(this);

    this.config = pickConfigProps(config);
    this.handleResponse = this.handleResponse.bind(this);
    this.provider = init(config);
    this.cache = new Cache(
      config.debounce
      ? debounce(request, config.debounce)
      : request
    );
  }

  public defaults(defaults) {
    this._defaults = defaults;
    this.cache.resolve();
    return this;
  }

  public on(action: string, handler: Types.ActionHandler) {
    const [ event, ...path ] = action.split(':');
    this.handlers.push({ handler, key: action, path: get(path) });
    return this;
  }

  public off(action?: string | Types.ActionHandler) {
    if (!action) this.handlers = [];
    this.handlers = this.handlers.filter(
      ({ key, handler }) => (isFunction(action) ? handler : key) !== action
    );
    return this;
  }

  public reset(field?: string) {
    if (!field) this.state = {};
    this.cache.reset(field);
    return this;
  }

  public set(field: string | Types.Field, update?: any) {
    const value = isFunction(update) ? update(this.state[field] || {}) : update;
    const changes = getChangedFields(this.state[field], value);
    if (changes) this.cache.set(field, changes);
    return this;
  }

  private fireEvent(event:string, changes, meta: Types.ResponseMeta) {
    const handlers = this.handlers.filter(({ key }) => key === event);
    if (handlers) {
      handlers.forEach(({ handler }) => handler(changes, meta))
    }
  }

  private handleChanges(next, meta?) {
    const prev = this.response;
    this.handlers.forEach(({ path, handler }) => {
      const update = path(next);
      const old = path(prev);
      if (
        old !== update ||
        (isObject(update) && !shallowequal(old, update))
      ) {
        handler(update, meta)
      };
    });
  }

  private handleResponse(res:Types.ResponseBody) {
    const newState = queryToState(this.state, res.meta, this._defaults);
    this.handleChanges(res, res.meta);
    if (newState !== this.state) {
      this.state = newState;
      this.fireEvent('change:query', newState, res.meta);
    }
    this.response = res;
  }

  private request(cache) {
    const state = { ...this.state, ...cache };
    const merge = deepMerge(this._defaults, state);
    const params = stateToQuery(merge);
    const type: any = this.type;
    this.provider
      .send({ params, type })
      .then(this.handleResponse)
      .catch(error =>
        this.onError
        ? this.onError(error)
        : console.warn(error)
      );

    this.state = state;
    return;
  }
}
