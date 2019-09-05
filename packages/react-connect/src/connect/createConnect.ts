import { createElement, useContext, useMemo, useState, useEffect, createFactory } from "react";
import { Map } from 'immutable';
import mapValues from '../utils/mapValues';
import { Context } from '../provider/createProvider';

const createHook = (handlers, mapProps, field) => (key = 'default') => {
  const context = useContext(Context);
  const { agent, analytics, config } = context[key];

  const createUpdater = (setState?) => (changes, meta) => {
    const mapped = mapProps && mapProps(changes, meta, agent.set, analytics, config);
    const state = { meta, ...(mapped || { [field]: changes }) };
    return setState ? setState(state) : state;
  }

  const getState = () => createUpdater()(
    field !== 'query' ? agent.response.get(field) : agent.state,
    agent.response.get('meta') || Map()
  );

  const [state, setState] = useState(getState());

  const _handlers = useMemo(() =>
    mapValues(
      handlers,
      (createHandler) => createHandler({ analytics, update: agent.set, ...state })
    )
  , [state])

  const _updater = createUpdater(setState);

  useEffect(() => {
    agent.on(`change:${field}`, _updater);
    window.requestAnimationFrame(() => setState(getState()))
    return () => agent.off(_updater)
  }, []);

  return [state, _handlers, agent.set, analytics, config];
}

const getContext = (key = 'default') => {
  const context = useContext(Context);
  const { agent, analytics, config } = context[key];
  return [void 0, void 0, agent.set, analytics, config];
}

/**
 * Used to create a Connector HOC, enhancing given BaseComponent with connector configuration-specific
 * props, which it will extract from provider located higher in the React tree
 * @param param0 Connector configuration
 */
const createComponent = ({
  field,
  handlers,
  mapProps,
  BaseComponent,
  key
}: any) => {
  const factory = createFactory(BaseComponent);
  const hook = field === 'config'
    ? getContext
    : createHook(handlers, mapProps, field)

  return (props) => {
    const [state, handlers, update, analytics, config] = hook(key);
    return factory({ ...state, ...props, ...handlers, update, analytics, config });
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
}) =>
  (connector: any | { feature?: string, key?: string | number }): any =>
    typeof connector === 'function'
    ? createComponent({
        field,
        handlers,
        mapProps,
        BaseComponent: connector
      })
      // tslint:disable-next-line:variable-name
    : BaseComponent =>
      createComponent({
        field,
        handlers,
        mapProps,
        BaseComponent,
        ...connector
      })
