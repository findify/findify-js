
import * as Agents from '@findify/agent';
import { fromJS, isImmutable, Map } from 'immutable';
import emmiter from './emmiter';
import { camelize } from '../helpers/capitalize';
import { isCollection } from './location';

const attrSelector = 'data-findify';
const keySelector = 'data-key';

let index: number = 0;
let cache: any[] = [];
let config: Map<any, any> = Map();

const createAgent = (type, config) => {
  const agent = Agents[camelize(type)];
  if (!agent) throw new Error(`Feature ${type} is not exists!`);
  return new agent({
    key: config.getIn(['api', 'key']),
    user: __root.analytics.user,
    slot: config.get('slot'),
    immutable: true
  });
}
const createConfig = (type, node, customs?) => {
  const cfg = customs || type === 'recommendations'
    && config.getIn(['features', 'recommendations', node.getAttribute('id')])
    || config.getIn(['features', type]);
  
  return config.withMutations(cfg => cfg.delete('features').mergeDeep(cfg))
};

const getNodes = selector => [].slice.call(document.querySelectorAll(selector));

const getEntity = (selector, _type?, _config?) => getNodes(selector)
.map(node => {
  let type = _type || node.getAttribute(attrSelector);
  const key = node.getAttribute(keySelector) || ++index;
  const config = createConfig(type, node, _config);
  
  /** Change feature type to collection if we are on collection page */
  if (type === 'search' && isCollection(config.get('collections'))) {
    type = 'smart-collection';
  }

  const agent = createAgent(type, config);
  const entity = { key, type, node, agent, config };
  emmiter.emit('attachEntity', entity);
  return entity;
})

const entities = {
  attach(selector, type?, config?) {
    const cfg = config && !isImmutable(config) ? fromJS(config) : config;
    cache = [...cache, ...getEntity(selector, type, cfg)];
    return cache;
  },
  list(){
    return cache;
  }
};

export const createEntities = (selectors = {}, _config) => {
  config = _config;

  /** Attach default nodes */
  entities.attach(`[${attrSelector}]`);

  /** Attach nodes specified in configuration */
  for (const key in selectors) {
    entities.attach(key, selectors[key]);
  }

  return entities;
}
