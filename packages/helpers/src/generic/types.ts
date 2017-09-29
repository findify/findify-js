import * as FindifySDK from 'findify-sdk';
import * as Redux from 'redux';

export type Store<EE, SE, SN, SR> = {
  emit: (event: EE) => Store<EE, SE, SN, SR>;
  subscribe: (listener: SubscribeListener<SE>) => Unsubscribe;
  get: (name: SN) => SR;
  // we need to provide plain objects without any nesting in ideal
};

// create helpers-redux package, which will be converting helpers stores to redux stores

// we don't need `state` here
export type SubscribeListener<E> = (event: E) => void;

export type Unsubscribe = () => void;

export type ResponseSuccessEvent = {
  name: 'responseSuccess';
};
export type ResponseFailureEvent = {
  name: 'responseFailure';
};

export type ResponseMeta = {
  isFetching: boolean;
  lastUpdated?: number;
  error?: string;
};

export type StateName = 'request' | 'response' | 'responseMeta';

export type Config = FindifySDK.Config;
