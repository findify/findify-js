import { createAutocomplete } from '@findify/helpers';
import { throttle } from 'lodash';
import { RESPONSE_SUCCESS } from '../../helpers/constants';

export default ({ updateNode, node, location, config: { api, meta = {} } }) => {
  const instance = createAutocomplete(api);
  const subscriber = callback => ({ name }) =>
    name === RESPONSE_SUCCESS && callback(instance.get('response'));

  const request = throttle(
    query =>
      instance
        .emit({ name: 'input', payload: { query } })
        .emit({ name: 'request', payload: { ...meta } }),
    300,
  );

  if (location.state.q) {
    node.instance.value = location.state.q;
  }

  return {
    subscribe: callback => instance.subscribe(subscriber(callback)),
    request,
  };
};
