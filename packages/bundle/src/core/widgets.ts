import * as Agents from '@findify/agent';
import { fromJS, isImmutable, Map } from 'immutable';
import { camelize } from '../helpers/capitalize';
import { isCollection } from './location';
import { Events } from './events';
import { Immutable, Types } from '@findify/store-configuration';
import { Agent } from '@findify/agent/types/core/Agent';

const attrSelector = 'data-findify';
const keySelector = 'data-key';

let index = 0;
let cache: any[] = [];
let config: Partial<Immutable.FeatureConfig> | Record<string, any> = Map();

const getType = (type): keyof typeof Types.Feature =>
  ({
    'search-button': 'autocomplete',
    recommendations: 'recommendation',
  }[type] || type);

const createAgent = (type, config): Agent | null => {
  const agent = Agents[camelize(type)];
  if (!agent) return null;

  const agentProps = {
    key: config.get('key'),
    user: __root.analytics.user,
    immutable: true,
    method: config.getIn(['api', 'method'], 'post'),
  };

  if (config.get('slot')) {
    agentProps['slot'] = config.get('slot');
  }

  return new agent(agentProps);
};

const createConfig = (
  type,
  node,
  key,
  customs = Map()
): Immutable.BaseConfig => {
  const cfg =
    (type === 'recommendation' &&
      config.getIn(['features', 'recommendations', node.getAttribute('id')])) ||
    config.getIn(['features', type]);

  return config.withMutations((c) =>
    c
      .mergeDeep(cfg)
      .mergeDeep(customs)
      .set('node', node)
      .set('widgetKey', key)
      .set('cssSelector', `findify-${type} findify-widget-${key}`)
  );
};

const isDuplicated = (node, type) =>
  !node && !!cache.find((w) => type === w.type);
const getPredefined = (type) => cache.find((w) => !w.node && type === w.type);
const getNodes = (selector) =>
  [].slice.call(document.querySelectorAll(selector));

export interface Widget<T> {
  agent: Agent;
  config: T;
  node: HTMLDivElement | HTMLInputElement;
  key: string | number;
  type: keyof typeof Types.Feature;
}

const getEntity = (
  selector: string | HTMLElement,
  _type?: Types.Feature,
  _config?: Immutable.BaseConfig
): Widget<Immutable.FeatureConfig>[] => {
  return (typeof selector === 'string' ? getNodes(selector) : [selector])
    .filter((node: HTMLElement) => !cache.find((w) => w.node === node))
    .map((node: HTMLElement) => {
      let widgetType = getType(_type || node.getAttribute(attrSelector));
      const key =
        (_config && _config.get('widgetKey')) ||
        (node && node.getAttribute(keySelector)) ||
        ++index;

      if (cache.some(w => w.key === key)) {
        return cache;
      }

      let config = createConfig(widgetType, node, key, _config);

      /** Change feature type to collection if we are on collection page */
      if (
        (widgetType as any) === Types.Feature.search &&
        isCollection(config.get('collections'), config.get('slot'))
      ) {
        (widgetType as any) = 'smart-collection';
        config = config.set('widgetType', widgetType);
      }

      if (isDuplicated(node, widgetType)) return;

      const predefined = getPredefined(widgetType);

      /**
       * If widget has already been create
       * we updating exist one and asking renderer to rerender it
       */
      if (predefined) {
        predefined.node = node;
        predefined.config = config;
        predefined._key = predefined.key;
        predefined.key = key;
        __root.emit(Events.update, predefined);
        return;
      }

      const agent = createAgent(widgetType, config);

      /** Actual widget */
      const widget = { type: widgetType, key, node, agent, config };

      /** Notify everyone that widget was created */
      __root.emit(Events.attach, widget);
      return widget;
    });
};

const widgets = {
  /** Add new widget */
  attach(selector, type?, _config?) {
    const config = _config && isImmutable(_config) ? _config : fromJS(_config);
    const entity = getEntity(selector, type, config);

    const entitiesToAdd = entity.filter(e => e);
    
    if (!entitiesToAdd.length) return cache;

    cache.push(...entitiesToAdd);
    
    return cache;
  },

  /** Remove exist widget */
  detach(key) {
    const widgetToRemove = widgets.get(key);
    cache = cache.filter((widget) => key !== widget.key);
    __root.emit(Events.detach, widgetToRemove);
  },

  /** Get all rendered widget */
  list() {
    return cache;
  },

  get(_key) {
    return cache.find(({ key }) => key === _key);
  },

  findByType(...types) {
    return cache.filter(({ agent }) => agent && types.includes(agent.type));
  },
};

export const getWidgets = (_config) => {
  config = _config;
  return widgets;
};

export const bulkAddWidgets = (selectors = {}, preLoad?) => {
  /** Attach default nodes */
  widgets.attach(`[${attrSelector}]`);

  /** Attach nodes specified in configuration */
  for (const key in selectors) {
    widgets.attach(key, selectors[key]);
  }

  if (preLoad) widgets.attach(null, 'search');
};
