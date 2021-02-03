
import 'core-js/features/array/includes';
import * as Agents from '@findify/agent';
import { fromJS, isImmutable, Map } from 'immutable';
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
  if (!agent) return null;

  const instance = new agent({
    key: config.get('key'),
    user: __root.analytics.user,
    immutable: true,
    method: config.getIn(['api', 'method'], 'post'),
    ...(config.get('slot') && { slot: config.get('slot') } || {})
  });

  // Setup initial request
  if (!config.get('disableAutoRequest')) {
    instance.defaults(config.get('meta', Map()), true);
  }

  return instance;
}

const createConfig = (type, node, key, customs = Map()) => {
  const cfg = type === 'recommendation'
    && config.getIn(['features', 'recommendations', '#' + node.getAttribute('id')])
    || config.getIn(['features', type]);

  return config.withMutations(c =>
      c.mergeDeep(cfg)
      .mergeDeep(customs)
      .set('node', node)
      .set('widgetKey', key)
      .set('cssSelector', `findify-${type} findify-widget-${key}`)
    );
};

const isDuplicated = (node, type) => !node && !!cache.find(w => type === w.type);
const getPredefined = (type) => cache.find(w => !w.node && type === w.type);

const getNodes = selector => [].slice.call(document.querySelectorAll(selector));

const getEntity = (selector, _type?, _config?) =>
(
  typeof selector === 'string'
  ? getNodes(selector)
  : [selector]
)
.filter(node => !cache.find(w => w.node === node))
.map(node => {
  
  let type = getType(_type || node.getAttribute(attrSelector));
  const key = (_config && _config.get('widgetKey')) || (node && node.getAttribute(keySelector)) || ++index;

  let config = createConfig(type, node, key, _config);

  /** Change feature type to collection if we are on collection page */
  if (type === 'search' && isCollection(config.get('collections'), config.get('slot'))) {
    type = 'smart-collection';
    config = config.set('type', type);
  }

  if (isDuplicated(node, type)) return;

  const predefined = getPredefined(type);
  if (!!predefined) {
    predefined.node = node;
    __root.emit(Events.update, predefined);
    return;
  }

  const agent = createAgent(type, config);

  /** Actual widget */
  const widget = { type, key, node, agent, config };

  /** Notify everyone that widget was created */
  __root.emit(Events.attach, widget);
  return widget;
})

const widgets = {
  /** Add new widget */
  attach(selector, type?, config?) {
    const cfg = config && !isImmutable(config) ? fromJS(config) : config;
    const entity = getEntity(selector, type, cfg);
    if (!entity.filter(i => i).length) return cache;
    cache = [...cache, ...entity];
    return cache;
  },

  /** Remove exist widget */
  detach(key) {
    const widgetToRemove = widgets.get(key);
    cache = cache.filter(widget => key !== widget.key);
    __root.emit(Events.detach, widgetToRemove);
  },

  /** Get all rendered widget */
  list(){
    return cache;
  },

  get(_key){
    return cache.find(({ key }) => key === _key)
  },

  findByType(...types) {
    return cache.filter(({ agent }) => agent && types.includes(agent.type));
  }
};

export const createWidgets = (_config) => {
  config = _config;

  // DY: Legacy
  // TODO: Remove after they will release new version
  (global as any).findifyCreateFeature = (selector, { type, ...config }) =>
  widgets.attach(selector, type, config);

  return widgets;
}

export const bulkAddWidgets = (selectors = {}, preLoad) => {

  /** Attach default nodes */
  widgets.attach(`[${attrSelector}]`);

  /** Attach nodes specified in configuration */
  for (const key in selectors) {
    widgets.attach(key, selectors[key]);
  }

  if (preLoad) widgets.attach(null, 'search');
}
