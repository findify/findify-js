import * as FindifySDK from 'findify-sdk';

export type RequestEvent = {
  name: 'request';
  payload: FindifySDK.RecommendationsRequest;
};

export type Event = RequestEvent;
