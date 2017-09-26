import * as FindifySDK from '@findify/sdk';

type InputEvent = {
  name: 'input';
  payload: {
    query: string;
  };
};
type SetRequestBodyEvent = {
  name: 'setRequestBody';
  payload: FindifySDK.AutocompleteRequest;
};
type RequestEvent = {
  name: 'request';
  payload: {
    item_limit?: number;
    suggestion_limit?: number;
    user?: FindifySDK.User;
  };
};

export { InputEvent, RequestEvent, SetRequestBodyEvent };
