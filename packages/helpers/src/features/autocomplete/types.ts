import * as FindifySDK from 'findify-sdk';

export type InputEvent = {
  name: 'input';
  payload: {
    query: string;
  };
};

export type SetRequestBodyEvent = {
  name: 'setRequestBody';
  payload: FindifySDK.AutocompleteRequest;
};

export type RequestEvent = {
  name: 'request';
  payload: {
    item_limit?: number;
    suggestion_limit?: number;
    user?: FindifySDK.User;
  };
};
