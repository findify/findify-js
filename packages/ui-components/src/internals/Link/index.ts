import PropTypes from 'prop-types';

import {
  compose,
  setDisplayName,
  getContext,
  withHandlers,
  componentFromProp,
  defaultProps,
  mapProps,
} from 'recompose';

const Link: any = compose(
  setDisplayName('Link'),
  defaultProps({ component: 'a' }),
  getContext({ location: PropTypes.object }),
  withHandlers({
    onClick: ({ location, ...props }) => e => {
      e.preventDefault();
      if (location) {
        location.navigate(props);
      }
    },
  }),
  mapProps(({ location, ...props }) => props),
)(componentFromProp('component'));

export default Link;
