
import 'core-js/fn/array/includes';
import * as Agents from '@findify/agent';
import * as Cursor from 'immutable-cursor';
import { fromJS, Iterable, Map } from 'immutable';
import emmiter from './emmiter';
import { camelize } from '../helpers/capitalize';
import { isCollection } from './location';
import { Events } from './events';

const attrSelector = 'data-findify';
const keySelector = 'data-key';

let index: number = 0;
let cache: any[] = [];
let config: Map<any, any> = Map();
const noop = () => {};
const getAgentType = type => camelize({
  'search-button': 'autocomplete'
}[type] || type);

const createAgent = (type, config) => {
  const agent = Agents[getAgentType(type)];
  if (!agent) throw new Error(`Feature ${type} is not exists!`);

  return new agent({
    key: config.getIn(['api', 'key']),
    user: __root.analytics.user,
    slot: config.get('slot'),
    immutable: true,
    debounce: type === 'autocomplete' && 500
  });
}

const createConfig = (type, node, key, customs?) => {
  const cfg = customs || type === 'recommendation'
    && config.getIn(['features', 'recommendations', '#' + node.getAttribute('id')])
    || config.getIn(['features', type]);
    
  return config.withMutations(c =>
      c.delete('features')
      .mergeDeep(cfg)
      .set('node', node)
      .set('cssSelector', `findify-${type} findify-widget-${key}`)
    );
};

const getNodes = selector => [].slice.call(document.querySelectorAll(selector));

const getEntity = (selector, _type?, _config?) => getNodes(selector)
.map(node => {
  let type = _type || node.getAttribute(attrSelector);
  const key = node.getAttribute(keySelector) || ++index;

  /** Subscribe to config changes */
  const config = Cursor.from(
    createConfig(type, node, key, _config), (changes) => 
      emmiter.emit('forceUpdate', key, changes)
  );
  
  /** Change feature type to collection if we are on collection page */
  if (type === 'search' && isCollection(config.get('collections'))) {
    type = 'smart-collection';
  }

  const agent = createAgent(type, config);

  /** Actual widget */
  const widget = { type, key, node, agent, config };

  /** Notify everyone that widget was created */
  emmiter.emit(Events.attach, widget);
  return widget;
})

const widgets = {
  /** Add new widget */
  attach(selector, type?, config?) {
    const cfg = config && !Iterable.isIterable(config) ? fromJS(config) : config;
    cache = [...cache, ...getEntity(selector, type, cfg)];
    return cache;
  },

  /** Remove exist widget */
  detach(widget) {
    cache = cache.filter(widget => widget.key !== widget.key);
    emmiter.emit(Events.detach, widget);
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

export const createWidgets = (selectors = {}, _config) => {
  config = _config;

  /** Attach default nodes */
  widgets.attach(`[${attrSelector}]`);

  /** Attach nodes specified in configuration */
  for (const key in selectors) {
    widgets.attach(key, selectors[key]);
  }

  return widgets;
}
