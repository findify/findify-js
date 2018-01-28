import * as Types from '../types';

import { init } from '@findify/sdk';
import { fromJS, Map } from 'immutable';
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
    this.handleResponse = this.handleResponse.bind(this);
    this.provider = init(config);
    this.cache = new Cache(
      config.debounce
      ? debounce(request, config.debounce)
      : request
    );
  }

  public defaults(defaults) {
    this._defaults = fromJS(defaults);
    this.cache.resolve();
    return this;
  }

  public on(key: string, handler: Types.ActionHandler) {
    const [ event, ...path ] = key.split(':');
    this.handlers.push({ handler, key, path });
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
    if (!field) this.state = _initial;
    this.cache.reset(field);
    return this;
  }

  public set(field: string | Types.Field, update?: any) {
    const value = fromJS(
      isFunction(update)
      ? update(this.state.get(field).toJS() || {})
      : update
    );
    const changes = getChangedFields(this.state.get(field), value);
    if (changes) this.cache.set(field, changes);
    return this;
  }

  private fireEvent(event:string, changes, meta: Types.ResponseMeta) {
    const handlers = this.handlers.filter(({ key }) => key === event);
    if (!handlers) return;
    for (let index = 0; index < handlers.length; index++) {
      handlers[index].handler(this.formatCallback(changes), meta); 
    }
  }

  private formatCallback(res) {
    return this.config.immutable ? res : res.toJS()
  }

  private handleChanges(next, meta?) {
    const prev = this.response;
    this.handlers.forEach(({ path, handler }) => {
      const update = next.getIn(path);
      const old = prev.getIn(path);
      if (update && (!old || !old.equals(update))) {
        handler(this.formatCallback(update), meta);
      }
    });
  }

  private handleResponse(res:Types.ResponseBody) {
    const response = fromJS(res);
    const newState = queryToState(this.state, response.get('meta'), this._defaults);
    this.handleChanges(response, response.get('meta'));
    if (!newState.equals(this.state)) {
      this.state = newState;
      this.fireEvent('change:query', newState, res.get('meta'));
    }
    this.response = res;
  }

  private request(cache) {
    const state = this.state.merge(cache);
    const merge = this._defaults.mergeDeepWith(state);
    
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

    this.state = state;
    return;
  }
}
