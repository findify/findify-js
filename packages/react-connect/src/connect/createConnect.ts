import { useContext, useMemo, useState, useEffect, useCallback, createFactory } from "react";
import { Map, is } from 'immutable';
import mapValues from '../utils/mapValues';
import { Context } from '../provider/createProvider';

const getContext = (key) => {
  const context = useContext(Context);
  return useMemo(() => context[key], [context, key]);
}

const useImmutableState = (initialValue) => {
  const [state, setState] = useState(initialValue);
  const updateState = (next) => Object.keys(state).find(k => !is(state[k], next[k])) && setState(next);
  return useMemo(() => [state, updateState], [state]);
}

const createHook = (handlers, mapProps, field) => (key = 'default') => {
  const { agent, analytics, config } = getContext(key);

  const getState = useCallback((
    changes = field !== 'query' ? agent.response.get(field) : agent.state,
    meta = agent.response.get('meta') || Map()
  ) => {
    const mapped = mapProps && mapProps(changes, meta, agent.set, analytics, config);
    return { meta, ...(mapped || { [field]: changes }) };
  }, []);

  const [state, setState] = useImmutableState(getState());

  const _handlers = useMemo(() =>
    mapValues(
      handlers,
      (createHandler) => createHandler({ analytics, update: agent.set, ...state })
    )
  , [state])

  useEffect(() => {
    const _updater = (...args) => setState(getState(...args));
    agent.on(`change:${field}`, _updater);
    window.requestAnimationFrame(() => _updater());
    return () => agent.off(_updater)
  }, []);

  return useMemo(() => ({ ...state, ..._handlers, update: agent.set, analytics, config }), [state]);
}

const useFeatureContext = (key = 'default') => {
  const { agent, analytics, config } = getContext(key);
  return ({ update: agent.set, analytics, config });
}

/**
 * Used to create a Connector HOC, enhancing given BaseComponent with connector configuration-specific
 * props, which it will extract from provider located higher in the React tree
 * @param param0 Connector configuration
 */
const createComponent = ({
  BaseComponent,
  hook,
  key
}: any) => {
  const factory = createFactory(BaseComponent);
  return (props) => {
    const data = hook(key);
    return factory({ ...props, ...data });
  }
}

export default ({
  field,
  handlers,
  mapProps,
}: {
  field: string,
  handlers?: any,
  mapProps?: (field, meta, update, analytics) => void
  }) => {
  const hook = field === 'config' ? useFeatureContext : createHook(handlers, mapProps, field);
  return [
    hook,
    (connector: any | { feature?: string, key?: string | number }): any =>
      typeof connector === 'function'
        ? createComponent({
          hook,
          BaseComponent: connector
        })
        // tslint:disable-next-line:variable-name
        : BaseComponent =>
          createComponent({
            BaseComponent,
            hook,
            ...connector
          })
    ]
}
