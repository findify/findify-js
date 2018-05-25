
import 'core-js/fn/array/includes';
import * as Agents from '@findify/agent';
import { fromJS, isImmutable, Map } from 'immutable';
import emitter from './emitter';
import { camelize } from '../helpers/capitalize';
import { isCollection } from './location';
import { Events } from './events';

const attrSelector = 'data-findify';
const keySelector = 'data-key';

let index: number = 0;
let cache: any[] = [];
let config: Map<any, any> = Map();
const noop = () => {};
const getType = type => ({
  'search-button': 'autocomplete',
  'recommendations': 'recommendation'
}[type] || type);

const createAgent = (type, config) => {
  const agent = Agents[camelize(type)];
  if (!agent) throw new Error(`Feature ${type} is not exists!`);

  return new agent({
    key: config.get('key'),
    user: __root.analytics.user,
    slot: config.get('slot'),
    immutable: true,
  }).defaults(config.get('meta', {}));
}

const createConfig = (type, node, key, customs = Map()) => {
  const cfg = type === 'recommendation'
    && config.getIn(['features', 'recommendations', '#' + node.getAttribute('id')])
    || config.getIn(['features', type]);

  return config.withMutations(c =>
      c.delete('features')
      .mergeDeep(cfg)
      .mergeDeep(customs)
      .set('node', node)
      .set('widgetKey', key)
      .set('cssSelector', `findify-${type} findify-widget-${key}`)
    );
};

const getNodes = selector => [].slice.call(document.querySelectorAll(selector));

const getEntity = (selector, _type?, _config?) =>
(
  typeof selector === 'string'
  ? getNodes(selector)
  : [selector]
)
.map(node => {
  let type = getType(_type || node.getAttribute(attrSelector));
  const key = node.getAttribute(keySelector) || ++index;

  let config = createConfig(type, node, key, _config);

  /** Change feature type to collection if we are on collection page */
  if (type === 'search' && isCollection(config.get('collections'))) {
    type = 'smart-collection';
    config = config.set('type', type);
  }

  const agent = createAgent(type, config);

  /** Actual widget */
  const widget = { type, key, node, agent, config };

  /** Notify everyone that widget was created */
  emitter.emit(Events.attach, widget);
  return widget;
})

const widgets = {
  /** Add new widget */
  attach(selector, type?, config?) {
    const cfg = config && !isImmutable(config) ? fromJS(config) : config;
    cache = [...cache, ...getEntity(selector, type, cfg)];
    return cache;
  },

  /** Remove exist widget */
  detach(widget) {
    cache = cache.filter(widget => widget.key !== widget.key);
    emitter.emit(Events.detach, widget);
  },

  /** Get all rendered widget */
  list(){
    return cache;
  },

  get(_key){
    return cache.find(({ key }) => key === _key)
  },

  findByType(...types) {
    return cache.filter(({ agent }) => types.includes(agent.type));
  }
};

export const createWidgets = (_config) => {
  config = _config;
  return widgets;
}

export const bulkAddWidgets = (selectors = {}) => {
  /** Attach default nodes */
  widgets.attach(`[${attrSelector}]`);

  /** Attach nodes specified in configuration */
  for (const key in selectors) {
    widgets.attach(key, selectors[key]);
  }
}

// DY: Legacy
// TODO: Remove after they will release new version
(global as any).findifyCreateFeature = (selector, { type, ...config }) =>
  widgets.attach(selector, type, config);
