// tslint:disable-next-line:import-name
import React, { createContext, createElement, useMemo, useEffect, useContext } from "react";
import { fromJS, isImmutable, Map } from 'immutable';
import * as Agents from '@findify/agent';
import analytics from '@findify/analytics';

// tslint:disable-next-line:variable-name
export const Context = createContext({});

export type ProviderProps = {
  /** Store API key */
  apiKey: string,
  /** 
   * Externally created agent
   * [immutable: true] should be set in Agent options
   */
  agent?: any
  /** Additional Agent configuration eq: method */
  options?: {
    [key:string]: any
  }
  /** If no Agent provided you can manually provide user to analytics */
  user?: {
    uid: string,
    sid: string
  }
  /** Default request params */
  defaults?: {
    [key: string]: any
  }
  /**
   * Configuration object which will be provided tho` context
   */
  config?: any
  /** Request params. On change will send request */
  query?: any
  /**
   * Yse this option to not mix context of different features in one tree
   * You should provide same key in connectors eq: `useItems(storeKey)` or `connectItems(storeKey)` 
  */
  storeKey?: string
  children: React.ReactChild
}

/**
 * Used to create a Provider Component to be rendered with React to further pass down Agent data to Connectors
 * @param type Provider data type. Autocomplete, Search, SmartCollection, Content
 * @param onCreate Callback to be called with Agent instance once the provider has been initialized
 */
export const createProvider = (type, onCreate?: (agent) => void) => ({
  apiKey,
  agent,
  options,
  user,
  defaults,
  config,
  storeKey = 'default',
  query,
  children
}: ProviderProps) => {
  const [_key, _config] = useMemo(() => {
    if (agent && !agent.config.immutable) {
      throw new Error(`
        Agent should be in "immutable" mode, to work with connectors.
        Add "immutable: true" to your Agent initializer
      `)
    }

    return [
      agent && agent.config.key || apiKey,
      !config
        ? Map()
        : isImmutable(config) ? config : fromJS(config)
    ]
  }, []);

  const [_analytics, _agent] = useMemo(() => {
    const _analytics = analytics({
      key: _key,
      events: _config.get('analytics', Map()).toJS(),
      user: user,
      ..._config.get('platform', Map()).toJS()
    });

    const _agent = agent || new Agents[type]({
      key: _key,
      user: _analytics.user,
      immutable: true,
      retryCount: type === 'Autocomplete' ? 0 : void 0,
      ...options
    })
    return [_analytics, _agent];
  }, [storeKey]);

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
