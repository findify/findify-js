// tslint:disable-next-line:import-name
import { createContext, createElement, useMemo, useEffect, useContext } from "react";
import { Map } from 'immutable';
import * as Agents from '@findify/agent';
import analytics from '@findify/analytics';

// tslint:disable-next-line:variable-name
export const Context = createContext({});

/**
 * Used to create a Provider Component to be rendered with React to further pass down Agent data to Connectors
 * @param type Provider data type. Autocomplete, Search, SmartCollection, Content
 * @param onCreate Callback to be called with Agent instance once the provider has been initialized
 */
export const createProvider = (type, onCreate?: (agent) => void) => ({
  apiKey,
  agent,
  options,
  defaults,
  config,
  storeKey = 'default',
  query,
  children
}) => {
  const [_key, _config] = useMemo(() => {
    if (agent && !agent.config.immutable) {
      throw new Error(`
        Agent should be in "immutable" mode, to work with connectors.
        Add "immutable: true" to your Agent initializer
      `)
    }
    return [
      agent && agent.config.key || apiKey,
      config || Map()
    ]
  }, []);

  const [_analytics, _agent] = useMemo(() => [
    analytics({
      key: _key,
      events: _config.get('analytics', Map()).toJS(),
      ..._config.get('platform', Map()).toJS()
    }),

    agent || new Agents[type]({
      key: _key,
      user: this.analytics.user,
      immutable: true,
      retryCount: type === 'Autocomplete' ? 0 : void 0,
      ...options
    })
  ], [storeKey]);

  useEffect(() => {
    for (const key in query) _agent.set(key, query[key]);
  }, [query]);

  useEffect(() => {
    if (defaults) _agent.defaults(defaults);
  }, [defaults]);

  useEffect(() => {
    if (onCreate) onCreate(_agent)
  }, [_agent]);

  const context = useContext(Context);

  const value = useMemo(() => ({
    ...context,
    [storeKey]: {
      analytics: _analytics,
      agent: _agent,
      config: _config,
    }
  }), [context]);

  return createElement(Context.Provider, { value }, children);
}
