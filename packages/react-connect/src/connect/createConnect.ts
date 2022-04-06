import {
  useContext,
  useMemo,
  useState,
  useEffect,
  createFactory,
  useRef,
} from 'react';
import { Map, is } from 'immutable';
import mapValues from '../utils/mapValues';
import { contexts } from '../provider/createProvider';
import { Agent } from '@findify/agent/types/core/Agent';
import { Client as Analytics } from '@findify/analytics/types/types';
import { Immutable, Config, BaseFeature } from '@findify/store-configuration';
import memoize from 'memoize-one';

type ConfigType<T> = T extends Immutable.FeatureConfig
  ? T
  : Immutable.Factory<Config & BaseFeature>;

type ContextState<T = undefined> = {
  agent: Agent;
  analytics: Analytics;
  config: ConfigType<T>;
};

type Handler = (...args: any[]) => any;

type CreatorProps = {
  field: string;
  handlers?: {
    [fnName: string]: Handler;
  };
  mapProps?: (
    field: Map<string, any>,
    meta: Map<string, any>,
    update: (field: string, update?: any) => Agent,
    analytics: Analytics,
    config: Map<string, any>
  ) => Record<string, any>;
};

type HookReturns<T = undefined> = {
  meta: Map<string, any>;
  update: Agent['set'];
  analytics: Analytics;
  config: ConfigType<T>;
};

type HookProps = {
  key?: string;
  force?: boolean;
  field?: string;
};

const getContext = <T = undefined>(key): ContextState<T> => {
  if (contexts[key]) return useContext(contexts[key]);
  throw new Error(
    `Context ${key} was now found, create Provider with storeKey: ${key}`
  );
};

/**
 * Memoize props
 */
const getStateCreator = (agent, analytics, config, field, mapProps) =>
  memoize(
    (changes, meta) => {
      const mapped =
        mapProps && mapProps(changes, meta, agent.set, analytics, config);
      return { meta, ...(mapped || { [field]: changes }) };
    },
    (a, b) => {
      return is(a[0], b[0]) && is(a[1], b[1]);
    }
  );

/**
 * Cache content mappers to avoid recalculation in every single connector
 */
const cache = (() => {
  let _cache: any = [];
  return (agent, analytics, config, field, mapProps) => {
    const cached = _cache.find((i) => i[0] === mapProps && i[1] === agent && i[2] === config.get('widgetKey'));
    if (cached) return cached[3];

    const entity = [
      mapProps,
      agent,
      config.get('widgetKey'),
      getStateCreator(agent, analytics, config, field, mapProps),
    ];

    _cache = [..._cache, entity];
    return entity[3];
  };
})();

const createHook = <H = undefined>({
  field: _field,
  handlers,
  mapProps,
}: CreatorProps) => {
  return <T = undefined>({
    key = 'default',
    field = _field,
  }: HookProps = {}): HookReturns<T> & H => {
    const { agent, analytics, config } = getContext(key);
    const getState = useRef(cache(agent, analytics, config, field, mapProps));

    const getStateProps = () => [
      field === 'query' ? agent.state : agent.response.getIn(field.split(':')),
      agent.response.get('meta') || Map(),
    ];

    const [state, setState] = useState(getState.current(...getStateProps()));

    const _handlers = useMemo(
      () =>
        mapValues(handlers, (createHandler) =>
          createHandler({ analytics, update: agent.set, ...state })
        ),
      [state]
    );

    useEffect(() => {
      const _updater = (...args) => setState(getState.current(...args));
      agent.on(`change:${field}`, _updater);
      Promise.resolve().then(() => _updater(...getStateProps()));
      return () => agent.off(_updater) as any;
    }, []);

    return useMemo(
      () => ({ ...state, ..._handlers, update: agent.set, analytics, config }),
      [state]
    );
  };
};

export const useFeatureContext = <T = undefined>({
  key = 'default',
}: HookProps = {}): Pick<HookReturns<T>, 'config' | 'analytics' | 'update'> => {
  const { agent, analytics, config } = getContext<T>(key);
  return useMemo(() => ({ update: agent.set, analytics, config }), []);
};

const createComponent = ({ BaseComponent, hook, key }: any) => {
  const factory = createFactory(BaseComponent);
  return (props) => {
    const data = hook(key);
    return factory({ ...props, ...data });
  };
};

export default <H = undefined>({ field, handlers, mapProps }: CreatorProps) => {
  const hook = createHook<H>({
    field,
    handlers,
    mapProps,
  });

  const connect = (
    connector: any | { feature?: string; key?: string | number }
  ): any =>
    typeof connector === 'function'
      ? createComponent({
          hook,
          BaseComponent: connector,
        })
      : // tslint:disable-next-line:variable-name
        (BaseComponent) =>
          createComponent({
            BaseComponent,
            hook,
            ...connector,
          });

  return { hook, connect };
};