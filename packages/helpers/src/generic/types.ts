import * as FindifySDK from '@findify/sdk';
import * as Redux from 'redux';

type Store<EE, SE, SN, SR> = {
  emit: (event: EE) => Store<EE, SE, SN, SR>;
  subscribe: (listener: SubscribeListener<SE>) => Unsubscribe;
  get: (name: SN) => SR;
  // we need to provide plain objects without any nesting in ideal
};

// create helpers-redux package, which will be converting helpers stores to redux stores

// we don't need `state` here
type SubscribeListener<E> = (event: E) => void;

type Unsubscribe = () => void;

type ResponseSuccessEvent = {
  name: 'responseSuccess';
};
type ResponseFailureEvent = {
  name: 'responseFailure';
};

type ResponseMeta = {
  isFetching: boolean;
  lastUpdated?: number;
  error?: string;
};

type StateName = 'request' | 'response' | 'responseMeta';

type Config = FindifySDK.Config;

export {
  Store,
  Config,
  ResponseMeta,
  SubscribeListener,
  Unsubscribe,
  ResponseSuccessEvent,
  ResponseFailureEvent,
  StateName,
};
