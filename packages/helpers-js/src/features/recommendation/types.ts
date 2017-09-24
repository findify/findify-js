import * as FindifySDK from 'findify-sdk';

type RequestEvent = {
  name: 'request';
  payload: FindifySDK.RecommendationsRequest;
};

type Event = RequestEvent;

export { RequestEvent, Event };
