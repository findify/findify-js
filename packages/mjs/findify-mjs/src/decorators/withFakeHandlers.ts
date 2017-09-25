import { compose, defaultProps, withProps } from 'recompose';
import { identity } from 'lodash';

export default ({ config = {} }) =>
  compose(
    defaultProps({
      config,
      analytics: {
        sendEvent: identity,
        writeClickThroughCookie: identity,
        getIdsData: () => ({}),
        getFiltersData: () => ({}),
      },
    }),
  );
