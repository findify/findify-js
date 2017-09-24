import { createRecommendation } from 'findify-helpers';
import { defer } from 'lodash';
import { RESPONSE_SUCCESS } from '../../helpers/constants';

export default ({
  node,
  location,
  config: { meta = {}, zeroResultsType, zeroResultsLimit = '24', api },
}) => {
  const instance: any = createRecommendation(zeroResultsType, api);
  const subscriber = callback => ({ name }) =>
    name === RESPONSE_SUCCESS && callback(instance.get('response'));

  const request = () =>
    instance.emit({
      name: 'request',
      payload: {
        ...meta,
        limit: String(zeroResultsLimit),
      },
    });

  const listener = location.listen(request);

  return {
    subscribe: callback => instance.subscribe(subscriber(callback)),
    listener: [listener],
    request: request,
  };
};
