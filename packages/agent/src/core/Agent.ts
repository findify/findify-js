import * as Types from '../types';

import { init } from '@findify/sdk';
import { fromJS, Map, isImmutable } from 'immutable';
import { Cache } from './Cache';
import { getChangedFields } from '../utils/changes';
import { stateToQuery, queryToState } from '../utils/format';
import { getFacetType } from '../utils/filters';
import { isFunction, isObject, debounce } from '../utils/helpers';

const pickConfigProps = ({ debounce, onError, immutable = false }) =>
  ({ debounce, onError, immutable });

const _initial = Map();

export class Agent {
  type: Types.RequestType = Types.RequestType.Search;
  _defaults: Map<any, any> = _initial;
  state: Map<any, any> = _initial;
  response: Map<any, any> = _initial;
  handlers: Types.Handler[] = [];
  config: Types.AgentConfig;
  onError: (error: Error) => void;

  provider: Types.SDKClient;
  cache: Cache;

  constructor(config: Types.Config) {
    const request = this.request.bind(this);
    this.config = pickConfigProps(config);
    this.onError = config.onError && config.onError.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.provider = init(config);
    this.cache = new Cache(
      config.debounce
      ? debounce(request, config.debounce)
      : request
    );
  }

  /**
   * Set values witch will be added to request by default
   * The defaults could be overwrite by via .set function
   * @param defaults [{ q: string, filters: any[], sort: any[], limit: number, offset: number }]
   */
  public defaults(defaults) {
    this._defaults = fromJS(defaults);
    this.cache.resolve();
    return this;
  }

  /**
   * Listen to changes in specific response field
   * eq: change:items
   * @param key [string]: [action]:[...[:fields]]
   * @param handler [function(state, meta)]: callback function
   */
  public on(key: string, handler: Types.ActionHandler) {
    const [ event, ...path ] = key.split(':');
    this.handlers.push({ handler, key, path });
    return this;
  }

  /**
   * Remove change listeners
   * eq: .off(someCallback) - will remove listeners with callback function "someCallback"
   * eq: .off('change:items') - will remove all listeners who listen to changes in items
   * @param action [string]: [action]:[...[:fields]] | [function]
   */
  public off(action?: string | Types.ActionHandler) {
    if (!action) this.handlers = [];
    this.handlers = this.handlers.filter(
      ({ key, handler }) => (isFunction(action) ? handler : key) !== action
    );
    return this;
  }

  /**
   * Reset query/or field to default value
   * @param field [string?]
   */
  public reset(field?: string) {
    if (!field) {
      this.state = _initial;
    } else {
      this.state = this.state.delete(field);
    }
    this.cache.reset(field);
    return this;
  }

  /**
   * Set specific query value
   * eq: .set('limit', 20)
   * eq: .set('filters', (prevFilters) => {...prevFilters, size: ['M']})
   * @param field [string] - query field
   * @param update [any|function] - function which will return new value or value
   */
  public set(field: string | Types.Field, update?: any) {
    const oldValue = this.state.get(field);
    const value = isFunction(update) ? update(this.format(oldValue)) : update;
    const changes = getChangedFields(oldValue, isImmutable(value) ? value : fromJS(value));
    if (changes && isImmutable(changes) ? !changes.isEmpty() : true) {
      this.cache.set(field, changes);
    } else if (changes !== false){
      this.reset(field);
    }
    return this;
  }

  private fireEvent(event:string, changes, meta: Types.ResponseMeta) {
    const handlers = this.handlers.filter(({ key }) => key === event);
    if (!handlers) return;
    for (let index = 0; index < handlers.length; index++) {
      handlers[index].handler(this.format(changes), this.format(meta)); 
    }
  }

  private handleChanges(next, meta?) {
    const prev = this.response;
    this.handlers.forEach(({ path, handler }) => {
      const update = next.getIn(path);
      const old = prev.getIn(path);
      if (update && (!old || !old.equals(update))) {
        handler(this.format(update), this.format(meta));
      }
    });
  }

  private handleResponse(res:Types.ResponseBody) {
    const response = fromJS(res);
    const newState = queryToState(this.state, response.get('meta'), this._defaults);
    this.handleChanges(response, response.get('meta'));
    if (!newState.equals(this.state)) {
      this.state = newState;
      this.fireEvent('change:query', newState, response.get('meta'));
    }
    this.response = response;
  }

  /**
   * This function will fire after next tick after last .set or .default call
   * @param cache [{any}] - established values
   */
  private request(cache) {
    this.state = this.state.merge(cache);
    const merge = this._defaults.mergeDeep(this.state);
    const params = stateToQuery(merge).toJS();
    const type: any = this.type;
    this.provider
      .send({ params, type })
      .then(this.handleResponse)
      .catch(error =>
        this.onError
        ? this.onError(error)
        : console.warn(error)
      );

    return;
  }

  /**
   * Will convert value to pure JS structure
   * @param value
   */
  private format(value) {
    return this.config.immutable
      ? value
      : isImmutable(value) ? value.toJS() : value
  }
}
